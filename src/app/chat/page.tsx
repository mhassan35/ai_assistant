'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiPlus, FiSettings, FiMenu, FiTrash2, FiX } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaRobot } from 'react-icons/fa';

interface ChatHistory {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatPage() {
  // Remove dummy data and start with empty states
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close sidebar on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load messages when chat is selected
  useEffect(() => {
    if (currentChatId) {
      const currentChat = chatHistory.find(chat => chat.id === currentChatId);
      if (currentChat) {
        setMessages(currentChat.messages);
      }
    }
  }, [currentChatId, chatHistory]);

  // Improved search functionality
  const filteredHistory = chatHistory.filter(chat => {
    const searchLower = searchQuery.toLowerCase();
    return (
      chat.title.toLowerCase().includes(searchLower) ||
      chat.messages.some(msg => 
        msg.content.toLowerCase().includes(searchLower)
      )
    );
  });

  // Update handleNewChat
  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatHistory = {
      id: newChatId,
      title: "New Conversation",
      date: "Today",
      messages: []
    };
    setChatHistory(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([]);
    setIsSidebarOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  // Update sendMessage function
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Create new chat if none exists
    let chatId = currentChatId;
    if (!chatId) {
      chatId = Date.now().toString();
      const newChat: ChatHistory = {
        id: chatId,
        title: inputMessage.slice(0, 30) + "...",
        date: "Today",
        messages: []
      };
      setChatHistory(prev => [newChat, ...prev]);
      setCurrentChatId(chatId);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    // Update messages immediately
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      
      // Update chat history with both messages
      setChatHistory(prevHistory => 
        prevHistory.map(chat => 
          chat.id === chatId
            ? {
                ...chat,
                messages: finalMessages
              }
            : chat
        )
      );

    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I couldn't process your message. Please try again.",
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => {
        const newMessages = [...prev, errorMessage];
        // Update chat history with error message
        setChatHistory(prevHistory => 
          prevHistory.map(chat => 
            chat.id === chatId
              ? { ...chat, messages: newMessages }
              : chat
          )
        );
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update chat deletion to handle messages
  const handleDeleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  // Add persistence with localStorage
  useEffect(() => {
    // Load chat history from localStorage on mount
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Add this function before the SettingsMenu component
  const clearAllChats = () => {
    setChatHistory([]);
    setMessages([]);
    setCurrentChatId(null);
    setIsSettingsOpen(false);
  };

  // Settings Menu
  const SettingsMenu = () => (
    <div className="absolute top-12 right-0 bg-slate-800 rounded-lg shadow-lg p-2 z-50">
      <button 
        onClick={() => {
          clearAllChats();
        }}
        className="flex items-center gap-2 text-red-400 hover:bg-slate-700 p-2 rounded w-full"
      >
        <FiTrash2 /> Clear All Chats
      </button>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden mt-16">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-[70px] left-2 z-40 p-2.5 bg-slate-900 rounded-lg text-gray-300 shadow-lg"
      >
        <FiMenu className="text-lg" />
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-16 bottom-0 left-0 z-30
        w-[280px] sm:w-80 bg-[#020617]/95 p-3 sm:p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        lg:transform-none overflow-hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handleNewChat}
            className="flex-1 bg-purple-700 hover:bg-purple-800 text-gray-300 rounded-lg p-2.5 flex items-center justify-center gap-2"
          >
            <FiPlus /> New Chat
          </button>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden ml-2 p-2.5 hover:bg-slate-800 rounded-lg"
          >
            <FiX className="text-gray-300" />
          </button>
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-[#161f2f] text-gray-300 rounded-lg pl-9 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
          {filteredHistory.map((chat) => (
            <div
              key={chat.id}
              className={`group p-2.5 hover:bg-slate-800 rounded-lg cursor-pointer flex items-center justify-between ${
                currentChatId === chat.id ? 'bg-slate-800' : ''
              }`}
              onClick={() => {
                setCurrentChatId(chat.id);
                setIsSidebarOpen(false);
              }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-300 text-sm truncate">{chat.title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{chat.date}</p>
                {chat.messages.length > 0 && (
                  <p className="text-gray-500 text-xs mt-1 truncate">
                    {chat.messages[chat.messages.length - 1].content}
                  </p>
                )}
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-700 rounded"
              >
                <FiTrash2 className="text-red-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full">
        <div className="flex justify-end p-2 sm:p-4 gap-2 relative">
          <button 
            className="p-1.5 sm:p-2 hover:bg-purple-700 rounded-full"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <FiSettings className="text-lg sm:text-xl text-gray-300" />
          </button>
          {isSettingsOpen && <SettingsMenu />}
        </div>

        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar"
        >
          {messages.length === 0 && !searchQuery && chatHistory.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center w-full max-w-[90%] sm:max-w-[80%]">
                <FaRobot className="text-4xl sm:text-6xl text-purple-700 mx-auto mb-3 sm:mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-300 mb-2">Welcome to HealthAssist</h2>
                <p className="text-sm sm:text-base text-purple-400 mb-6 sm:mb-8">Your Personal Health AI Assistant</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto px-2 sm:px-4">
                  {['Track your health', 'Get wellness tips', 'Monitor symptoms'].map((text, i) => (
                    <div 
                      key={i} 
                      className="bg-gray-300 p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setInputMessage(text)}
                    >
                      <p className="text-xs sm:text-sm text-[#020617]/95">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-purple-700 text-white'
                        : 'bg-gray-300 text-[#020617]'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-2 sm:p-4 md:p-6">
          <div className="max-w-3xl mx-auto relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about your health..."
              className="w-full p-2.5 sm:p-3 md:p-4 pr-16 sm:pr-24 rounded-xl focus:outline-none bg-gray-300 text-sm text-[#030819] placeholder:text-[#030819] sm:text-base"
            />
            <button 
              className={`absolute right-1.5 top-1/2 -translate-y-1/2 bg-purple-700 text-gray-300 rounded-full p-1.5 sm:p-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-800'
              }`}
              onClick={sendMessage}
              disabled={isLoading}
            >
              <RiSendPlaneFill className="text-lg sm:text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-x-0 top-16 min-h-screen bottom-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}