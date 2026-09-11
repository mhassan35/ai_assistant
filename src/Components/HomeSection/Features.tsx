'use client'
import { motion } from 'framer-motion';
import { FaAppleAlt, FaBrain, FaShieldAlt, FaUserCircle } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaAppleAlt className="w-8 h-8" />,
      title: "Nutrition & Fitness",
      description: "Ask about meals, workouts, and healthy habits and get clear, practical guidance in plain language.",
      color: "from-teal-500 to-emerald-600",
    },
    {
      icon: <FaUserCircle className="w-8 h-8" />,
      title: "Personalized to You",
      description: "Set up a health profile once, and every conversation is tailored to your age, goals, and activity level.",
      color: "from-sky-500 to-blue-600",
    },
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: "Mental Wellness",
      description: "Get support with stress, sleep, and everyday mental wellbeing, delivered with care.",
      color: "from-indigo-500 to-violet-600",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Safety First",
      description: "Built-in guidance for urgent symptoms, with clear reminders that this is not a replacement for medical care.",
      color: "from-rose-500 to-red-600",
    },
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            What HealthAI can help with
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            A focused set of tools built to give you useful, trustworthy health guidance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-3 flex items-center justify-center mb-5 text-white`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
