'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedChatDemo from './AnimatedChatDemo';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
};

// Component for CTA buttons
const CTAButtons = () => (
  <motion.div 
    className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
    {...fadeInUp}
    transition={{ delay: 0.3, duration: 0.6 }}
  >
    <Link 
      href="/signup" 
      className="group inline-flex items-center px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
    >
      Get Started Free
      <svg className="ml-2 -mr-1 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
    <Link 
      href="/login" 
      className="inline-flex items-center px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-purple-500/50"
    >
      Login
    </Link>
  </motion.div>
);

// Component for trust indicators
const TrustIndicators = () => (
  <motion.div 
    className="mt-8 md:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.6 }}
  >
    <TrustBadge icon="⭐" text="5/5 Rating" color="text-yellow-400" />
    <TrustBadge icon="🛡️" text="Secure & Private" color="text-blue-400" />
    <TrustBadge icon="✓" text="24/7 Support" color="text-green-400" />
  </motion.div>
);

// Component for trust badge
const TrustBadge = ({ icon, text, color }: { icon: string; text: string; color: string }) => (
  <div className="flex items-center space-x-2">
    <span className={`${color} text-base md:text-xl`}>{icon}</span>
    <span className="text-gray-300 text-sm md:text-base">{text}</span>
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div 
            className="text-center lg:text-left"
            {...fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transform Your Work with
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400">
                AI Assistant
              </span>
            </h1>
            
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Experience the future of productivity with our AI-powered assistant. 
              Get instant answers, automate tasks, and achieve more in less time.
            </p>

            <CTAButtons />
            <TrustIndicators />
          </motion.div>

          {/* Right column - Interactive Demo/Animation */}
          <motion.div 
            className="relative lg:block"
            {...fadeInRight}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <AnimatedChatDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;