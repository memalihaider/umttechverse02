import RegistrationForm from '../components/RegistrationForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Register for Techverse 2026
          </h1>
          <p className="mt-2 text-purple-300">Fill out the form below to register for your chosen module.</p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  )
}