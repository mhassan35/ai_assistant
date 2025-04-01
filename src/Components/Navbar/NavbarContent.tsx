'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaEnvelope, FaBars, FaPencilAlt, FaQuestionCircle , FaHeartbeat} from 'react-icons/fa';
import MobileSidebar from './MobileSidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { href: '/chat', icon: <FaEnvelope className="w-5 h-5" />, label: 'Chat' },
    { href: '/plan-generator', icon: <FaPencilAlt className="w-5 h-5" />, label: 'Plan Generator' },
    { href: '/health-assistant', icon: <FaHeartbeat className="w-5 h-5" />, label: 'Health Assistant' },
    { href: '/help', icon: <FaQuestionCircle className="w-5 h-5" />, label: 'Help' }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/95 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
            <div className="flex items-center space-x-4">
              <FaRobot className="w-8 h-8 text-purple-400" />
              <span id='logo-nav' className="text-2xl font-bold bg-purple-400  bg-clip-text text-transparent">
                AI Assistant
              </span>
            </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-7">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center space-x-2"
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
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        menuItems={menuItems}
      />
    </>
  );
};

export default Navbar;