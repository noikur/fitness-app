import { useNavigate } from 'react-router-dom'

function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-8">
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 mb-6 hover:underline text-sm"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">About</h1>
        <p className="text-gray-500 mb-10">What this app is and who it's for</p>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">What is Fitness Tracker?</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fitness Tracker is a sport-specific performance app designed for athletes of all levels who want to train smarter. Rather than generic gym workouts, every training plan is tailored to a specific sport and athletic goal — helping you build the exact qualities that matter for your sport.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">The Problem We Solve</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Amateur athletes often train inefficiently because they lack access to structured, professional guidance. With so many conflicting resources available online, it's easy to follow counterproductive training plans that lead to plateaus or injuries. Fitness Tracker provides one structured, data-driven resource for athletes without a personal trainer.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Who Is It For?</h2>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Amateur athletes who want structured training without a personal trainer</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Beginners who want sport-specific guidance from day one</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Coaches who want to track their athletes' session completion</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Anyone who wants to move beyond generic fitness apps</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h2>
            <ol className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start gap-2"><span className="text-blue-500 font-medium">1.</span>Pick your sport</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-medium">2.</span>Choose a training goal such as explosiveness, agility or endurance</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-medium">3.</span>Follow the structured workout plan</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-medium">4.</span>Log your sessions and track your progress over time</li>
            </ol>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Disclaimer</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              All workout plans are based on established sport science principles. Always consult a medical professional before starting a new training programme, especially if you have existing injuries or health conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About