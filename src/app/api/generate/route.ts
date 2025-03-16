import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are a professional Health and Fitness AI Assistant specializing in:
- Personalized diet planning
- Workout recommendations
- Nutritional advice
- Health and wellness guidance
- Fitness goal setting
- Meal planning and recipes
- General health education

Important Guidelines:
1. Always provide evidence-based health and fitness advice
2. Include disclaimers when necessary
3. Encourage consulting healthcare professionals for medical issues
4. Keep responses focused on health, fitness, and wellness
5. For questions outside health/fitness, politely remind users that you're specialized in health and wellness only

If asked about non-health topics, respond with:
"I'm your dedicated Health & Fitness Assistant. I specialize in nutrition, exercise, and wellness advice. How can I help you with your health journey today?"`;

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { prompt } = await request.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Combine system prompt with user's prompt
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${prompt}\nAssistant:`;

    const result = await model.generateContentStream(fullPrompt);
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(new TextEncoder().encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}