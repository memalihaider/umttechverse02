'use client'

import Link from 'next/link'
// Image import intentionally removed to avoid server-side prefetch of fragile remote assets; use TeamImage wrapper instead.
import TeamImage from './TeamImage'
import { useState, useEffect } from 'react'
import { modules } from '@/lib/modules'
import Navbar from './Navbar'
import Footer from './Footer'

interface Executive {
  title: string
  name: string
  description: string
  image: string
  linkedin: string
}

export default function LandingPage() {
  const [selectedExecutive, setSelectedExecutive] = useState<Executive | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Add scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll('section')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 overflow-x-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-30 delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-10"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-25 delay-500"></div>

        {/* Simple floating geometric shapes */}
        <div className="absolute top-1/6 left-1/6 w-4 h-4 border-2 border-blue-400/30 rotate-45 animate-bounce opacity-20 delay-300"></div>
        <div className="absolute top-2/3 right-1/6 w-3 h-3 bg-purple-400/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-6 bg-cyan-400/15 rounded-full animate-ping delay-1200"></div>
      </div>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 section-transition relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-purple-500/20 shadow-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight animate-fade-in-up">
              TECHVERSE 2026
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-200 mb-6 sm:mb-8 px-2 animate-slide-in-left delay-200">
              Where Innovation Meets Competition
            </p>
            <div className="text-sm sm:text-base lg:text-lg text-purple-300 mb-6 sm:mb-8 space-y-1 sm:space-y-2 animate-slide-in-right delay-300">
              <p className="mb-1 sm:mb-2">📅 Date: 5-11 January 2026</p>
              <p className="mb-1 sm:mb-2">📍 Venue: University of Management and Technology (UMT), Lahore</p>
              <p>🎯 Join Pakistan's Premier Tech Competition Event</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-scale-in delay-500">
              <Link
                href="/register"
                className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Register Now
              </Link>
              <a
                href="/modules"
                className="border-2 border-purple-500/50 text-purple-200 hover:bg-purple-500/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300"
              >
                View Modules
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event Stats */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20">
              <div className="text-2xl sm:text-4xl font-bold text-blue-300 mb-1 sm:mb-2">16+</div>
              <div className="text-purple-200 text-sm sm:text-base">Exciting Modules</div>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20">
              <div className="text-2xl sm:text-4xl font-bold text-blue-300 mb-1 sm:mb-2">2000+</div>
              <div className="text-purple-200 text-sm sm:text-base">Expected Participants</div>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20">
              <div className="text-2xl sm:text-4xl font-bold text-blue-300 mb-1 sm:mb-2">PKR 480K+</div>
              <div className="text-purple-200 text-sm sm:text-base">Total Prize Pool</div>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20">
              <div className="text-2xl sm:text-4xl font-bold text-blue-300 mb-1 sm:mb-2">7 Days</div>
              <div className="text-purple-200 text-sm sm:text-base">Non-Stop Innovation</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Event */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 section-transition relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              About Techverse 2026
            </h2>
            <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto px-4">
              Techverse 2026 is Pakistan's premier technology event, bringing together the brightest minds in technology,
              innovation, and creativity. From AI and cybersecurity to gaming and robotics, experience the future of technology today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 animate-slide-in-left">
              <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-500/20">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-3 sm:mb-4">🎯 Our Mission</h3>
                <p className="text-purple-200 text-sm sm:text-base">
                  To create a platform where technology enthusiasts can showcase their skills, learn from peers,
                  and compete in an environment that fosters innovation and collaboration.
                </p>
              </div>
              <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 border border-purple-500/20">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-3 sm:mb-4">🏆 What to Expect</h3>
                <p className="text-purple-200 text-sm sm:text-base">
                  Intense competitions, networking opportunities, workshops, and prizes worth over PKR 480,000.
                  Join us for 6 days of non-stop technological excellence.
                </p>
              </div>
            </div>

            <div className="bg-purple-900/30 rounded-xl p-6 sm:p-8 border border-purple-500/20 animate-slide-in-right">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-4 sm:mb-6 text-center">Event Highlights</h3>
              <ul className="space-y-3 sm:space-y-4 text-purple-200 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1">⚡</span>
                  <div>16+ Diverse Technology Modules</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1">🎮</span>
                  <div>Gaming, AI, Robotics & Cybersecurity</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1">💰</span>
                  <div>Massive Prize Pool & Certificates</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1">🤝</span>
                  <div>Networking with Industry Experts</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1">🏢</span>
                  <div>Hosted at UMT Lahore Campus</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1">⏰</span>
                  <div>7 Days of Continuous Innovation</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1">⏰</span>
                  <div>National Level Career Fair</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1">⏰</span>
                  <div>Exciting Workshops & Seminars</div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1">⏰</span>
                  <div>Exclusive Social Nights</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Business Innovation Signature Module */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 section-transition relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-3 sm:px-4 py-1 sm:py-2 mb-4 sm:mb-6">
              <span className="text-yellow-300 font-semibold text-xs sm:text-sm">⭐ SIGNATURE MODULE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
              Business Innovation Challenge
            </h2>
            <p className="text-lg sm:text-xl text-purple-200 max-w-4xl mx-auto px-4">
              Techverse 2026's flagship competition where entrepreneurship meets technology.
              Transform your innovative ideas into real business solutions.
            </p>
            <div className="text-center mb-4">
              <p className="text-yellow-300 text-sm sm:text-base font-medium">
                🗓️ Starts: 15 December 2025 • Duration: 15+ Days • 31st December Submission
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            {/* Left Side - Challenge Details */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-500/30">
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-4 sm:mb-6 flex items-center">
                  <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">🚀</span>
                  Challenge Overview
                </h3>
                <div className="space-y-3 sm:space-y-4 text-purple-200">
                  <p className="text-sm sm:text-base">
                    Develop groundbreaking business solutions that address real-world problems using cutting-edge technology,
                    innovative thinking, and entrepreneurial vision.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                    <div className="bg-purple-900/40 rounded-lg p-3 sm:p-4 text-center">
                      <div className="text-lg sm:text-2xl font-bold text-blue-300">PKR 40K</div>
                      <div className="text-xs sm:text-sm text-purple-300">1st Prize</div>
                    </div>
                    <div className="bg-purple-900/40 rounded-lg p-3 sm:p-4 text-center">
                      <div className="text-lg sm:text-2xl font-bold text-blue-300">PKR 30K</div>
                      <div className="text-xs sm:text-sm text-purple-300">2nd Prize</div>
                    </div>
                    
                  </div>
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-500/30">
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-4 sm:mb-6 flex items-center">
                  <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">📊</span>
                  Competition Phases
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">1</div>
                    <div>
                      <h4 className="text-blue-300 font-semibold text-sm sm:text-base">Idea Selection</h4>
                      <p className="text-purple-300 text-xs sm:text-sm">Submit your innovative business concept</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">2</div>
                    <div>
                      <h4 className="text-purple-300 font-semibold text-sm sm:text-base">Design Phase</h4>
                      <p className="text-purple-300 text-xs sm:text-sm">Develop detailed business plans and prototypes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">3</div>
                    <div>
                      <h4 className="text-green-300 font-semibold text-sm sm:text-base">Development</h4>
                      <p className="text-purple-300 text-xs sm:text-sm">Build MVP and validate market fit</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">4</div>
                    <div>
                      <h4 className="text-yellow-300 font-semibold text-sm sm:text-base">Final Submission</h4>
                      <p className="text-purple-300 text-xs sm:text-sm">Present to judges and compete for prizes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Features & CTA */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-500/30">
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-4 sm:mb-6 flex items-center">
                  <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">🏆</span>
                  Why Join Business Innovation?
                </h3>
                <ul className="space-y-3 sm:space-y-4 text-purple-200 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Real-World Impact:</strong> Solve actual business problems with technology
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Industry Mentorship:</strong> Get guidance from successful entrepreneurs
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Live Scoring:</strong> Real-time evaluation and leaderboard tracking
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Networking:</strong> Connect with investors and industry leaders
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Career Boost:</strong> Internship opportunities and job placements
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 sm:mr-3 mt-1">✓</span>
                    <div>
                      <strong className="text-blue-300">Comprehensive Support:</strong> Templates, workshops, and resources
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-500/30">
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-4 sm:mb-6 flex items-center">
                  <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">🎯</span>
                  Evaluation Criteria
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-300">30%</div>
                    <div className="text-xs sm:text-sm text-purple-300">Problem-Solution Fit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-300">25%</div>
                    <div className="text-xs sm:text-sm text-purple-300">Market Potential</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-300">20%</div>
                    <div className="text-xs sm:text-sm text-purple-300">Technical Feasibility</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-300">15%</div>
                    <div className="text-xs sm:text-sm text-purple-300">Business Model</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-300">10%</div>
                    <div className="text-xs sm:text-sm text-purple-300">Presentation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-300">100%</div>
                    <div className="text-xs sm:text-sm text-purple-300">Total Score</div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3 sm:space-y-4">
                <Link
                  href="/business-innovation"
                  className="bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-500 hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-600 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
                >
                  🚀 Enter Business Innovation Challenge
                </Link>
                <p className="text-purple-300 text-xs sm:text-sm">
                  Limited spots available • Early registration recommended
                </p>
              </div>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-500/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-1 sm:mb-2">30+</div>
                <div className="text-purple-200 text-sm sm:text-base">Teams Expected</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-1 sm:mb-2">4</div>
                <div className="text-purple-200 text-sm sm:text-base">Competition Phases</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-1 sm:mb-2">PKR 80K+</div>
                <div className="text-purple-200 text-sm sm:text-base">Total Rewards</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-1 sm:mb-2">20+ Days</div>
                <div className="text-purple-200 text-sm sm:text-base">Innovation Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Modules Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 section-transition relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-linear-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl p-8 sm:p-12 border border-purple-500/30 animate-scale-in">
            <div className="inline-flex items-center bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 backdrop-blur-sm">
              <span className="text-cyan-300 font-bold text-sm sm:text-base animate-pulse">🎯 COMPETITION MODULES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              Discover All Modules
            </h2>
            <p className="text-lg sm:text-xl text-purple-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Explore our comprehensive collection of 16+ exciting technology competitions.
              From AI and cybersecurity to gaming and robotics - find your perfect challenge.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-purple-900/40 rounded-lg p-3 sm:p-4 text-center border border-purple-500/30">
                <div className="text-lg sm:text-2xl font-bold text-blue-300 mb-1">16+</div>
                <div className="text-xs sm:text-sm text-purple-300">Modules</div>
              </div>
              <div className="bg-purple-900/40 rounded-lg p-3 sm:p-4 text-center border border-purple-500/30">
                <div className="text-lg sm:text-2xl font-bold text-blue-300 mb-1">PKR 480K+</div>
                <div className="text-xs sm:text-sm text-purple-300">Prize Pool</div>
              </div>
              <div className="bg-purple-900/40 rounded-lg p-3 sm:p-4 text-center border border-purple-500/30">
                <div className="text-lg sm:text-2xl font-bold text-blue-300 mb-1">2000+</div>
                <div className="text-xs sm:text-sm text-purple-300">Participants</div>
              </div>
              <div className="bg-purple-900/40 rounded-lg p-3 sm:p-4 text-center border border-purple-500/30">
                <div className="text-lg sm:text-2xl font-bold text-blue-300 mb-1">7 Days</div>
                <div className="text-xs sm:text-sm text-purple-300">Competition</div>
              </div>
            </div>
            <Link
              href="/modules"
              className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              Explore All Modules →
            </Link>
          </div>
        </div>
      </section>

      {/* Collaborating Clubs Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden section-transition">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-6 backdrop-blur-sm">
              <span className="text-cyan-300 font-bold text-sm sm:text-base animate-pulse">🚀 COLLABORATING CLUBS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              Our Partner Communities
            </h2>
            <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto px-4">
              These amazing clubs made Techverse 2026 possible through their collaboration and support.
              Join them to be part of the tech community at UMT.
            </p>
          </div>

          

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
           
            {/* UMT */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl flex flex-col justify-between min-h-[280px]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-2xl overflow-hidden border-2 border-blue-400/50 bg-linear-to-br from-blue-600/20 to-cyan-600/20 p-2 group-hover:border-blue-300/80 transition-all duration-300">
                  <TeamImage
                    src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408937/WhatsApp_Image_2025-10-30_at_10.20.33_7_nvfcno.jpg"
                    alt="Umt Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-300 mb-2 group-hover:text-cyan-300 transition-colors duration-300">UMT</h3>
                <p className="text-purple-200 text-sm mb-4 group-hover:text-purple-100 transition-colors duration-300 grow">University of Management and Technology</p>
                <a
                  href="https://www.umt.edu.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-all duration-300 group-hover:scale-110"
                >
                  <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.949.013 6.76.072 5.575.131 4.829.28 4.194.512c-.663.234-1.225.546-1.787.973-.562.427-1.05.99-1.412 1.651-.362.661-.587 1.377-.722 2.107-.135.73-.18 1.496-.135 2.265v7.986c-.045.769 0 1.535.135 2.265.135.73.36 1.446.722 2.107.362.661.85 1.224 1.412 1.651.562.427 1.124.739 1.787.973.765.234 1.511.381 2.696.44 1.189.059 1.636.072 5.257.072s4.068-.013 5.257-.072c1.185-.059 1.931-.206 2.696-.44.663-.234 1.225-.546 1.787-.973.562-.427 1.05-.99 1.412-1.651.362-.661.587-1.377.722-2.107.135-.73.18-1.496.135-2.265V6.986c.045-.769 0-1.535-.135-2.265-.135-.73-.36-1.446-.722-2.107-.362-.661-.85-1.224-1.412-1.651-.562-.427-1.124-.739-1.787-.973C17.171.28 16.425.131 15.24.072 14.051.013 13.604 0 12.017 0zm0 2.163c3.584 0 4.01.014 5.417.08.981.046 1.523.208 1.879.346.493.191.847.419 1.217.79.37.37.599.724.79 1.217.138.356.3.898.346 1.879.066 1.407.08 1.833.08 5.417s-.014 4.01-.08 5.417c-.046.981-.208 1.523-.346 1.879-.191.493-.419.847-.79 1.217-.37.37-.724.599-1.217.79-.356.138-.898.3-1.879.346-1.407.066-1.833.08-5.417.08s-4.01-.014-5.417-.08c-.981-.046-1.523-.208-1.879-.346-.493-.191-.847-.419-1.217-.79-.37-.37-.599-.724-.79-1.217-.138-.356-.3-.898-.346-1.879-.066-1.407-.08-1.833-.08-5.417s.014-4.01.08-5.417c.046-.981.208-1.523.346-1.879.191-.493.419-.847.79-1.217.37-.37.724-.599 1.217-.79.356-.138.898-.3 1.879-.346 1.407-.066 1.833-.08 5.417-.08zM12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zm0 10.18a4.001 4.001 0 1 1 0-8.002 4.001 4.001 0 0 1 0 8.002zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                  </svg>
                  <span className="text-sm">@umt</span>
                </a>
              </div>
            </div>

            {/* ACM */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl flex flex-col justify-between min-h-[280px]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-2xl overflow-hidden border-2 border-blue-400/50 bg-linear-to-br from-blue-600/20 to-cyan-600/20 p-2 group-hover:border-blue-300/80 transition-all duration-300">
                  <TeamImage
                    src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408946/WhatsApp_Image_2025-10-30_at_10.20.30_3_sn4bqt.jpg"
                    alt="ACM Logo"
                    width={80}
                    height={80}
                    className="w-full h-full "
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-300 mb-2 group-hover:text-cyan-300 transition-colors duration-300"> ACM</h3>
                <p className="text-purple-200 text-sm mb-4 group-hover:text-purple-100 transition-colors duration-300 grow">Association for Computing Machinery</p>
                <a
                  href="https://www.instagram.com/umt.acm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-all duration-300 group-hover:scale-110"
                >
                  <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.949.013 6.76.072 5.575.131 4.829.28 4.194.512c-.663.234-1.225.546-1.787.973-.562.427-1.05.99-1.412 1.651-.362.661-.587 1.377-.722 2.107-.135.73-.18 1.496-.135 2.265v7.986c-.045.769 0 1.535.135 2.265.135.73.36 1.446.722 2.107.362.661.85 1.224 1.412 1.651.562.427 1.124.739 1.787.973.765.234 1.511.381 2.696.44 1.189.059 1.636.072 5.257.072s4.068-.013 5.257-.072c1.185-.059 1.931-.206 2.696-.44.663-.234 1.225-.546 1.787-.973.562-.427 1.05-.99 1.412-1.651.362-.661.587-1.377.722-2.107.135-.73.18-1.496.135-2.265V6.986c.045-.769 0-1.535-.135-2.265-.135-.73-.36-1.446-.722-2.107-.362-.661-.85-1.224-1.412-1.651-.562-.427-1.124-.739-1.787-.973C17.171.28 16.425.131 15.24.072 14.051.013 13.604 0 12.017 0zm0 2.163c3.584 0 4.01.014 5.417.08.981.046 1.523.208 1.879.346.493.191.847.419 1.217.79.37.37.599.724.79 1.217.138.356.3.898.346 1.879.066 1.407.08 1.833.08 5.417s-.014 4.01-.08 5.417c-.046.981-.208 1.523-.346 1.879-.191.493-.419.847-.79 1.217-.37.37-.724.599-1.217.79-.356.138-.898.3-1.879.346-1.407.066-1.833.08-5.417.08s-4.01-.014-5.417-.08c-.981-.046-1.523-.208-1.879-.346-.493-.191-.847-.419-1.217-.79-.37-.37-.599-.724-.79-1.217-.138-.356-.3-.898-.346-1.879-.066-1.407-.08-1.833-.08-5.417s.014-4.01.08-5.417c.046-.981.208-1.523.346-1.879.191-.493.419-.847.79-1.217.37-.37.724-.599 1.217-.79.356-.138.898-.3 1.879-.346 1.407-.066 1.833-.08 5.417-.08zM12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zm0 10.18a4.001 4.001 0 1 1 0-8.002 4.001 4.001 0 0 1 0 8.002zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                  </svg>
                  <span className="text-sm">@acm.umt</span>
                </a>
              </div>
            </div>

            {/* UMT Cybersecurity */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-green-600 via-emerald-600 to-green-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center border border-green-500/30 hover:border-green-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl flex flex-col justify-between min-h-[280px]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-2xl overflow-hidden border-2 border-green-400/50 bg-linear-to-br from-green-600/20 to-emerald-600/20 p-2 group-hover:border-green-300/80 transition-all duration-300">
                  <TeamImage
                    src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408946/WhatsApp_Image_2025-10-30_at_10.20.31_6_iykpxo.jpg"
                    alt="UMT Cybersecurity Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover "
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-green-300 mb-2 group-hover:text-emerald-300 transition-colors duration-300">Cybersecurity</h3>
                <p className="text-purple-200 text-sm mb-4 group-hover:text-purple-100 transition-colors duration-300 grow">Cybersecurity Society at UMT</p>
                <a
                  href="https://www.instagram.com/umtcybersecurity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-all duration-300 group-hover:scale-110"
                >
                  <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.949.013 6.76.072 5.575.131 4.829.28 4.194.512c-.663.234-1.225.546-1.787.973-.562.427-1.05.99-1.412 1.651-.362.661-.587 1.377-.722 2.107-.135.73-.18 1.496-.135 2.265v7.986c-.045.769 0 1.535.135 2.265.135.73.36 1.446.722 2.107.362.661.85 1.224 1.412 1.651.562.427 1.124.739 1.787.973.765.234 1.511.381 2.696.44 1.189.059 1.636.072 5.257.072s4.068-.013 5.257-.072c1.185-.059 1.931-.206 2.696-.44.663-.234 1.225-.546 1.787-.973.562-.427 1.05-.99 1.412-1.651.362-.661.587-1.377.722-2.107.135-.73.18-1.496.135-2.265V6.986c.045-.769 0-1.535-.135-2.265-.135-.73-.36-1.446-.722-2.107-.362-.661-.85-1.224-1.412-1.651-.562-.427-1.124-.739-1.787-.973C17.171.28 16.425.131 15.24.072 14.051.013 13.604 0 12.017 0zm0 2.163c3.584 0 4.01.014 5.417.08.981.046 1.523.208 1.879.346.493.191.847.419 1.217.79.37.37.599.724.79 1.217.138.356.3.898.346 1.879.066 1.407.08 1.833.08 5.417s-.014 4.01-.08 5.417c-.046.981-.208 1.523-.346 1.879-.191.493-.419.847-.79 1.217-.37.37-.724.599-1.217.79-.356.138-.898.3-1.879.346-1.407.066-1.833.08-5.417.08s-4.01-.014-5.417-.08c-.981-.046-1.523-.208-1.879-.346-.493-.191-.847-.419-1.217-.79-.37-.37-.599-.724-.79-1.217-.138-.356-.3-.898-.346-1.879-.066-1.407-.08-1.833-.08-5.417s.014-4.01.08-5.417c.046-.981.208-1.523.346-1.879.191-.493.419-.847.79-1.217.37-.37.724-.599 1.217-.79.356-.138.898-.3 1.879-.346 1.407-.066 1.833-.08 5.417-.08zM12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zm0 10.18a4.001 4.001 0 1 1 0-8.002 4.001 4.001 0 0 1 0 8.002zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                  </svg>
                  <span className="text-sm">@umtcybersecurity</span>
                </a>
              </div>
            </div>

            {/* IEEE UMT Branch */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-red-600 via-pink-600 to-red-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center border border-red-500/30 hover:border-red-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl flex flex-col justify-between min-h-[280px]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-2xl overflow-hidden border-2 border-red-400/50 bg-linear-to-br from-red-600/20 to-pink-600/20 p-2 group-hover:border-red-300/80 transition-all duration-300">
                  <TeamImage
                    src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408940/WhatsApp_Image_2025-10-30_at_10.20.32_6_prx5pd.jpg"
                    alt="IEEE Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain "
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-red-300 mb-2 group-hover:text-pink-300 transition-colors duration-300">IEEE UMT</h3>
                <p className="text-purple-200 text-sm mb-4 group-hover:text-purple-100 transition-colors duration-300 grow">Institute of Electrical and Electronics Engineers</p>
                <a
                  href="https://www.instagram.com/ieee.umt.branch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-all duration-300 group-hover:scale-110"
                >
                  <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.949.013 6.76.072 5.575.131 4.829.28 4.194.512c-.663.234-1.225.546-1.787.973-.562.427-1.05.99-1.412 1.651-.362.661-.587 1.377-.722 2.107-.135.73-.18 1.496-.135 2.265v7.986c-.045.769 0 1.535.135 2.265.135.73.36 1.446.722 2.107.362.661.85 1.224 1.412 1.651.562.427 1.124.739 1.787.973.765.234 1.511.381 2.696.44 1.189.059 1.636.072 5.257.072s4.068-.013 5.257-.072c1.185-.059 1.931-.206 2.696-.44.663-.234 1.225-.546 1.787-.973.562-.427 1.05-.99 1.412-1.651.362-.661.587-1.377.722-2.107.135-.73.18-1.496.135-2.265V6.986c.045-.769 0-1.535-.135-2.265-.135-.73-.36-1.446-.722-2.107-.362-.661-.85-1.224-1.412-1.651-.562-.427-1.124-.739-1.787-.973C17.171.28 16.425.131 15.24.072 14.051.013 13.604 0 12.017 0zm0 2.163c3.584 0 4.01.014 5.417.08.981.046 1.523.208 1.879.346.493.191.847.419 1.217.79.37.37.599.724.79 1.217.138.356.3.898.346 1.879.066 1.407.08 1.833.08 5.417s-.014 4.01-.08 5.417c-.046.981-.208 1.523-.346 1.879-.191.493-.419.847-.79 1.217-.37.37-.724.599-1.217.79-.356.138-.898.3-1.879.346-1.407.066-1.833.08-5.417.08s-4.01-.014-5.417-.08c-.981-.046-1.523-.208-1.879-.346-.493-.191-.847-.419-1.217-.79-.37-.37-.599-.724-.79-1.217-.138-.356-.3-.898-.346-1.879-.066-1.407-.08-1.833-.08-5.417s.014-4.01.08-5.417c.046-.981.208-1.523.346-1.879.191-.493.419-.847.79-1.217.37-.37.724-.599 1.217-.79.356-.138.898-.3 1.879-.346 1.407-.066 1.833-.08 5.417-.08zM12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zm0 10.18a4.001 4.001 0 1 1 0-8.002 4.001 4.001 0 0 1 0 8.002zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                  </svg>
                  <span className="text-sm">@ieeeumt</span>
                </a>
              </div>
            </div>

            {/* Gamer Lounge */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 via-violet-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl flex flex-col justify-between min-h-[280px]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-2xl overflow-hidden border-2 border-purple-400/50 bg-linear-to-br from-purple-600/20 to-violet-600/20 p-2 group-hover:border-purple-300/80 transition-all duration-300">
                  <TeamImage
                    src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408952/WhatsApp_Image_2025-10-30_at_10.20.29_2_q1ksqr.jpg"
                    alt="Gamer Lounge Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-purple-300 mb-2 group-hover:text-violet-300 transition-colors duration-300">Gamer Lounge</h3>
                <p className="text-purple-200 text-sm mb-4 group-hover:text-purple-100 transition-colors duration-300 grow">Gaming Community at UMT</p>
                <a
                  href="https://www.instagram.com/umtgamerslounge_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-all duration-300 group-hover:scale-110"
                >
                  <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.949.013 6.76.072 5.575.131 4.829.28 4.194.512c-.663.234-1.225.546-1.787.973-.562.427-1.05.99-1.412 1.651-.362.661-.587 1.377-.722 2.107-.135.73-.18 1.496-.135 2.265v7.986c-.045.769 0 1.535.135 2.265.135.73.36 1.446.722 2.107.362.661.85 1.224 1.412 1.651.562.427 1.124.739 1.787.973.765.234 1.511.381 2.696.44 1.189.059 1.636.072 5.257.072s4.068-.013 5.257-.072c1.185-.059 1.931-.206 2.696-.44.663-.234 1.225-.546 1.787-.973.562-.427 1.05-.99 1.412-1.651.362-.661.587-1.377.722-2.107.135-.73.18-1.496.135-2.265V6.986c.045-.769 0-1.535-.135-2.265-.135-.73-.36-1.446-.722-2.107-.362-.661-.85-1.224-1.412-1.651-.562-.427-1.124-.739-1.787-.973C17.171.28 16.425.131 15.24.072 14.051.013 13.604 0 12.017 0zm0 2.163c3.584 0 4.01.014 5.417.08.981.046 1.523.208 1.879.346.493.191.847.419 1.217.79.37.37.599.724.79 1.217.138.356.3.898.346 1.879.066 1.407.08 1.833.08 5.417s-.014 4.01-.08 5.417c-.046.981-.208 1.523-.346 1.879-.191.493-.419.847-.79 1.217-.37.37-.724.599-1.217.79-.356.138-.898.3-1.879.346-1.407.066-1.833.08-5.417.08s-4.01-.014-5.417-.08c-.981-.046-1.523-.208-1.879-.346-.493-.191-.847-.419-1.217-.79-.37-.37-.599-.724-.79-1.217-.138-.356-.3-.898-.346-1.879-.066-1.407-.08-1.833-.08-5.417s.014-4.01.08-5.417c.046-.981.208-1.523.346-1.879.191-.493.419-.847.79-1.217.37-.37.724-.599 1.217-.79.356-.138.898-.3 1.879-.346 1.407-.066 1.833-.08 5.417-.08zM12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zm0 10.18a4.001 4.001 0 1 1 0-8.002 4.001 4.001 0 0 1 0 8.002zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                  </svg>
                  <span className="text-sm">@gamerlounge.umt</span>
                </a>
              </div>
            </div>

            {/* Intel AI */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-600 via-blue-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl flex flex-col justify-between min-h-[280px]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-2xl overflow-hidden border-2 border-cyan-400/50 bg-linear-to-br from-cyan-600/20 to-blue-600/20 p-2 group-hover:border-cyan-300/80 transition-all duration-300">
                  <TeamImage
                    src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408946/WhatsApp_Image_2025-10-30_at_10.20.31_5_rmshhh.jpg"
                    alt="Intel AI Logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover "
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2 group-hover:text-blue-300 transition-colors duration-300">UMT Intel AI</h3>
                <p className="text-purple-200 text-sm mb-4 group-hover:text-purple-100 transition-colors duration-300 grow">Artificial Intelligence Club at UMT</p>
                <a
                  href="https://www.instagram.com/aiclubumt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-all duration-300 group-hover:scale-110"
                >
                  <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.949.013 6.76.072 5.575.131 4.829.28 4.194.512c-.663.234-1.225.546-1.787.973-.562.427-1.05.99-1.412 1.651-.362.661-.587 1.377-.722 2.107-.135.73-.18 1.496-.135 2.265v7.986c-.045.769 0 1.535.135 2.265.135.73.36 1.446.722 2.107.362.661.85 1.224 1.412 1.651.562.427 1.124.739 1.787.973.765.234 1.511.381 2.696.44 1.189.059 1.636.072 5.257.072s4.068-.013 5.257-.072c1.185-.059 1.931-.206 2.696-.44.663-.234 1.225-.546 1.787-.973.562-.427 1.05-.99 1.412-1.651.362-.661.587-1.377.722-2.107.135-.73.18-1.496.135-2.265V6.986c.045-.769 0-1.535-.135-2.265-.135-.73-.36-1.446-.722-2.107-.362-.661-.85-1.224-1.412-1.651-.562-.427-1.124-.739-1.787-.973C17.171.28 16.425.131 15.24.072 14.051.013 13.604 0 12.017 0zm0 2.163c3.584 0 4.01.014 5.417.08.981.046 1.523.208 1.879.346.493.191.847.419 1.217.79.37.37.599.724.79 1.217.138.356.3.898.346 1.879.066 1.407.08 1.833.08 5.417s-.014 4.01-.08 5.417c-.046.981-.208 1.523-.346 1.879-.191.493-.419.847-.79 1.217-.37.37-.724.599-1.217.79-.356.138-.898.3-1.879.346-1.407.066-1.833.08-5.417.08s-4.01-.014-5.417-.08c-.981-.046-1.523-.208-1.879-.346-.493-.191-.847-.419-1.217-.79-.37-.37-.599-.724-.79-1.217-.138-.356-.3-.898-.346-1.879-.066-1.407-.08-1.833-.08-5.417s.014-4.01.08-5.417c.046-.981.208-1.523.346-1.879.191-.493.419-.847.79-1.217.37-.37.724-.599 1.217-.79.356-.138.898-.3 1.879-.346 1.407-.066 1.833-.08 5.417-.08zM12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zm0 10.18a4.001 4.001 0 1 1 0-8.002 4.001 4.001 0 0 1 0 8.002zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                  </svg>
                  <span className="text-sm">@intelai.umt</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-black via-purple-900/20 to-blue-900/20 section-transition relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              Our Sponsors & Partners
            </h2>
            <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto px-4">
              We are grateful to our sponsors for their generous support in making Techverse 2026 possible.
              Their partnership helps us create an exceptional experience for all participants.
            </p>
          </div>

          {/* Diamond Sponsors */}
          <div className="mb-8 sm:mb-12">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4">
                <span className="text-cyan-300 font-bold text-sm sm:text-base">Platinum & Gold Sponsors</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {/* Sponsor: Largify Solutions */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2">
                  <TeamImage src="https://media.licdn.com/dms/image/v2/D4D0BAQEalSVncub82w/company-logo_100_100/B4DZgkOgXkHsAU-/0/1752954439639/largify_solutions_limited_logo?e=1764806400&v=beta&t=58Fapum4pT-21AY9fGzegVYhxIT139Ko7ucxhVch0qM" alt="Largify Solutions" width={80} height={80} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Largify Solutions</h3>
                <p className="text-purple-200 text-sm mb-3">Platinum Sponsor</p>
                <a href="https://www.largifysolutions.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Sponsor: Game & Geeks */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408952/WhatsApp_Image_2025-11-17_at_23.13.40_cojsvg.jpg" alt="Intel" width={80} height={80} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Game & Geeks</h3>
                <p className="text-purple-200 text-sm mb-3">Platinum Sponsor</p>
                <a href="https://gamesandgeeks.pk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Sponsor: Al Khidmat */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408823/WhatsApp_Image_2025-11-17_at_23.13.36_2_jh60j4.jpg" alt="Intel" width={80} height={80} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Al Khidmat</h3>
                <p className="text-purple-200 text-sm mb-3">Our Partners</p>
                <a href="https://alkhidmat.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Sponsor: Rapter Wallet */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408962/WhatsApp_Image_2025-11-17_at_23.13.37_1_naxnum.jpg" alt="Intel" width={80} height={80} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Rapter Wallet</h3>
                <p className="text-purple-200 text-sm mb-3">Our Partners</p>
                <a href="https://www.raptrgames.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Sponsor: Intel Reach */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408958/WhatsApp_Image_2025-11-17_at_23.13.38_1_qmbykg.jpg" alt="Intel" width={80} height={80} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Intel Reach</h3>
                <p className="text-purple-200 text-sm mb-3">Our Partners</p>
                <a href="https://intellireach.social/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              

              
              {/* Sponsor: Ranchers */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://rancherscafe.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.9137e136.png&w=256&q=75" alt="Google Cloud" width={80} height={80} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Ranchers</h3>
                <p className="text-purple-200 text-sm mb-3">Platinum Sponsor</p>
                <a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              

              {/* Sponsor: Data Seekho */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408957/WhatsApp_Image_2025-11-17_at_23.13.38_2_bke4ke.jpg" alt="Google Cloud" width={80} height={80} className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Data Seekho</h3>
                <p className="text-purple-200 text-sm mb-3">Our Partners</p>
                <a href="https://dataseekho.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>

              {/* Sponsor: Devsinc */}
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-cyan-500/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-cyan-400/50">
                  <TeamImage src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763408954/WhatsApp_Image_2025-11-17_at_23.13.39_1_l7oyvb.jpg" alt="GitHub" width={80} height={80} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">Devsinc</h3>
                <p className="text-purple-200 text-sm mb-3">Our Collaborator</p>
                <a href="https://devsinc.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Website</span>
                </a>
              </div>
            </div>
          </div>

          {/* View All Sponsors CTA */}
          <div className="text-center">
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/30 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-300 mb-3 sm:mb-4">All Our Sponsors</h3>
              <p className="text-purple-200 text-sm sm:text-base mb-4 sm:mb-6">
                Meet all the amazing companies and organizations supporting Techverse 2026.
                From Platinum to Bronze sponsors, see who's making this event possible.
              </p>
              <Link
                href="/sponsors"
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 inline-block"
              >
                View All Sponsors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Highlights */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 section-transition relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Event Highlights
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Experience the excitement and energy of Techverse through our highlight reels.
            </p>
          </div>

          {/* Featured Video: full-width above reels */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-purple-900/30 rounded-xl overflow-hidden border border-purple-500/20 shadow-2xl">
              <div className="aspect-video bg-black">
                <iframe
                  src="https://www.youtube.com/embed/kBS2VhewWrw?rel=0&modestbranding=5&autoplay=1&mute=1 &controls=1"
                  title="Techverse Featured Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2">Techverse Ch 01</h3>
                <p className="text-purple-200 text-sm">Watch the official highlight video for Techverse 2025.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Reel 1 */}
            <div className="bg-purple-900/30 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="aspect-9/16 bg-black/50 relative">
                <iframe
                  src="https://www.youtube.com/embed/Vvljq7LDW6c"
                  title="Techverse Chapter 02"
                  className="w-full h-full rounded-t-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Techverse Chapter 02</h3>
                <p className="text-purple-200 text-sm">Watch the most exciting moments from our competitions and events.</p>
              </div>
            </div>

            {/* Reel 2 */}
            <div className="bg-purple-900/30 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="aspect-9/16 bg-black/50 relative">
                <iframe
                  src="https://www.youtube.com/embed/KT-3yPu1D44"
                  title="Champion Stories"
                  className="w-full h-full rounded-t-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Techverse Is Back</h3>
                <p className="text-purple-200 text-sm">Celebrating our winners and their incredible journeys to victory.</p>
              </div>
            </div>

            {/* Reel 3 */}
            <div className="bg-purple-900/30 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="aspect-9/16 bg-black/50 relative">
                <iframe
                  src="https://www.youtube.com/embed/i-mDriHWHkY"
                  title="Event Preparation"
                  className="w-full h-full rounded-t-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Previous Techverse Highlights</h3>
                <p className="text-purple-200 text-sm">Get a glimpse of how we prepare for the biggest tech event in Pakistan.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-purple-400 text-sm">
              More highlight reels coming soon! Stay tuned for exciting content from Techverse 2026
            </p>
          </div>
        </div>
      </section>

      {/* Organizers */}
      <section id="organizers" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 section-transition relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              Techverse Executives
            </h2>
            <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto px-4">
              Meet the visionary leadership team behind Techverse 2026, dedicated to bringing you Pakistan's premier technology competition event.
            </p>
          </div>

          {/* Executive Leadership */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-300 mb-6 sm:mb-8">Executive Leadership</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer" onClick={() => {
                setSelectedExecutive({
                  title: 'President',
                  name: 'M Shehryar Rana',
                  description: 'Visionary leader guiding Techverse Ch 02 - 2026',
                  image: 'https://media.licdn.com/dms/image/v2/D4D35AQGBUeHxd7ft2g/profile-framedphoto-shrink_200_200/B4DZkYmRg3H0AY-/0/1757054310726?e=1763679600&v=beta&t=398M4PvGCkea48b-QLpoiaHJk5DcNXmK2kEuBRaj1So',
                  linkedin: 'https://www.linkedin.com/in/muhammad-sheharyar-shahzad-rana/'
                })
                setIsModalOpen(true)
              }}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                  <TeamImage
                    src="https://media.licdn.com/dms/image/v2/D4D03AQF5wOLnSr9mBg/profile-displayphoto-scale_200_200/B4DZkYmQ79HYAo-/0/1757054309182?e=1764806400&v=beta&t=1v5LFJj2adtOAXAwvKxjOIZaNZcLRr2yz0VTCQY03Gw"
                    alt="President"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2">President</h3>
                <p className="text-purple-200 font-medium mb-1 text-sm sm:text-base">M Shehryar Rana</p>
                <p className="text-purple-300 text-xs sm:text-sm">Visionary leader guiding Techverse Ch 02 - 2026</p>
                <div className="mt-3 flex justify-center">
                  <a href="https://www.linkedin.com/in/muhammad-sheharyar-shahzad-rana/" className="inline-block text-blue-400 hover:text-blue-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer" onClick={() => {
                setSelectedExecutive({
                  title: 'Vice President',
                  name: 'M Hussnain Mahmood',
                  description: 'Strategic Marketing Supervisor and Operations',
                  image: 'https://media.licdn.com/dms/image/v2/D4D03AQFrVRhVwcmvAA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710865419519?e=1764806400&v=beta&t=bKkuuumUItNggpxMk1hqmeQAWTz0EcAl4XcN_KvTzqc',
                  linkedin: 'https://www.linkedin.com/in/husnain-mehmood-b977362bb/'
                })
                setIsModalOpen(true)
              }}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                  <TeamImage
                    src="https://media.licdn.com/dms/image/v2/D4D03AQFrVRhVwcmvAA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710865419519?e=1764806400&v=beta&t=bKkuuumUItNggpxMk1hqmeQAWTz0EcAl4XcN_KvTzqc"
                    alt="Vice President"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2">Vice President</h3>
                <p className="text-purple-200 font-medium mb-1 text-sm sm:text-base">M Hussnain Mahmood</p>
                <p className="text-purple-300 text-xs sm:text-sm">Strategic Marketing Supervisor and Operations</p>
                <div className="mt-3 flex justify-center">
                  <a href="https://www.linkedin.com/in/husnain-mehmood-b977362bb/" className="inline-block text-blue-400 hover:text-blue-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer" onClick={() => {
                setSelectedExecutive({
                  title: 'Female Vice President',
                  name: 'Syeda Khadija Sultan',
                  description: 'Supervisor Module Leads & Creatives',
                  image: 'https://media.licdn.com/dms/image/v2/D4D03AQGk6QiTuRoUVA/profile-displayphoto-scale_200_200/B4DZhH6j3IHwAY-/0/1753553223248?e=1764806400&v=beta&t=SBvOZrn3vERLC_vrF7QHPS5gzwMZl7Am04yNThwjYTo',
                  linkedin: '#'
                })
                setIsModalOpen(true)
              }}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                  <TeamImage
                    src="https://media.licdn.com/dms/image/v2/D4D03AQGk6QiTuRoUVA/profile-displayphoto-scale_200_200/B4DZhH6j3IHwAY-/0/1753553223248?e=1764806400&v=beta&t=SBvOZrn3vERLC_vrF7QHPS5gzwMZl7Am04yNThwjYTo"
                    alt="Female Vice President"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2">Female Vice President</h3>
                <p className="text-purple-200 font-medium mb-1 text-sm sm:text-base">Syeda Khadija Sultan</p>
                <p className="text-purple-300 text-xs sm:text-sm">Supervisor Module Leads & Creatives</p>
                <div className="mt-3 flex justify-center">
                  <a href="#" className="inline-block text-blue-400 hover:text-blue-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Council */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-300 mb-6 sm:mb-8">Executive Council</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer" onClick={() => {
                setSelectedExecutive({
                  title: 'Secretary General',
                  name: 'Muhammad Ali Haider',
                  description: 'Administrative leadership, Supervisor External Affairs, Marketing, and Delegations.',
                  image: 'https://media.licdn.com/dms/image/v2/D4D03AQH43chbjV5ocA/profile-displayphoto-shrink_200_200/B4DZTaWUsJG8Ag-/0/1738830076288?e=1764806400&v=beta&t=meGZU8WcE-TMc76SRgHgAfBRdMd9p0Hl5M1THuPWt9A',
                  linkedin: 'https://linkedin.com/in/memalihaider'
                })
                setIsModalOpen(true)
              }}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                  <TeamImage
                    src="https://media.licdn.com/dms/image/v2/D4D03AQH43chbjV5ocA/profile-displayphoto-shrink_200_200/B4DZTaWUsJG8Ag-/0/1738830076288?e=1764806400&v=beta&t=meGZU8WcE-TMc76SRgHgAfBRdMd9p0Hl5M1THuPWt9A"
                    alt="Secretary General"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">Secretary General</h3>
                <p className="text-purple-200 font-medium mb-1 text-xs sm:text-sm">Muhammad Ali Haider</p>
                <p className="text-purple-300 text-xs">Administrative leadership, Supervisor External Affairs, Marketing, and Delegations. </p>
                <div className="mt-3 flex justify-center">
                  <a href="https://linkedin.com/in/memalihaider" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-400 hover:text-blue-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer" onClick={() => {
                setSelectedExecutive({
                  title: 'General Secretary',
                  name: 'Abdul Wahab',
                  description: 'Supervisor Registeraion and Industrial Panel',
                  image: 'https://res.cloudinary.com/dggbhgqib/image/upload/v1763073103/Abdul_Wahab_General_Secretary_-_ABDUL_WAHAB_q1ilad.png',
                  linkedin: '#'
                })
                setIsModalOpen(true)
              }}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                  <TeamImage
                    src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073103/Abdul_Wahab_General_Secretary_-_ABDUL_WAHAB_q1ilad.png"
                    alt="General Secretary"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">General Secretary</h3>
                <p className="text-purple-200 font-medium mb-1 text-xs sm:text-sm">Abdul Wahab</p>
                <p className="text-purple-300 text-xs">Supervisor Registeraion and Industrial Panel</p>
                <div className="mt-3 flex justify-center">
                  <a href="#" className="inline-block text-blue-400 hover:text-blue-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer" onClick={() => {
                setSelectedExecutive({
                  title: 'Director General',
                  name: 'Rehan',
                  description: 'Supervior IT and Rooms Operations',
                  image: 'https://drive.google.com/uc?export=view&id=1vFZoMqSEHKuatul4s6bDG5GLxW-OaFkW',
                  linkedin: '#'
                })
                setIsModalOpen(true)
              }}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                    <TeamImage
                      src="https://drive.google.com/uc?export=view&id=1vFZoMqSEHKuatul4s6bDG5GLxW-OaFkW"
                      alt="Director General"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">Director General</h3>
                <p className="text-purple-200 font-medium mb-1 text-xs sm:text-sm">Rehan</p>
                <p className="text-purple-300 text-xs">Supervior IT and Rooms Operations</p>
                <div className="mt-3 flex justify-center">
                  <a href="#" className="inline-block text-blue-400 hover:text-blue-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer" onClick={() => {
                setSelectedExecutive({
                  title: 'Media Secretary',
                  name: 'M Saad Ahmad',
                  description: 'Media relations and publicity',
                  image: 'https://res.cloudinary.com/dggbhgqib/image/upload/v1763073167/Teamdirector_posts_-_Saad_Ahmed_ewvjg6.png',
                  linkedin: '#'
                })
                setIsModalOpen(true)
              }}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                    <TeamImage
                      src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073167/Teamdirector_posts_-_Saad_Ahmed_ewvjg6.png"
                      alt="Media Secretary"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">Media Secretary</h3>
                <p className="text-purple-200 font-medium mb-1 text-xs sm:text-sm">M Saad Ahmad</p>
                <p className="text-purple-300 text-xs">Media relations and publicity</p>
                <div className="mt-3 flex justify-center">
                  <a href="#" className="inline-block text-blue-400 hover:text-blue-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Team */}
          <div className="text-center">
            <Link
              href="/team"
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Meet Our Full Team
            </Link>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 section-transition relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-linear-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl p-12 border border-purple-500/30 animate-scale-in">
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
      <Footer />

      {/* Executive Modal */}
      {isModalOpen && selectedExecutive && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-purple-900/90 rounded-2xl max-w-md w-full border border-purple-500/30 shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-300">Executive Profile</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-purple-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-purple-400/50">
                  <TeamImage
                    src={selectedExecutive.image}
                    alt={selectedExecutive.title}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="text-xl font-semibold text-blue-300 mb-2">{selectedExecutive.title}</h4>
                <p className="text-purple-200 font-medium text-lg mb-4">{selectedExecutive.name}</p>
                <p className="text-purple-300 text-sm mb-6 leading-relaxed">{selectedExecutive.description}</p>

                {selectedExecutive.linkedin && selectedExecutive.linkedin !== '#' && (
                  <div className="flex justify-center">
                    <a
                      href={selectedExecutive.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>View LinkedIn</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}