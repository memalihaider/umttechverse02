'use client'

import { useEffect, useState } from 'react'
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
  const router = useRouter()

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
      setUserData(parsed)
    } catch (error) {
      console.error('Auth data parsing error:', error)
      router.push('/business-innovation')
      return
    }

    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('businessInnovationAuth')
    router.push('/business-innovation')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
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
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900">
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
              <p className="text-purple-200 font-medium text-xl">{userData.team_members?.length || 1} members</p>
              <p className="text-purple-400 text-sm">1-5 members allowed</p>
            </div>
          </div>

          {/* Team Members */}
          {userData.team_members && userData.team_members.length > 1 && (
            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20 mb-8">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Your Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.team_members.slice(1).map((member, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-4 border border-purple-500/10">
                    <p className="text-purple-200 font-medium">{member.name}</p>
                    <p className="text-purple-300 text-sm">{member.email}</p>
                    <p className="text-purple-400 text-sm">{member.university}</p>
                    <p className="text-purple-400 text-sm">Roll: {member.rollNo}</p>
                  </div>
                ))}
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
                  <li>Registration Deadline: [Date to be announced]</li>
                  <li>Idea Submission: [Date to be announced]</li>
                  <li>Prototype Development: [Date to be announced]</li>
                  <li>Final Presentation: [Date to be announced]</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-purple-100 mb-2">🏆 Prizes</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>1st Place: PKR 40,000 + Internship Opportunities</li>
                  <li>2nd Place: PKR 30,000 + Mentorship Program</li>
                  <li>3rd Place: PKR 20,000 + Certificate of Excellence</li>
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
                  📧 business.innovation@techverse.com<br />
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
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Download Templates
              </button>
            </div>

            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
              <h4 className="font-semibold text-purple-100 mb-3">🎓 Mentorship Program</h4>
              <p className="text-purple-300 text-sm mb-4">
                Connect with industry experts and successful entrepreneurs for guidance.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Find Mentor
              </button>
            </div>

            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
              <h4 className="font-semibold text-purple-100 mb-3">💡 Innovation Hub</h4>
              <p className="text-purple-300 text-sm mb-4">
                Access workshops, webinars, and resources on entrepreneurship and innovation.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Explore Hub
              </button>
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
                <tr className="border-b border-purple-500/10">
                  <td className="py-3 px-4">Registration Opens</td>
                  <td className="py-3 px-4">[Date TBD]</td>
                  <td className="py-3 px-4"><span className="bg-green-900/50 text-green-300 px-2 py-1 rounded text-sm">Completed</span></td>
                </tr>
                <tr className="border-b border-purple-500/10">
                  <td className="py-3 px-4">Idea Submission Deadline</td>
                  <td className="py-3 px-4">[Date TBD]</td>
                  <td className="py-3 px-4"><span className="bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded text-sm">Upcoming</span></td>
                </tr>
                <tr className="border-b border-purple-500/10">
                  <td className="py-3 px-4">Mentorship Sessions</td>
                  <td className="py-3 px-4">[Date TBD]</td>
                  <td className="py-3 px-4"><span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-sm">Available</span></td>
                </tr>
                <tr className="border-b border-purple-500/10">
                  <td className="py-3 px-4">Final Presentations</td>
                  <td className="py-3 px-4">[Date TBD]</td>
                  <td className="py-3 px-4"><span className="bg-gray-900/50 text-gray-300 px-2 py-1 rounded text-sm">TBD</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Results Announcement</td>
                  <td className="py-3 px-4">[Date TBD]</td>
                  <td className="py-3 px-4"><span className="bg-gray-900/50 text-gray-300 px-2 py-1 rounded text-sm">TBD</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}