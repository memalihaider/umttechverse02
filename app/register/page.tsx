import RegistrationForm from '../components/RegistrationForm'
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-7xl mx-auto mt-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Register for Techverse 2026
          </h1>
          <p className="mt-2 text-purple-300">Fill out the form below to register for your chosen module.</p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  )
}