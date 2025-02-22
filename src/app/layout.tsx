import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/Components/Navbar";
import AnimatedBackground from "@/Components/Layout/AnimatedBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "Your personal AI assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <AnimatedBackground />
        <Navbar />
        {children}
  
      </body>
    </html>
  );
}
