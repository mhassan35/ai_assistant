import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = 'You are a helpful assistant, capable of answering general questions and engaging in conversations on various topics.';

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { prompt } = await request.json(); // Only prompt is needed for general chat
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Construct the prompt with the system's base instructions and the user's input
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${prompt}\nAssistant:`;

    // Generate content using the model
    const result = await model.generateContentStream(fullPrompt);

    // Return the generated content in a streamed response
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
