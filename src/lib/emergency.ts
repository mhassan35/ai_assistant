const CRISIS_KEYWORDS = [
  "suicide",
  "suicidal",
  "kill myself",
  "want to die",
  "end my life",
  "self harm",
  "self-harm",
  "hurting myself",
];

const EMERGENCY_KEYWORDS = [
  "chest pain",
  "can't breathe",
  "cannot breathe",
  "trouble breathing",
  "severe bleeding",
  "heart attack",
  "stroke",
  "unconscious",
  "unresponsive",
  "seizure",
  "overdose",
  "anaphylaxis",
  "allergic reaction",
  "severe allergic",
  "choking",
  "poisoning",
  "not breathing",
];

export type SafetyLevel = "none" | "emergency" | "crisis";

export function detectSafetyLevel(text: string): SafetyLevel {
  const lower = text.toLowerCase();
  if (CRISIS_KEYWORDS.some((k) => lower.includes(k))) return "crisis";
  if (EMERGENCY_KEYWORDS.some((k) => lower.includes(k))) return "emergency";
  return "none";
}

export const SAFETY_MESSAGES: Record<Exclude<SafetyLevel, "none">, string> = {
  emergency:
    "This may describe a medical emergency. If you or someone else is in immediate danger, call your local emergency number (e.g. 911) or go to the nearest emergency room right now.",
  crisis:
    "If you are thinking about harming yourself, please reach out for immediate support. In the US, call or text 988 (Suicide & Crisis Lifeline), available 24/7. If you're outside the US, contact your local crisis line or emergency number. You are not alone.",
};
