import RegistrationForm from '../components/RegistrationForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden scroll-smooth selection:bg-purple-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 py-6 sm:py-8 md:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Go Back to Home Link */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 text-xs sm:text-sm font-medium group backdrop-blur-sm"
          >
            <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
              <span className="text-xs sm:text-sm font-medium text-blue-300">Join the Revolution</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 sm:mb-6">
              Register for Techverse 2026
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
              Secure your spot in the biggest tech event of the year. Fill out the form below to get started.
            </p>
          </div>
          
          <div className="relative">
            {/* Form Glow Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20" />
            <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}