import { AnalysisResult } from "@/types";
import { ClipboardCheck, Users, DollarSign, CheckSquare } from "lucide-react";

interface EvaluationTabProps {
  analysis: AnalysisResult;
}

export function EvaluationTab({ analysis }: EvaluationTabProps) {
  const { evaluationCriteria, softSkills, salaryEstimation } = analysis;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Salary & Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800 flex items-center space-x-4">
          <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              Estimated Salary
            </p>
            <p className="text-lg font-bold text-green-700 dark:text-green-300">
              {salaryEstimation || "Not available"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Evaluation Checklist */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <ClipboardCheck className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Evaluation Criteria
            </h3>
          </div>

          <div className="space-y-3">
            {evaluationCriteria?.map((criteria, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-purple-400 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">{criteria}</p>
              </div>
            ))}
            {(!evaluationCriteria || evaluationCriteria.length === 0) && (
              <p className="text-gray-500 italic">
                No specific criteria generated.
              </p>
            )}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Required Soft Skills
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {softSkills?.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-100 dark:border-orange-800/50"
              >
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {skill}
                </span>
              </div>
            ))}
            {(!softSkills || softSkills.length === 0) && (
              <p className="text-gray-500 italic">
                No soft skills analysis available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
