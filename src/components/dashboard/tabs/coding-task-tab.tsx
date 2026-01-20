import { CodingTask } from "@/types";
import {
  Target,
  Clock,
  Briefcase,
  AlertTriangle,
  Zap,
  BookOpen,
  CheckCircle2,
  Cpu,
  ShieldAlert,
  Search,
} from "lucide-react";

interface CodingTaskTabProps {
  task: CodingTask;
  mode: "hr" | "dev";
}

export default function CodingTaskTab({ task, mode }: CodingTaskTabProps) {
  const difficultyColors: Record<string, string> = {
    beginner:
      "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    intermediate:
      "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
    advanced: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Header & Context Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                difficultyColors[task.difficulty] || "text-gray-600 bg-gray-100"
              }`}
            >
              {task.difficulty}
            </span>
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">
                {task.duration || "3-4 hours"}
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {task.title}
          </h3>

          {/* Real World Scenario */}
          {task.context && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-300">
                  Real-World Context
                </h4>
              </div>
              <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                {task.context}
              </p>
            </div>
          )}

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {task.description}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 2. Detailed Constraints & Requirements */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <h4 className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-700">
            <Target className="w-5 h-5 text-blue-500" />
            <span>Specifications & Constraints</span>
          </h4>

          {/* Tech Constraints */}
          {task.techConstraints && task.techConstraints.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-500" />
                Technical Constraints
              </h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-5">
                {task.techConstraints.map((tc, i) => (
                  <li key={i}>{tc}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Performance */}
          {task.performanceExpectations &&
            task.performanceExpectations.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Performance Bounds
                </h5>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-5">
                  {task.performanceExpectations.map((pe, i) => (
                    <li key={i}>{pe}</li>
                  ))}
                </ul>
              </div>
            )}

          {/* Edge Cases */}
          {task.edgeCases && task.edgeCases.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                Required Edge Cases
              </h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-5">
                {task.edgeCases.map((ec, i) => (
                  <li key={i}>{ec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Allowed Resources */}
          {task.allowedResources && task.allowedResources.length > 0 && (
            <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/50">
              <h5 className="text-xs font-bold text-green-800 dark:text-green-300 uppercase mb-2 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                Allowed Resources
              </h5>
              <ul className="text-xs text-green-700 dark:text-green-400 flex flex-wrap gap-2">
                {task.allowedResources.map((res, i) => (
                  <li
                    key={i}
                    className="px-2 py-0.5 bg-white dark:bg-green-900/40 rounded border border-green-200 dark:border-green-800"
                  >
                    {res}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 3. Evaluation Rubric & Standard Requirements */}
        <div className="space-y-6">
          {/* Scorecard */}
          {task.rubric && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h4 className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white mb-4">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <span>Evaluation Rubric</span>
                <span className="text-xs font-normal text-gray-500 ml-auto bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  Total: 100 Points
                </span>
              </h4>

              <div className="space-y-3">
                <RubricItem
                  label="Correctness & Functionality"
                  points={task.rubric.correctness}
                  color="bg-green-500"
                />
                <RubricItem
                  label="Code Quality & Style"
                  points={task.rubric.quality}
                  color="bg-blue-500"
                />
                <RubricItem
                  label="Architecture & Design"
                  points={task.rubric.architecture}
                  color="bg-purple-500"
                />
                <RubricItem
                  label="Documentation"
                  points={task.rubric.documentation}
                  color="bg-amber-500"
                />
                <RubricItem
                  label="Tests & Coverage"
                  points={task.rubric.tests}
                  color="bg-gray-500"
                />
              </div>
            </div>
          )}

          {/* Standard Requirements List */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h4 className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white mb-4">
              <CheckCircle2 className="w-5 h-5 text-teal-500" />
              <span>Deliverables</span>
            </h4>
            <ul className="space-y-2">
              {task.requirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Resources (Dev Mode) */}
          {mode === "dev" && task.learningResources && (
            <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-800/50">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Helpful Resources
              </h4>
              <ul className="space-y-1">
                {task.learningResources.map((res, i) => (
                  <li
                    key={i}
                    className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-current rounded-full" />
                    <a href="#" className="hover:underline">
                      {res}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RubricItem({
  label,
  points,
  color,
}: {
  label: string;
  points: number;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between group">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} opacity-80`}
            style={{ width: `${(points / 50) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm font-bold text-gray-900 dark:text-white w-6 text-right">
          {points}
        </span>
      </div>
    </div>
  );
}
