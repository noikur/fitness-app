import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

function Dashboard() {
  const [sessions, setSessions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/sessions')
      .then(res => {
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
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => navigate('/')}
        className="text-blue-500 mb-6 hover:underline"
      >
        ← Back
      </button>
      <h1 className="text-4xl font-bold mb-2">Your Progress</h1>
      <p className="text-gray-500 mb-8">Sessions completed over time</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Sessions per day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sessions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-2">Total sessions</h2>
        <p className="text-5xl font-bold text-blue-500">
          {sessions.reduce((sum, s) => sum + s.count, 0)}
        </p>
      </div>
    </div>
  )
}

export default Dashboard