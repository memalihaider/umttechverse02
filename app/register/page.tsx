import RegistrationForm from '../components/RegistrationForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Techverse 2026
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/#about"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                About
              </Link>
              <Link
                href="/#modules"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                Modules
              </Link>
              <Link
                href="/#organizers"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                Executives
              </Link>
              <Link
                href="/team"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                Team
              </Link>
              <Link
                href="/business-innovation"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                Business Innovation
              </Link>
              <Link
                href="/certificate"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                Certificate
              </Link>
              <Link
                href="/sponsors"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                Sponsors
              </Link>
              <Link
                href="/register"
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto mt-16">
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