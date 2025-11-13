'use client'

import Link from 'next/link'
import { modules } from '@/lib/modules'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Techverse 2026
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="#about"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                About
              </Link>
              <Link
                href="#modules"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                Modules
              </Link>
              <Link
                href="#organizers"
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
                Business Portal
              </Link>
              <Link
                href="/certificate"
                className="text-purple-200 hover:text-blue-300 transition-colors"
              >
                Certificate
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

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20">
            <h1 className="text-6xl md:text-8xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
              TECHVERSE 2026
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-8">
              Where Innovation Meets Competition
            </p>
            <div className="text-lg text-purple-300 mb-8">
              <p className="mb-2">📅 Date: 13-14 November 2025</p>
              <p className="mb-2">📍 Venue: University of Management and Technology (UMT), Lahore</p>
              <p>🎯 Join Pakistan's Premier Tech Competition Event</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Register Now
              </Link>
              <a
                href="#modules"
                className="border-2 border-purple-500/50 text-purple-200 hover:bg-purple-500/20 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                View Modules
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20">
              <div className="text-4xl font-bold text-blue-300 mb-2">16+</div>
              <div className="text-purple-200">Exciting Modules</div>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20">
              <div className="text-4xl font-bold text-blue-300 mb-2">500+</div>
              <div className="text-purple-200">Expected Participants</div>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20">
              <div className="text-4xl font-bold text-blue-300 mb-2">PKR 50K+</div>
              <div className="text-purple-200">Total Prize Pool</div>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20">
              <div className="text-4xl font-bold text-blue-300 mb-2">48hrs</div>
              <div className="text-purple-200">Non-Stop Innovation</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Event */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              About Techverse 2026
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Techverse 2026 is Pakistan's premier technology competition event, bringing together the brightest minds in technology,
              innovation, and creativity. From AI and cybersecurity to gaming and robotics, experience the future of technology today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-2xl font-semibold text-blue-300 mb-4">🎯 Our Mission</h3>
                <p className="text-purple-200">
                  To create a platform where technology enthusiasts can showcase their skills, learn from peers,
                  and compete in an environment that fosters innovation and collaboration.
                </p>
              </div>
              <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-2xl font-semibold text-blue-300 mb-4">🏆 What to Expect</h3>
                <p className="text-purple-200">
                  Intense competitions, networking opportunities, workshops, and prizes worth over PKR 50,000.
                  Join us for 48 hours of non-stop technological excellence.
                </p>
              </div>
            </div>

            <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-semibold text-blue-300 mb-6 text-center">Event Highlights</h3>
              <ul className="space-y-4 text-purple-200">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">⚡</span>
                  16+ Diverse Technology Modules
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">🎮</span>
                  Gaming, AI, Robotics & Cybersecurity
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">💰</span>
                  Massive Prize Pool & Certificates
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">🤝</span>
                  Networking with Industry Experts
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">🏢</span>
                  Hosted at UMT Lahore Campus
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-3">⏰</span>
                  48 Hours of Continuous Innovation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Business Innovation Signature Module */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-4 py-2 mb-6">
              <span className="text-yellow-300 font-semibold text-sm">⭐ SIGNATURE MODULE</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-6">
              Business Innovation Challenge
            </h2>
            <p className="text-xl md:text-2xl text-purple-200 max-w-4xl mx-auto">
              Techverse 2026's flagship competition where entrepreneurship meets technology.
              Transform your innovative ideas into real business solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Challenge Details */}
            <div className="space-y-8">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="text-3xl mr-3">🚀</span>
                  Challenge Overview
                </h3>
                <div className="space-y-4 text-purple-200">
                  <p className="text-lg">
                    Develop groundbreaking business solutions that address real-world problems using cutting-edge technology,
                    innovative thinking, and entrepreneurial vision.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-purple-900/40 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-300">PKR 50K</div>
                      <div className="text-sm text-purple-300">1st Prize</div>
                    </div>
                    <div className="bg-purple-900/40 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-300">PKR 30K</div>
                      <div className="text-sm text-purple-300">2nd Prize</div>
                    </div>
                    <div className="bg-purple-900/40 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-300">PKR 20K</div>
                      <div className="text-sm text-purple-300">3rd Prize</div>
                    </div>
                    <div className="bg-purple-900/40 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-300">Special</div>
                      <div className="text-sm text-purple-300">Mentions</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="text-3xl mr-3">📊</span>
                  Competition Phases
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h4 className="text-blue-300 font-semibold">Idea Selection</h4>
                      <p className="text-purple-300 text-sm">Submit your innovative business concept</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h4 className="text-purple-300 font-semibold">Design Phase</h4>
                      <p className="text-purple-300 text-sm">Develop detailed business plans and prototypes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h4 className="text-green-300 font-semibold">Development</h4>
                      <p className="text-purple-300 text-sm">Build MVP and validate market fit</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div>
                      <h4 className="text-yellow-300 font-semibold">Final Submission</h4>
                      <p className="text-purple-300 text-sm">Present to judges and compete for prizes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Features & CTA */}
            <div className="space-y-8">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="text-3xl mr-3">🏆</span>
                  Why Join Business Innovation?
                </h3>
                <ul className="space-y-4 text-purple-200">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Real-World Impact:</strong> Solve actual business problems with technology
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Industry Mentorship:</strong> Get guidance from successful entrepreneurs
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Live Scoring:</strong> Real-time evaluation and leaderboard tracking
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Networking:</strong> Connect with investors and industry leaders
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Career Boost:</strong> Internship opportunities and job placements
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Comprehensive Support:</strong> Templates, workshops, and resources
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Evaluation Criteria
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">30%</div>
                    <div className="text-sm text-purple-300">Problem-Solution Fit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">25%</div>
                    <div className="text-sm text-purple-300">Market Potential</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">20%</div>
                    <div className="text-sm text-purple-300">Technical Feasibility</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">15%</div>
                    <div className="text-sm text-purple-300">Business Model</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">10%</div>
                    <div className="text-sm text-purple-300">Presentation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">100%</div>
                    <div className="text-sm text-purple-300">Total Score</div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Link
                  href="/business-innovation"
                  className="bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-500 hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
                >
                  🚀 Enter Business Innovation Challenge
                </Link>
                <p className="text-purple-300 text-sm">
                  Limited spots available • Early registration recommended
                </p>
              </div>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">50+</div>
                <div className="text-purple-200">Teams Expected</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">4</div>
                <div className="text-purple-200">Competition Phases</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">PKR 100K+</div>
                <div className="text-purple-200">Total Rewards</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">48hrs</div>
                <div className="text-purple-200">Innovation Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Competition Modules
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Choose from our diverse range of technology competitions. Each module offers unique challenges
              and opportunities to showcase your skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <Link
                key={index}
                href={`/modules/${encodeURIComponent(module.name)}`}
                className="bg-purple-900/30 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 block"
              >
                <div className="h-48 bg-linear-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-6xl">
                    {module.name.includes('AI') && '🤖'}
                    {module.name.includes('Cyber') && '🔒'}
                    {module.name.includes('FIFA') && '⚽'}
                    {module.name.includes('Robot') && '🤖'}
                    {module.name.includes('PUBG') && '🎮'}
                    {module.name.includes('Programming') && '💻'}
                    {module.name.includes('Wiring') && '⚡'}
                    {module.name.includes('Sumo') && '🤼'}
                    {module.name.includes('Tekken') && '🥊'}
                    {module.name.includes('UI/UX') && '🎨'}
                    {module.name.includes('Valorant') && '🎯'}
                    {module.name.includes('Web') && '🌐'}
                    {module.name.includes('Business') && '💼'}
                    {!module.name.includes('AI') && !module.name.includes('Cyber') && !module.name.includes('FIFA') && !module.name.includes('Robot') && !module.name.includes('PUBG') && !module.name.includes('Programming') && !module.name.includes('Wiring') && !module.name.includes('Sumo') && !module.name.includes('Tekken') && !module.name.includes('UI/UX') && !module.name.includes('Valorant') && !module.name.includes('Web') && !module.name.includes('Business') && '🏆'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">{module.name}</h3>
                  <div className="space-y-2 text-sm text-purple-200">
                    <p><span className="font-medium">Fee:</span> PKR {module.fee}</p>
                    <p><span className="font-medium">Team Size:</span> {module.teamSize}</p>
                    <p><span className="font-medium">Contact:</span> {module.contact}</p>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Event Highlights
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Experience the excitement and energy of Techverse through our highlight videos.
            </p>
          </div>

          <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
            <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-purple-200 text-lg">Event highlight videos will be available soon!</p>
                <p className="text-purple-400 text-sm mt-2">Stay tuned for exciting content from Techverse 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizers */}
      <section id="organizers" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Techverse Executives
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Meet the visionary leadership team behind Techverse 2026, dedicated to bringing you Pakistan's premier technology competition event.
            </p>
          </div>

          {/* Executive Leadership */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-blue-300 mb-8">Executive Leadership</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-24 h-24 bg-linear-to-br from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  👑
                </div>
                <h3 className="text-xl font-semibold text-blue-300 mb-2">President</h3>
                <p className="text-purple-200 font-medium mb-1">[Name to be announced]</p>
                <p className="text-purple-300 text-sm">Visionary leader guiding Techverse 2026</p>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  🏆
                </div>
                <h3 className="text-xl font-semibold text-blue-300 mb-2">Vice President</h3>
                <p className="text-purple-200 font-medium mb-1">[Name to be announced]</p>
                <p className="text-purple-300 text-sm">Strategic operations and event management</p>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-24 h-24 bg-linear-to-br from-pink-500 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  💎
                </div>
                <h3 className="text-xl font-semibold text-blue-300 mb-2">Female Vice President</h3>
                <p className="text-purple-200 font-medium mb-1">[Name to be announced]</p>
                <p className="text-purple-300 text-sm">Empowering diversity and inclusion</p>
              </div>
            </div>
          </div>

          {/* Executive Council */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-blue-300 mb-8">Executive Council</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-20 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  📋
                </div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Secretary General</h3>
                <p className="text-purple-200 font-medium mb-1">[Name to be announced]</p>
                <p className="text-purple-300 text-sm">Administrative leadership</p>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-20 h-20 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  �
                </div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">General Secretary</h3>
                <p className="text-purple-200 font-medium mb-1">[Name to be announced]</p>
                <p className="text-purple-300 text-sm">Documentation and records</p>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  🎯
                </div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Director General</h3>
                <p className="text-purple-200 font-medium mb-1">[Name to be announced]</p>
                <p className="text-purple-300 text-sm">Strategic direction and execution</p>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                <div className="w-20 h-20 bg-linear-to-br from-red-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  📸
                </div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Media Secretary</h3>
                <p className="text-purple-200 font-medium mb-1">[Name to be announced]</p>
                <p className="text-purple-300 text-sm">Media relations and publicity</p>
              </div>
            </div>
          </div>

          {/* Supporting Team */}
          <div className="text-center">
            <Link
              href="/team"
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Meet Our Full Team
            </Link>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl p-12 border border-purple-500/30">
            <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Ready to Compete?
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              Join hundreds of tech enthusiasts in Pakistan's most exciting technology competition.
              Register now and be part of Techverse 2026!
            </p>
            <Link
              href="/register"
              className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              Register for Techverse 2026
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-purple-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
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
                <li><Link href="#about" className="hover:text-blue-300 transition-colors">About Event</Link></li>
                <li><Link href="#modules" className="hover:text-blue-300 transition-colors">Competition Modules</Link></li>
                <li><Link href="#organizers" className="hover:text-blue-300 transition-colors">Executives</Link></li>
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