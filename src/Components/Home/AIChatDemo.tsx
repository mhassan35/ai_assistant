import { useEffect, useState } from 'react';

export default function AIChatDemo() {
  const [showFirstMessage, setShowFirstMessage] = useState(false);
  const [userMessageText, setUserMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMessageText, setAiMessageText] = useState('');
  const [showAiMessage, setShowAiMessage] = useState(false);

  const aiResponse = "How can I help you today?";
  const userMessage = "Can you help me with my project?";

  const typeText = async (text: string, setTextFunction: (text: string) => void) => {
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => {
        const delay = text[i - 1] === '?' ? 400 : Math.random() * 70 + 30;
        setTimeout(resolve, delay);
      });
      setTextFunction(text.slice(0, i));
    }
  };

  useEffect(() => {
    const startChatAnimation = async () => {
      setShowFirstMessage(true);
      await new Promise(resolve => setTimeout(resolve, 400));
      await typeText(userMessage, setUserMessageText);
      
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setIsTyping(false);
      setShowAiMessage(true);
      await typeText(aiResponse, setAiMessageText);
    };

    startChatAnimation();
  }, []);

  return (
    <div className="mt-12 sm:mt-16 relative">
      <div className="bg-[#121212] rounded-lg p-4 sm:p-6 shadow-xl border border-gray-800 hover:border-gray-700 transition-all duration-300">
        <div className="space-y-4">
          {/* User message */}
          <div className={`flex items-start justify-end transition-all duration-700 ease-in-out ${
            showFirstMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <div className="mr-4 bg-indigo-600/20 rounded-lg p-3">
              <p className="text-sm sm:text-base min-h-[1.5rem]">
                {userMessageText}
                {showFirstMessage && userMessageText !== userMessage && (
                  <span className="inline-block w-1 h-4 ml-1 bg-indigo-400 animate-cursor"/>
                )}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-purple-500/20">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z" fill="currentColor"/>
                <path d="M18 16.5C18 17.6046 17.1046 18.5 16 18.5H8C6.89543 18.5 6 17.6046 6 16.5C6 13.1863 8.68629 10.5 12 10.5C15.3137 10.5 18 13.1863 18 16.5Z" fill="currentColor" fillOpacity="0.9"/>
              </svg>
            </div>
          </div>

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start animate-fadeIn">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg ring-2 ring-cyan-500/20">
                <svg className="w-6 h-6 text-white animate-spin-slow" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <path d="M12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
                </svg>
              </div>
              <div className="ml-4 bg-[#1A1A1A] rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}

          {/* AI Response */}
          <div className={`flex items-start transition-all duration-700 ease-in-out ${
            showAiMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg ring-2 ring-cyan-500/20">
              <svg className="w-6 h-6 text-white animate-spin-slow" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
              </svg>
            </div>
            <div className="ml-4 bg-[#1A1A1A] rounded-lg p-3">
              <p className="text-sm sm:text-base min-h-[1.5rem]">
                {aiMessageText}
                {showAiMessage && aiMessageText !== aiResponse && (
                  <span className="inline-block w-1 h-4 ml-1 bg-blue-400 animate-cursor"/>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 