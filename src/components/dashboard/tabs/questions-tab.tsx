import { InterviewQuestions } from '@/types'
import { MessageSquare, Users, Lightbulb } from 'lucide-react'

interface QuestionsTabProps {
  questions: InterviewQuestions
  mode: 'hr' | 'dev'
}

export default function QuestionsTab({ questions, mode }: QuestionsTabProps) {
  return (
    <div className="space-y-8">
      {/* Technical Questions */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Technical Questions
          </h3>
        </div>
        <div className="space-y-3">
          {questions.technical.map((question, index) => (
            <div
              key={index}
              className="p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <p className="text-blue-900 font-medium">{question}</p>
              {mode === 'dev' && (
                <div className="mt-2 p-2 bg-white rounded border border-blue-100">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                    <p className="text-blue-700 text-sm">
                      Prepare to discuss specific examples and demonstrate depth of knowledge.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Behavioral Questions */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <Users className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Behavioral Questions
          </h3>
        </div>
        <div className="space-y-3">
          {questions.behavioral.map((question, index) => (
            <div
              key={index}
              className="p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <p className="text-green-900 font-medium">{question}</p>
              {mode === 'dev' && (
                <div className="mt-2 p-2 bg-white rounded border border-green-100">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                    <p className="text-green-700 text-sm">
                      Use the STAR method (Situation, Task, Action, Result) to structure your answer.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}