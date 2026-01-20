"use client";

import { useState } from "react";
import { PricingCard } from "@/components/pricing/pricing-card";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const [role, setRole] = useState<"dev" | "hr">("dev");

  const devFeatures = {
    demo: [
      { text: "3 AI Analyses per month", included: true },
      { text: "Basic Skill Parsers", included: true },
      { text: "Resume Keyword Check", included: true },
      { text: "Learning Roadmap", included: false },
      { text: "Portfolio Project Ideas", included: false },
      { text: "1-on-1 Mentorship", included: false },
    ],
    career: [
      { text: "Unlimited AI Analyses", included: true },
      { text: "Advanced Skill Parsers", included: true },
      { text: "Resume Keyword Check", included: true },
      { text: "Personalized Roadmap", included: true },
      { text: "Portfolio Project Ideas", included: true },
      { text: "1-on-1 Mentorship", included: false },
    ],
    pro: [
      { text: "Unlimited AI Analyses", included: true },
      { text: "Advanced Skill Parsers", included: true },
      { text: "Resume Keyword Check", included: true },
      { text: "Personalized Roadmap", included: true },
      { text: "Portfolio Project Ideas", included: true },
      { text: "1-on-1 Mentorship", included: true },
    ],
  };

  const hrFeatures = {
    demo: [
      { text: "3 Job Descriptions per month", included: true },
      { text: "Basic Candidate Ranking", included: true },
      { text: "Standard Interview Questions", included: true },
      { text: "Bulk Resume Parsing", included: false },
      { text: "ATS Integration", included: false },
      { text: "Dedicated Account Manager", included: false },
    ],
    career: [
      { text: "Unlimited Job Descriptions", included: true },
      { text: "Advanced Candidate Ranking", included: true },
      { text: "Behavioral & Technical Questions", included: true },
      { text: "Bulk Resume Parsing", included: true },
      { text: "ATS Integration", included: false },
      { text: "Dedicated Account Manager", included: false },
    ],
    pro: [
      { text: "Unlimited Job Descriptions", included: true },
      { text: "Advanced Candidate Ranking", included: true },
      { text: "Behavioral & Technical Questions", included: true },
      { text: "Bulk Resume Parsing", included: true },
      { text: "ATS Integration", included: true },
      { text: "Dedicated Account Manager", included: true },
    ],
  };

  const features = role === "dev" ? devFeatures : hrFeatures;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SkillBridge
            </span>
          </Link>
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

      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            Choose the plan that fits your needs, whether you&apos;re advancing
            your career or building a dream team.
          </p>

          {/* Role Toggle */}
          <div className="inline-flex bg-white dark:bg-gray-800 p-1.5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setRole("dev")}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                role === "dev"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              For Developers
            </button>
            <button
              onClick={() => setRole("hr")}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                role === "hr"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Demo / Free Plan */}
          <PricingCard
            title="Demo"
            price="Free"
            description={
              role === "dev"
                ? "Perfect for trying out the platform."
                : "Great for small teams or individual recruiters."
            }
            features={features.demo}
            buttonText="Try for Free"
            buttonLink={`/register?role=${role}`}
            highlightColor={role === "dev" ? "blue" : "purple"}
          />

          {/* Career Plan */}
          <PricingCard
            title="Career"
            price={role === "dev" ? "$12" : "$49"}
            description={
              role === "dev"
                ? "Everything you need to land your dream job."
                : "Supercharge your hiring process."
            }
            features={features.career}
            buttonText="Choose Career"
            buttonLink={`/register?role=${role}&plan=career`}
            isPopular={true}
            gradient={
              role === "dev"
                ? "from-blue-600 to-cyan-500"
                : "from-purple-600 to-pink-500"
            }
            highlightColor={role === "dev" ? "blue" : "purple"}
          />

          {/* Pro Plan */}
          <PricingCard
            title="Pro"
            price={role === "dev" ? "$29" : "$99"}
            description={
              role === "dev"
                ? "For serious developers wanting rapid growth."
                : "For agencies and high-volume recruiting."
            }
            features={features.pro}
            buttonText="Go Pro"
            buttonLink={`/register?role=${role}&plan=pro`}
            highlightColor={role === "dev" ? "blue" : "purple"}
          />
        </div>

        {/* FAQ Section (Optional/Space Filler) */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely! You can upgrade or downgrade your plan at any time
                from your dashboard settings.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is the Demo really free?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, the Demo plan is completely free forever. No credit card
                required.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do you offer team discounts?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, for the Recruiters Pro plan, we offer discounts for teams
                larger than 5. Contact sales for more info.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-12 mt-20">
        <div className="container mx-auto px-6 text-center text-gray-500 dark:text-gray-400">
          <p>© 2024 SkillBridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
