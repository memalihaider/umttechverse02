import RegistrationForm from '../components/RegistrationForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen">
      {/* Full-screen background */}
      <div className="fixed inset-0 bg-linear-to-br from-black via-purple-900 to-blue-900 -z-10" />
      
      {/* Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        {/* Go Back to Home Link */}
        <div className="max-w-7xl mx-auto mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-purple-300 hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base font-medium group"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Register for Techverse 2026
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-purple-300 max-w-2xl mx-auto leading-relaxed">
              Fill out the form below to register for your chosen module.
            </p>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}