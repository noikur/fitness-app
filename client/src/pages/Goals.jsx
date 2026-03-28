import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const goalStyles = {
  'Explosiveness': { emoji: '💥', color: 'bg-orange-50 border-orange-200 hover:border-orange-400', text: 'text-orange-600' },
  'Vertical Jump': { emoji: '⬆️', color: 'bg-blue-50 border-blue-200 hover:border-blue-400', text: 'text-blue-600' },
  'Agility': { emoji: '⚡', color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400', text: 'text-yellow-600' },
  'Speed': { emoji: '🚀', color: 'bg-red-50 border-red-200 hover:border-red-400', text: 'text-red-600' },
  'Strength': { emoji: '💪', color: 'bg-purple-50 border-purple-200 hover:border-purple-400', text: 'text-purple-600' },
  'Endurance': { emoji: '🫀', color: 'bg-green-50 border-green-200 hover:border-green-400', text: 'text-green-600' },
  'Footwork': { emoji: '👟', color: 'bg-teal-50 border-teal-200 hover:border-teal-400', text: 'text-teal-600' },
  'Reaction Time': { emoji: '🎯', color: 'bg-pink-50 border-pink-200 hover:border-pink-400', text: 'text-pink-600' },
}

const defaultStyle = { emoji: '🏋️', color: 'bg-gray-50 border-gray-200 hover:border-gray-400', text: 'text-gray-600' }

function Goals() {
  const [goals, setGoals] = useState([])
  const { sportId } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/goals/${sportId}`)
      .then(res => setGoals(res.data))
  }, [sportId])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 mb-6 hover:underline text-sm"
        >
          ← Back to sports
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{state?.sportName}</h1>
        <p className="text-gray-500 mb-8">Choose a training goal</p>
        <div className="grid grid-cols-3 gap-4">
          {goals.map(goal => {
            const style = goalStyles[goal.name] || defaultStyle
            return (
              <div
                key={goal.id}
                onClick={() => navigate(`/workouts/${goal.id}`, { state: { goalName: goal.name, sportName: state?.sportName } })}
                className={`p-8 border-2 rounded-xl text-center cursor-pointer transition-all ${style.color}`}
              >
                <div className="text-5xl mb-3">{style.emoji}</div>
                <p className={`text-xl font-semibold ${style.text}`}>{goal.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Goals