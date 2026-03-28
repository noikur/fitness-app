import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

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
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => navigate('/')}
        className="text-blue-500 mb-6 hover:underline"
      >
        ← Back
      </button>
      <h1 className="text-4xl font-bold mb-2">{state?.sportName}</h1>
      <p className="text-gray-500 mb-8">Select a training goal</p>
      <div className="grid grid-cols-3 gap-4">
        {goals.map(goal => (
          <div
            key={goal.id}
            onClick={() => navigate(`/workouts/${goal.id}`, { state: { goalName: goal.name, sportName: state?.sportName } })}
            className="p-8 bg-white border border-gray-200 rounded-xl text-center text-xl font-medium hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
          >
            {goal.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Goals