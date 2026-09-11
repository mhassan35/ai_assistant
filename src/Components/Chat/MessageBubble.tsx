import { motion } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { FaExclamationTriangle, FaRobot, FaUser } from "react-icons/fa";
import { UIMessage } from "@/lib/types";

const TypingDots = () => (
  <div className="flex items-center gap-1.5 px-1 py-1">
    {[0, 1, 2].map((dot) => (
      <span
        key={dot}
        className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
        style={{ animationDelay: `${dot * 150}ms` }}
      />
    ))}
  </div>
);

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-2 leading-relaxed last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  h1: ({ children }) => (
    <p className="mb-1.5 mt-2 text-[15px] font-semibold text-white first:mt-0">{children}</p>
  ),
  h2: ({ children }) => (
    <p className="mb-1.5 mt-2 text-[15px] font-semibold text-white first:mt-0">{children}</p>
  ),
  h3: ({ children }) => (
    <p className="mb-1.5 mt-2 text-sm font-semibold text-white first:mt-0">{children}</p>
  ),
  h4: ({ children }) => (
    <p className="mb-1.5 mt-2 text-sm font-semibold text-white first:mt-0">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal-300 underline underline-offset-2 hover:text-teal-200"
    >
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const text = String(children).replace(/\n$/, "");
    const isBlock = /language-/.test(className || "") || text.includes("\n");
    if (isBlock) {
      return (
        <code className="block overflow-x-auto whitespace-pre rounded-lg bg-black/30 p-3 font-mono text-[13px] leading-relaxed">
          {text}
        </code>
      );
    }
    return <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px]">{text}</code>;
  },
  pre: ({ children }) => <div className="mb-2 last:mb-0">{children}</div>,
  blockquote: ({ children }) => (
    <blockquote className="mb-2 border-l-2 border-white/20 pl-3 italic text-slate-300 last:mb-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-3 border-white/10" />,
};

export default function MessageBubble({ message }: { message: UIMessage }) {
  if (message.role === "safety") {
    const isCrisis = message.level === "crisis";
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
          isCrisis
            ? "border-red-500/40 bg-red-500/10 text-red-100"
            : "border-amber-500/40 bg-amber-500/10 text-amber-100"
        }`}
      >
        <FaExclamationTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${isCrisis ? "text-red-400" : "text-amber-400"}`} />
        <p className="leading-relaxed">{message.content}</p>
      </motion.div>
    );
  }

  const isAi = message.role === "model";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isAi ? "justify-start" : "flex-row-reverse justify-start"}`}
    >
      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          isAi ? "bg-teal-500/20 text-teal-300" : "bg-sky-500/20 text-sky-300"
        }`}
      >
        {isAi ? <FaRobot className="h-3.5 w-3.5" /> : <FaUser className="h-3.5 w-3.5" />}
      </div>
      <div
        className={`max-w-[80%] break-words rounded-2xl px-4 py-2.5 text-sm ${
          isAi
            ? "rounded-tl-sm bg-white/[0.06] text-slate-100 border border-white/10"
            : "rounded-tr-sm bg-gradient-to-br from-teal-600 to-sky-600 text-white whitespace-pre-wrap leading-relaxed"
        }`}
      >
        {isAi ? (
          message.content === "" ? (
            <TypingDots />
          ) : (
            <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {message.content}
            </Markdown>
          )
        ) : (
          message.content
        )}
      </div>
    </motion.div>
  );
}
