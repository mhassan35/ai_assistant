import Link from 'next/link';
import { FaHeartbeat } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#020617]/80 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <FaHeartbeat className="w-5 h-5 text-teal-400" />
            <span className="font-semibold text-white">Health<span className="text-teal-400">AI</span></span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <Link href="/chat" className="hover:text-teal-400 transition-colors">AI Assistant</Link>
            <Link href="/profile" className="hover:text-teal-400 transition-colors">Health Profile</Link>
          </nav>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-gray-500 max-w-3xl">
          HealthAI provides general health and wellness information powered by AI. It does not provide medical
          advice, diagnosis, or treatment, and is not a substitute for professional care. If you have a medical
          emergency, call your local emergency number immediately.
        </p>

        <div className="mt-6 pt-6 border-t border-white/10 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} HealthAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
