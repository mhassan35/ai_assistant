import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withRetry } from "@/lib/db-retry";

const DB_ERROR_RESPONSE = { error: "Couldn't reach the database. Please try again in a moment." };

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const messages = await withRetry(() =>
      prisma.message.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "asc" },
        take: 200,
      })
    );
    return Response.json({ messages });
  } catch (error) {
    console.error("Messages GET error:", error);
    return Response.json(DB_ERROR_RESPONSE, { status: 503 });
  }
}

export async function DELETE() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await withRetry(() => prisma.message.deleteMany({ where: { userId: session.userId } }));
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Messages DELETE error:", error);
    return Response.json(DB_ERROR_RESPONSE, { status: 503 });
  }
}
