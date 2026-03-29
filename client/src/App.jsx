import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import supabase from './supabase'
import Auth from './pages/Auth'
import SportSelect from './pages/SportSelect'
import Goals from './pages/Goals'
import Workouts from './pages/Workouts'
import Dashboard from './pages/Dashboard'
import Disclaimer from './pages/Disclaimer'
import About from './pages/About'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  const disclaimerAccepted = localStorage.getItem('disclaimerAccepted')

  return (
    <Routes>
      <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
      <Route path="/disclaimer" element={user ? <Disclaimer /> : <Navigate to="/auth" />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={
        !user ? <Navigate to="/auth" /> :
        !disclaimerAccepted ? <Navigate to="/disclaimer" /> :
        <SportSelect />
      } />
      <Route path="/goals/:sportId" element={user ? <Goals /> : <Navigate to="/auth" />} />
      <Route path="/workouts/:goalId" element={user ? <Workouts /> : <Navigate to="/auth" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
    </Routes>
  )
}

export default App