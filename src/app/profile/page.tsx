"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaShieldAlt, FaTrash, FaUserCircle } from "react-icons/fa";
import { clearMessagesApi, clearProfileApi, fetchProfile, saveProfile } from "@/lib/api-client";
import { EMPTY_PROFILE, HealthProfile } from "@/lib/types";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50";
const labelClass = "mb-1.5 block text-xs font-medium text-slate-400";

export default function ProfilePage() {
  const [profile, setProfile] = useState<HealthProfile>(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  const update = (field: keyof HealthProfile) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const updated = await saveProfile(profile);
      setProfile(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleClearProfile = async () => {
    if (!confirm("Clear your saved health profile?")) return;
    const updated = await clearProfileApi();
    setProfile(updated);
  };

  const handleClearHistory = async () => {
    if (!confirm("Clear your saved chat history?")) return;
    await clearMessagesApi();
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center px-4 pt-16">
        <p className="text-sm text-slate-500">Loading your profile...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 pb-16 pt-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
            <FaUserCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Health Profile</h1>
            <p className="text-xs text-slate-400">Personalizes your assistant&apos;s guidance and is tied to your account.</p>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">Name</label>
              <input id="name" className={inputClass} placeholder="Optional" value={profile.name} onChange={update("name")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="age">Age</label>
              <input id="age" type="number" min={0} max={120} className={inputClass} placeholder="e.g. 28" value={profile.age} onChange={update("age")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="sex">Sex</label>
              <select id="sex" className={inputClass} value={profile.sex} onChange={update("sex")}>
                <option value="">Prefer not to say</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="activityLevel">Activity level</label>
              <select id="activityLevel" className={inputClass} value={profile.activityLevel} onChange={update("activityLevel")}>
                <option value="">Not set</option>
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly active</option>
                <option value="moderate">Moderately active</option>
                <option value="active">Very active</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="heightCm">Height (cm)</label>
              <input id="heightCm" type="number" min={0} max={300} className={inputClass} placeholder="e.g. 170" value={profile.heightCm} onChange={update("heightCm")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="weightKg">Weight (kg)</label>
              <input id="weightKg" type="number" min={0} max={400} className={inputClass} placeholder="e.g. 65" value={profile.weightKg} onChange={update("weightKg")} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="goal">Primary goal</label>
              <select id="goal" className={inputClass} value={profile.goal} onChange={update("goal")}>
                <option value="">Not set</option>
                <option value="weight_loss">Weight loss</option>
                <option value="weight_gain">Weight gain</option>
                <option value="maintenance">Maintain weight</option>
                <option value="general_wellness">General wellness</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="conditions">Known conditions or allergies</label>
              <textarea
                id="conditions"
                rows={3}
                className={inputClass}
                placeholder="e.g. lactose intolerant, mild asthma (optional)"
                value={profile.conditions}
                onChange={update("conditions")}
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-xs text-teal-300">
                <FaCheck className="h-3 w-3" /> Saved
              </span>
            )}
            {profile.updatedAt && !saved && (
              <span className="text-xs text-slate-500">
                Last updated {new Date(profile.updatedAt).toLocaleString()}
              </span>
            )}
          </div>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
            <FaShieldAlt className="h-4 w-4 text-slate-400" />
            Data & privacy
          </div>
          <p className="mb-4 text-xs leading-relaxed text-slate-400">
            Your profile and chat history are saved to your account so they follow you across devices. Profile
            details are sent to the AI model only as context with your own messages, to personalize responses.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 transition-colors hover:border-red-500/30 hover:text-red-300"
            >
              <FaTrash className="h-3 w-3" /> Clear chat history
            </button>
            <button
              onClick={handleClearProfile}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 transition-colors hover:border-red-500/30 hover:text-red-300"
            >
              <FaTrash className="h-3 w-3" /> Clear profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
