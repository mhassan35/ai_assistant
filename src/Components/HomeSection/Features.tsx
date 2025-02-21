'use client'
import { motion } from 'framer-motion';
import { FaHeartbeat, FaAppleAlt, FaRunning, FaBrain, FaBed, FaWeight, FaNotesMedical, FaChartLine } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaHeartbeat className="w-10 h-10" />,
      title: "Health Monitoring",
      description: "Track vital signs, heart rate, and overall wellness with AI-powered insights.",
      color: "from-red-500 to-rose-600",
      gradient: "group-hover:bg-gradient-to-br from-red-500/20 to-rose-500/20"
    },
    {
      icon: <FaAppleAlt className="w-10 h-10" />,
      title: "Nutrition Planning",
      description: "Personalized meal plans and dietary recommendations based on your health goals.",
      color: "from-green-500 to-emerald-600",
      gradient: "group-hover:bg-gradient-to-br from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <FaRunning className="w-10 h-10" />,
      title: "Fitness Tracking",
      description: "Custom workout plans and real-time exercise tracking with AI optimization.",
      color: "from-blue-500 to-indigo-600",
      gradient: "group-hover:bg-gradient-to-br from-blue-500/20 to-indigo-500/20"
    },
    {
      icon: <FaBrain className="w-10 h-10" />,
      title: "Mental Wellness",
      description: "Meditation schedules and stress management techniques for mental health.",
      color: "from-purple-500 to-violet-600",
      gradient: "group-hover:bg-gradient-to-br from-purple-500/20 to-violet-500/20"
    },
    {
      icon: <FaBed className="w-10 h-10" />,
      title: "Sleep Analysis",
      description: "Advanced sleep tracking and optimization recommendations for better rest.",
      color: "from-indigo-500 to-blue-600",
      gradient: "group-hover:bg-gradient-to-br from-indigo-500/20 to-blue-500/20"
    },
    {
      icon: <FaWeight className="w-10 h-10" />,
      title: "Weight Management",
      description: "Smart weight tracking and personalized goal-setting with progress insights.",
      color: "from-orange-500 to-amber-600",
      gradient: "group-hover:bg-gradient-to-br from-orange-500/20 to-amber-500/20"
    },
    {
      icon: <FaNotesMedical className="w-10 h-10" />,
      title: "Medical Records",
      description: "Secure storage and management of your health records and medications.",
      color: "from-teal-500 to-cyan-600",
      gradient: "group-hover:bg-gradient-to-br from-teal-500/20 to-cyan-500/20"
    },
    {
      icon: <FaChartLine className="w-10 h-10" />,
      title: "Health Analytics",
      description: "Comprehensive health data analysis and predictive wellness insights.",
      color: "from-pink-500 to-rose-600",
      gradient: "group-hover:bg-gradient-to-br from-pink-500/20 to-rose-500/20"
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            Comprehensive Health & Wellness
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4"
          >
            Transform your health journey with AI-powered insights and personalized recommendations
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`absolute inset-0 rounded-3xl transition-all duration-300 opacity-0 group-hover:opacity-100 ${feature.gradient}`} />
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/20 to-blue-900/20  backdrop-blur-xl p-8 h-full transition-all duration-300 group-hover:-translate-y-2 border border-gray-700/50">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-3 flex items-center justify-center mb-6 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-3">
                  {feature.description}
                </p>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className={`h-0.5 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
