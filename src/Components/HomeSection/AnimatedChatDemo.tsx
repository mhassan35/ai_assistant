import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  isAi: boolean;
  message: string;
  isTyping?: boolean;
}

const ChatMessage = ({ isAi, message, isTyping = false }: ChatMessageProps) => {
  return (
    <div className={`flex items-start gap-3 ${!isAi ? 'flex-row-reverse' : ''}`}>
      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
        isAi ? 'bg-teal-500/20 text-teal-300' : 'bg-sky-500/20 text-sky-300'
      }`}>
        <span className="text-xs font-medium">{isAi ? 'AI' : 'U'}</span>
      </div>
      <motion.div
        className={`relative max-w-[80%] ${
          isAi
            ? 'bg-white/[0.06] border border-white/10 rounded-[18px] rounded-tl-sm'
            : 'bg-gradient-to-br from-teal-600 to-sky-600 rounded-[18px] rounded-tr-sm'
        } px-4 py-2.5`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isTyping && isAi ? (
          <TypingAnimation />
        ) : (
          <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
};

const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-1.5 px-1 py-1">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-1.5 h-1.5 bg-white/50 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: dot * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const messages = [
  {
    text: "What's a good way to improve my sleep?",
    isAi: false,
    delay: 800
  },
  {
    text: "A consistent bedtime, less screen time before bed, and a cool, dark room can all help. Want a simple wind-down routine?",
    isAi: true,
    delay: 1800
  },
  {
    text: "Yes please, and a quick dinner idea too",
    isAi: false,
    delay: 1800
  },
  {
    text: "Here's a 15-minute wind-down routine, plus a light, protein-rich dinner idea suited to your goals.",
    isAi: true,
    delay: 1800
  }
];

const AnimatedChatDemo = () => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (visibleMessages < messages.length) {
      const timer = setTimeout(() => {
        if (messages[visibleMessages].isAi) {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setVisibleMessages(prev => prev + 1);
          }, 1200);
        } else {
          setVisibleMessages(prev => prev + 1);
        }
      }, messages[visibleMessages].delay);

      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => setVisibleMessages(0), 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [visibleMessages]);

  return (
    <motion.div
      className="relative w-full h-[440px] sm:h-[480px] bg-white/[0.03] rounded-2xl backdrop-blur-sm border border-white/10 p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
      </div>

      <div className="mt-8 space-y-4 max-h-[320px] overflow-y-auto pr-1">
        {messages.slice(0, visibleMessages).map((message, index) => (
          <ChatMessage
            key={index}
            isAi={message.isAi}
            message={message.text}
          />
        ))}
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-7 h-7 rounded-full bg-teal-500/20 flex-shrink-0" />
            <div className="bg-white/[0.06] border border-white/10 rounded-[18px] rounded-tl-sm">
              <TypingAnimation />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
          <div className="flex items-center">
            <div className="flex-grow bg-white/5 h-5 rounded"></div>
            <button className="ml-3 w-7 h-7 rounded-full bg-teal-500/30 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedChatDemo;
