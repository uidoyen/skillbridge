"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  Code,
  Users,
  Brain,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Parsing",
      description:
        "Extract skills and requirements from job descriptions using advanced AI",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Smart Coding Tasks",
      description:
        "Generate relevant coding challenges based on extracted skills",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dual Mode System",
      description: "HR mode for recruiters and Dev mode for candidates",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">
              SkillBridge
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <span>Try Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Bridge the Gap Between
            <span className="text-primary-600 block">
              Talent and Opportunity
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            SkillBridge uses AI to parse job descriptions, extract required
            skills, and generate tailored coding tasks and interview questions.
            Streamline your hiring process or prepare for your next role.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-3 bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Rocket
              className={`w-5 h-5 transition-transform ${
                isHovered ? "animate-bounce" : ""
              }`}
            />
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-primary-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <Zap className="w-16 h-16 text-primary-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies and developers using SkillBridge to make
            better hiring decisions and career moves.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-10 py-4 rounded-xl hover:shadow-lg transition-all duration-300 text-lg font-semibold"
          >
            <span>Start Building Your Bridge Today</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
