export interface AnalysisResult {
  skills: DetailedSkill[];
  codingTask: CodingTask;
  questions: InterviewQuestions;
  // Shared
  salaryAnalysis?: SalaryAnalysis;
  softSkillsAnalysis?: SoftSkillsAnalysis;
  // HR Specific
  evaluationCriteria?: WeightedCriteria[];
  // Dev Specific
  resumeKeywords?: string[];
  projectSuggestion?: string;
  learningPath?: string[];
  // JD Intelligence
  jdIntelligence?: JdIntelligence;
}

export interface JdIntelligence {
  clarityScore: number;
  roleSeniority: "Junior" | "Mid" | "Senior" | "Lead" | "Unknown";
  marketAlignment: "Underpaid" | "Market-fit" | "Overpaid" | "Unknown";
  issues: string[];
  skillClassification: {
    primary: string[];
    secondary: string[];
  };
}

export interface CodingTask {
  title: string;
  description: string;
  context: string; // Real-world scenario
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string; // e.g. "3-4 hours"
  requirements: string[]; // General requirements
  techConstraints: string[];
  performanceExpectations: string[];
  edgeCases: string[];
  allowedResources: string[];
  learningResources?: string[];
  rubric: ScoringRubric;
}

export interface ScoringRubric {
  correctness: number;
  quality: number;
  architecture: number;
  documentation: number;
  tests: number;
}

export interface InterviewQuestions {
  technical: TechnicalQuestion[];
  behavioral: BehavioralQuestion[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "hr" | "dev";
}

export interface DetailedSkill {
  name: string;
  category: "Core" | "Frameworks" | "Supporting" | "Tools";
  importance: "Must-have" | "Nice-to-have";
  proficiency: "Beginner" | "Intermediate" | "Advanced";
  rarity: "Common" | "Rare" | "Very Rare";
}

export interface SalaryAnalysis {
  min: number;
  max: number;
  median: number;
  currency: string;
  locationAdjustment: "India" | "Remote" | "Global";
  demandTrend: "Rising" | "Stable" | "Falling";
  vacancyCost: number; // monthly cost
}

export interface WeightedCriteria {
  category: string;
  weight: number;
  items: string[];
}

export interface SoftSkillsAnalysis {
  communication: string[];
  ownership: string[];
  collaboration: string[];
  adaptability: string[];
  leadership: string[];
  redFlags: string[];
}

export interface TechnicalQuestion {
  question: string;
  category: "Fundamentals" | "Applied" | "System" | "Debugging";
  followUp?: string;
}

export interface BehavioralQuestion {
  question: string;
  trait: string; // e.g. Accountability, Collaboration
  context: string; // e.g. "Describe a failure"
}
