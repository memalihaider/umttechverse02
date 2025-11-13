'use client'

import Link from 'next/link'

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
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
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Our Team
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-8">
              Meet the dedicated teams and participants behind Techverse 2026
            </p>
            <div className="text-lg text-purple-300">
              <p>👥 Supporting Teams • 🎯 Module Coordinators • 🎨 Creative Team • 🏛️ University Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Supporting Team
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              The backbone of Techverse 2026 - dedicated professionals working tirelessly to make this event a success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-purple-900/30 rounded-xl p-8 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                👨‍💼
              </div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Module Coordinators</h3>
              <p className="text-purple-200 mb-4">
                Expert coordinators overseeing each competition module, ensuring fair play and technical excellence.
              </p>
              <div className="space-y-2 text-sm text-purple-300">
                <p>• Technical expertise in their domains</p>
                <p>• Competition rule enforcement</p>
                <p>• Participant support and guidance</p>
                <p>• Judging panel coordination</p>
              </div>
            </div>

            <div className="bg-purple-900/30 rounded-xl p-8 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                🎨
              </div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Design & Creative Team</h3>
              <p className="text-purple-200 mb-4">
                Creative minds crafting the visual identity and promotional materials for Techverse 2026.
              </p>
              <div className="space-y-2 text-sm text-purple-300">
                <p>• Event branding and graphics</p>
                <p>• Social media content creation</p>
                <p>• Promotional material design</p>
                <p>• Digital marketing campaigns</p>
              </div>
            </div>

            <div className="bg-purple-900/30 rounded-xl p-8 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                🏛️
              </div>
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">University of Management and Technology</h3>
              <p className="text-purple-200 mb-4">
                Our esteemed host institution providing world-class facilities and academic excellence.
              </p>
              <div className="space-y-2 text-sm text-purple-300">
                <p>• State-of-the-art campus facilities</p>
                <p>• Academic and administrative support</p>
                <p>• Technical infrastructure</p>
                <p>• Event hosting expertise</p>
              </div>
            </div>
          </div>

          {/* Additional Teams */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-blue-300 mb-12">Additional Support Teams</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  📣
                </div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Public Relations</h4>
                <p className="text-purple-300 text-sm">Media outreach and public communication</p>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  🎪
                </div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Event Management</h4>
                <p className="text-purple-300 text-sm">Logistics and on-site coordination</p>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  💰
                </div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Finance Team</h4>
                <p className="text-purple-300 text-sm">Budget management and sponsorships</p>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  👥
                </div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Volunteer Team</h4>
                <p className="text-purple-300 text-sm">Dedicated volunteers supporting the event</p>
              </div>
            </div>
          </div>

          {/* Participants Section */}
          <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-blue-300 mb-4">Our Participants</h3>
              <p className="text-purple-200 text-lg">
                Techverse 2026 brings together the brightest minds from universities across Pakistan
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  🎓
                </div>
                <h4 className="text-xl font-semibold text-blue-300 mb-2">University Students</h4>
                <p className="text-purple-200">
                  Undergraduate and graduate students from top universities showcasing their technical skills
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  💡
                </div>
                <h4 className="text-xl font-semibold text-blue-300 mb-2">Tech Innovators</h4>
                <p className="text-purple-200">
                  Young entrepreneurs and innovators bringing fresh ideas and creative solutions
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  🏆
                </div>
                <h4 className="text-xl font-semibold text-blue-300 mb-2">Competition Enthusiasts</h4>
                <p className="text-purple-200">
                  Competitive programmers, gamers, and tech enthusiasts ready to prove their mettle
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20 text-center">
            <h3 className="text-2xl font-semibold text-blue-300 mb-6">Get In Touch</h3>
            <div className="grid md:grid-cols-2 gap-6 text-purple-200">
              <div>
                <p className="font-medium mb-2">📧 Email</p>
                <p>techverse@umt.edu.pk</p>
              </div>
              <div>
                <p className="font-medium mb-2">📱 Phone</p>
                <p>+92 42 35212801-10</p>
              </div>
              <div>
                <p className="font-medium mb-2">📍 Address</p>
                <p>University of Management and Technology, Lahore, Pakistan</p>
              </div>
              <div>
                <p className="font-medium mb-2">🌐 Website</p>
                <p>www.umt.edu.pk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-purple-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Techverse 2026
              </h3>
              <p className="text-purple-200 mb-4">
                Pakistan's Premier Technology Competition Event. Where innovation meets competition,
                and the future of technology is shaped by today's brightest minds.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-purple-400 hover:text-blue-400 transition-colors">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="text-purple-400 hover:text-blue-400 transition-colors">
                  <span className="text-xl">📷</span>
                </a>
                <a href="#" className="text-purple-400 hover:text-blue-400 transition-colors">
                  <span className="text-xl">🐦</span>
                </a>
                <a href="#" className="text-purple-400 hover:text-blue-400 transition-colors">
                  <span className="text-xl">💼</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-purple-200">
                <li><Link href="/#about" className="hover:text-blue-300 transition-colors">About Event</Link></li>
                <li><Link href="/#modules" className="hover:text-blue-300 transition-colors">Competition Modules</Link></li>
                <li><Link href="/#organizers" className="hover:text-blue-300 transition-colors">Executives</Link></li>
                <li><Link href="/team" className="hover:text-blue-300 transition-colors">Our Team</Link></li>
                <li><Link href="/register" className="hover:text-blue-300 transition-colors">Register Now</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-4">Contact Info</h4>
              <div className="space-y-2 text-purple-200">
                <p>📧 techverse@umt.edu.pk</p>
                <p>📱 +92 42 35212801-10</p>
                <p>🏛️ UMT Lahore, Pakistan</p>
                <p>📅 Nov 13-14, 2025</p>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
            <p className="text-purple-400">
              © 2025 Techverse 2026. Organized by University of Management and Technology. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}