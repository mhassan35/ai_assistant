import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Chat Message Component
interface ChatMessageProps {
  isAi: boolean;
  message: string;
  isTyping?: boolean;
}

const ChatMessage = ({ isAi, message, isTyping = false }: ChatMessageProps) => {
  return (
    <div className={`flex items-start gap-4 ${!isAi ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
        isAi ? 'bg-blue-500' : 'bg-purple-500'
      }`}>
        <span className="text-white text-xs">{isAi ? 'AI' : 'U'}</span>
      </div>
      <motion.div 
        className={`relative max-w-[80%] ${
          isAi 
            ? 'bg-white/10 rounded-[20px] rounded-tl-none' 
            : 'bg-purple-500/30 rounded-[20px] rounded-tr-none'
        } px-4 py-3`}
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

// Typing Animation Component
const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-2 px-4 py-3">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-white/50 rounded-full"
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
    text: "How can you help me with my business?",
    isAi: false,
    delay: 1000
  },
  {
    text: "I can assist you with various aspects of your business",
    isAi: true,
    delay: 2000
  },
  {
    text: "Can you give me a specific example?",
    isAi: false,
    delay: 2000
  },
  {
    text: "I can help analyze your customer data to identify real-time insights for better decision-making.",
    isAi: true,
    delay: 2000
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
          }, 1500);
        } else {
          setVisibleMessages(prev => prev + 1);
        }
      }, messages[visibleMessages].delay);

      return () => clearTimeout(timer);
    }
  }, [visibleMessages]);

  return (
    <motion.div
      className="relative w-full h-[500px] bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl backdrop-blur-sm border border-white/10 p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Window controls */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      {/* Chat messages */}
      <div className="mt-8 space-y-4 max-h-[380px] overflow-y-auto">
        {messages.slice(0, visibleMessages).map((message, index) => (
          <ChatMessage
            key={index}
            isAi={message.isAi}
            message={message.text}
          />
        ))}
        {isTyping && (
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0" />
            <div className="bg-white/10 rounded-lg">
              <TypingAnimation />
            </div>
          </div>
        )}
      </div>

      {/* Input field */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/10 rounded-lg p-4 border border-white/10">
          <div className="flex items-center">
            <div className="flex-grow bg-white/10 h-6 rounded"></div>
            <button className="ml-4 w-8 h-8 rounded-full bg-purple-500/50 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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