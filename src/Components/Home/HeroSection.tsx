'use client'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center animate-fadeIn">
          <div className="flex justify-end gap-3 sm:gap-4 mb-8">
            <Link 
              href="/login"
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
            >
              Login
            </Link>
            <Link 
              href="/signup"
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold">
            <span className="block mb-2">Your Personal</span>
            <span className="block text-indigo-500">AI Assistant</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-gray-400 text-sm sm:text-base md:mt-5 md:text-lg lg:text-xl md:max-w-3xl">
            Experience the power of AI-driven conversations. Get instant answers, creative solutions, and intelligent assistance 24/7.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/try-now"
                className="w-full flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
              >
                Try For Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 