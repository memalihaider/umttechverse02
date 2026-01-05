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

        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-md">
              <span className="text-sm font-medium text-red-300">Registration Portal Closed</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-red-200 to-pink-200 bg-clip-text text-transparent mb-6">
              Registration Portal is Now Closed
            </h1>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Thank you for your interest in Techverse 2026! The registration portal has been closed. 
              If you have any questions regarding your registration, please contact us at the event email.
            </p>
            
            <div className="relative">
              {/* Closed Message Glow Effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-pink-600 rounded-3xl blur opacity-20" />
              <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl border border-red-500/20 overflow-hidden p-8 md:p-12">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">Registrations are No Longer Accepted</h2>
                  <p className="text-gray-300 mb-6">
                    The registration deadline has passed. We appreciate your interest in our event!
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}