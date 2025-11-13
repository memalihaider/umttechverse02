'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Login failed')
      }

      const data = await response.json()

      // Store session token
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_email', email)

      // Redirect to admin portal
      router.push('/admin')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Admin Portal Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-purple-300">
            Techverse 2026 Administration
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-black/80 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 shadow-2xl">
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-purple-200">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400 px-3 py-2"
                  placeholder="admin@techverse.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-purple-200">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400 px-3 py-2"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}