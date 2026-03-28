const express = require('express')
const cors = require('cors')
require('dotenv').config()

const supabase = require('./supabase')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})

app.get('/sports', async (req, res) => {
  const { data, error } = await supabase.from('sports').select('*')
  if (error) return res.status(500).json({ error })
  res.json(data)
})

app.get('/goals/:sportId', async (req, res) => {
  const { sportId } = req.params
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('sport_id', sportId)
  if (error) return res.status(500).json({ error })
  res.json(data)
})

app.get('/workouts/:goalId', async (req, res) => {
  const { goalId } = req.params
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('goal_id', goalId)
  if (error) return res.status(500).json({ error })
  res.json(data)
})

app.post('/sessions', async (req, res) => {
  const { workout_id, notes } = req.body
  const { data, error } = await supabase
    .from('sessions')
    .insert([{ workout_id, notes, completed_at: new Date() }])
    .select()
  if (error) return res.status(500).json({ error })
  res.json(data)
})

app.get('/sessions', async (req, res) => {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .order('completed_at', { ascending: true })
  if (error) return res.status(500).json({ error })
  res.json(data)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))