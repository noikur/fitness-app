import { useNavigate } from 'react-router-dom'

function Disclaimer() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Health Disclaimer</h1>
          <p className="text-gray-500 text-sm mb-6">Please read before continuing</p>

          <div className="space-y-4 text-sm text-gray-600 mb-8">
            <p>
              The workout plans and training programs provided in this app are based on established sport science principles and are intended for general fitness improvement purposes only.
            </p>
            <p>
              <span className="font-medium text-gray-900">Before starting any new training programme</span>, you should consult a qualified medical professional or certified trainer, particularly if you have any of the following:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Existing injuries or physical conditions</li>
              <li>Heart or cardiovascular conditions</li>
              <li>Joint or muscle problems</li>
              <li>Any chronic health conditions</li>
            </ul>
            <p>
              This app is not a substitute for professional medical advice. Always listen to your body and stop any exercise that causes pain or discomfort.
            </p>
            <p className="text-xs text-gray-400">
              By continuing you acknowledge that you have read and understood this disclaimer and accept full responsibility for your training.
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.setItem('disclaimerAccepted', 'true')
              navigate('/')
            }}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-all"
          >
            I understand, continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer