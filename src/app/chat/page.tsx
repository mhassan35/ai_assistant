'use client';

import { useState } from 'react';
import { FiSearch, FiPlus, FiSettings, FiShare, FiMic, FiMenu } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaRobot } from 'react-icons/fa';

interface ChatHistory {
  title: string;
  date: string;
}

export default function ChatPage() {
  const [chatHistory] = useState<ChatHistory[]>([
    { title: "How to implement Redux in React...", date: "Today" },
    { title: "Best practices for API design...", date: "23rd March, 2024" },
    { title: "Explain Docker containers...", date: "20th March, 2024" },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden mt-16">
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
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className="p-2.5 sm:p-3 hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              <h3 className="text-white text-xs sm:text-sm truncate">{chat.title}</h3>
              <p className="text-gray-400 text-xs mt-0.5">{chat.date}</p>
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
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full p-2.5 sm:p-3 md:p-4 pr-16 sm:pr-24 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 flex gap-1 sm:gap-2">
              <button className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-full hidden sm:block">
                <FiMic className="text-lg sm:text-xl text-slate-600" />
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 sm:p-2">
                <RiSendPlaneFill className="text-lg sm:text-xl" />
              </button>
            </div>
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