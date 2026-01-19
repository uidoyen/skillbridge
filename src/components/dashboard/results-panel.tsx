"use client";

import { useState } from "react";
import SkillsTab from "./tabs/skills-tab";
import CodingTaskTab from "./tabs/coding-task-tab";
import QuestionsTab from "./tabs/questions-tab";
import {
  Code,
  Brain,
  Users,
  Loader2,
  FileText,
  AlertCircle,
  Map,
  ClipboardCheck,
} from "lucide-react";
import { AnalysisResult } from "@/types/index";
import { RoadmapTab } from "./tabs/roadmap-tab";
import { EvaluationTab } from "./tabs/evaluation-tab";

interface ResultsPanelProps {
  results: AnalysisResult | null;
  isLoading: boolean;
  mode: "hr" | "dev";
  currentMode: "hr" | "dev";
  error?: string | null; // Add this
}

const commonTabs = [{ id: "skills", label: "Skills", icon: Brain }];

const hrTabs = [
  { id: "evaluation", label: "Evaluation", icon: ClipboardCheck },
  { id: "coding-task", label: "Coding Task", icon: Code },
  { id: "questions", label: "Questions", icon: Users },
];

const devTabs = [
  { id: "roadmap", label: "Roadmap", icon: Map },
  { id: "coding-task", label: "Coding Task", icon: Code },
  { id: "questions", label: "Questions", icon: Users },
];

export default function ResultsPanel({
  results,
  isLoading,
  mode,
  currentMode,
  error,
}: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState("skills");

  const availableTabs = [
    ...commonTabs,
    ...(currentMode === "hr" ? hrTabs : devTabs),
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Analyzing job description...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Analysis Failed</p>
          <p className="text-sm mb-4">{error}</p>
          <p className="text-xs text-gray-500">
            Please try again with a different job description
          </p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No Analysis Yet</p>
          <p className="text-sm mb-4">
            {currentMode === "hr"
              ? "Enter a job description to analyze it from a hiring perspective"
              : "Enter a job description to analyze it for skill development"}
          </p>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              currentMode === "hr"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {currentMode === "hr"
              ? "🎯 HR Mode - Ready for Analysis"
              : "🚀 Developer Mode - Ready for Analysis"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Tabs Header */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
          {availableTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "skills" && (
          <SkillsTab skills={results.skills} mode={mode} />
        )}
        {activeTab === "evaluation" && <EvaluationTab analysis={results} />}
        {activeTab === "roadmap" && <RoadmapTab analysis={results} />}
        {activeTab === "coding-task" && (
          <CodingTaskTab task={results.codingTask} mode={mode} />
        )}
        {activeTab === "questions" && (
          <QuestionsTab questions={results.questions} mode={mode} />
        )}
      </div>
    </div>
  );
}
