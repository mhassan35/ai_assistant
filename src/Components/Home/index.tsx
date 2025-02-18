'use client'
import HeroSection from './HeroSection'
import AIChatDemo from './AIChatDemo'
import FeaturesSection from './FeaturesSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-gray-100">
      <HeroSection />
      <AIChatDemo />
      <FeaturesSection />
    </main>
  )
}