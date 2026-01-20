import { AnalysisResult } from "@/types";
import {
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus,
  Globe,
  MapPin,
  AlertTriangle,
  PieChart,
} from "lucide-react";

interface EvaluationTabProps {
  analysis: AnalysisResult;
}

export function EvaluationTab({ analysis }: EvaluationTabProps) {
  const { evaluationCriteria, softSkillsAnalysis, salaryAnalysis } = analysis;

  const getTrendIcon = (trend: "Rising" | "Stable" | "Falling") => {
    switch (trend) {
      case "Rising":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "Falling":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Advanced Salary Analysis */}
      {salaryAnalysis && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Market Salary Estimations
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Based on role, seniority, and location
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
              {salaryAnalysis.locationAdjustment === "Global" ? (
                <Globe className="w-4 h-4" />
              ) : (
                <MapPin className="w-4 h-4" />
              )}
              {salaryAnalysis.locationAdjustment} Market
            </div>
          </div>

          {/* Salary Ranges */}
          <div className="mb-8 relative pt-6">
            <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full w-full relative">
              {/* Median Marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 z-10"
                aria-label="Median"
              ></div>
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Min
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(salaryAnalysis.min, salaryAnalysis.currency)}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-green-600 dark:text-green-400 uppercase font-semibold">
                  Median
                </p>
                <p className="text-xl font-extrabold text-green-600 dark:text-green-400">
                  {formatCurrency(
                    salaryAnalysis.median,
                    salaryAnalysis.currency
                  )}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Max
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(salaryAnalysis.max, salaryAnalysis.currency)}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Salary Insights */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Demand Trend
              </span>
              <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                {getTrendIcon(salaryAnalysis.demandTrend)}
                {salaryAnalysis.demandTrend}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
              <span className="text-sm text-red-700 dark:text-red-400">
                Cost of Delay / Mo
              </span>
              <span className="font-bold text-red-800 dark:text-red-300">
                {formatCurrency(
                  salaryAnalysis.vacancyCost,
                  salaryAnalysis.currency
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* 2. Weighted Evaluation Criteria */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-6">
            <PieChart className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Evaluation Weights
            </h3>
          </div>

          <div className="space-y-6">
            {evaluationCriteria?.map((criteria, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {criteria.category}
                  </span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {criteria.weight}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${criteria.weight}%` }}
                  ></div>
                </div>
                {/* Specific items listing (optional compact view) */}
                <ul className="mt-2 space-y-1">
                  {criteria.items.slice(0, 2).map((item, i) => (
                    <li
                      key={i}
                      className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5"
                    >
                      <span className="mt-1 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {(!evaluationCriteria || evaluationCriteria.length === 0) && (
              <p className="text-gray-500 italic text-center py-4">
                No weighted criteria generated.
              </p>
            )}
          </div>
        </div>

        {/* 3. Soft Skills & Red Flags */}
        <div className="space-y-6">
          {/* Categorized Soft Skills */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-6">
              <Users className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Soft Skills & Culture
              </h3>
            </div>

            {softSkillsAnalysis ? (
              <div className="space-y-4">
                {Object.entries(softSkillsAnalysis)
                  .filter(([key]) => key !== "redFlags")
                  .map(([category, skills]) => {
                    // simple category title formatting
                    const title =
                      category.charAt(0).toUpperCase() + category.slice(1);
                    if ((skills as string[]).length === 0) return null;

                    return (
                      <div key={category}>
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                          {title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(skills as string[]).map((skill, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-orange-50 dark:bg-orange-900/10 text-orange-700 dark:text-orange-300 rounded text-xs border border-orange-100 dark:border-orange-800/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No soft skills analysis available.
              </p>
            )}
          </div>

          {/* Red Flags Alert */}
          {softSkillsAnalysis?.redFlags &&
            softSkillsAnalysis.redFlags.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-200 dark:border-red-800/50">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <h4 className="font-bold text-red-700 dark:text-red-400">
                    Potential Red Flags
                  </h4>
                </div>
                <ul className="space-y-2">
                  {softSkillsAnalysis.redFlags.map((flag, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-red-700 dark:text-red-300"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                      {flag}
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
