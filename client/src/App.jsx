import { Routes, Route } from 'react-router-dom'
import SportSelect from './pages/SportSelect'
import Goals from './pages/Goals'
import Workouts from './pages/Workouts'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SportSelect />} />
      <Route path="/goals/:sportId" element={<Goals />} />
      <Route path="/workouts/:goalId" element={<Workouts />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App