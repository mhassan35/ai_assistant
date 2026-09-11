"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaPaperPlane, FaTrash } from "react-icons/fa";
import { streamChatResponse } from "@/lib/chat-client";
import { clearMessagesApi, fetchMessages } from "@/lib/api-client";
import { detectSafetyLevel, SAFETY_MESSAGES } from "@/lib/emergency";
import { ChatMessage, isChatMessage, UIMessage } from "@/lib/types";
import MessageBubble from "@/Components/Chat/MessageBubble";

const SUGGESTED_PROMPTS = [
  "What can I do to sleep better tonight?",
  "Suggest a beginner-friendly workout routine",
  "What are good everyday sources of protein?",
  "Give me a few tips for managing daily stress",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastContentRef = useRef<string | null>(null);

  useEffect(() => {
    fetchMessages()
      .then(setMessages)
      .finally(() => setIsHistoryLoading(false));
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const runRequest = useCallback(async (content: string) => {
    setError(null);
    setIsLoading(true);
    lastContentRef.current = content;

    const controller = new AbortController();
    abortRef.current = controller;

    let assistantIndex = -1;
    setMessages((prev) => {
      assistantIndex = prev.length;
      return [...prev, { role: "model", content: "" }];
    });

    try {
      await streamChatResponse(content, (chunk) => {
        setMessages((prev) => {
          const next = [...prev];
          const target = next[assistantIndex];
          if (target && isChatMessage(target) && target.role === "model") {
            next[assistantIndex] = { ...target, content: target.content + chunk };
          }
          return next;
        });
      }, controller.signal);
    } catch (err) {
      if (controller.signal.aborted) return;
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
      setMessages((prev) => {
        const target = prev[assistantIndex];
        if (target && isChatMessage(target) && target.role === "model" && target.content === "") {
          return prev.filter((_, i) => i !== assistantIndex);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setInput("");
      const userMessage: ChatMessage = { role: "user", content: trimmed };
      const safetyLevel = detectSafetyLevel(trimmed);

      setMessages((prev) => {
        const next: UIMessage[] = [...prev, userMessage];
        if (safetyLevel !== "none") {
          next.push({ role: "safety", level: safetyLevel, content: SAFETY_MESSAGES[safetyLevel] });
        }
        return next;
      });

      void runRequest(trimmed);
    },
    [isLoading, runRequest]
  );

  const handleRetry = useCallback(() => {
    if (lastContentRef.current) void runRequest(lastContentRef.current);
  }, [runRequest]);

  const handleClear = useCallback(async () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    await clearMessagesApi();
  }, []);

  return (
    <section className="min-h-screen px-4 pb-8 pt-24">
      <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-3xl flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
              <FaHeartbeat className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">AI Health Assistant</h1>
              <p className="text-xs text-slate-400">General guidance, not a diagnosis</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 transition-colors hover:border-red-500/30 hover:text-red-300"
            >
              <FaTrash className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <div ref={scrollRef} className="chat-scroll flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
            {isHistoryLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">Loading...</div>
            ) : messages.length === 0 ? (
              <EmptyState onPick={sendMessage} />
            ) : (
              messages.map((message, index) => <MessageBubble key={index} message={message} />)
            )}
          </div>

          {error && (
            <div className="mx-4 mb-2 flex items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200 sm:mx-6">
              <span>{error}</span>
              <button
                onClick={handleRetry}
                className="shrink-0 rounded-md border border-red-400/40 px-2.5 py-1 text-xs font-medium hover:bg-red-500/20"
              >
                Retry
              </button>
            </div>
          )}

          <div className="border-t border-white/10 p-3 sm:p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="relative"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about nutrition, exercise, sleep, or wellness..."
                disabled={isLoading}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-teal-400 transition-colors hover:text-teal-300 disabled:text-slate-600"
                aria-label="Send message"
              >
                <FaPaperPlane className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 px-1 text-[11px] text-slate-500">
              Not a substitute for professional medical advice. In an emergency, call your local emergency number.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full flex-col items-center justify-center px-4 py-10 text-center"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-300">
        <FaHeartbeat className="h-6 w-6" />
      </div>
      <h2 className="text-base font-medium text-white">How can I help with your health today?</h2>
      <p className="mt-1.5 max-w-sm text-sm text-slate-400">
        Ask about nutrition, fitness, sleep, or general wellness. For urgent symptoms, contact emergency services.
      </p>
      <div className="mt-6 grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPick(prompt)}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left text-xs text-slate-300 transition-colors hover:border-teal-500/40 hover:bg-teal-500/10 hover:text-teal-100"
          >
            {prompt}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
