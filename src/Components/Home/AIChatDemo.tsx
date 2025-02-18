export default function AIChatDemo() {
  return (
    <div className="mt-12 sm:mt-16 relative animate-slideUp">
      <div className="bg-[#121212] rounded-lg p-4 sm:p-6 shadow-xl border border-gray-800 hover:border-gray-700 transition-all duration-300">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4 bg-[#1A1A1A] rounded-lg p-3">
              <p className="text-sm sm:text-base">How can I help you today?</p>
            </div>
          </div>
          <div className="flex items-start justify-end">
            <div className="mr-4 bg-indigo-600/20 rounded-lg p-3">
              <p className="text-sm sm:text-base">Can you help me with my project?</p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 