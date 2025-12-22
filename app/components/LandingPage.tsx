'use client'

import Link from 'next/link'
import TeamImage from './TeamImage'
import LazyYoutube from './LazyYoutube'
import Countdown from './Countdown'
import { useState, useEffect } from 'react'
import { modules } from '@/lib/modules'
import Navbar from './Navbar'
import Footer from './Footer'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Calendar, Rocket, Target, Trophy, Users, Zap, ArrowRight, Play, ExternalLink, ChevronUp } from 'lucide-react'

interface Executive {
  title: string
  name: string
  description: string
  image: string
  linkedin: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
}

export default function LandingPage() {
  const [selectedExecutive, setSelectedExecutive] = useState<Executive | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-x-hidden selection:bg-purple-500/30">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-20" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm font-medium text-purple-200">Registration is now open!</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8">
              <span className="inline-block bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
                TECHVERSE
              </span>
              <br />
              <span className="inline-block bg-linear-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                2026
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
              Pakistan's premier technology event where innovation meets competition. 
              Join the brightest minds for 7 days of non-stop technological excellence.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <Countdown targetDate="2026-01-05T09:00:00+05:00" label="Main Event Starts In" variant="compact" />
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center group"
              >
                Register Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                href="/modules"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
              >
                Explore Modules
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 text-gray-400">
                <Calendar className="text-purple-500" size={24} />
                <span className="font-medium">5-11 January 2026</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-gray-400">
                <Target className="text-blue-500" size={24} />
                <span className="font-medium">UMT, Lahore</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-gray-400">
                <Trophy className="text-cyan-500" size={24} />
                <span className="font-medium">PKR 480K+ Prize Pool</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { label: 'Modules', value: '16+', color: 'from-purple-500 to-blue-500' },
              { label: 'Participants', value: '2000+', color: 'from-blue-500 to-cyan-500' },
              { label: 'Prize Pool', value: '480K+', color: 'from-cyan-500 to-teal-500' },
              { label: 'Days', value: '7', color: 'from-teal-500 to-purple-500' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative group"
              >
                <div className="absolute -inset-px bg-linear-to-r from-white/10 to-white/5 rounded-3xl" />
                <div className="relative p-8 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-sm hover:bg-white/4 transition-all duration-300 text-center">
                  <div className={cn("text-4xl md:text-5xl font-black mb-2 bg-linear-to-r bg-clip-text text-transparent", stat.color)}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Event */}
      <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/3 border border-white/10 backdrop-blur-md mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm font-medium text-purple-300 tracking-wider uppercase">About Techverse 2026</span>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 tracking-tight"
            >
              Pakistan's Premier <br />
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Technology Event
              </span>
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Techverse 2026 brings together the brightest minds in technology, innovation, and creativity. 
              From AI and cybersecurity to gaming and robotics, experience the future today.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="group relative p-8 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-sm hover:bg-white/4 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To create a platform where technology enthusiasts can showcase their skills, learn from peers,
                and compete in an environment that fosters innovation and collaboration.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="group relative p-8 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-sm hover:bg-white/4 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">What to Expect</h3>
              <p className="text-gray-400 leading-relaxed">
                Intense competitions, networking opportunities, workshops, and prizes worth over PKR 480,000.
                Join us for 7 days of non-stop technological excellence.
              </p>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12"
          >
            {[
              { icon: "⚡", label: "16+ Modules", color: "text-blue-400" },
              { icon: "🎮", label: "Gaming & AI", color: "text-purple-400" },
              { icon: "💰", label: "Massive Prizes", color: "text-green-400" },
              { icon: "🤝", label: "Networking", color: "text-cyan-400" },
              { icon: "🏢", label: "UMT Lahore", color: "text-orange-400" },
              { icon: "⏰", label: "7 Days", color: "text-pink-400" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="p-4 rounded-2xl bg-white/2 border border-white/5 text-center hover:bg-white/5 transition-colors"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className={cn("text-xs font-bold uppercase tracking-wider", item.color)}>
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Business Innovation Signature Module */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-150 h-150 bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-md mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-sm font-medium text-yellow-300 tracking-wider uppercase">Signature Module</span>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 tracking-tight"
            >
              Business Innovation <br />
              <span className="bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Challenge 2026
              </span>
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Techverse 2026's flagship competition where entrepreneurship meets technology.
              Transform your innovative ideas into real business solutions.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="mb-12"
            >
              <Countdown targetDate="2025-12-20T00:00:00+05:00" label="Module starts in" variant="large" />
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-sm max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🗓️</span>
                <span className="text-yellow-300 font-semibold">Starts: 15th Dec</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <span className="text-yellow-300 font-semibold">20+ Days</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-3">
                <span className="text-2xl">📝</span>
                <span className="text-yellow-300 font-semibold">Phase 01 Completed: 31st Dec</span>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Challenge Details */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="p-8 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
                  <span>🚀</span> Challenge Overview
                </h3>
                <div className="space-y-6">
                  <p className="text-gray-400 leading-relaxed">
                    Develop groundbreaking business solutions that address real-world problems using cutting-edge technology,
                    innovative thinking, and entrepreneurial vision.
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/10">
                      <h4 className="text-yellow-300 font-bold mb-1 flex items-center gap-2">
                        <span>🌍</span> Open for All Industries
                      </h4>
                      <p className="text-sm text-gray-400">
                        Ecommerce, Healthcare, Education, Finance, and more. Any sector with tech potential.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                      <h4 className="text-blue-300 font-bold mb-1 flex items-center gap-2">
                        <span>👥</span> Module Founders
                      </h4>
                      <p className="text-sm text-gray-400">
                        Muhammad Ali Haider & Kainaat Afzal
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                      <h4 className="text-green-300 font-bold mb-1 flex items-center gap-2">
                        <span>⚡</span> Powered by Largify Solutions
                      </h4>
                      <p className="text-sm text-gray-400">
                        Professional execution and mentorship provided by enterprise-level experts.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-white/3 border border-white/5 text-center">
                      <div className="text-2xl font-black text-white mb-1">PKR 40K+</div>
                      <div className="text-xs font-bold text-yellow-500 uppercase tracking-wider">1st Prize</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/3 border border-white/5 text-center">
                      <div className="text-2xl font-black text-white mb-1">PKR 30K+</div>
                      <div className="text-xs font-bold text-yellow-500 uppercase tracking-wider">2nd Prize</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-yellow-300 mb-8 flex items-center gap-3">
                  <span>📊</span> Competition Timeline
                </h3>
                <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                  {[
                    { step: 1, title: "Product Development", date: "15th Dec - 31st Jan", desc: "Build your MVP with core features.", color: "bg-blue-500" },
                    { step: 2, title: "Selection Round", date: "1st Jan - 4th Jan", desc: "Top 30 products selected for finals.", color: "bg-green-500" },
                    { step: 3, title: "Product Enhancement", date: "5th Jan - 10th Jan", desc: "Convert MVP to complete product.", color: "bg-orange-500" },
                    { step: 4, title: "Mini Shark Tank Finale", date: "11th Jan", desc: "Pitch to investors and industry leaders.", color: "bg-red-500" },
                  ].map((item, idx) => (
                    <div key={idx} className="relative pl-12">
                      <div className={cn("absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10", item.color)}>
                        {item.step}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <div className="text-yellow-500 text-sm font-bold mb-2">{item.date}</div>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Features & CTA */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="p-8 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
                  <span>🏆</span> Why Join?
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: "Real-World Impact", desc: "Solve actual business problems" },
                    { title: "Industry Mentorship", desc: "Guidance from successful founders" },
                    { title: "Live Scoring", desc: "Real-time leaderboard tracking" },
                    { title: "Networking", desc: "Connect with investors" },
                    { title: "Career Boost", desc: "Internship & job opportunities" },
                    { title: "Idea to Execution", desc: "Build a startup from scratch" },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/40 transition-colors">
                        <span className="text-[10px] text-green-400">✓</span>
                      </div>
                      <div>
                        <span className="font-bold text-white">{item.title}:</span>{" "}
                        <span className="text-gray-400">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-white/2 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-yellow-300 mb-8 flex items-center gap-3">
                  <span>🎯</span> MVP Evaluation
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Implementation", value: "40%", color: "text-blue-400" },
                    { label: "Security", value: "30%", color: "text-purple-400" },
                    { label: "Core Features", value: "20%", color: "text-green-400" },
                    { label: "Innovation", value: "10%", color: "text-cyan-400" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/3 border border-white/5 text-center">
                      <div className={cn("text-2xl font-black mb-1", item.color)}>{item.value}</div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-linear-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-center">
                <Link
                  href="/business-innovation"
                  className="w-full py-4 rounded-2xl bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-500 text-black font-black text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-yellow-500/20 mb-4 inline-block"
                >
                  ENTER CHALLENGE 🚀
                </Link>
                <p className="text-sm text-yellow-500/60 font-medium">
                  Limited spots available • Early registration recommended
                </p>
              </div>

              {/* Stats Banner */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Teams Expected", value: "50+" },
                  { label: "Phases", value: "4" },
                  { label: "Total Rewards", value: "80K+" },
                  { label: "Innovation Time", value: "20+ Days" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/2 border border-white/5 text-center">
                    <div className="text-xl font-black text-white mb-1">{item.value}</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Explore Modules Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="relative p-12 sm:p-20 rounded-[40px] bg-white/2 border border-white/10 backdrop-blur-xl overflow-hidden text-center"
          >
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 pointer-events-none" />
            
            <div className="relative z-10">
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/3 border border-white/10 backdrop-blur-md mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-sm font-medium text-cyan-300 tracking-wider uppercase">Competition Modules</span>
              </motion.div>

              <motion.h2 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 tracking-tight"
              >
                Discover All <br />
                <span className="bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  16+ Modules
                </span>
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
              >
                From AI and cybersecurity to gaming and robotics - find your perfect challenge 
                and compete with the best minds in the country.
              </motion.p>

              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
              >
                {[
                  { label: "Modules", value: "16+", color: "text-blue-400" },
                  { label: "Prize Pool", value: "480K+", color: "text-cyan-400" },
                  { label: "Participants", value: "2000+", color: "text-pink-400" },
                  { label: "Duration", value: "7 Days", color: "text-orange-400" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors"
                  >
                    <div className={cn("text-3xl font-black mb-1", item.color)}>{item.value}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Link
                  href="/modules"
                  className="group relative inline-flex items-center gap-3 px-12 py-6 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-blue-500/25"
                >
                  EXPLORE ALL MODULES
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collaborating Clubs Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-blue-300 tracking-wider uppercase">Partner Communities</span>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 tracking-tight"
            >
              Collaborating <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Clubs & Platforms
              </span>
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              These amazing clubs made Techverse 2026 possible through their collaboration and support.
            </motion.p>
          </div>

          

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {[
              {
                name: "UMT Platform",
                desc: "University of Management and Technology",
                img: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408937/WhatsApp_Image_2025-10-30_at_10.20.33_7_nvfcno.jpg",
                link: "https://www.umt.edu.pk",
                color: "from-blue-500/20 to-cyan-500/20"
              },
              {
                name: "ACM UMT",
                desc: "Association for Computing Machinery",
                img: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408946/WhatsApp_Image_2025-10-30_at_10.20.30_3_sn4bqt.jpg",
                link: "https://www.instagram.com/umt.acm/",
                color: "from-blue-600/20 to-purple-600/20"
              },
              {
                name: "Cybersecurity",
                desc: "Cybersecurity Society at UMT",
                img: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408946/WhatsApp_Image_2025-10-30_at_10.20.31_6_iykpxo.jpg",
                link: "https://www.instagram.com/umtcybersecurity/",
                color: "from-green-600/20 to-emerald-600/20"
              },
              {
                name: "IEEE UMT",
                desc: "Institute of Electrical and Electronics Engineers",
                img: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408940/WhatsApp_Image_2025-10-30_at_10.20.32_6_prx5pd.jpg",
                link: "https://www.instagram.com/ieee.umt.branch/",
                color: "from-red-600/20 to-pink-600/20"
              },
              {
                name: "Gamer Lounge",
                desc: "Gaming Community at UMT",
                img: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408952/WhatsApp_Image_2025-10-30_at_10.20.29_2_q1ksqr.jpg",
                link: "https://www.instagram.com/umtgamerslounge_official/",
                color: "from-purple-600/20 to-violet-600/20"
              },
              {
                name: "UMT Intel AI",
                desc: "Artificial Intelligence Club at UMT",
                img: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408946/WhatsApp_Image_2025-10-30_at_10.20.31_5_rmshhh.jpg",
                link: "https://www.instagram.com/aiclubumt/",
                color: "from-cyan-600/20 to-blue-600/20"
              },
              {
                name: "UMT SST",
                desc: "Our Premium Collaborator at UMT",
                img: "https://res.cloudinary.com/thenprogrammer/image/upload/v1764854694/638935520484197506419_hh4vjr.png",
                link: "https://www.instagram.com/sstumtofficial/",
                color: "from-cyan-600/20 to-blue-600/20"
              }
            ].map((club, idx) => (
              <motion.a
                key={idx}
                href={club.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 text-center flex flex-col items-center"
              >
                <div className={cn("w-24 h-24 rounded-2xl overflow-hidden mb-6 p-2 bg-gradient-to-br border border-white/10 group-hover:scale-110 transition-transform duration-500", club.color)}>
                  <TeamImage
                    src={club.img}
                    alt={club.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{club.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{club.desc}</p>
                <div className="mt-auto text-xs font-bold text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit Community →
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter">
                OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">SPONSORS</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Empowering the next generation of tech leaders through strategic partnerships.
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {[
              {
                name: "Largify Solutions",
                type: "Platinum Sponsor",
                logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEalSVncub82w/company-logo_100_100/B4DZgkOgXkHsAU-/0/1752954439639/largify_solutions_limited_logo?e=1764806400&v=beta&t=58Fapum4pT-21AY9fGzegVYhxIT139Ko7ucxhVch0qM",
                link: "https://www.largifysolutions.com/",
                color: "from-blue-500/10 to-cyan-500/10"
              },
              {
                name: "Game & Geeks",
                type: "Platinum Sponsor",
                logo: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408952/WhatsApp_Image_2025-11-17_at_23.13.40_cojsvg.jpg",
                link: "https://gamesandgeeks.pk",
                color: "from-purple-500/10 to-pink-500/10"
              },
              {
                name: "Al Khidmat",
                type: "Our Partners",
                logo: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408823/WhatsApp_Image_2025-11-17_at_23.13.36_2_jh60j4.jpg",
                link: "https://alkhidmat.org",
                color: "from-green-500/10 to-emerald-500/10"
              },
              {
                name: "Rapter Wallet",
                type: "Our Partners",
                logo: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408962/WhatsApp_Image_2025-11-17_at_23.13.37_1_naxnum.jpg",
                link: "https://www.raptrgames.com",
                color: "from-orange-500/10 to-red-500/10"
              },
              {
                name: "Intel Reach",
                type: "Our Partners",
                logo: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408958/WhatsApp_Image_2025-11-17_at_23.13.38_1_qmbykg.jpg",
                link: "https://intellireach.social/en/",
                color: "from-cyan-500/10 to-blue-500/10"
              },
              {
                name: "Ranchers",
                type: "Platinum Sponsor",
                logo: "https://rancherscafe.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.9137e136.png&w=256&q=75",
                link: "https://rancherscafe.com",
                color: "from-yellow-500/10 to-orange-500/10"
              },
              {
                name: "Data Seekho",
                type: "Our Partners",
                logo: "https://res.cloudinary.com/dggbhgqib/image/upload/v1763408957/WhatsApp_Image_2025-11-17_at_23.13.38_2_bke4ke.jpg",
                link: "https://dataseekho.com",
                color: "from-indigo-500/10 to-purple-500/10"
              }
            ].map((sponsor, idx) => (
              <motion.a
                key={idx}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 text-center flex flex-col items-center"
              >
                <div className={cn("w-24 h-24 rounded-2xl overflow-hidden mb-6 p-4 bg-gradient-to-br border border-white/10 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center", sponsor.color)}>
                  <TeamImage
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{sponsor.name}</h3>
                <p className="text-sm text-blue-500 font-medium mb-4">{sponsor.type}</p>
                <div className="mt-auto text-xs font-bold text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit Website →
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* View All Sponsors CTA */}
          <div className="mt-20 text-center">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="inline-block p-1 rounded-[2rem] bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-xl"
            >
              <Link
                href="/sponsors"
                className="flex items-center space-x-4 px-8 py-4 rounded-[1.75rem] bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              >
                <span className="text-white font-bold">View All Sponsors</span>
                <svg className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Highlights Section */}
      <section id="highlights" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter">
                EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">HIGHLIGHTS</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Relive the most intense moments and groundbreaking innovations from our previous chapters.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { id: "kBS2VhewWrw", title: "Techverse Ch 01", desc: "Official highlight video for Techverse 2025", aspect: "aspect-video" },
              { id: "Vvljq7LDW6c", title: "Techverse Chapter 02", desc: "Most exciting moments from our competitions", aspect: "aspect-[9/16]" },
              { id: "KT-3yPu1D44", title: "Techverse Is Back", desc: "Celebrating our winners and their journeys", aspect: "aspect-[9/16]" },
              { id: "i-mDriHWHkY", title: "Preparation Highlights", desc: "Behind the scenes of Pakistan's biggest tech event", aspect: "aspect-[9/16]" }
            ].map((video, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={cn(
                  "group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-500",
                  video.aspect === "aspect-video" ? "lg:col-span-3" : "lg:col-span-1"
                )}
              >
                <div className={cn("relative", video.aspect)}>
                  <LazyYoutube videoId={video.id} title={video.title} aspectClass={video.aspect} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-white mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-1">{video.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizers Section */}
      <section id="organizers" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter">
                THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">EXECUTIVES</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                The visionary leadership team dedicated to bringing you Pakistan's premier technology event.
              </p>
            </motion.div>
          </div>

          <div className="space-y-24">
            {/* Executive Leadership */}
            <div>
              <motion.h3 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="text-2xl font-bold text-blue-400 mb-12 text-center uppercase tracking-widest"
              >
                Executive Leadership
              </motion.h3>
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[
                  {
                    title: 'President',
                    name: 'M Shehryar Rana',
                    desc: 'Visionary leader guiding Techverse Ch 02 - 2026',
                    img: 'https://media.licdn.com/dms/image/v2/D4D03AQF5wOLnSr9mBg/profile-displayphoto-scale_200_200/B4DZkYmQ79HYAo-/0/1757054309182?e=1764806400&v=beta&t=1v5LFJj2adtOAXAwvKxjOIZaNZcLRr2yz0VTCQY03Gw',
                    linkedin: 'https://www.linkedin.com/in/muhammad-sheharyar-shahzad-rana/'
                  },
                  {
                    title: 'Vice President',
                    name: 'M Hussnain Mahmood',
                    desc: 'Strategic Marketing Supervisor and Operations',
                    img: 'https://media.licdn.com/dms/image/v2/D4D03AQFrVRhVwcmvAA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710865419519?e=1764806400&v=beta&t=bKkuuumUItNggpxMk1hqmeQAWTz0EcAl4XcN_KvTzqc',
                    linkedin: 'https://www.linkedin.com/in/husnain-mehmood-b977362bb/'
                  },
                  {
                    title: 'Female Vice President',
                    name: 'Syeda Khadija Sultan',
                    desc: 'Supervisor Module Leads & Creatives',
                    img: 'https://media.licdn.com/dms/image/v2/D4D03AQGk6QiTuRoUVA/profile-displayphoto-scale_200_200/B4DZhH6j3IHwAY-/0/1753553223248?e=1764806400&v=beta&t=SBvOZrn3vERLC_vrF7QHPS5gzwMZl7Am04yNThwjYTo',
                    linkedin: '#'
                  }
                ].map((exec, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 text-center cursor-pointer"
                    onClick={() => {
                      setSelectedExecutive({
                        title: exec.title,
                        name: exec.name,
                        description: exec.desc,
                        image: exec.img,
                        linkedin: exec.linkedin
                      })
                      setIsModalOpen(true)
                    }}
                  >
                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-2 border-blue-500/30 group-hover:border-blue-400 transition-colors p-1">
                      <TeamImage
                        src={exec.img}
                        alt={exec.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">{exec.title}</h4>
                    <h3 className="text-2xl font-bold text-white mb-2">{exec.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{exec.desc}</p>
                    <div className="flex justify-center space-x-4">
                      <a href={exec.linkedin} className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-all" onClick={(e) => e.stopPropagation()}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Executive Council */}
            <div>
              <motion.h3 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="text-2xl font-bold text-purple-400 mb-12 text-center uppercase tracking-widest"
              >
                Executive Council
              </motion.h3>
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {[
                  {
                    title: 'Secretary General',
                    name: 'Muhammad Ali Haider',
                    desc: 'Administrative leadership & External Affairs',
                    img: 'https://media.licdn.com/dms/image/v2/D4D03AQH43chbjV5ocA/profile-displayphoto-shrink_200_200/B4DZTaWUsJG8Ag-/0/1738830076288?e=1764806400&v=beta&t=meGZU8WcE-TMc76SRgHgAfBRdMd9p0Hl5M1THuPWt9A',
                    linkedin: 'https://linkedin.com/in/memalihaider'
                  },
                  {
                    title: 'General Secretary',
                    name: 'Abdul Wahab',
                    desc: 'Supervisor Registration and Industrial Panel',
                    img: 'https://res.cloudinary.com/dggbhgqib/image/upload/v1763073103/Abdul_Wahab_General_Secretary_-_ABDUL_WAHAB_q1ilad.png',
                    linkedin: '#'
                  },
                  {
                    title: 'Director General',
                    name: 'Rehan',
                    desc: 'Supervisor IT and Rooms Operations',
                    img: 'https://res.cloudinary.com/dggbhgqib/image/upload/v1763463589/WhatsApp_Image_2025-11-18_at_11.22.15_nn2bel.jpg',
                    linkedin: '#'
                  },
                  {
                    title: 'Media Secretary',
                    name: 'M Saad Ahmad',
                    desc: 'Media relations and publicity',
                    img: 'https://res.cloudinary.com/dggbhgqib/image/upload/v1763073167/Teamdirector_posts_-_Saad_Ahmed_ewvjg6.png',
                    linkedin: '#'
                  }
                ].map((exec, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all duration-300 text-center cursor-pointer"
                    onClick={() => {
                      setSelectedExecutive({
                        title: exec.title,
                        name: exec.name,
                        description: exec.desc,
                        image: exec.img,
                        linkedin: exec.linkedin
                      })
                      setIsModalOpen(true)
                    }}
                  >
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border border-purple-500/30 group-hover:border-purple-400 transition-colors">
                      <TeamImage
                        src={exec.img}
                        alt={exec.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-1">{exec.title}</h4>
                    <h3 className="text-lg font-bold text-white mb-1">{exec.name}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{exec.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 p-12 sm:p-20 text-center"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tighter">
                READY TO <span className="text-black/40">COMPETE?</span>
              </h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Join hundreds of tech enthusiasts in Pakistan's most exciting technology competition. 
                Register now and be part of Techverse 2026!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-white text-blue-600 font-black text-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl shadow-black/20"
                >
                  Register Now
                </Link>
                <Link
                  href="/rules"
                  className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-white/10 text-white font-bold text-xl hover:bg-white/20 backdrop-blur-md transition-all duration-300 border border-white/20"
                >
                  View Rules
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Executive Modal */}
      <AnimatePresence>
        {isModalOpen && selectedExecutive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white/[0.03] border border-white/10 rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl"
            >
              <div className="p-8 sm:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-blue-500/30 p-1">
                    <TeamImage
                      src={selectedExecutive.image}
                      alt={selectedExecutive.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <h4 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2">{selectedExecutive.title}</h4>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{selectedExecutive.name}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {selectedExecutive.description}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-white/10">
                  <a 
                    href={selectedExecutive.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-blue-400 hover:text-blue-300 transition-colors font-bold"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn Profile</span>
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-purple-600 text-white shadow-2xl shadow-purple-500/20 hover:bg-purple-500 transition-all duration-300 group"
          >
            <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}