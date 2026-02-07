import { JdIntelligence } from "@/types";
import {
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  User,
} from "lucide-react";

interface JdIntelligenceProps {
  intelligence?: JdIntelligence;
}

export function JdIntelligencePanel({ intelligence }: JdIntelligenceProps) {
  if (!intelligence) return null;

  const {
    clarityScore,
    roleSeniority,
    marketAlignment,
    issues,
    skillClassification,
  } = intelligence;

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
    if (score >= 60)
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
  };

  const getMarketIcon = (alignment: string) => {
    switch (alignment) {
      case "Overpaid":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "Underpaid":
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case "Market-fit":
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <HelpCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500 mb-6">
      <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
        <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          JD Intelligence Analysis
        </h3>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Clarity Score */}
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-bold">
            Clarity Score
          </p>
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${getScoreColor(
              clarityScore
            )}`}
          >
            {clarityScore}
          </div>
        </div>

        {/* Role Seniority */}
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-bold">
            Detected Seniority
          </p>
          <div className="flex items-center justify-center h-16">
            <div className="flex flex-col items-center">
              <User className="w-6 h-6 text-blue-500 mb-1" />
              <span className="font-bold text-gray-900 dark:text-white">
                {roleSeniority}
              </span>
            </div>
          </div>
        </div>

        {/* Market Alignment */}
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-bold">
            Market Alignment
          </p>
          <div className="flex items-center justify-center h-16">
            <div className="flex flex-col items-center">
              {getMarketIcon(marketAlignment)}
              <span className="font-bold text-gray-900 dark:text-white mt-1">
                {marketAlignment}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Focus */}
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-bold">
            Primary Focus
          </p>
          <div className="flex flex-wrap justify-center gap-1 max-h-16 overflow-hidden">
            {skillClassification.primary.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md"
              >
                {skill}
              </span>
            ))}
            {skillClassification.primary.length > 3 && (
              <span className="text-xs text-gray-400">
                +{skillClassification.primary.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Issues / Alerts */}
      {issues.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
            Detected Issues & Ambiguities
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {issues.map((issue, i) => (
              <div
                key={i}
                className="flex items-start text-sm text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/10 p-2.5 rounded-lg"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 mr-2 flex-shrink-0" />
                {issue}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
