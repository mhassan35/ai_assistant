import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section with Logo and Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">AI Assistant</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Empowering the future through intelligent conversations and innovative solutions.
            We&apos;re committed to making AI technology accessible and beneficial for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-xl font-semibold mb-6 relative inline-block">
              <span className="after:content-[''] after:block after:w-12 after:h-1 after:bg-blue-500 after:mt-2">
                About Us
              </span>
            </h3>
            <p className="text-sm leading-relaxed">
              Building amazing experiences with cutting-edge AI technology. 
              Our mission is to create intelligent solutions that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-xl font-semibold mb-6 relative inline-block">
              <span className="after:content-[''] after:block after:w-12 after:h-1 after:bg-blue-500 after:mt-2">
                Quick Links
              </span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center justify-center md:justify-start gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center justify-center md:justify-start gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center justify-center md:justify-start gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-xl font-semibold mb-6 relative inline-block">
              <span className="after:content-[''] after:block after:w-12 after:h-1 after:bg-blue-500 after:mt-2">
                Connect With Us
              </span>
            </h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
              >
                <FaTwitter size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} AI Assistant. All rights reserved.
            </p>
            <p className="text-sm flex items-center">
              Made with <FaHeart className="text-red-500 mx-2" /> by Our Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
