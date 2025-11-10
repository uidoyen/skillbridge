import { CodingTask } from '@/types'
import { Star, Target, Clock } from 'lucide-react'

interface CodingTaskTabProps {
  task: CodingTask
  mode: 'hr' | 'dev'
}

export default function CodingTaskTab({ task, mode }: CodingTaskTabProps) {
  const difficultyColors: Record<string, string> = {
    beginner: 'text-green-600 bg-green-100',
    intermediate: 'text-yellow-600 bg-yellow-100',
    advanced: 'text-red-600 bg-red-100',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {task.title}
          </h3>
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                difficultyColors[task.difficulty]
              }`}
            >
              {task.difficulty}
            </span>
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {task.difficulty === 'beginner'
                  ? '1-2 hours'
                  : task.difficulty === 'intermediate'
                  ? '3-4 hours'
                  : '5+ hours'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-3">Task Description</h4>
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
          {task.description}
        </p>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
          <Target className="w-4 h-4" />
          <span>Requirements</span>
        </h4>
        <ul className="space-y-2">
          {task.requirements.map((req, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Star className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {mode === 'dev' && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-medium text-green-900 mb-2">💡 Pro Tip</h4>
          <p className="text-green-700 text-sm">
            Build this project and add it to your portfolio. Focus on writing clean,
            maintainable code and include proper documentation and tests.
          </p>
        </div>
      )}
    </div>
  )
}