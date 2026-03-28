import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [logged, setLogged] = useState({})
  const [notes, setNotes] = useState({})
  const { goalId } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/workouts/${goalId}`)
      .then(res => setWorkouts(res.data))
  }, [goalId])

  const logSession = (workoutId) => {
    axios.post('http://127.0.0.1:5000/sessions', {
      workout_id: workoutId,
      notes: notes[workoutId] || ''
    }).then(() => {
      setLogged(prev => ({ ...prev, [workoutId]: true }))
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 mb-6 hover:underline"
      >
        ← Back
      </button>
      <h1 className="text-4xl font-bold mb-2">{state?.goalName}</h1>
      <p className="text-gray-500 mb-8">{state?.sportName} workouts</p>
      <div className="grid grid-cols-1 gap-4">
        {workouts.map(workout => (
          <div
            key={workout.id}
            className="p-6 bg-white border border-gray-200 rounded-xl transition-all"
          >
            <h2 className="text-xl font-medium mb-1">{workout.name}</h2>
            <p className="text-gray-500 mb-4">{workout.description}</p>
            <textarea
              placeholder="Add notes (optional)"
              className="w-full border border-gray-200 rounded-lg p-2 text-sm mb-3 resize-none"
              rows={2}
              onChange={e => setNotes(prev => ({ ...prev, [workout.id]: e.target.value }))}
            />
            <button
              onClick={() => logSession(workout.id)}
              disabled={logged[workout.id]}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                logged[workout.id]
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {logged[workout.id] ? '✓ Logged' : 'Log Session'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Workouts