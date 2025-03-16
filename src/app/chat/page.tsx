'use client'
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaHeartbeat } from 'react-icons/fa';

interface Message {
  text: string;
  isAi: boolean;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    setMessages([{
      text: "Hello! I'm your Health & Fitness Assistant. I can help you with diet planning, workout recommendations, and general wellness advice. How can I support your health journey today?",
      isAi: true
    }]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAIResponse = async (userInput: string) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) throw new Error('AI response failed');

      const reader = response.body?.getReader();
      let aiResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = new TextDecoder().decode(value);
          aiResponse += chunk;
          
          setMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[newMessages.length - 1]?.isAi) {
              newMessages[newMessages.length - 1].text = aiResponse;
            } else {
              newMessages.push({ text: aiResponse, isAi: true });
            }
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting. Please try again.", 
        isAi: true 
      }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isAi: false }]);
    setInput('');
    setIsLoading(true);

    await generateAIResponse(userMessage);
    setIsLoading(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f1117] to-[#1a1c2b] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaHeartbeat className="text-4xl text-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Health & Fitness </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400">
                Assistant
              </span>
            </h1>
          </div>
          <p className="text-gray-400">Your personal guide to health, nutrition, and fitness</p>
        </motion.div>

        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl border border-gray-700/50">
          <div 
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.isAi 
                    ? 'bg-white/10 text-gray-100' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                }`}>
                  {message.text}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5 bg-white/10 rounded-2xl px-4 py-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                    style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                    style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                    style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-700/50 p-4">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about diet, exercise, or wellness..."
                className="w-full bg-white/10 text-white rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-purple-400 hover:text-white disabled:text-gray-500"
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;