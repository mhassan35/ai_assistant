import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

const AIChatDemo = () => {
  const [typedText, setTypedText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  const conversation = [
    { role: 'user', message: "Hello! Can you help me with coding?" },
    { role: 'assistant', message: "Of course! I'd be happy to help you with coding. What would you like to learn?" },
    { role: 'user', message: "I want to learn Python" },
    { role: 'assistant', message: "Great choice! Python is a beginner-friendly language. Here's a simple example to get started:\n\nprint('Hello, World!')\n\nWould you like to learn more?" }
  ];

  useEffect(() => {
    let currentIndex = 0;
    const currentMessage = conversation[currentStep].message;

    if (conversation[currentStep].role === 'user') {
      // Type out user message
      const typingInterval = setInterval(() => {
        if (currentIndex < currentMessage.length) {
          setTypedText(currentMessage.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setShowTyping(true);
          
          // Show AI response after typing delay
          setTimeout(() => {
            setShowTyping(false);
            setCurrentStep(prev => prev + 1);
          }, 2000);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    } else {
      // For AI responses, show typing first
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setTypedText(currentMessage);
        
        // Move to next step after a delay
        if (currentStep < conversation.length - 1) {
          setTimeout(() => {
            setTypedText('');
            setCurrentStep(prev => prev + 1);
          }, 3000);
        }
      }, 1500);
    }
  }, [currentStep]);

  const renderMessages = () => {
    return conversation.slice(0, currentStep + 1).map((msg, index) => {
      const isLastMessage = index === currentStep;
      const messageText = isLastMessage ? typedText : msg.message;
      
      if (msg.role === 'user') {
        return (
          <div key={index} className="flex items-start justify-end">
            <div className="flex items-start space-x-4">
              <div>
                <div className="bg-gray-800 rounded-2xl rounded-tr-none p-4 text-gray-300">
                  {messageText}
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                <FaUser className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={index} className="flex items-start justify-start">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                AI
              </div>
              <div>
                <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-gray-300 border border-purple-500/20 whitespace-pre-wrap">
                  {messageText}
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto rounded-2xl p-6 backdrop-blur-sm border border-purple-500/20">
      <div className="space-y-6">
        {renderMessages()}
        {showTyping && (
          <div className="flex items-start justify-start">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                AI
              </div>
              <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-gray-300 border border-purple-500/20">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatDemo; 