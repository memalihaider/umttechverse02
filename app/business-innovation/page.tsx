'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function BusinessInnovationSignIn() {
  const [email, setEmail] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/business-innovation/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), accessCode: accessCode.trim() }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Authentication failed')
      }

      const data = await response.json()

      // Store full authentication data in localStorage (include authenticated flag)
      localStorage.setItem('businessInnovationAuth', JSON.stringify({
        ...data,
        authenticated: true
      }))

      // Redirect to portal
      router.push('/business-innovation/portal')
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <Navbar />

      <div className="max-w-md w-full space-y-8 mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Business Innovation Portal
          </h1>
          <p className="mt-2 text-purple-300">Sign in to access your Business Innovation dashboard</p>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-200">
                Team Leader Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400 px-3 py-2"
                placeholder="your.email@university.edu.pk"
              />
            </div>

            <div>
              <label htmlFor="accessCode" className="block text-sm font-medium text-purple-200">
                Access Code
              </label>
              <input
                id="accessCode"
                name="accessCode"
                type="text"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400 px-3 py-2 font-mono"
                placeholder="ABCDEFGH"
                maxLength={8}
              />
              <p className="mt-1 text-sm text-purple-400">
                8-character alphanumeric code from your registration email
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-purple-400">
              Don&apos;t have an access code?{' '}
              <a href="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                Register for Business Innovation
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}