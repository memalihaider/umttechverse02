'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { modules } from '@/lib/modules'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navigationLinks = [
  { href: '/#about', label: 'About' },
  { href: '/modules', label: 'Modules' },
  { href: '/#organizers', label: 'Executives' },
  { href: '/business-innovation', label: 'BI' },
  { href: '/rules', label: 'Rules' },
  { href: '/timelines', label: 'Timelines' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setSearchQuery('')
    }
  }

  const filteredModules = useMemo(() => {
    if (searchQuery.trim() === '') {
      return modules
    } else {
      return modules.filter(module =>
        module.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMobileMenuOpen) closeMobileMenu()
        if (isSearchOpen) setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen, isSearchOpen])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled 
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10 py-2" 
            : "bg-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="group flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                  Techverse<span className="text-purple-500">2026</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}

              {/* Search */}
              <div className="relative ml-2" ref={searchRef}>
                <button
                  onClick={toggleSearch}
                  className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                  aria-label="Search modules"
                >
                  <Search size={20} />
                </button>

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50"
                    >
                      <div className="p-4">
                        <div className="relative">
                          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search modules..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm"
                            autoFocus
                          />
                        </div>

                        <div className="mt-4 max-h-64 overflow-y-auto custom-scrollbar">
                          {filteredModules.length > 0 ? (
                            filteredModules.map((module, index) => (
                              <Link
                                key={index}
                                href="/modules"
                                onClick={() => setIsSearchOpen(false)}
                                className="block p-3 hover:bg-white/5 rounded-xl transition-all duration-200 group"
                              >
                                <div className="font-medium text-gray-200 group-hover:text-white">{module.name}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {module.teamSize} • PKR {module.fee.toLocaleString()}
                                </div>
                              </Link>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-500 text-sm">
                              No modules found
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10">
                          <Link
                            href="/modules"
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center justify-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                          >
                            View All Modules <ChevronDown size={14} className="-rotate-90 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <Link
                href="/register"
                className="ml-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-95"
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-300 hover:text-white rounded-lg"
              >
                <Search size={20} />
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-300 hover:text-white rounded-lg"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] md:hidden bg-gray-950"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-white">Menu</span>
                <button onClick={closeMobileMenu} className="p-2 text-gray-400 hover:text-white">
                  <X size={32} />
                </button>
              </div>

              <div className="flex flex-col space-y-4">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="text-3xl font-bold text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-2xl text-center text-xl shadow-xl shadow-purple-500/20"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
  