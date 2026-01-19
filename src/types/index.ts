export interface AnalysisResult {
  skills: string[];
  codingTask: CodingTask;
  questions: InterviewQuestions;
  // Shared
  salaryEstimation?: string;
  softSkills?: string[];
  // HR Specific
  evaluationCriteria?: string[];
  // Dev Specific
  resumeKeywords?: string[];
  projectSuggestion?: string;
  learningPath?: string[];
}

export interface CodingTask {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  requirements: string[];
  learningResources?: string[];
}

export interface InterviewQuestions {
  technical: string[];
  behavioral: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "hr" | "dev";
}
