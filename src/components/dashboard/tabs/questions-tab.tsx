import { InterviewQuestions } from "@/types";
import {
  MessageSquare,
  Users,
  Lightbulb,
  Cpu,
  Terminal,
  Layers,
  Bug,
  HelpCircle,
} from "lucide-react";

interface QuestionsTabProps {
  questions: InterviewQuestions;
  mode: "hr" | "dev";
}

export default function QuestionsTab({ questions, mode }: QuestionsTabProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Fundamentals":
        return <Terminal className="w-4 h-4 text-blue-500" />;
      case "System":
        return <Layers className="w-4 h-4 text-purple-500" />;
      case "Debugging":
        return <Bug className="w-4 h-4 text-red-500" />;
      default:
        return <Cpu className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Technical Questions */}
      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Technical Questions
          </h3>
        </div>

        <div className="space-y-4">
          {questions.technical.map((q, index) => (
            <div
              key={index}
              className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md"
            >
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                  {getCategoryIcon(q.category)}
                  {q.category}
                </span>
              </div>

              <p className="text-gray-900 dark:text-white font-medium text-lg mb-4">
                {q.question}
              </p>

              {/* Follow-up Section */}
              {q.followUp && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/50">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase mb-1">
                        Follow-up (Depth & Scaling)
                      </p>
                      <p className="text-sm text-blue-800 dark:text-blue-200 italic">
                        &quot;{q.followUp}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Behavioral Questions */}
      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Behavioral Questions (STAR Framework)
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {questions.behavioral.map((q, index) => (
            <div
              key={index}
              className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:border-green-300 dark:hover:border-green-700 transition-colors flex flex-col h-full"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                  Trait: {q.trait}
                </span>
              </div>

              <p className="text-gray-900 dark:text-white font-medium mb-4 flex-grow">
                {q.question}
              </p>

              {q.context && (
                <p className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3 mt-auto">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Context:
                  </span>{" "}
                  {q.context}
                </p>
              )}

              {/* STAR Hint */}
              {mode === "dev" && (
                <div className="mt-3 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 px-3 py-2 rounded border border-green-100 dark:border-green-800/50 flex items-center gap-1.5">
                  <Lightbulb className="w-3 h-3" />
                  Situation • Task • Action • Result
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
