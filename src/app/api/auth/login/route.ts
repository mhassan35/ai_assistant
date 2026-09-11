import { prisma } from "@/lib/prisma";
import { withRetry } from "@/lib/db-retry";
import { isValidEmail, isValidPassword, setSessionCookie, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = body.password;

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return Response.json({ error: "Invalid email or password." }, { status: 401 });
  }

  try {
    const user = await withRetry(() => prisma.user.findUnique({ where: { email } }));
    if (!user) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await setSessionCookie({ userId: user.id, email: user.email });
    return Response.json({ user: { email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Could not sign you in. Please try again." }, { status: 500 });
  }
}
