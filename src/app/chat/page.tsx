'use client';

import { useState } from 'react';
import { FiSearch, FiPlus, FiSettings, FiShare, FiMic} from 'react-icons/fi';
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

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <div className="w-80 bg-slate-900 p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <FaRobot className="text-2xl text-blue-400" />
          <h1 className="text-xl font-semibold text-white">DevAssist</h1>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 mb-4 flex items-center justify-center gap-2">
          <FiPlus /> New Chat
        </button>

        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-slate-800 text-white rounded-lg pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer mb-2"
            >
              <h3 className="text-white text-sm truncate">{chat.title}</h3>
              <p className="text-gray-400 text-xs">{chat.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end p-4 gap-4">
          <button className="p-2 hover:bg-slate-200 rounded-full">
            <FiSettings className="text-xl text-slate-600" />
          </button>
          <button className="p-2 hover:bg-slate-200 rounded-full">
            <FiShare className="text-xl text-slate-600" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FaRobot className="text-6xl text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome to DevAssist</h2>
            <p className="text-slate-600 mb-8">Your Coding AI Assistant</p>
            
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
              {['Debug your code', 'Learn new concepts', 'Get best practices'].map((text, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-sm text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-3xl mx-auto relative">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full p-4 pr-24 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-2 top-2 flex gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-full">
                <FiMic className="text-xl text-slate-600" />
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2">
                <RiSendPlaneFill className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}