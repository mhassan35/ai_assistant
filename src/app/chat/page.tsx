'use client';

import { useState } from 'react';
import { FiSearch, FiPlus, FiSettings, FiShare, FiMic, FiMenu } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaRobot } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: "This is a sample AI response. Replace with your actual AI integration.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] mt-16">
      {/* Mobile Menu Button - adjusted for navbar */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-[70px] left-2 z-40 p-2.5 bg-slate-900 rounded-lg text-white shadow-lg"
      >
        <FiMenu className="text-lg" />
      </button>

      {/* Sidebar - adjusted top position */}
      <div className={`
        fixed lg:static top-16 bottom-0 left-0 z-30
        w-[280px] sm:w-80 bg-slate-900 p-3 sm:p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        lg:transform-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2.5 sm:p-3 mb-4 flex items-center justify-center gap-2 text-sm sm:text-base">
          <FiPlus /> New Chat
        </button>

        {/* Search input - adjusted padding and size */}
        <div className="relative mb-4 sm:mb-6">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-slate-800 text-white rounded-lg pl-9 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Chat history - improved spacing */}
        <div className="flex-1 overflow-y-auto space-y-1 sm:space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] md:max-w-[70%] rounded-lg px-4 py-2 ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-100'
                }`}
              >
                <div className="flex flex-col">
                  <p className="text-sm">{message.text}</p>
                  <span className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-200' : 'text-gray-400'
                  }`}>
                    {message.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area - remains mostly the same */}
      <div className="flex-1 flex flex-col w-full">
        <div className="flex justify-end p-2 sm:p-4 gap-2 sm:gap-4">
          <button className="p-1.5 sm:p-2 hover:bg-slate-200 rounded-full">
            <FiSettings className="text-lg sm:text-xl text-slate-600" />
          </button>
          <button className="p-1.5 sm:p-2 hover:bg-slate-200 rounded-full">
            <FiShare className="text-lg sm:text-xl text-slate-600" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-3 sm:p-4">
          <div className="text-center w-full max-w-[90%] sm:max-w-[80%]">
            <FaRobot className="text-4xl sm:text-6xl text-slate-600 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome to DevAssist</h2>
            <p className="text-slate-600 text-sm sm:text-base mb-6 sm:mb-8">Your Coding AI Assistant</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto px-2 sm:px-4">
              {['Debug your code', 'Learn new concepts', 'Get best practices'].map((text, i) => (
                <div key={i} className="bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-xs sm:text-sm text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input area - improved mobile experience */}
        <div className="p-2 sm:p-4 md:p-6">
          <div className="max-w-3xl mx-auto relative">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-offset-gray-900 focus:ring-blue-500
                         transition-colors duration-200"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Overlay - adjusted for navbar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-x-0 top-16 bottom-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}