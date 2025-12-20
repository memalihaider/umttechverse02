"use client"

import { useEffect, useState } from 'react'
import { modules } from '@/lib/modules'
import { getAdditionalTeamMembers, normalizeTeamMember } from '@/lib/team-members'
import { useRouter } from 'next/navigation'

interface UserData {
  id: string
  name: string
  email: string
  university: string
  module: string
  accessCode: string
  role?: string
  team_members: Array<{
    name: string
    email: string
    university: string
    rollNo: string
  }>
  created_at: string
}

export default function BusinessInnovationPortal() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPhase, setCurrentPhase] = useState<string | null>(null)
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null)
  const [phaseLastUpdated, setPhaseLastUpdated] = useState<number | null>(null)
  const [nowTs, setNowTs] = useState(() => Date.now())
  const router = useRouter()
  const additionalTeamMembers = userData ? getAdditionalTeamMembers(userData) : []

  const fetchPhaseStatus = async (email: string, accessCode: string) => {
    try {
      const res = await fetch(`/api/business-innovation/phase?email=${encodeURIComponent(email)}&accessCode=${encodeURIComponent(accessCode)}`)
      if (!res.ok) return
      const data = await res.json()
      setCurrentPhase(data.currentPhase || null)
      setSubmissionStatus(data.submissionStatus || null)
      setPhaseLastUpdated(Date.now())
    } catch (err) {
      console.error('Error fetching phase status', err)
    }
  }

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem('businessInnovationAuth')
    if (!authData) {
      router.push('/business-innovation')
      return
    }

    try {
      const parsed = JSON.parse(authData)
      if (!parsed.authenticated) {
        router.push('/business-innovation')
        return
      }
  // Defer setting user state to avoid cascading renders in effect
  setTimeout(() => setUserData(parsed), 0)
    } catch (error) {
      console.error('Auth data parsing error:', error)
      router.push('/business-innovation')
      return
    }

    setLoading(false)
    // fetch user's current phase once after auth
    if (authData) {
      try {
        const parsed = JSON.parse(authData)
        if (parsed?.authenticated) {
      fetchPhaseStatus(parsed.email, parsed.accessCode)
        }
      } catch (err) {
        // ignore
      }
    }
  }, [router])

  useEffect(() => {
    // Refresh 'now' timestamp every minute so statuses update while the page is open
    const i = setInterval(() => setNowTs(Date.now()), 60_000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    // Poll for phase updates every 10 seconds
    if (!userData) return
    const interval = setInterval(() => {
      fetchPhaseStatus(userData.email, userData.accessCode)
    }, 10_000)
    return () => clearInterval(interval)
  }, [userData])

  // (fetchPhaseStatus moved above)

  const handleLogout = () => {
    localStorage.removeItem('businessInnovationAuth')
    router.push('/business-innovation')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <div className="text-purple-300 text-xl">Loading Business Innovation Portal...</div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Business Innovation Portal
              </h1>
              <p className="text-purple-300 text-sm">Welcome, {userData.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => router.push('/business-innovation/portal/idea')}
                  className="inline-flex items-center px-3 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 transition-colors"
                >
                  Submit Idea
                </button>
                {(currentPhase === 'design' || currentPhase === 'development' || currentPhase === 'submission') && (
                  <button
                    onClick={() => router.push('/business-innovation/portal/submission')}
                    className="inline-flex items-center px-3 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-yellow-900/30 hover:bg-yellow-800/30 transition-colors"
                  >
                    Final Submission
                  </button>
                )}
                <button
                  onClick={() => router.push('/business-innovation/portal/leaderboard')}
                  className="inline-flex items-center px-3 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 transition-colors"
                >
                  Leaderboard
                </button>
                {userData.role === 'evaluator' && (
                  <button
                    onClick={() => router.push('/business-innovation/portal/evaluation')}
                    className="inline-flex items-center px-3 py-2 border border-green-500/50 rounded-lg text-sm font-medium text-green-200 bg-green-900/30 hover:bg-green-800/30 transition-colors"
                  >
                    Evaluate Teams
                  </button>
                )}
              </nav>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Welcome to Business Innovation Challenge
            </h2>
            <p className="text-purple-300 text-lg">
              Congratulations on qualifying for Techverse 2026&apos;s premier business innovation competition!
            </p>
          </div>

          {/* User Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Team Leader</h3>
              <p className="text-purple-200 font-medium">{userData.name}</p>
              <p className="text-purple-300 text-sm">{userData.email}</p>
              <p className="text-purple-400 text-sm">{userData.university}</p>
            </div>

            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Access Code</h3>
              <p className="text-purple-200 font-mono font-medium text-xl">{userData.accessCode}</p>
              <p className="text-purple-400 text-sm">Keep this code secure</p>
            </div>

            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Team Size</h3>
              <p className="text-purple-200 font-medium text-xl">{1 + additionalTeamMembers.length} members</p>
              <p className="text-purple-400 text-sm">1-5 members allowed</p>
            </div>
            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Your Progress</h3>
              <div className="space-y-2">
                <div className="text-purple-200 text-sm">Phase</div>
                <div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium border ${currentPhase ? (currentPhase === 'design' ? 'bg-purple-900/50 text-purple-300 border-purple-500/50' : currentPhase === 'submission' ? 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50' : currentPhase === 'development' ? 'bg-green-900/50 text-green-300 border-green-500/50' : 'bg-blue-900/50 text-blue-300 border-blue-500/50') : 'bg-gray-900/50 text-gray-300' }`}> {currentPhase ? currentPhase.replace('_', ' ') : 'Unknown' }</span>
                </div>
                <div className="text-purple-200 text-sm">Submission</div>
                <div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium border ${submissionStatus ? (submissionStatus === 'submitted' ? 'bg-green-900/50 text-green-300' : 'bg-yellow-900/50 text-yellow-300') : 'bg-gray-900/50 text-gray-300'}`}>{submissionStatus ? submissionStatus : 'Not submitted'}</span>
                </div>
                {phaseLastUpdated && (
                  <div className="text-xs text-purple-400 mt-2">Last updated: {new Date(phaseLastUpdated).toLocaleTimeString()}</div>
                )}
              </div>
            </div>
          </div>

          {/* Team Members */}
          {additionalTeamMembers.length > 0 && (
            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20 mb-8">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Your Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalTeamMembers.map((member, index) => {
                  const m = normalizeTeamMember(member as any)
                  return (
                    <div key={index} className="bg-black/30 rounded-lg p-4 border border-purple-500/10">
                      <p className="text-purple-200 font-medium">{m.name}</p>
                      <p className="text-purple-300 text-sm">{m.email}</p>
                      <p className="text-purple-400 text-sm">{m.university}</p>
                      <p className="text-purple-400 text-sm">Roll: {m.rollNo}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Challenge Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Challenge Overview */}
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8">
            <h3 className="text-2xl font-bold text-blue-300 mb-6">Challenge Overview</h3>
            <div className="space-y-4 text-purple-200">
              <div>
                <h4 className="font-semibold text-purple-100 mb-2">🎯 Objective</h4>
                <p>Develop innovative business solutions that address real-world problems using technology, creativity, and entrepreneurial thinking.</p>
              </div>

              <div>
                <h4 className="font-semibold text-purple-100 mb-2">⏰ Timeline</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Registration Deadline: 14 December 2025</li>
                  <li>Idea Submission: 31st December 2025</li>
                  <li>Prototype Development: Start from 15 December 2025</li>
                  <li>Final Presentation: 11 January 2026 +</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-purple-100 mb-2">🏆 Prizes</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>1st Place: PKR 40,000 + Internship Opportunities</li>
                  <li>2nd Place: PKR 30,000 + Mentorship Program</li>
                  <li>Special Mentions: Certificate + Techverse Swag</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8">
            <h3 className="text-2xl font-bold text-blue-300 mb-6">Requirements</h3>
            <div className="space-y-4 text-purple-200">
              <div>
                <h4 className="font-semibold text-purple-100 mb-2">📋 Submission Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Business Plan (PDF format, max 10 pages)</li>
                  <li>Prototype Demo (Video or live presentation)</li>
                  <li>Market Research Analysis</li>
                  <li>Financial Projections</li>
                  <li>Team Presentation (10 minutes)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-purple-100 mb-2">🎨 Innovation Criteria</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Problem-Solution Fit (30%)</li>
                  <li>Market Potential (25%)</li>
                  <li>Technical Feasibility (20%)</li>
                  <li>Business Model Viability (15%)</li>
                  <li>Presentation Quality (10%)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-purple-100 mb-2">📞 Support</h4>
                <p className="text-sm">
                  <strong>Contact:</strong> Largify Solutions<br />
                  📧 techverse@umt.edu.pk<br />
                  📱 +966 59 736 9443 | +92 310 6207245
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 mb-8">
          <h3 className="text-2xl font-bold text-blue-300 mb-6">Resources & Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
              <h4 className="font-semibold text-purple-100 mb-3">📚 Business Templates</h4>
              <p className="text-purple-300 text-sm mb-4">
                Download business plan templates, financial models, and presentation guidelines.
              </p>
              {
                (() => {
                  const businessModule = modules.find(m => m.name === 'Business Innovation')
                  const guidebook = businessModule?.guidebook || 'https://drive.google.com/file/d/1n-hwkq_qweLuBal1K3_dTmRXv6uGWNHv/view?usp=sharing'
                  return (
                    <a
                      href={guidebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-block text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Business Innovation Guidebook
                    </a>
                  )
                })()
              }
            </div>

            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
              <h4 className="font-semibold text-purple-100 mb-3">💡 Idea & Case Study</h4>
              <p className="text-purple-300 text-sm mb-4">
                Pick on of the best idea that you think you can make and show your skills on the next level.
              </p>
              <a href="https://drive.google.com/drive/folders/1wKiL-C8tv45c6JvcbhH1jtzXdheZxOGd?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="Find Mentor - Mentorship resources" className="w-full inline-block text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Choose Idea
              </a>
            </div>

            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
              <h4 className="font-semibold text-purple-100 mb-3">Guidance With Largify Solutions</h4>
              <p className="text-purple-300 text-sm mb-4">
                Access Premium Group, where you get complete guidance for Business Innovation.
              </p>
              <a href="https://umttechverse.com/business-innovation/resources" target="_blank" rel="noopener noreferrer" className="w-full inline-block text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Join Now
              </a>
            </div>
          </div>
        </div>

        {/* Important Dates */}
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8">
          <h3 className="text-2xl font-bold text-blue-300 mb-6">Important Dates & Deadlines</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-purple-200">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left py-3 px-4 font-semibold">Milestone</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  // Define milestones and their ISO start/end dates for accurate comparisons
                }
                {
                  (() => {
                    const milestones = [
                      { key: 'registration-opens', label: 'Registration Opens', display: '19 November 2025', start: '2025-11-19', end: '2025-11-19' },
                      { key: 'idea-deadline', label: 'Idea Submission Deadline', display: '31 December 2025', start: '2025-12-31', end: '2025-12-31' },
                      { key: 'mentorship', label: 'Mentorship Sessions', display: '5-7 January 2026', start: '2026-01-05', end: '2026-01-07' },
                      { key: 'finals', label: 'Final Presentations', display: '10-11 January 2026', start: '2026-01-10', end: '2026-01-11' },
                      { key: 'results', label: 'Results Announcement', display: '11 January 2026', start: '2026-01-11', end: '2026-01-11' },
                    ]

                    // compute status based on current client time; Completed if now > endDate (end of day)
                    const currentTs = nowTs
                    const endOfDay = (isoDate: string) => {
                      const [y, m, d] = isoDate.split('-').map(Number)
                      // monthIndex is 0-based
                      return new Date(y, m - 1, d, 23, 59, 59).getTime()
                    }

                    const getStatus = (m: { start: string; end: string }) => {
                      const end = endOfDay(m.end)
                      if (currentTs > end) return { text: 'Completed', classes: 'bg-green-900/50 text-green-300' }
                      return { text: 'Pending', classes: 'bg-yellow-900/50 text-yellow-300' }
                    }

                    return milestones.map((ms) => {
                      const status = getStatus(ms)
                      return (
                        <tr key={ms.key} className="border-b border-purple-500/10">
                          <td className="py-3 px-4">{ms.label}</td>
                          <td className="py-3 px-4">{ms.display}</td>
                          <td className="py-3 px-4">
                            <span className={`${status.classes} px-2 py-1 rounded text-sm`}>{status.text}</span>
                          </td>
                        </tr>
                      )
                    })
                  })()
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}