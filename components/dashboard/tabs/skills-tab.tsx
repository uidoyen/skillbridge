import { CheckCircle } from 'lucide-react'

interface SkillsTabProps {
  skills: string[]
  mode: 'hr' | 'dev'
}

export default function SkillsTab({ skills, mode }: SkillsTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Required Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {mode === 'dev' && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Skill Gap Analysis</h4>
          <p className="text-blue-700 text-sm">
            Focus on learning these technologies to match the job requirements.
            Consider building projects that combine multiple skills from this list.
          </p>
        </div>
      )}
    </div>
  )
}