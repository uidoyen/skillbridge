export interface AnalysisResult {
  skills: string[]
  codingTask: CodingTask
  questions: InterviewQuestions
}

export interface CodingTask {
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  requirements: string[]
}

export interface InterviewQuestions {
  technical: string[]
  behavioral: string[]
}

export interface User {
  id: string
  email: string
  name: string
  role: 'hr' | 'developer'
}