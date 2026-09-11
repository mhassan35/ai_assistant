export type ChatRole = "user" | "model";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface SafetyNotice {
  role: "safety";
  level: "emergency" | "crisis";
  content: string;
}

export type UIMessage = ChatMessage | SafetyNotice;

export function isChatMessage(message: UIMessage): message is ChatMessage {
  return message.role === "user" || message.role === "model";
}

export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "";

export type HealthGoal =
  | "weight_loss"
  | "weight_gain"
  | "maintenance"
  | "general_wellness"
  | "";

export interface HealthProfile {
  name: string;
  age: string;
  sex: "female" | "male" | "other" | "";
  heightCm: string;
  weightKg: string;
  activityLevel: ActivityLevel;
  goal: HealthGoal;
  conditions: string;
  updatedAt: string;
}

export const EMPTY_PROFILE: HealthProfile = {
  name: "",
  age: "",
  sex: "",
  heightCm: "",
  weightKg: "",
  activityLevel: "",
  goal: "",
  conditions: "",
  updatedAt: "",
};
