import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import supabase from '../supabase'

const sportStyles = {
  Basketball: { emoji: '🏀', color: 'bg-orange-50 border-orange-200 hover:border-orange-400', text: 'text-orange-600' },
  Football: { emoji: '⚽', color: 'bg-green-50 border-green-200 hover:border-green-400', text: 'text-green-600' },
  Tennis: { emoji: '🎾', color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400', text: 'text-yellow-600' },
  Volleyball: { emoji: '🏐', color: 'bg-blue-50 border-blue-200 hover:border-blue-400', text: 'text-blue-600' },
  Baseball: { emoji: '⚾', color: 'bg-red-50 border-red-200 hover:border-red-400', text: 'text-red-600' },
}

const defaultStyle = { emoji: '🏅', color: 'bg-gray-50 border-gray-200 hover:border-gray-400', text: 'text-gray-600' }

function SportSelect() {
  const [sports, setSports] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/sports')
      .then(res => setSports(res.data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Fitness Tracker</h1>
            <p className="text-gray-500 mt-1">Train smarter. Track your progress.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/about')}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-all"
            >
            About
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all"
            >
              View Progress
            </button>
            <button
              onClick={async () => await supabase.auth.signOut()}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        <h2 className="text-lg font-medium text-gray-700 mb-4">Select your sport</h2>
        <div className="grid grid-cols-3 gap-4">
          {sports.map(sport => {
            const style = sportStyles[sport.name] || defaultStyle
            return (
              <div
                key={sport.id}
                onClick={() => navigate(`/goals/${sport.id}`, { state: { sportName: sport.name } })}
                className={`p-8 border-2 rounded-xl text-center cursor-pointer transition-all ${style.color}`}
              >
                <div className="text-5xl mb-3">{style.emoji}</div>
                <p className={`text-xl font-semibold ${style.text}`}>{sport.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SportSelect