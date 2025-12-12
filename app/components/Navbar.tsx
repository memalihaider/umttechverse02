'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { modules } from '@/lib/modules'

const navigationLinks = [
  { href: '/#about', label: 'About' },
  { href: '/modules', label: 'Modules' },
  { href: '/#organizers', label: 'Executives' },
  // { href: '/team', label: 'Team' },
  { href: '/business-innovation', label: 'BI' },
  { href: '/certificate', label: 'Certificate' },
  { href: '/rules', label: 'Rules' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)

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

  // Handle search functionality with useMemo for better performance
  const filteredModules = useMemo(() => {
    if (searchQuery.trim() === '') {
      return modules
    } else {
      return modules.filter(module =>
        module.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
  }, [searchQuery])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle escape key to close mobile menu and search
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMobileMenuOpen) {
          closeMobileMenu()
        }
        if (isSearchOpen) {
          setIsSearchOpen(false)
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen, isSearchOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 w-full bg-purple/80 backdrop-blur-lg border-b border-white/20 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white hover:text-purple-400 transition-colors duration-300">
                Techverse 2026
              </Link>
            </div>

            {/* Desktop Navigation Links and Search */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-purple-400 transition-colors duration-300 text-sm lg:text-base font-medium relative group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              {/* Search Bar */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={toggleSearch}
                  className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors duration-300 p-2 rounded-lg hover:bg-purple-900/20"
                  aria-label="Search modules"
                >
                  <Search size={18} />
                  <span className="hidden lg:inline text-sm font-medium">Search</span>
                  <ChevronDown size={14} className={`transform transition-transform duration-200 ${isSearchOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Search Dropdown */}
                {isSearchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-black backdrop-blur-lg rounded-lg shadow-xl border border-white/30 z-50">
                    <div className="p-4">
                      <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                        <input
                          type="text"
                          placeholder="Search modules..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          autoFocus
                        />
                      </div>

                      {/* Search Results */}
                      <div className="mt-3 max-h-60 overflow-y-auto">
                        {filteredModules.length > 0 ? (
                          filteredModules.map((module, index) => (
                            <Link
                              key={index}
                              href="/modules"
                              onClick={() => setIsSearchOpen(false)}
                              className="block p-3 hover:bg-purple-900/20 rounded-lg transition-colors duration-200 border-b border-white/20 last:border-b-0"
                            >
                              <div className="font-medium text-white">{module.name}</div>
                              <div className="text-xs text-purple-300 mt-1">
                                {module.teamSize} • PKR {module.fee.toLocaleString()}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="text-center py-4 text-gray-600 text-sm">
                            No modules found
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/30">
                        <Link
                          href="/modules"
                          onClick={() => setIsSearchOpen(false)}
                          className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View All Modules →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Button */}
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 lg:px-6 rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                Register Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden shrink-0">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-blue-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-md"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-14 sm:top-16 lg:top-18 left-0 right-0 bottom-0 bg-white/90 backdrop-blur-lg border-t border-white/30 shadow-xl animate-in slide-in-from-top-2 duration-300">
            <div className="px-3 sm:px-4 py-4 space-y-1 max-h-full overflow-y-auto">
              {navigationLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block text-gray-800 hover:text-blue-600 transition-all duration-300 text-sm sm:text-base py-2.5 px-3 sm:px-4 rounded-lg hover:bg-blue-50/60 border-b border-white/30 last:border-b-0 font-medium active:scale-95 transform"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-2 sm:mr-3 opacity-0 animate-pulse"></span>
                    {link.label}
                  </div>
                </Link>
              ))}
              
              {/* Mobile Registration Button */}
              <div className="pt-2 border-t border-white/30">
                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center shadow-sm hover:shadow-md active:scale-95 transform"
                  style={{ animationDelay: `${navigationLinks.length * 50}ms` }}
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}