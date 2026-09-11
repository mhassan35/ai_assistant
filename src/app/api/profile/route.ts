import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withRetry } from "@/lib/db-retry";

const EDITABLE_FIELDS = [
  "name",
  "age",
  "sex",
  "heightCm",
  "weightKg",
  "activityLevel",
  "goal",
  "conditions",
] as const;

const MAX_FIELD_LENGTH = 500;
const DB_ERROR_RESPONSE = { error: "Couldn't reach the database. Please try again in a moment." };

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const profile = await withRetry(() => prisma.profile.findUnique({ where: { userId: session.userId } }));
    return Response.json({ profile });
  } catch (error) {
    console.error("Profile GET error:", error);
    return Response.json(DB_ERROR_RESPONSE, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data: Record<string, string> = {};
  for (const field of EDITABLE_FIELDS) {
    const value = body[field];
    if (value === undefined) continue;
    if (typeof value !== "string" || value.length > MAX_FIELD_LENGTH) {
      return Response.json({ error: `Invalid value for ${field}.` }, { status: 400 });
    }
    data[field] = value;
  }

  try {
    const profile = await withRetry(() =>
      prisma.profile.upsert({
        where: { userId: session.userId },
        update: data,
        create: { userId: session.userId, ...data },
      })
    );
    return Response.json({ profile });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return Response.json(DB_ERROR_RESPONSE, { status: 503 });
  }
}

export async function DELETE() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const empty = Object.fromEntries(EDITABLE_FIELDS.map((field) => [field, ""]));

  try {
    const profile = await withRetry(() =>
      prisma.profile.upsert({
        where: { userId: session.userId },
        update: empty,
        create: { userId: session.userId, ...empty },
      })
    );
    return Response.json({ profile });
  } catch (error) {
    console.error("Profile DELETE error:", error);
    return Response.json(DB_ERROR_RESPONSE, { status: 503 });
  }
}
