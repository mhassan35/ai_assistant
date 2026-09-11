import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import AnimatedBackground from "@/Components/Layout/AnimatedBackground";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Your Health Assistant",
  description:
    "Get clear, general guidance on nutrition, fitness, sleep, and wellness from an AI health assistant. Not a substitute for professional medical advice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <AuthProvider>
          <Analytics />
          <AnimatedBackground />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
