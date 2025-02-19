import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

const AIChatDemo = () => {
  const [typedText, setTypedText] = useState('');
  const [showFirstMessage, setShowFirstMessage] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showResponseTyping, setShowResponseTyping] = useState(false);

  const textToType = "Can you help me?";
  
  useEffect(() => {
    let currentIndex = 0;
    // Type out the first message
    const typingInterval = setInterval(() => {
      if (currentIndex < textToType.length) {
        setTypedText(textToType.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowFirstMessage(true);
        
        // Show AI typing indicator
        setTimeout(() => {
          setShowResponseTyping(true);
        }, 1000);

        // Show AI response
        setTimeout(() => {
          setShowResponseTyping(false);
          setShowResponse(true);
        }, 3000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto rounded-2xl p-6 backdrop-blur-sm border border-purple-500/20">
      <div className="space-y-6">
        {/* User Message First */}
        <div className="flex items-start justify-end">
          <div className="flex items-start space-x-4">
            <div>
              <div className="bg-gray-800 rounded-2xl rounded-tr-none p-4 text-gray-300">
                {typedText}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
              <FaUser className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex items-start justify-start">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
              AI
            </div>
            <div>
              {showResponseTyping && (
                <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-gray-300 border border-purple-500/20">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              {showResponse && (
                <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-gray-300 border border-purple-500/20">
                  Of course! I'm here to assist you. What would you like help with?
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatDemo; 