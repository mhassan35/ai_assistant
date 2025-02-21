'use client';

import { FaRobot, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    href: string;
    icon: React.ReactNode;
    label: string;
  }>;
}

const MobileSidebar = ({ isOpen, onClose, menuItems }: MobileSidebarProps) => {
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
            className="fixed top-0 right-0 w-[300px] h-full bg-gradient-to-b from-[#020617]/95 to-purple-900/20 backdrop-blur-md p-6 z-50 border-l border-purple-500/20"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <FaRobot className="w-8 h-8 text-purple-400" />
                <span className="text-xl font-bold text-purple-400">Menu</span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
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
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-500/10"
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar; 