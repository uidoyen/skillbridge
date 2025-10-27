// app/dashboard/page.tsx
"use client";

import { useState, useCallback } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import JdInputPanel from "@/components/dashboard/jd-input-panel";
import ResultsPanel from "@/components/dashboard/results-panel";
import { AnalysisResult } from "@/types/index";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [mode, setMode] = useState<"hr" | "dev">("hr");
  const [currentJdText, setCurrentJdText] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Memoized analyze function that calls the actual API
  const analyzeJd = useCallback(
    async (jdText: string, analysisMode: "hr" | "dev") => {
      if (!jdText.trim()) {
        setResults(null);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jdText,
            mode: analysisMode,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Use the error message from the API response
          const errorMessage =
            data.error || data.details?.[0] || "Analysis failed";
          throw new Error(errorMessage);
        }

        setResults(data);
        setError(null);
      } catch (error) {
        console.error("Error analyzing JD:", error);
        setResults(null);
        // Extract meaningful error message
        let errorMessage =
          "Failed to analyze job description. Please try again.";

        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Handle initial analysis
  const handleAnalyze = async (jdText: string) => {
    setCurrentJdText(jdText);
    await analyzeJd(jdText, mode);
  };

  // Handle mode change - clear results and current JD text
  const handleModeChange = (newMode: "hr" | "dev") => {
    // Clear all state to reset the context
    setResults(null);
    setCurrentJdText("");
    setError(null);
    setMode(newMode);
  };

  // Clear error manually
  const clearError = () => {
    setError(null);
  };

  return (
    <DashboardLayout mode={mode} onModeChange={handleModeChange}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <JdInputPanel
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          currentJdText={currentJdText}
          onJdTextChange={setCurrentJdText}
          error={error}
          onClearError={clearError}
        />
        <ResultsPanel
          results={results}
          isLoading={isLoading}
          mode={mode}
          currentMode={mode}
          error={error}
        />
      </div>
    </DashboardLayout>
  );
}
