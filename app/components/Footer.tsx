export default function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-purple-500/20 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Techverse 2026
            </h3>
            <p className="text-purple-200 mb-3 sm:mb-4 text-sm sm:text-base">
              Pakistan's Premier Technology Competition Event. Where innovation meets competition,
              and the future of technology is shaped by today's brightest minds.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://www.youtube.com/@UMTTechverse" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-red-400 transition-colors">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/umttechverse" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/techverse.chapter2/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-pink-400 transition-colors">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.949.013 6.76.072 5.575.131 4.829.28 4.194.512c-.663.234-1.225.546-1.787.973-.562.427-1.05.99-1.412 1.651-.362.661-.587 1.377-.722 2.107-.135.73-.18 1.496-.135 2.265v7.986c-.045.769 0 1.535.135 2.265.135.73.36 1.446.722 2.107.362.661.85 1.224 1.412 1.651.562.427 1.124.739 1.787.973.765.234 1.511.381 2.696.44 1.189.059 1.636.072 5.257.072s4.068-.013 5.257-.072c1.185-.059 1.931-.206 2.696-.44.663-.234 1.225-.546 1.787-.973.562-.427 1.05-.99 1.412-1.651.362-.661.587-1.377.722-2.107.135-.73.18-1.496.135-2.265V6.986c.045-.769 0-1.535-.135-2.265-.135-.73-.36-1.446-.722-2.107-.362-.661-.85-1.224-1.412-1.651-.562-.427-1.124-.739-1.787-.973C17.171.28 16.425.131 15.24.072 14.051.013 13.604 0 12.017 0zm0 2.163c3.584 0 4.01.014 5.417.08.981.046 1.523.208 1.879.346.493.191.847.419 1.217.79.37.37.599.724.79 1.217.138.356.3.898.346 1.879.066 1.407.08 1.833.08 5.417s-.014 4.01-.08 5.417c-.046.981-.208 1.523-.346 1.879-.191.493-.419.847-.79 1.217-.37.37-.724.599-1.217.79-.356.138-.898.3-1.879.346-1.407.066-1.833.08-5.417.08s-4.01-.014-5.417-.08c-.981-.046-1.523-.208-1.879-.346-.493-.191-.847-.419-1.217-.79-.37-.37-.599-.724-.79-1.217-.138-.356-.3-.898-.346-1.879-.066-1.407-.08-1.833-.08-5.417s.014-4.01.08-5.417c.046-.981.208-1.523.346-1.879.191-.493.419-.847.79-1.217.37-.37.724-.599 1.217-.79.356-.138.898-.3 1.879-.346 1.407-.066 1.833-.08 5.417-.08zM12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zm0 10.18a4.001 4.001 0 1 1 0-8.002 4.001 4.001 0 0 1 0 8.002zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 text-purple-200 text-sm sm:text-base">
              <li><a href="#about" className="hover:text-blue-300 transition-colors">About Event</a></li>
              <li><a href="/modules" className="hover:text-blue-300 transition-colors">Competition Modules</a></li>
              <li><a href="#organizers" className="hover:text-blue-300 transition-colors">Executives</a></li>
              <li><a href="/team" className="hover:text-blue-300 transition-colors">Our Team</a></li>
              <li><a href="/register" className="hover:text-blue-300 transition-colors">Register Now</a></li>
                <li><a href="/rules" className="hover:text-blue-300 transition-colors">Rules & Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-3 sm:mb-4">Contact Info</h4>
            <div className="space-y-2 text-purple-200 text-sm sm:text-base">
              <p>📧 techverse@umt.edu.pk</p>
              <p>🏛️ UMT Lahore, Pakistan</p>
              <p>📅 Jan 5-11, 2026</p>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-purple-400 text-sm sm:text-base">
            © 2026 Techverse Ch02. Organized by University of Management and Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}