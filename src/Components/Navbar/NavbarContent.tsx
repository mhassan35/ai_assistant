'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaEnvelope, FaBars, FaTimes, FaUtensils, FaDumbbell, FaHeartbeat, FaQuestionCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { href: '/chat', icon: <FaEnvelope className="w-5 h-5" />, label: 'Chat' },
    { href: '/diet-planner', icon: <FaUtensils className="w-5 h-5" />, label: 'Diet Planner' },
    { href: '/fitness-planner', icon: <FaDumbbell className="w-5 h-5" />, label: 'Fitness Planner' },
    { href: '/medical-assistant', icon: <FaHeartbeat className="w-5 h-5" />, label: 'Medical Assistant' },
    { href: '/help', icon: <FaQuestionCircle className="w-5 h-5" />, label: 'Help' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a192f]/95 backdrop-blur-md border-b border-[#64ffda]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <FaRobot className="w-8 h-8 text-[#00ff9d]" />
              <span className="text-2xl font-bold text-[#00ff9d]">
                AI Assistant
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-[#00ff9d] transition-colors duration-300 flex items-center space-x-2"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-gray-300 hover:text-[#00ff9d] transition-colors duration-300"
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 ${
          isSidebarOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/70 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 w-[300px] h-full bg-[#0a192f]/95 backdrop-blur-md p-6 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <FaRobot className="w-8 h-8 text-[#00ff9d]" />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-300 hover:text-[#00ff9d] transition-colors duration-300"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-300 hover:text-[#00ff9d] transition-colors duration-300 flex items-center space-x-3"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;