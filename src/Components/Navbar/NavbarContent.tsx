'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHeartbeat, FaComments, FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/lib/auth-context';
import MobileSidebar from './MobileSidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const menuItems = [
    { href: '/chat', icon: <FaComments className="w-5 h-5" />, label: 'AI Assistant' },
    { href: '/profile', icon: <FaUserCircle className="w-5 h-5" />, label: 'Health Profile' },
  ];

  const handleLogout = async () => {
    await logout();
    setIsSidebarOpen(false);
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-3">
                <FaHeartbeat className="w-7 h-7 text-teal-400" />
                <span id="logo-nav" className="text-xl font-bold text-white">
                  Health<span className="text-teal-400">AI</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-teal-400 transition-colors duration-300 flex items-center space-x-2 text-sm font-medium"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              {!loading && (
                user ? (
                  <div className="flex items-center space-x-4 pl-2 border-l border-white/10">
                    <span className="text-xs text-gray-400 max-w-[140px] truncate">{user.email}</span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-1.5 text-gray-300 hover:text-red-300 transition-colors duration-300 text-sm font-medium"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 pl-2 border-l border-white/10">
                    <Link href="/login" className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm font-medium">
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="rounded-lg bg-gradient-to-r from-teal-600 to-sky-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                    >
                      Sign up
                    </Link>
                  </div>
                )
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                aria-label="Open menu"
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
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
