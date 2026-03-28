import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SportSelect() {
  const [sports, setSports] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/sports')
      .then(res => setSports(res.data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-2">Fitness Tracker</h1>
      <p className="text-gray-500 mb-8">Select a sport to get started</p>
      <button
  onClick={() => navigate('/dashboard')}
  className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
>
  View Progress
</button>
      <div className="grid grid-cols-3 gap-4">
        {sports.map(sport => (
          <div
            key={sport.id}
            onClick={() => navigate(`/goals/${sport.id}`, { state: { sportName: sport.name } })}
            className="p-8 bg-white border border-gray-200 rounded-xl text-center text-xl font-medium hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
          >
            {sport.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SportSelect