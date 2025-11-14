'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navigationLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#modules', label: 'Modules' },
  { href: '/#organizers', label: 'Executives' },
  { href: '/team', label: 'Team' },
  { href: '/business-innovation', label: 'Business Innovation' },
  { href: '/certificate', label: 'Certificate' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

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
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-purple-500/30 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                Techverse 2026
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-purple-200 hover:text-blue-300 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105 relative group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden shrink-0">
              <button
                onClick={toggleMobileMenu}
                className="text-purple-200 hover:text-blue-300 transition-colors p-1.5 rounded-lg hover:bg-purple-500/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 active:scale-95"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-14 sm:top-16 lg:top-18 left-0 right-0 bottom-0 bg-black/95 backdrop-blur-md border-b border-purple-500/30 shadow-2xl animate-in slide-in-from-top-2 duration-300">
            <div className="px-3 sm:px-4 py-4 space-y-1 max-h-full overflow-y-auto">
              {navigationLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block text-purple-200 hover:text-blue-300 transition-all duration-300 text-sm sm:text-base py-2.5 px-3 sm:px-4 rounded-lg hover:bg-purple-500/10 border-b border-purple-500/10 last:border-b-0 font-medium active:scale-95 transform"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full mr-2 sm:mr-3 opacity-0 animate-pulse"></span>
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}