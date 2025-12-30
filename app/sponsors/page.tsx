import Link from 'next/link';
import TeamImage from '../components/TeamImage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navbar />

      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-purple-400 mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Our Sponsors
            </h1>
            <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto">
              Meet the amazing companies and organizations making Techverse 2026 possible.
              Their generous support helps us create an exceptional experience for all participants.
            </p>
          </div>
        </div>
      </header>

      {/* Sponsors Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">

          {/* Diamond Sponsors */}
          <section>
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-6">
                <span className="text-cyan-300 font-bold text-base sm:text-lg">Platinum SPONSORS</span>
              </div>
              <p className="text-purple-200 text-base sm:text-lg max-w-2xl mx-auto">
                Our premier sponsors providing exceptional support and partnership opportunities.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {/* Diamond Sponsor: Largify Solutions */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-cyan-500/30 text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://media.licdn.com/dms/image/v2/D4D0BAQEalSVncub82w/company-logo_100_100/B4DZgkOgXkHsAU-/0/1752954439639/largify_solutions_limited_logo?e=1764806400&v=beta&t=58Fapum4pT-21AY9fGzegVYhxIT139Ko7ucxhVch0qM" alt="Largify Solutions" width={112} height={112} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3">Largify Solutions</h3>
                <p className="text-purple-200 text-base mb-4">Platinum Sponsor</p>
                <a href="https://www.largifysolutions.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 text-base">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Diamond Sponsor: Intel */}
              {/* <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-cyan-500/30 text-center ">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/1200px-Intel-logo.svg.png" alt="Intel" width={112} height={112} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3">Intel</h3>
                <p className="text-purple-200 text-base mb-4">Platinum Sponsor</p>
                <a href="https://www.intel.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 ">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div> */}

              {/* Diamond Sponsor: Microsoft */}
              {/* <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-cyan-500/30 text-center ">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" width={112} height={112} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3">Microsoft</h3>
                <p className="text-purple-200 text-base mb-4">Platinum Sponsor</p>
                <a href="https://www.microsoft.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 ">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div> */}

              {/* Diamond Sponsor: Google Cloud */}
              {/* <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-cyan-500/30 text-center ">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Cloud_Logo.svg" alt="Google Cloud" width={112} height={112} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3">Google Cloud</h3>
                <p className="text-purple-200 text-base mb-4">Gold Sponsor</p>
                <a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 ">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div> */}

              {/* Diamond Sponsor: GitHub */}
              {/* <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-cyan-500/30 text-center ">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width={112} height={112} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3">GitHub</h3>
                <p className="text-purple-200 text-base mb-4">Gold Sponsor</p>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 ">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div> */}
            </div>
          </section>

          {/* Platinum Sponsors */}
          <section>
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center bg-linear-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/50 rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-6">
                <span className="text-gray-300 font-bold text-base sm:text-lg">🏆 PLATINUM SPONSORS</span>
              </div>
              <p className="text-purple-200 text-base sm:text-lg max-w-2xl mx-auto">
                Distinguished partners providing significant support to our mission.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {/* Platinum Sponsor 1 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-400/30 text-center ">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-400/20 rounded-full flex items-center justify-center border-2 border-gray-300/50">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-300">🏢</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-3">Coming Soon</h3>
                <p className="text-purple-200 text-sm mb-4">Platinum Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-gray-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Platinum Sponsor 2 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-400/30 text-center ">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-400/20 rounded-full flex items-center justify-center border-2 border-gray-300/50">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-300">🏢</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-3">Coming Soon</h3>
                <p className="text-purple-200 text-sm mb-4">Platinum Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-gray-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Platinum Sponsor 3 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-400/30 text-center ">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-400/20 rounded-full flex items-center justify-center border-2 border-gray-300/50">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-300">🏢</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-3">Coming Soon</h3>
                <p className="text-purple-200 text-sm mb-4">Platinum Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-gray-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Platinum Sponsor 4 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-400/30 text-center ">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-400/20 rounded-full flex items-center justify-center border-2 border-gray-300/50">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-300">🏢</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-3">Coming Soon</h3>
                <p className="text-purple-200 text-sm mb-4">Platinum Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-gray-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>
            </div>
          </section>

          {/* Gold Sponsors */}
          <section>
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center bg-linear-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-6">
                <span className="text-yellow-300 font-bold text-base sm:text-lg">🥇 GOLD SPONSORS</span>
              </div>
              <p className="text-purple-200 text-base sm:text-lg max-w-2xl mx-auto">
                Valued partners contributing significantly to our success.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {/* Gold Sponsor 1 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-500/30 text-center ">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center border-2 border-yellow-400/50">
                  <span className="text-3xl sm:text-4xl font-bold text-yellow-300">🏢</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-yellow-300 mb-3">Coming Soon</h3>
                <p className="text-purple-200 text-sm mb-4">Gold Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-yellow-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Gold Sponsor 2 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-500/30 text-center ">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center border-2 border-yellow-400/50">
                  <span className="text-3xl sm:text-4xl font-bold text-yellow-300">🏢</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-yellow-300 mb-3">Coming Soon</h3>
                <p className="text-purple-200 text-sm mb-4">Gold Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-yellow-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Gold Sponsor 3 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-500/30 text-center ">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center border-2 border-yellow-400/50">
                  <span className="text-3xl sm:text-4xl font-bold text-yellow-300">🏢</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-yellow-300 mb-3">Coming Soon</h3>
                <p className="text-purple-200 text-sm mb-4">Gold Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-yellow-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>
            </div>
          </section>

          {/* Bronze Sponsors */}
          <section>
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center bg-linear-to-r from-amber-600/20 to-amber-500/20 border border-amber-500/50 rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-6">
                <span className="text-amber-300 font-bold text-base sm:text-lg">🥉 BRONZE SPONSORS</span>
              </div>
              <p className="text-purple-200 text-base sm:text-lg max-w-2xl mx-auto">
                Supportive partners helping us build a stronger tech community.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Bronze Sponsor 1 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-amber-500/30 text-center ">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-amber-500/20 rounded-full flex items-center justify-center border-2 border-amber-400/50">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-300">🏢</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-amber-300 mb-2">Coming Soon</h3>
                <p className="text-purple-200 text-xs sm:text-sm mb-3">Bronze Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-amber-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Bronze Sponsor 2 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-amber-500/30 text-center ">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-amber-500/20 rounded-full flex items-center justify-center border-2 border-amber-400/50">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-300">🏢</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-amber-300 mb-2">Coming Soon</h3>
                <p className="text-purple-200 text-xs sm:text-sm mb-3">Bronze Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-amber-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Bronze Sponsor 3 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-amber-500/30 text-center ">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-amber-500/20 rounded-full flex items-center justify-center border-2 border-amber-400/50">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-300">🏢</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-amber-300 mb-2">Coming Soon</h3>
                <p className="text-purple-200 text-xs sm:text-sm mb-3">Bronze Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-amber-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Bronze Sponsor 4 */}
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-amber-500/30 text-center ">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-amber-500/20 rounded-full flex items-center justify-center border-2 border-amber-400/50">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-300">🏢</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-amber-300 mb-2">Coming Soon</h3>
                <p className="text-purple-200 text-xs sm:text-sm mb-3">Bronze Sponsor</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-amber-400 "
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>
            </div>
          </section>

          {/* Become a Sponsor CTA */}
          <section className="text-center">
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-purple-500/30 max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-300 mb-4 sm:mb-6">Become a Sponsor</h3>
              <p className="text-purple-200 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join leading companies in supporting Pakistan&apos;s premier technology competition.
                Partner with us to connect with the next generation of tech innovators and showcase your brand to talented developers.
              </p>
              <a
                href="mailto:techverse@umt.edu.pk?subject=Sponsorship%20Inquiry"
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl  transform hover:scale-105 inline-block"
              >
                Contact Us for Sponsorship
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}