import { prisma } from "@/lib/prisma";
import { withRetry } from "@/lib/db-retry";
import { hashPassword, isValidEmail, isValidPassword, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = body.password;

  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!isValidPassword(password)) {
    return Response.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  try {
    const existing = await withRetry(() => prisma.user.findUnique({ where: { email } }));
    if (existing) {
      return Response.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await withRetry(() =>
      prisma.user.create({
        data: {
          email,
          passwordHash,
          profile: { create: {} },
        },
      })
    );

    await setSessionCookie({ userId: user.id, email: user.email });
    return Response.json({ user: { email: user.email } }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ error: "Could not create your account. Please try again." }, { status: 500 });
  }
}
