import { AnalysisResult } from "@/types";
import { BookOpen, Map, FileText, Lightbulb, Trophy } from "lucide-react";

interface RoadmapTabProps {
  analysis: AnalysisResult;
}

export function RoadmapTab({ analysis }: RoadmapTabProps) {
  const { learningPath, resumeKeywords, projectSuggestion, codingTask } =
    analysis;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Project Suggestion */}
      {projectSuggestion && (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
              <Lightbulb className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Recommended Portfolio Project
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {projectSuggestion}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Learning Path */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Map className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Learning Roadmap
            </h3>
          </div>

          {learningPath && learningPath.length > 0 ? (
            <div className="space-y-4">
              {learningPath.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-grow pt-1.5">
                    <p className="text-gray-700 dark:text-gray-300">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : codingTask?.learningResources ? (
            <ul className="space-y-2">
              {codingTask.learningResources.map((res, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <BookOpen className="w-4 h-4 mt-1 text-blue-400" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              No specific roadmap generated.
            </p>
          )}
        </div>

        {/* Resume Keywords */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resume Keywords
            </h3>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Include these keywords to bypass ATS filters:
          </p>

          <div className="flex flex-wrap gap-2">
            {resumeKeywords?.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm border border-green-100 dark:border-green-800"
              >
                {keyword}
              </span>
            ))}
            {(!resumeKeywords || resumeKeywords.length === 0) && (
              <span className="text-gray-500 italic">
                No keywords generated.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Estimated Salary - Full Width & Attractive */}
      {/* Estimated Salary - Full Width & Attractive */}
      {analysis.salaryAnalysis && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy className="w-24 h-24 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 dark:bg-emerald-800 p-3 rounded-full shadow-sm">
                <Trophy className="w-8 h-8 text-emerald-600 dark:text-emerald-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Estimated Salary Range
                </h3>
                <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                  Based on current market standards for this role
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 px-8 py-4 rounded-xl shadow-md border border-emerald-100 dark:border-emerald-800 transform transition-transform hover:scale-105">
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: analysis.salaryAnalysis.currency,
                  maximumFractionDigits: 0,
                }).format(analysis.salaryAnalysis.min)}{" "}
                -{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: analysis.salaryAnalysis.currency,
                  maximumFractionDigits: 0,
                }).format(analysis.salaryAnalysis.max)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
