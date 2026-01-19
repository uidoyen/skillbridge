"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Code,
  Users,
  Brain,
  CheckCircle,
  Terminal,
  Database,
  Cpu,
} from "lucide-react";

export function Hero() {
  const [text, setText] = useState("");
  const fullText = "Talent and Opportunity";
  const [isTyping] = useState(true);

  useEffect(() => {
    if (text.length < fullText.length && isTyping) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [text, isTyping]);

  return (
    <section className="container mx-auto px-6 py-20 text-center">
      <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-8 text-sm font-medium border border-blue-100 dark:border-blue-800">
        <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
        <span>Version 2.0 with AI Analysis</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
        Bridge the Gap Between <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 min-h-[1.2em] inline-block">
          {text}
          <span className="animate-blink border-r-4 border-purple-600 ml-1"></span>
        </span>
      </h1>

      <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
        SkillBridge uses advanced AI to parse job descriptions, extract valid
        skills, and generate tailored coding challenges.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/register?role=hr"
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 text-lg font-semibold"
        >
          <Users className="w-5 h-5" />
          <span>I&apos;m Hiring</span>
        </Link>
        <Link
          href="/register?role=dev"
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-8 py-4 rounded-xl hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all text-lg font-semibold"
        >
          <Code className="w-5 h-5" />
          <span>I&apos;m a Developer</span>
        </Link>
      </div>
    </section>
  );
}

export function LiveDemo() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!input) return;
    setIsAnalyzing(true);
    // Mock analysis
    setTimeout(() => {
      const keywords = [
        "React",
        "Node.js",
        "TypeScript",
        "AWS",
        "Python",
        "SQL",
      ];
      const found = keywords.filter((k) =>
        input.toLowerCase().includes(k.toLowerCase())
      );
      setTags(found.length > 0 ? found : ["Communication", "Problem Solving"]);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <section className="container mx-auto px-6 py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl my-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 text-purple-600 font-semibold mb-4">
            <Brain className="w-5 h-5" />
            <span>Try the AI</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            See how it works in real-time
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Paste a snippet of a job description to see how our AI engine
            extracts key technical skills instantly.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Instant Parsing
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No more manual keyword hunting.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Auto-Generated Tasks
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create coding challenges from these requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-900 text-gray-400 px-4 py-3 text-xs font-mono flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2">ai-parser.exe</span>
          </div>
          <div className="p-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste job description here (e.g. 'We are looking for a Senior React Developer with TypeScript and Node.js experience...')"
              className="w-full h-32 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none text-gray-900 dark:text-white"
            />

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !input}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Text"}
              </button>
              {isAnalyzing && (
                <div className="animate-spin h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full"></div>
              )}
            </div>

            {tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Detected Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium animate-in fade-in zoom-in duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState<"hr" | "dev">("hr");

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Built for Both Sides of the Interview
        </h2>
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("hr")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "hr"
                ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            For Recruiters
          </button>
          <button
            onClick={() => setActiveTab("dev")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "dev"
                ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            For Developers
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {activeTab === "hr" ? (
          <>
            <FeatureCard
              icon={<Brain className="w-6 h-6 text-blue-600" />}
              title="Automated JD Parsing"
              description="Upload any PDF or paste text. Our AI understands the requirements instantly."
            />
            <FeatureCard
              icon={<Code className="w-6 h-6 text-blue-600" />}
              title="Custom Challenge Gen"
              description="Get relevant coding tasks generated automatically based on the JD."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-blue-600" />}
              title="Candidate Ranking"
              description="See how candidates score against your specific requirements."
            />
          </>
        ) : (
          <>
            <FeatureCard
              icon={<Terminal className="w-6 h-6 text-purple-600" />}
              title="Practice Relevant Skills"
              description="Don't waste time on generic LeetCode. Practice what jobs actually ask for."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-purple-600" />}
              title="Instant Feedback"
              description="Get AI feedback on your code solutions immediately."
            />
            <FeatureCard
              icon={<Briefcase className="w-6 h-6 text-purple-600" />}
              title="Resume Optimization"
              description="See which keywords you're missing for your dream job."
            />
          </>
        )}
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-gray-50 dark:bg-gray-700/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// Additional icons needed for the second tab
import { Zap, Briefcase } from "lucide-react";

export function TechStack() {
  return (
    <section className="py-20 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
          Powering Next-Gen Hiring with
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center space-x-2">
            <Cpu className="w-6 h-6" />
            <span className="font-bold text-xl">Next.js 15</span>
          </div>
          <div className="flex items-center space-x-2">
            <Database className="w-6 h-6" />
            <span className="font-bold text-xl">MongoDB</span>
          </div>
          <div className="flex items-center space-x-2">
            <Database className="w-6 h-6" />
            <span className="font-bold text-xl">Prisma</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6" />
            <span className="font-bold text-xl">Gemini AI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
