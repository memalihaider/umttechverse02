"use client"

import React from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

export default function TimelinesPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden scroll-smooth selection:bg-purple-500/30">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(0,0,0,0))]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Timelines Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm font-medium text-purple-300 tracking-wider uppercase">Event Schedule</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Final <br />
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Schedule
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              UMT-TechVerse 2026 Event Timeline.<br />
              Date: 5th – 11th Jan 2026<br />
              Timing: 8:30 AM – 5:30 PM (Each Day)<br />
              Venue: University of Management and Technology (UMT), Lahore<br />
              Organized by: UMT Inter AI Club, UMT ACM, UMT Gaming Lounge, UMT Cyber Security Club, UMT IEEE Student Branch.
            </p>
          </div>

          {/* Events on 5th January */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl backdrop-blur-sm mb-8">
            <div className="flex items-center mb-6">
              <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4 border border-white/10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Events on 5th January 2026</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-semibold">Time</th>
                    <th className="py-3 px-4 text-white font-semibold">Module/Activity</th>
                    <th className="py-3 px-4 text-white font-semibold">Venue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">1:30 PM – 04:30 PM</td>
                    <td className="py-3 px-4 text-gray-300">Panel Talk - AI-Proof Yourself: Navigating Your Tech Career in 2026</td>
                    <td className="py-3 px-4 text-gray-300">Hakeem Saeed Hall</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">10:00 AM – 01:00 PM</td>
                    <td className="py-3 px-4 text-gray-300">Business Innovation Workshop by Founder Business Innovation Muhammad Ali Haider on Startup Innovation</td>
                    <td className="py-3 px-4 text-gray-300">CB1/SST1 – 603, 604</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>

          {/* Workshops on 6th January */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl backdrop-blur-sm mb-8">
            <div className="flex items-center mb-6">
              <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4 border border-white/10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Workshops on 6th January 2026</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-semibold">Time</th>
                    <th className="py-3 px-4 text-white font-semibold">Module/Activity</th>
                    <th className="py-3 px-4 text-white font-semibold">Labs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">10:30 AM – 01:00 PM</td>
                    <td className="py-3 px-4 text-gray-300">Workshop: CYBERSECURITY & CTF CHALLENGES</td>
                    <td className="py-3 px-4 text-gray-300">CB1/SST1 – 605</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">1:30PM – 4:00PM</td>
                    <td className="py-3 px-4 text-gray-300">Workshop: How to make world class project</td>
                    <td className="py-3 px-4 text-gray-300">CB1/SST1 – 605</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Workshops on 7th January */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl backdrop-blur-sm mb-8">
            <div className="flex items-center mb-6">
              <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4 border border-white/10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Workshops on 7th January 2026</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-semibold">Time</th>
                    <th className="py-3 px-4 text-white font-semibold">Module/Activity</th>
                    <th className="py-3 px-4 text-white font-semibold">Labs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">10:30 AM – 01:00 PM</td>
                    <td className="py-3 px-4 text-gray-300">Workshop: Cloud 101 Workshop with AWS: The What, why, and how</td>
                    <td className="py-3 px-4 text-gray-300">CB1/SST1 – 605</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">1:30PM – 4:00PM</td>
                    <td className="py-3 px-4 text-gray-300">Workshop: The Co-Pilot Era: Transforming Classrooms with AI and Human-Centric Robotics</td>
                    <td className="py-3 px-4 text-gray-300">CB1/SST1 – 605</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">12:30 PM – 3:30 PM</td>
                    <td className="py-3 px-4 text-gray-300">Workshop: Future‑Forward STEAM: Breakthroughs in AI, Robotics & Machine Learning</td>
                    <td className="py-3 px-4 text-gray-300">1c16</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Business Innovation Phase 3 */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl backdrop-blur-sm mb-8">
            <div className="flex items-center mb-6">
              <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4 border border-white/10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Business Innovation Phase 3 Timeline</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-semibold">Time</th>
                    <th className="py-3 px-4 text-white font-semibold">Dates</th>
                    <th className="py-3 px-4 text-white font-semibold">Labs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">10:00 AM – 05:30 PM</td>
                    <td className="py-3 px-4 text-gray-300">5th – 7th Jan 2026 (Monday to Wednesday)</td>
                    <td className="py-3 px-4 text-gray-300">CB1/SST1 – 603, 604</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">10:00AM – 5:30PM</td>
                    <td className="py-3 px-4 text-gray-300">8th Jan 2026 Thursday</td>
                    <td className="py-3 px-4 text-gray-300">CB1/SST1 – 603</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">10:00AM – 5:30PM</td>
                    <td className="py-3 px-4 text-gray-300">9th – 10th Jan 2026 (Friday to Saturday)</td>
                    <td className="py-3 px-4 text-gray-300">CB1/SST – 603, 601</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Day 1 */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl backdrop-blur-sm mb-8">
            <div className="flex items-center mb-6">
              <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4 border border-white/10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Day 1 Friday 9th January 2026</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-semibold">Time</th>
                    <th className="py-3 px-4 text-white font-semibold">Module/Activity</th>
                    <th className="py-3 px-4 text-white font-semibold">Rooms/Labs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">08:30 AM – 09:30 AM</td><td className="py-3 px-4 text-gray-300">Registration & Welcome Briefing</td><td className="py-3 px-4 text-gray-300">CB1 Ground Floor</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">09:30 AM – 11:00 AM</td><td className="py-3 px-4 text-gray-300">Opening Ceremony</td><td className="py-3 px-4 text-gray-300">Hakeem Saeed Hall</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:30 AM – 5:30pm</td><td className="py-3 px-4 text-gray-300">AI Hackathon</td><td className="py-3 px-4 text-gray-300">STD 611, 412 (FYP Lab 1 & 2)</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:30 AM – 5:30 PM</td><td className="py-3 px-4 text-gray-300">FIFA 26</td><td className="py-3 px-4 text-gray-300">TBA</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:30 AM – 5:30 PM</td><td className="py-3 px-4 text-gray-300">Tekken</td><td className="py-3 px-4 text-gray-300">TBA</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:30 AM – 5:30 PM</td><td className="py-3 px-4 text-gray-300">Valorant</td><td className="py-3 px-4 text-gray-300">CB1 604</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:30 AM – 5:30 PM</td><td className="py-3 px-4 text-gray-300">PUBG</td><td className="py-3 px-4 text-gray-300">TBA</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:30AM – 4:30 PM</td><td className="py-3 px-4 text-gray-300">Speed Programming</td><td className="py-3 px-4 text-gray-300">CB1/SST1 605</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">2:30PM – 5:30PM</td><td className="py-3 px-4 text-gray-300">Speed Wiring</td><td className="py-3 px-4 text-gray-300">CB1/SST1 403</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">1:30PM – 04:30PM</td><td className="py-3 px-4 text-gray-300">Speaker Session: Blockchain Beyond Hype: Real-World Adoption, Market Potential, and the Future of Talent</td><td className="py-3 px-4 text-gray-300">Saleem Asghar Hall</td></tr>
                  <tr><td className="py-3 px-4 text-gray-300">05:30 PM onwards</td><td className="py-3 px-4 text-gray-300">Gaming Night</td><td className="py-3 px-4 text-gray-300">TBA</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Day 2 */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl backdrop-blur-sm mb-8">
            <div className="flex items-center mb-6">
              <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4 border border-white/10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Day 2 Saturday 10th January 2026</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-semibold">Time</th>
                    <th className="py-3 px-4 text-white font-semibold">Module/Activity</th>
                    <th className="py-3 px-4 text-white font-semibold">Rooms/Labs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">09:00 AM – 10:00 AM</td><td className="py-3 px-4 text-gray-300">Registration & Welcome Briefing</td><td className="py-3 px-4 text-gray-300">CB1 Ground Floor</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">10:00 AM – 05:30 PM</td><td className="py-3 px-4 text-gray-300">AI Hackathon</td><td className="py-3 px-4 text-gray-300">STD 611, 412 (FYP Lab 1 & 2)</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:00AM -5:30PM</td><td className="py-3 px-4 text-gray-300">FIFA 26</td><td className="py-3 px-4 text-gray-300">TBA</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:00AM -5:30PM</td><td className="py-3 px-4 text-gray-300">Tekken</td><td className="py-3 px-4 text-gray-300">TBA</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:00AM -5:30PM</td><td className="py-3 px-4 text-gray-300">Valorant</td><td className="py-3 px-4 text-gray-300">CB1/SST1 604</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:00AM – 2:30PM</td><td className="py-3 px-4 text-gray-300">Cyber Hackathon</td><td className="py-3 px-4 text-gray-300">CB1/SST1 605, 607</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">11:00AM -5:30PM</td><td className="py-3 px-4 text-gray-300">PUBG</td><td className="py-3 px-4 text-gray-300">TBA</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">10:00AM -1:30PM</td><td className="py-3 px-4 text-gray-300">LFR</td><td className="py-3 px-4 text-gray-300">Hakeem Saeed Hall</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">2:00PM – 5:30PM</td><td className="py-3 px-4 text-gray-300">Obstacle</td><td className="py-3 px-4 text-gray-300">Hakeem Saeed Hall</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">10:00AM – 6:00PM</td><td className="py-3 px-4 text-gray-300">UI/UX</td><td className="py-3 px-4 text-gray-300">CB1/SST1 606, 610</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">10:00AM - 6:00PM</td><td className="py-3 px-4 text-gray-300">Web Development</td><td className="py-3 px-4 text-gray-300">CB1/SST1 602, 308</td></tr>
                  <tr><td className="py-3 px-4 text-gray-300">05:30 PM onwards</td><td className="py-3 px-4 text-gray-300">Musical Night</td><td className="py-3 px-4 text-gray-300">UMT Greens</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Day 3 */}
          <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4 border border-white/10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Day 3 Sunday 11th January 2026</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-semibold">Time</th>
                    <th className="py-3 px-4 text-white font-semibold">Module/Activity</th>
                    <th className="py-3 px-4 text-white font-semibold">Rooms/Labs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">9:30 AM – 01:00 PM</td><td className="py-3 px-4 text-gray-300">Time Reserved for Contingencies or Overflow Finals</td><td className="py-3 px-4 text-gray-300">--</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">9:30AM-11:00AM</td><td className="py-3 px-4 text-gray-300">AI Hackathon+ Submission</td><td className="py-3 px-4 text-gray-300">STD 611, 412 (FYP Lab 1 & 2)</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">9:30AM-1:00PM</td><td className="py-3 px-4 text-gray-300">Scavenger Hunt</td><td className="py-3 px-4 text-gray-300">CB1 403 OR CB1 Ground Floor</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">10:00AM- 1:00PM</td><td className="py-3 px-4 text-gray-300">Judging</td><td className="py-3 px-4 text-gray-300">--</td></tr>
                  <tr className="border-b border-white/5"><td className="py-3 px-4 text-gray-300">01:30 PM – 04:30 PM</td><td className="py-3 px-4 text-gray-300">Awards & Certificates Distribution</td><td className="py-3 px-4 text-gray-300">TBA</td></tr>
                  <tr><td className="py-3 px-4 text-gray-300">04:30 PM onwards</td><td className="py-3 px-4 text-gray-300">Formal Dinner</td><td className="py-3 px-4 text-gray-300">TBA</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}