import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

function Dashboard() {
  const [sessions, setSessions] = useState([])
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/sessions')
      .then(res => {
        setTotal(res.data.length)
        const grouped = {}
        res.data.forEach(session => {
          const date = new Date(session.completed_at).toLocaleDateString()
          grouped[date] = (grouped[date] || 0) + 1
        })
        const chartData = Object.entries(grouped).map(([date, count]) => ({ date, count }))
        setSessions(chartData)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 mb-6 hover:underline text-sm"
        >
          ← Back to sports
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-1">Your Progress</h1>
        <p className="text-gray-500 mb-8">Track your training sessions over time</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-2 border-blue-100 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Sessions</p>
            <p className="text-5xl font-bold text-blue-500">{total}</p>
          </div>
          <div className="bg-white border-2 border-green-100 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">Days Active</p>
            <p className="text-5xl font-bold text-green-500">{sessions.length}</p>
          </div>
          <div className="bg-white border-2 border-orange-100 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">Avg Per Day</p>
            <p className="text-5xl font-bold text-orange-500">
              {sessions.length > 0 ? (total / sessions.length).toFixed(1) : 0}
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Sessions over time</h2>
          {sessions.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sessions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-gray-400">
              <p>No sessions logged yet. Start training to see your progress!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard