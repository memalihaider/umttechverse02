'use client'

import Link from 'next/link'
import TeamImage from '../components/TeamImage'
import { useState } from 'react'
import Navbar from '../components/Navbar'

interface Executive {
  title: string
  name: string
  description: string
  image: string
  linkedin: string
}

export default function TeamPage() {
  const [selectedExecutive, setSelectedExecutive] = useState<Executive | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState('2026')

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20">
            <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
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

      {/* Executives Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 section-transition relative">
        <div className="absolute inset-0 bg-linear-to-b from-blue-900/5 via-transparent to-purple-900/5"></div>
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
                  image: 'https://media.licdn.com/dms/image/v2/D4D03AQF5wOLnSr9mBg/profile-displayphoto-scale_200_200/B4DZkYmQ79HYAo-/0/1757054309182?e=1764806400&v=beta&t=1v5LFJj2adtOAXAwvKxjOIZaNZcLRr2yz0VTCQY03Gw',
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
        </div>
      </section>

      {/* Team Year Switcher */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Techverse Teams
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-8">
              Explore the teams from different years of Techverse
            </p>

            {/* Year Switcher */}
            <div className="flex justify-center mb-12">
              <div className="bg-purple-900/30 rounded-2xl p-2 border border-purple-500/20">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedYear('2025')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedYear === '2025'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-purple-200 hover:text-blue-300 hover:bg-purple-800/50'
                    }`}
                  >
                    2025 Team
                  </button>
                  <button
                    onClick={() => setSelectedYear('2026')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedYear === '2026'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-purple-200 hover:text-blue-300 hover:bg-purple-800/50'
                    }`}
                  >
                    2026 Team
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Team Content Based on Year */}
          {selectedYear === '2026' ? (
            <>
              {/* 2026 Team Organization */}
              <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                      Techverse 2026 Team Structure
                    </h2>
                    <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                      Meet the comprehensive team behind Techverse 2026, organized by roles and responsibilities.
                    </p>
                  </div>

                  
                  
                  {/* Supervisors */}
                  {/* <div className="mb-16">
                    <h3 className="text-3xl font-bold text-center text-blue-300 mb-12">Supervisors</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <div className="bg-purple-900/30 rounded-xl p-8 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 overflow-hidden">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073098/Sectary_General_-_MUHAMMAD_ALI_HAIDER_h6eulc.png"
                            alt="Techverse 2026 Supervisors"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-blue-300 mb-4"> M Ali Haider</h4>
                        <p className="text-purple-200 mb-4">
                          Expert supervisors overseeing.
                        </p>
                        <div className="space-y-2 text-sm text-purple-300">
                          <p>• Marketing</p>
                          <p>• External Affairs</p>
                          <p>• Delegations</p>
                          <p>• Website & Portals</p>
                        </div>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-8 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 overflow-hidden">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073098/Screenshot_20250825-233311_-_HUSNAIN_MEHMOOD_wndtpx.png"
                            alt="Techverse 2026 Supervisors"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-blue-300 mb-4"> Hussnain Mehmood</h4>
                        <p className="text-purple-200 mb-4">
                          Expert Overseeing.
                        </p>
                        <div className="space-y-2 text-sm text-purple-300">
                          <p>• Marketing</p>
                          <p>• Operations</p>
                          <p>• Coordinations</p>
                          <p>• Guidance</p>
                        </div>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-8 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 overflow-hidden">
                          <TeamImage
                            src="https://media.licdn.com/dms/image/v2/D4D03AQGk6QiTuRoUVA/profile-displayphoto-scale_200_200/B4DZhH6j3IHwAY-/0/1753553223248?e=1764806400&v=beta&t=SBvOZrn3vERLC_vrF7QHPS5gzwMZl7Am04yNThwjYTo"
                            alt="Creative Supervisors"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-blue-300 mb-4">Khadija Sultan</h4>
                        <p className="text-purple-200 mb-4">
                          Creative overseeing.
                        </p>
                        <div className="space-y-2 text-sm text-purple-300">
                          <p>• Event branding and graphics</p>
                          <p>• Social media content strategy</p>
                          <p>• Promotional material design</p>
                          <p>• Visual identity management</p>
                        </div>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-8 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-20 h-20 bg-linear-to-br from-green-500 to-teal-500 rounded-full mx-auto mb-6 overflow-hidden">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763083805/Screenshot_2025-11-14_at_6.29.34_AM_npyfvw.png"
                            alt="Operations Supervisors"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-blue-300 mb-4">Syed Abas Shah</h4>
                        <p className="text-purple-200 mb-4">
                          Supervisor Techverse Ch 2.
                        </p>
                        <div className="space-y-2 text-sm text-purple-300">
                          <p>• Supervise Management Team</p>
                          <p>• On-site coordination</p>
                          <p>• Advising Executives</p>
                          <p>• Team support</p>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* Module Leads */}
                  {/* <div className="mb-16">
                    <h3 className="text-3xl font-bold text-center text-blue-300 mb-12">Module Leads</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face"
                            alt="Programming"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Programming</h4>
                        <p className="text-purple-300 text-sm">Competitive programming challenges</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=face"
                            alt="Gaming"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Gaming</h4>
                        <p className="text-purple-300 text-sm">Esports and gaming competitions</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-green-500 to-teal-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                            alt="Robotics"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Robotics</h4>
                        <p className="text-purple-300 text-sm">Robotics and automation challenges</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                            alt="Design"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Design</h4>
                        <p className="text-purple-300 text-sm">UI/UX and graphic design challenges</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                            alt="Innovation"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Innovation</h4>
                        <p className="text-purple-300 text-sm">Innovation and startup challenges</p>
                      </div>
                    </div>
                  </div> */}

                  {/* Co Leads */}
                  {/* <div className="mb-16">
                    <h3 className="text-3xl font-bold text-center text-blue-300 mb-12">Co Leads</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face"
                            alt="Technical Co-Lead"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Technical Co-Lead</h4>
                        <p className="text-purple-300 text-sm">Supporting technical operations and development</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-pink-500 to-rose-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
                            alt="Operations Co-Lead"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Operations Co-Lead</h4>
                        <p className="text-purple-300 text-sm">Assisting with event coordination and logistics</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                            alt="Marketing Co-Lead"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Marketing Co-Lead</h4>
                        <p className="text-purple-300 text-sm">Supporting outreach and promotional activities</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-orange-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                            alt="Creative Co-Lead"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Creative Co-Lead</h4>
                        <p className="text-purple-300 text-sm">Assisting with design and visual content</p>
                      </div>
                    </div>
                  </div> */}

                  {/* Most Active Participants */}
                  {/* <div className="mb-16">
                    <h3 className="text-3xl font-bold text-center text-blue-300 mb-12">Most Active Participants</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                            alt="Top Contributors"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Top Contributors</h4>
                        <p className="text-purple-200 font-medium text-sm mb-2">Outstanding Performance</p>
                        <p className="text-purple-300 text-xs">Recognized for exceptional participation and achievements in multiple modules</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                            alt="Innovation Leaders"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Innovation Leaders</h4>
                        <p className="text-purple-200 font-medium text-sm mb-2">Creative Excellence</p>
                        <p className="text-purple-300 text-xs">Demonstrated outstanding creativity and innovative thinking in competitions</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face"
                            alt="Rising Stars"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Rising Stars</h4>
                        <p className="text-purple-200 font-medium text-sm mb-2">Future Leaders</p>
                        <p className="text-purple-300 text-xs">Emerging talents showing remarkable potential and dedication</p>
                      </div>
                    </div>
                  </div> */}

                  {/* Additional Support Teams */}
                  {/* <div className="mb-16">
                    <h3 className="text-3xl font-bold text-center text-blue-300 mb-12">Additional Support Teams</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                            alt="Public Relations"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Public Relations</h4>
                        <p className="text-purple-300 text-sm">Media outreach and public communication</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
                            alt="Event Management"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Event Management</h4>
                        <p className="text-purple-300 text-sm">Logistics and on-site coordination</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                            alt="Finance Team"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Finance Team</h4>
                        <p className="text-purple-300 text-sm">Budget management and sponsorships</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 bg-linear-to-br from-pink-500 to-rose-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                            alt="Volunteer Team"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-2">Volunteer Team</h4>
                        <p className="text-purple-300 text-sm">Dedicated volunteers supporting the event</p>
                      </div>
                    </div>
                  </div> */}

                  {/* Participants Section */}
                  {/* <div className="bg-purple-900/30 rounded-xl p-8 border border-purple-500/20">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-blue-300 mb-4">Our Participants</h3>
                      <p className="text-purple-200 text-lg">
                        Techverse 2026 brings together the brightest minds from universities across Pakistan
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face"
                            alt="University Students"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-blue-300 mb-2">University Students</h4>
                        <p className="text-purple-200">
                          Undergraduate and graduate students from top universities showcasing their technical skills
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                            alt="Tech Innovators"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-blue-300 mb-2">Tech Innovators</h4>
                        <p className="text-purple-200">
                          Young entrepreneurs and innovators bringing fresh ideas and creative solutions
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="w-20 h-20 bg-linear-to-br from-green-500 to-teal-500 rounded-full mx-auto mb-4 overflow-hidden">
                          <TeamImage
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                            alt="Competition Enthusiasts"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-blue-300 mb-2">Competition Enthusiasts</h4>
                        <p className="text-purple-200">
                          Competitive programmers, gamers, and tech enthusiasts ready to prove their mettle
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </section>
            </>
          ) : (
            /* 2025 Team Content */
            <>
              {/* 2025 Executives Section */}
              <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 section-transition relative">
                <div className="absolute inset-0 bg-linear-to-b from-blue-900/5 via-transparent to-purple-900/5"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                      Techverse 2025 Executives
                    </h2>
                    <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto px-4">
                      Meet the visionary leadership team behind Techverse 2025, the pioneers who established Pakistan's premier technology competition event.
                    </p>
                  </div>

                  {/* 2025 Executive Leadership */}
                  <div className="mb-12 sm:mb-16">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-300 mb-6 sm:mb-8">Executive Leadership</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073124/Muhammad_Ahmad_Bhatti_President_-_Muhammad_Ahmad_nciu4a.jpg"
                            alt="President"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2">President & Founder</h3>
                        <p className="text-purple-200 font-medium mb-1 text-sm sm:text-base">Muhammad Ahmad</p>
                        <p className="text-purple-300 text-xs sm:text-sm">Founder & Visionary Leader</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073132/1000077627_-_Muhammad_Zeeshan_Ali_q72ztw.jpg"
                            alt="Vice President"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2">Vice President</h3>
                        <p className="text-purple-200 font-medium mb-1 text-sm sm:text-base">Muhammad Zeeshan</p>
                        <p className="text-purple-300 text-xs sm:text-sm">Operations & Strategy</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073129/AHS00670_-_azam_ali_fzdwjt.jpg"
                            alt="General Secretary"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2">Techverse Ch1 Supervisor</h3>
                        <p className="text-purple-200 font-medium mb-1 text-sm sm:text-base">Muhammad Azam</p>
                        <p className="text-purple-300 text-xs sm:text-sm">Administration & Coordination</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073098/MaryamNaveed_GeneralSecretary_-_maryam_naveed_hlo5pf.jpg"
                            alt="General Secretary"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2">General Sectary</h3>
                        <p className="text-purple-200 font-medium mb-1 text-sm sm:text-base">Maryam Naveed</p>
                        <p className="text-purple-300 text-xs sm:text-sm">Administration & Coordination</p>
                      </div>
                    </div>
                  </div>

                  {/* 2025 Directors */}
                  <div className="mb-12 sm:mb-16">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-300 mb-6 sm:mb-8">Directors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                          <TeamImage
                            src="https://media.licdn.com/dms/image/v2/D4D35AQGBUeHxd7ft2g/profile-framedphoto-shrink_200_200/B4DZkYmRg3H0AY-/0/1757054310726?e=1763690400&v=beta&t=U-EcScm6XS4ZEqltM65jh048FGAJ1R3XzyzC_HUBA5U"
                            alt="Director Operations"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">Director Registerations</h3>
                        <p className="text-purple-200 font-medium mb-1 text-xs sm:text-sm">Muhammad Shehryar Rana</p>
                        <p className="text-purple-300 text-xs">Event Registerations</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073167/Teamdirector_posts_-_Saad_Ahmed_ewvjg6.png"
                            alt="Director Media"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">Director Protocol</h3>
                        <p className="text-purple-200 font-medium mb-1 text-xs sm:text-sm">Saad Ahmad</p>
                        <p className="text-purple-300 text-xs">Manage all protocols</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073098/Sectary_General_-_MUHAMMAD_ALI_HAIDER_h6eulc.png"
                            alt="Director Finance"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">Director IT</h3>
                        <p className="text-purple-200 font-medium mb-1 text-xs sm:text-sm">Muhammad Ali Haider</p>
                        <p className="text-purple-300 text-xs">Handle IT, Website, Portals, and Guests.</p>
                      </div>

                      <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073098/Ajwa_Rasheed_Media_Secretary_-_Ajwa_Rasheed_o6mi3j.jpg"
                            alt="Director Media"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">Director Media</h3>
                        <p className="text-purple-200 font-medium mb-1 text-xs sm:text-sm">Ajwa Raseed</p>
                        <p className="text-purple-300 text-xs">Design & Visual Identity</p>
                      </div>
                      <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073111/Areeba_Khurram_-_Director_Creatives_-_Areeba_Khurram_mo16mw.jpg"
                            alt="Director Media"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">Director Creatives</h3>
                        <p className="text-purple-200 font-medium mb-1 text-xs sm:text-sm">Areeba Khurram</p>
                        <p className="text-purple-300 text-xs">Design & Visual Identity</p>
                      </div>

                       <div className="bg-purple-900/30 rounded-xl p-4 sm:p-6 text-center border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden border-2 border-purple-400/50">
                          <TeamImage
                            src="https://res.cloudinary.com/dggbhgqib/image/upload/v1763073160/HashirIrfan_DirectorManagement_-_Hashir_Qaisar_iofgmk.jpg"
                            alt="Director Management"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">Director Management</h3>
                        <p className="text-purple-200 font-medium mb-1 text-xs sm:text-sm">Hashir Irfan</p>
                        <p className="text-purple-300 text-xs">Design & Visual Identity</p>
                      </div>


                    </div>
                  </div>
                </div>
              </section>

            
            </>
          )}
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
                <a href="https://chat.whatsapp.com/KGwfI7p8H9OKx8oT089zuJ?mode=hqrc">Join Participant Group</a>
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
              <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Techverse 2026
              </h3>
              <p className="text-purple-200 mb-4">
                Pakistan's Premier Technology Competition Event. Where innovation meets competition,
                and the future of technology is shaped by today's brightest minds.
              </p>
              <div className="flex space-x-4">
                <a href="https://youtube.com/@techverseumt" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-red-400 transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/techverse-umt" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-blue-400 transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/techverse.umt" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-pink-400 transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.949.013 6.76.072 5.575.131 4.829.28 4.194.512c-.663.234-1.225.546-1.787.973-.562.427-1.05.99-1.412 1.651-.362.661-.587 1.377-.722 2.107-.135.73-.18 1.496-.135 2.265v7.986c-.045.769 0 1.535.135 2.265.135.73.36 1.446.722 2.107.362.661.85 1.224 1.412 1.651.562.427 1.124.739 1.787.973.765.234 1.511.381 2.696.44 1.189.059 1.636.072 5.257.072s4.068-.013 5.257-.072c1.185-.059 1.931-.206 2.696-.44.663-.234 1.225-.546 1.787-.973.562-.427 1.05-.99 1.412-1.651.362-.661.587-1.377.722-2.107.135-.73.18-1.496.135-2.265V6.986c.045-.769 0-1.535-.135-2.265-.135-.73-.36-1.446-.722-2.107-.362-.661-.85-1.224-1.412-1.651-.562-.427-1.124-.739-1.787-.973C17.171.28 16.425.131 15.24.072 14.051.013 13.604 0 12.017 0zm0 2.163c3.584 0 4.01.014 5.417.08.981.046 1.523.208 1.879.346.493.191.847.419 1.217.79.37.37.599.724.79 1.217.138.356.3.898.346 1.879.066 1.407.08 1.833.08 5.417s-.014 4.01-.08 5.417c-.046.981-.208 1.523-.346 1.879-.191.493-.419.847-.79 1.217-.37.37-.724.599-1.217.79-.356.138-.898.3-1.879.346-1.407.066-1.833.08-5.417.08s-4.01-.014-5.417-.08c-.981-.046-1.523-.208-1.879-.346-.493-.191-.847-.419-1.217-.79-.37-.37-.599-.724-.79-1.217-.138-.356-.3-.898-.346-1.879-.066-1.407-.08-1.833-.08-5.417s.014-4.01.08-5.417c.046-.981.208-1.523.346-1.879.191-.493.419-.847.79-1.217.37-.37.724-.599 1.217-.79.356-.138.898-.3 1.879-.346 1.407-.066 1.833-.08 5.417-.08zM12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zm0 10.18a4.001 4.001 0 1 1 0-8.002 4.001 4.001 0 0 1 0 8.002zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                  </svg>
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
          
                <p>🏛️ UMT Lahore, Pakistan</p>
                <p>📅 Jan 5-11, 2026</p>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
            <p className="text-purple-400">
              © 2026 Techverse 2026. Organized by University of Management and Technology. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Executive Modal */}
      {isModalOpen && selectedExecutive && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-purple-900/90 rounded-2xl p-8 border border-purple-500/20 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-purple-400/50">
                <TeamImage
                  src={selectedExecutive.image}
                  alt={selectedExecutive.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-300 mb-2">{selectedExecutive.title}</h3>
              <h4 className="text-xl font-semibold text-purple-200 mb-4">{selectedExecutive.name}</h4>
              <p className="text-purple-300 mb-6">{selectedExecutive.description}</p>
              {selectedExecutive.linkedin !== '#' && (
                <a
                  href={selectedExecutive.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  View LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}