import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withRetry } from "@/lib/db-retry";
import { detectSafetyLevel, SAFETY_MESSAGES } from "@/lib/emergency";

export const runtime = "nodejs";

const MODEL_NAME = "gemini-3.6-flash";
const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY = 20;

const SYSTEM_INSTRUCTION = `You are HealthAI, a friendly, knowledgeable AI health and wellness assistant.

Core rules:
- Provide clear, general, evidence-based information about health, nutrition, fitness, sleep, and mental wellness.
- You are NOT a doctor. Never provide a diagnosis, never prescribe medication or dosages, and never claim to replace professional medical care.
- For anything specific, severe, persistent, or unclear, recommend the person consult a licensed healthcare professional.
- If a message describes a possible medical emergency (e.g. chest pain, trouble breathing, severe bleeding, stroke symptoms, loss of consciousness) or a mental health crisis (e.g. thoughts of self-harm or suicide), your response must start by clearly telling the user to seek immediate help: call their local emergency number, go to the nearest emergency room, or in the US call/text 988 for a mental health crisis. Do this before anything else.
- Keep answers concise and practical. Prefer short paragraphs or bullet points over long essays.
- Be warm and supportive, never alarmist, never dismissive.
- If a health profile is provided, tailor general suggestions to it (age, activity level, goals, known conditions), but still avoid diagnosing.`;

interface ProfileContextInput {
  age?: string | null;
  sex?: string | null;
  heightCm?: string | null;
  weightKg?: string | null;
  activityLevel?: string | null;
  goal?: string | null;
  conditions?: string | null;
}

function buildProfileContext(profile?: ProfileContextInput | null): string {
  if (!profile) return "";
  const parts: string[] = [];
  if (profile.age) parts.push(`age ${profile.age}`);
  if (profile.sex) parts.push(profile.sex);
  if (profile.heightCm) parts.push(`${profile.heightCm} cm tall`);
  if (profile.weightKg) parts.push(`${profile.weightKg} kg`);
  if (profile.activityLevel) parts.push(`${profile.activityLevel} activity level`);
  if (profile.goal) parts.push(`goal: ${profile.goal.replace("_", " ")}`);
  if (profile.conditions) parts.push(`known conditions/allergies: ${profile.conditions}`);

  if (parts.length === 0) return "";
  return `\n\nUser health profile (use to personalize general guidance only, never to diagnose): ${parts.join(", ")}.`;
}

async function persistAssistantMessage(userId: string, content: string): Promise<void> {
  try {
    await withRetry(() => prisma.message.create({ data: { userId, role: "model", content } }));
  } catch (error) {
    console.error("Failed to persist assistant message after retries:", error);
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Please sign in to use the assistant." }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not configured on the server.");
    return Response.json(
      { error: "The AI assistant is not configured yet. Please try again later." },
      { status: 500 }
    );
  }

  let body: { content?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const content = typeof body.content === "string" ? body.content.trim() : "";
  if (!content || content.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const safetyLevel = detectSafetyLevel(content);
  let profile;
  let history;

  try {
    const [fetchedProfile, priorMessages] = await withRetry(() =>
      Promise.all([
        prisma.profile.findUnique({ where: { userId: session.userId } }),
        prisma.message.findMany({
          where: { userId: session.userId, role: { in: ["user", "model"] } },
          orderBy: { createdAt: "desc" },
          take: MAX_HISTORY,
        }),
      ])
    );
    profile = fetchedProfile;
    history = priorMessages.reverse();

    await withRetry(() =>
      prisma.message.create({ data: { userId: session.userId, role: "user", content } })
    );

    if (safetyLevel !== "none") {
      await withRetry(() =>
        prisma.message.create({
          data: {
            userId: session.userId,
            role: "safety",
            level: safetyLevel,
            content: SAFETY_MESSAGES[safetyLevel],
          },
        })
      );
    }
  } catch (error) {
    console.error("Database error in chat route:", error);
    return Response.json(
      { error: "Couldn't reach the database. Please try again in a moment." },
      { status: 503 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION + buildProfileContext(profile),
    });

    const chat = model.startChat({
      history: history.map((m) => ({
        role: m.role as "user" | "model",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 1024,
      },
    });

    const result = await chat.sendMessageStream(content);

    let fullText = "";
    const userId = session.userId;
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              fullText += text;
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
        } catch (error) {
          console.error("Gemini streaming error:", error);
          controller.error(error);
          return;
        }

        controller.close();

        if (fullText) {
          await persistAssistantMessage(userId, fullText);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Gemini request error:", error);
    return Response.json(
      { error: "The AI assistant couldn't respond right now. Please try again in a moment." },
      { status: 502 }
    );
  }
}
