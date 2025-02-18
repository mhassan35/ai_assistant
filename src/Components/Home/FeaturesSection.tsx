import React, { JSX } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: '24/7 Availability',
    description: 'Get instant responses and assistance around the clock. Our AI never sleeps and is always ready to help.',
    icon: <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  {
    title: 'Smart Learning',
    description: 'Our AI continuously learns and adapts to provide more accurate and personalized responses over time.',
    icon: <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
  },
  {
    title: 'Multi-task Support',
    description: 'From coding to creative writing, our AI can help with multiple tasks while maintaining context and accuracy.',
    icon: <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative p-5 sm:p-6 bg-[#121212] rounded-lg border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 animate-fadeIn group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <dt>
                <div className="absolute flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-indigo-600 text-white group-hover:bg-indigo-700 transition-colors duration-300">
                  {feature.icon}
                </div>
                <p className="ml-16 text-base sm:text-lg leading-6 font-medium">{feature.title}</p>
              </dt>
              <dd className="mt-2 ml-16 text-sm sm:text-base text-gray-400">{feature.description}</dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 