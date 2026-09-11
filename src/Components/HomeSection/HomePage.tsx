'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import AnimatedChatDemo from './AnimatedChatDemo';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
};

const CTAButtons = () => {
  const { user, loading } = useAuth();
  const primaryHref = loading ? "/chat" : user ? "/chat" : "/signup";
  const secondaryHref = loading ? "/profile" : user ? "/profile" : "/login";

  return (
    <motion.div
      className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
      {...fadeInUp}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <Link
        href={primaryHref}
        className="group inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium text-white bg-gradient-to-r from-teal-600 to-sky-600 rounded-lg transition-all duration-300 hover:from-teal-500 hover:to-sky-500 hover:scale-[1.02] shadow-lg shadow-teal-500/10"
      >
        {user ? "Start Chatting" : "Get Started Free"}
        <svg className="ml-2 -mr-1 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
      <Link
        href={secondaryHref}
        className="inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-medium text-white bg-white/5 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-teal-500/40"
      >
        {user ? "Set Up Your Profile" : "Sign In"}
      </Link>
    </motion.div>
  );
};

const TrustIndicators = () => (
  <motion.div
    className="mt-8 md:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.6 }}
  >
    <TrustBadge icon="🔒" text="Your data is private to your account" />
    <TrustBadge icon="⚡" text="Powered by Google Gemini" />
    <TrustBadge icon="⚕️" text="Not a substitute for medical care" />
  </motion.div>
);

const TrustBadge = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center space-x-2">
    <span className="text-base md:text-lg">{icon}</span>
    <span className="text-gray-400 text-xs md:text-sm">{text}</span>
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center lg:text-left"
            {...fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Clear guidance for
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-400 to-blue-400">
                a healthier you
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              HealthAI is your personal AI health assistant &mdash; ask about nutrition, fitness, sleep, and
              wellness, and get clear, practical guidance personalized to you.
            </p>

            <CTAButtons />
            <TrustIndicators />
          </motion.div>

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
