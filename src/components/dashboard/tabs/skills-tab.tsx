import { useState } from "react";
import { DetailedSkill } from "@/types";
import {
  CheckCircle,
  Flame,
  Star,
  Wrench,
  Shield,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  LucideIcon,
} from "lucide-react";

interface SkillsTabProps {
  skills: DetailedSkill[];
  mode: "hr" | "dev";
}

export default function SkillsTab({ skills, mode }: SkillsTabProps) {
  const coreSkills = skills?.filter((s) => s.category === "Core") || [];
  const supportingSkills =
    skills?.filter(
      (s) => s.category === "Supporting" || s.category === "Tools"
    ) || [];

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "Very Rare":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            <Flame className="w-3 h-3 mr-1 text-purple-600 fill-current" />
            Very Rare
          </span>
        );
      case "Rare":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
            <Star className="w-3 h-3 mr-1 text-indigo-500" />
            Rare
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            Common
          </span>
        );
    }
  };

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-red-50 text-red-700 border-red-200";
      case "Intermediate":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-green-50 text-green-700 border-green-200";
    }
  };

  const SkillRow = ({ skill }: { skill: DetailedSkill }) => (
    <div className="flex items-center justify-between p-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group bg-white dark:bg-gray-900/20">
      <div className="flex items-center space-x-3 min-w-0 flex-1 mr-4">
        <div
          className={`p-1.5 rounded-md flex-shrink-0 ${
            skill.importance === "Must-have"
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {skill.importance === "Must-have" ? (
            <Shield className="w-4 h-4" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
        </div>

        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
          {skill.name}
        </h4>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
        <span
          className={`text-xs px-2 py-0.5 rounded border font-medium ${getProficiencyColor(
            skill.proficiency
          )}`}
        >
          {skill.proficiency}
        </span>

        <div className="opacity-90 scale-95 origin-right">
          {getRarityBadge(skill.rarity)}
        </div>

        {skill.importance === "Must-have" && (
          <span className="hidden md:inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800">
            Must Have
          </span>
        )}
      </div>
    </div>
  );

  const SkillAccordion = ({
    title,
    icon: Icon,
    skills,
    defaultOpen = false,
  }: {
    title: string;
    icon: LucideIcon;
    skills: DetailedSkill[];
    defaultOpen?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800/50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {skills.length}
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {isOpen && (
          <div className="bg-white dark:bg-gray-900/20 border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-800">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <SkillRow key={index} skill={skill} />
              ))
            ) : (
              <p className="text-gray-500 italic p-4 text-center">
                No skills identified in this category.
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SkillAccordion
        title="Core Technical Skills"
        icon={Shield}
        skills={coreSkills}
        defaultOpen={true}
      />

      <SkillAccordion
        title="Supporting Skills & Tools"
        icon={Wrench}
        skills={supportingSkills}
        defaultOpen={true}
      />

      {mode === "dev" && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300">
              Pro Tip: Focus on the &quot;Must-haves&quot;
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Mastering the &quot;Very Rare&quot; skills can significantly boost
              your salary potential, but ensure you have the core
              &quot;Must-haves&quot; covered first.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
