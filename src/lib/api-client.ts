import { EMPTY_PROFILE, HealthProfile, UIMessage } from "./types";

export interface AuthUser {
  email: string;
}

interface ServerProfile {
  name: string;
  age: string;
  sex: string;
  heightCm: string;
  weightKg: string;
  activityLevel: string;
  goal: string;
  conditions: string;
  updatedAt: string;
}

interface ServerMessage {
  id: string;
  role: string;
  content: string;
  level?: string | null;
}

async function parseJson(response: Response): Promise<Record<string, unknown>> {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

function mapProfile(p: ServerProfile | null | undefined): HealthProfile {
  if (!p) return EMPTY_PROFILE;
  return {
    name: p.name ?? "",
    age: p.age ?? "",
    sex: (p.sex as HealthProfile["sex"]) ?? "",
    heightCm: p.heightCm ?? "",
    weightKg: p.weightKg ?? "",
    activityLevel: (p.activityLevel as HealthProfile["activityLevel"]) ?? "",
    goal: (p.goal as HealthProfile["goal"]) ?? "",
    conditions: p.conditions ?? "",
    updatedAt: p.updatedAt ?? "",
  };
}

function mapMessage(m: ServerMessage): UIMessage {
  if (m.role === "safety") {
    return { role: "safety", level: (m.level as "emergency" | "crisis") ?? "emergency", content: m.content };
  }
  return { role: m.role === "model" ? "model" : "user", content: m.content };
}

export async function fetchMe(): Promise<AuthUser | null> {
  const res = await fetch("/api/auth/me");
  const data = await parseJson(res);
  return (data.user as AuthUser | null) ?? null;
}

export async function signup(email: string, password: string): Promise<AuthUser> {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseJson(res);
  if (!res.ok) throw new Error((data.error as string) || "Could not create your account.");
  return data.user as AuthUser;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseJson(res);
  if (!res.ok) throw new Error((data.error as string) || "Could not sign you in.");
  return data.user as AuthUser;
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function fetchProfile(): Promise<HealthProfile> {
  const res = await fetch("/api/profile");
  if (!res.ok) return EMPTY_PROFILE;
  const data = await parseJson(res);
  return mapProfile(data.profile as ServerProfile | null);
}

export async function saveProfile(profile: Partial<HealthProfile>): Promise<HealthProfile> {
  const res = await fetch("/api/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  const data = await parseJson(res);
  if (!res.ok) throw new Error((data.error as string) || "Could not save your profile.");
  return mapProfile(data.profile as ServerProfile);
}

export async function clearProfileApi(): Promise<HealthProfile> {
  const res = await fetch("/api/profile", { method: "DELETE" });
  const data = await parseJson(res);
  return mapProfile(data.profile as ServerProfile);
}

export async function fetchMessages(): Promise<UIMessage[]> {
  const res = await fetch("/api/messages");
  if (!res.ok) return [];
  const data = await parseJson(res);
  const messages = data.messages;
  if (!Array.isArray(messages)) return [];
  return (messages as ServerMessage[]).map(mapMessage);
}

export async function clearMessagesApi(): Promise<void> {
  await fetch("/api/messages", { method: "DELETE" });
}
