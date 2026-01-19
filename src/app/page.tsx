"use client";

import { Shield } from "lucide-react";
import Link from "next/link";
import {
  Hero,
  LiveDemo,
  FeatureTabs,
  TechStack,
} from "@/components/home/home-components";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SkillBridge
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <TechStack />
        <FeatureTabs />
        <LiveDemo />
      </main>

      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-6 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
