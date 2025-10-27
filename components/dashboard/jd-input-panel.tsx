// components/dashboard/jd-input-panel.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

// components/dashboard/jd-input-panel.tsx - Update the interface and error handling
interface JdInputPanelProps {
  onAnalyze: (jdText: string) => void;
  isLoading: boolean;
  currentJdText?: string;
  onJdTextChange?: (text: string) => void;
  error?: string | null;
  onClearError?: () => void; // Add this
}

export default function JdInputPanel({
  onAnalyze,
  isLoading,
  currentJdText = "",
  onJdTextChange,
  error,
  onClearError,
}: JdInputPanelProps) {
  const [jdText, setJdText] = useState(currentJdText);
  const [isParsingPDF, setIsParsingPDF] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update local state when prop changes
  useEffect(() => {
    setJdText(currentJdText);
  }, [currentJdText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error && onClearError) {
      onClearError();
    }
    setSuccess(null);

    if (jdText.trim()) {
      onAnalyze(jdText);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (error && onClearError) {
      onClearError();
    }
    setSuccess(null);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (file.type === "application/pdf") {
      setIsParsingPDF(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/parse-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to parse PDF");
        }

        const data = await response.json();
        const newText = data.text;
        setJdText(newText);
        onJdTextChange?.(newText);
        setSuccess(
          `PDF parsed successfully! Extracted ${data.words} words from ${data.pages} pages.`
        );
      } catch (error) {
        console.error("PDF parsing error:", error);
        if (onClearError) {
          onClearError();
        }
        // Error will be handled by the parent component
      } finally {
        setIsParsingPDF(false);
      }
    } else {
      // Handle text files
      const reader = new FileReader();
      reader.onload = (event) => {
        const newText = event.target?.result as string;
        setJdText(newText);
        onJdTextChange?.(newText);
        setSuccess("File loaded successfully!");
      };
      reader.onerror = () => {
        if (onClearError) {
          onClearError();
        }
      };
      reader.readAsText(file);
    }
  };

  const handleTextChange = (text: string) => {
    setJdText(text);
    onJdTextChange?.(text);
    // Clear error when user starts typing
    if (error && onClearError) {
      onClearError();
    }
  };

  const clearSuccess = () => setSuccess(null);

  const textStats = {
    characters: jdText.length,
    words: jdText.split(/\s+/).filter((word) => word.length > 0).length,
    lines: jdText.split("\n").length,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <FileText className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
            <p className="text-sm text-gray-600">
              Upload or paste job details to analyze
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-900">
            Upload Document
          </label>

          <div className="relative">
            <label
              className={`
              flex flex-col items-center justify-center w-full px-6 py-8 
              border-2 border-dashed rounded-2xl cursor-pointer 
              transition-all duration-300 group
              ${
                isParsingPDF
                  ? "border-primary-400 bg-primary-25"
                  : "border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-primary-25"
              }
            `}
            >
              {isParsingPDF ? (
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-3" />
                  <p className="text-primary-700 font-medium">
                    Processing PDF...
                  </p>
                  <p className="text-primary-600 text-sm mt-1">
                    This may take a few seconds
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow mb-4">
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-700 font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-gray-500 text-sm">
                      PDF, TXT, DOC, or DOCX (Max 10MB)
                    </p>
                  </div>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileUpload}
                disabled={isParsingPDF || isLoading}
              />
            </label>
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Text Area Section */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-900">
            Paste Job Description
          </label>

          <div className="relative">
            <textarea
              value={jdText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Paste the job description here...&#10;&#10;Example: 'Looking for a React/Next.js developer with experience in APIs, PostgreSQL, and authentication systems. Requirements include 3+ years of experience with modern frontend frameworks and database design.'"
              className={`w-full h-64 px-4 py-4 border rounded-xl 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                       resize-none transition-all duration-200
                       disabled:bg-gray-50 disabled:cursor-not-allowed
                       placeholder-gray-400 text-gray-700 leading-relaxed
                       ${error ? "border-red-300" : "border-gray-300"}`}
              disabled={isLoading || isParsingPDF}
            />

            {/* Loading Overlay */}
            {(isLoading || isParsingPDF) && (
              <div className="absolute inset-0 bg-white bg-opacity-80 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">
                    {isParsingPDF
                      ? "Processing Document..."
                      : "Analyzing Content..."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Text Statistics */}
          {jdText && (
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>{textStats.words} words</span>
                <span>•</span>
                <span>{textStats.characters} characters</span>
                <span>•</span>
                <span>{textStats.lines} lines</span>
              </div>
              <button
                type="button"
                onClick={() => handleTextChange("")}
                className="text-xs text-gray-400 hover:text-red-600 transition-colors"
                disabled={isLoading || isParsingPDF}
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800 font-medium text-sm">
                  Analysis Failed
                </p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
              <button
                onClick={onClearError}
                className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-green-800 font-medium text-sm">{success}</p>
            </div>
            <button
              onClick={clearSuccess}
              className="text-green-400 hover:text-green-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!jdText.trim() || isLoading || isParsingPDF}
          className="w-full bg-primary-500 hover:bg-primary-600 
                   text-white py-4 px-6 rounded-xl font-semibold
                   disabled:bg-gray-300 disabled:text-gray-500
                   disabled:cursor-not-allowed transition-all duration-300
                   hover:scale-105 disabled:scale-100
                   shadow-lg hover:shadow-xl
                   flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Job Description...</span>
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              <span>Analyze Job Description</span>
            </>
          )}
        </button>
      </form>

      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          Pro Tips
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Upload PDF job descriptions for automatic text extraction</li>
          <li>
            • Include specific technologies and requirements for better analysis
          </li>
          <li>
            • Switch modes to see different perspectives (HR vs Developer)
          </li>
        </ul>
      </div>
    </div>
  );
}
