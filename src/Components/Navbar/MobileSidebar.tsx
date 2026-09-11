'use client';

import { FaHeartbeat, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { AuthUser } from '@/lib/api-client';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    href: string;
    icon: React.ReactNode;
    label: string;
  }>;
  user: AuthUser | null;
  onLogout: () => void;
}

const MobileSidebar = ({ isOpen, onClose, menuItems, user, onLogout }: MobileSidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-[300px] h-full bg-gradient-to-b from-[#020617]/95 to-teal-900/10 backdrop-blur-md p-6 z-50 border-l border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <FaHeartbeat className="w-7 h-7 text-teal-400" />
                <span className="text-xl font-bold text-teal-400">Menu</span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                aria-label="Close menu"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300 flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-500/10"
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              {user ? (
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 truncate px-2">{user.email}</p>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 p-2 rounded-lg text-gray-300 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-300"
                  >
                    <FaSignOutAlt className="w-5 h-5" />
                    <span className="font-medium">Log out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="block w-full text-center p-2 rounded-lg text-gray-300 hover:text-teal-400 hover:bg-teal-500/10 transition-colors duration-300 font-medium"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={onClose}
                    className="block w-full text-center p-2.5 rounded-lg bg-gradient-to-r from-teal-600 to-sky-600 text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
