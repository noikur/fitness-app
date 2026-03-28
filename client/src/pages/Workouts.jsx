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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 mb-6 hover:underline text-sm"
        >
          ← Back to goals
        </button>

        <div className="mb-8">
          <p className="text-blue-500 text-sm font-medium mb-1">{state?.sportName}</p>
          <h1 className="text-4xl font-bold text-gray-900">{state?.goalName}</h1>
          <p className="text-gray-500 mt-1">Complete the workouts below and log your sessions</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {workouts.map((workout, index) => (
            <div
              key={workout.id}
              className={`p-6 bg-white border-2 rounded-xl transition-all ${
                logged[workout.id] ? 'border-green-300 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Exercise {index + 1}</span>
                  <h2 className="text-xl font-semibold text-gray-900 mt-1">{workout.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">{workout.description}</p>
                </div>
                {logged[workout.id] && (
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                    ✓ Completed
                  </span>
                )}
              </div>

              {!logged[workout.id] && (
                <>
                  <textarea
                    placeholder="Add notes (optional)"
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm mb-3 resize-none focus:outline-none focus:border-blue-400"
                    rows={2}
                    onChange={e => setNotes(prev => ({ ...prev, [workout.id]: e.target.value }))}
                  />
                  <button
                    onClick={() => logSession(workout.id)}
                    className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all"
                  >
                    Log Session
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Workouts