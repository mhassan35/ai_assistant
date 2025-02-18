'use client'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#020617] overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#020617] animate-gradient-slower" />
      </div>

      {/* Main content */}
      <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Auth buttons */}
          <div className="flex justify-end gap-4 mb-16">
            <Link 
              href="/login"
              className="group px-4 py-2 text-sm font-medium rounded-lg text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 transition-all duration-500 hover:bg-gray-800/50"
            >
              <span className="relative">
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-500 group-hover:w-full transition-all duration-500" />
              </span>
            </Link>
            <Link 
              href="/signup"
              className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-700 transition-all duration-500 shadow-lg shadow-black/40 border border-gray-700 hover:border-gray-600"
            >
              Sign Up
            </Link>
          </div>

          {/* Hero content */}
          <div className="text-center max-w-4xl mx-auto animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="block mb-2 text-gray-200">Your Personal</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent animate-gradient-slower">
                AI Assistant
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
              Experience the future of productivity with our AI-powered assistant. 
              Get instant answers, creative solutions, and intelligent assistance 
              available to you 24/7.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/try-now"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 hover:from-blue-800 hover:via-blue-700 hover:to-blue-800 transition-all duration-500 shadow-lg shadow-black/30"
              >
                Try For Free
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-gray-300 border border-gray-700 hover:border-gray-600 hover:text-white transition-all duration-500"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 