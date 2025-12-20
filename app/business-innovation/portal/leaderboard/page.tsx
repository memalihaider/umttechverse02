'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface LeaderboardEntry {
  id: string
  name: string
  university: string
  current_phase: string
  submission_status: string
  average_score: number
  evaluation_count: number
  last_evaluation: string
  evaluations: Array<{
    phase: string
    evaluator_name: string
    innovation_score: number
    feasibility_score: number
    market_potential_score: number
    presentation_score: number
    technical_score: number
    business_model_score: number
    total_score: number
    comments: string
    evaluated_at: string
  }>
  rank: number
}

export default function Leaderboard() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [selectedEntry, setSelectedEntry] = useState<LeaderboardEntry | null>(null)
  const [leaderboardLastUpdated, setLeaderboardLastUpdated] = useState<number | null>(null)
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

  // Fetch leaderboard
  fetchLeaderboard(parsed.email, parsed.accessCode)
  // Poll leaderboard every 10 seconds
  const interval = setInterval(() => fetchLeaderboard(parsed.email, parsed.accessCode), 10_000)
  return () => clearInterval(interval)
    } catch (error) {
      console.error('Auth data parsing error:', error)
      router.push('/business-innovation')
      return
    }
  }, [router])

  const fetchLeaderboard = async (email: string, accessCode: string) => {
    try {
      const response = await fetch(`/api/business-innovation/leaderboard?email=${encodeURIComponent(email)}&accessCode=${encodeURIComponent(accessCode)}`)
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data.leaderboard || [])
        setLeaderboardLastUpdated(Date.now())
        // keep the selected entry in sync with refreshed data
        if (selectedEntry) {
          const updated = (data.leaderboard || []).find((e: LeaderboardEntry) => e.id === selectedEntry.id)
          if (updated) setSelectedEntry(updated)
        }
      } else {
        console.error('Failed to fetch leaderboard')
      }
      } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'idea_selection': return 'bg-blue-900/50 text-blue-300 border-blue-500/50'
      case 'design': return 'bg-purple-900/50 text-purple-300 border-purple-500/50'
      case 'development': return 'bg-green-900/50 text-green-300 border-green-500/50'
      case 'submission': return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50'
      default: return 'bg-gray-900/50 text-gray-300 border-gray-500/50'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 45) return 'text-green-400'
    if (score >= 35) return 'text-yellow-400'
    if (score >= 25) return 'text-orange-400'
    return 'text-red-400'
  }

  const computeCategoryAverages = (evaluations: LeaderboardEntry['evaluations']) => {
    if (!evaluations || evaluations.length === 0) return null
    const sums = evaluations.reduce((acc, ev) => {
      acc.innovation += (ev?.innovation_score || 0)
      acc.feasibility += (ev?.feasibility_score || 0)
      acc.market += (ev?.market_potential_score || 0)
      acc.presentation += (ev?.presentation_score || 0)
      acc.technical += (ev?.technical_score || 0)
      return acc
    }, { innovation: 0, feasibility: 0, market: 0, presentation: 0, technical: 0 })
    const count = evaluations.length
    return {
      innovation: sums.innovation / count,
      feasibility: sums.feasibility / count,
      market: sums.market / count,
      presentation: sums.presentation / count,
      technical: sums.technical / count
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <div className="text-purple-300 text-xl">Loading Leaderboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Live Scoreboard - Business Innovation
              </h1>
              <p className="text-purple-300 text-sm">Real-time evaluation scores and rankings</p>
            </div>
            <button
              onClick={() => router.push('/business-innovation/portal')}
              className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 transition-colors"
            >
              ← Back to Portal
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-blue-400">{leaderboard.length}</div>
            <div className="text-purple-300 text-sm">Total Participants</div>
          </div>
          <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-green-400">
              {leaderboard.filter(entry => entry.current_phase === 'submission').length}
            </div>
            <div className="text-purple-300 text-sm">Final Submissions</div>
          </div>
          <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-purple-400">
              {leaderboard.filter(entry => entry.evaluation_count > 0).length}
            </div>
            <div className="text-purple-300 text-sm">Evaluated Teams</div>
          </div>
          <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {leaderboard.length > 0 ? Math.round(leaderboard.reduce((sum, entry) => sum + entry.average_score, 0) / leaderboard.length) : 0}
            </div>
            <div className="text-purple-300 text-sm">Average Score</div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-purple-500/20">
            <h3 className="text-xl font-semibold text-blue-300">Current Rankings</h3>
            {leaderboardLastUpdated && (
              <div className="text-sm text-purple-400">Last updated: {new Date(leaderboardLastUpdated).toLocaleTimeString()}</div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-900/20">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">University</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Phase</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Avg Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Evaluations</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Innovation</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Feasibility</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Market</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Presentation</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Technical</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Last Eval</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {leaderboard.map((entry) => {
                  const isYou = userData && userData.id === entry.id
                  return (
                    <tr key={entry.id} className="hover:bg-purple-900/10 transition-colors">
                      <td className={`px-6 py-4 whitespace-nowrap ${isYou ? 'bg-yellow-900/10' : ''}`}>
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            entry.rank === 1 ? 'bg-yellow-500 text-black' :
                            entry.rank === 2 ? 'bg-gray-400 text-black' :
                            entry.rank === 3 ? 'bg-orange-600 text-white' :
                            'bg-purple-600 text-white'
                          }`}>
                            {entry.rank}
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${isYou ? 'bg-yellow-900/10' : ''}`}>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-blue-300">{entry.name}</div>
                          {isYou && (
                            <span className="text-xs inline-block bg-yellow-500 text-black px-2 py-0.5 rounded">You</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-purple-200">{entry.university}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPhaseColor(entry.current_phase)}`}>
                          {entry.current_phase.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getScoreColor(entry.average_score)}`}>
                          {entry.average_score.toFixed(1)}/60
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-purple-200">{entry.evaluation_count}</div>
                      </td>
                      {/* per category averages, hidden on small screens */}
                      {(() => {
                        const avgs = computeCategoryAverages(entry.evaluations)
                        return (
                          <>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-purple-200">{avgs ? avgs.innovation.toFixed(1) : '-'}</div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-purple-200">{avgs ? avgs.feasibility.toFixed(1) : '-'}</div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-purple-200">{avgs ? avgs.market.toFixed(1) : '-'}</div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-purple-200">{avgs ? avgs.presentation.toFixed(1) : '-'}</div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-purple-200">{avgs ? avgs.technical.toFixed(1) : '-'}</div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-purple-200">
                                {entry.evaluations && entry.evaluations.length > 0 ? new Date(entry.evaluations.reduce((acc, cur) => acc > new Date(cur.evaluated_at).getTime() ? acc : new Date(cur.evaluated_at).getTime(), 0)).toLocaleString() : '-'}
                              </div>
                            </td>
                          </>
                        )
                      })()}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedEntry(entry)}
                          className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Evaluation Details Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl border border-purple-500/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-blue-300">
                    Evaluation Details - {selectedEntry.name}
                  </h3>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">#{selectedEntry.rank}</div>
                    <div className="text-purple-300 text-sm">Rank</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{selectedEntry.average_score.toFixed(1)}</div>
                    <div className="text-purple-300 text-sm">Avg Score</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{selectedEntry.evaluation_count}</div>
                    <div className="text-purple-300 text-sm">Evaluations</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPhaseColor(selectedEntry.current_phase)}`}>
                      {selectedEntry.current_phase.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Detailed Evaluations */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-200 mb-4">Evaluation Breakdown</h4>
                  <div className="space-y-4">
                    {selectedEntry.evaluations.map((evaluation, index) => (
                      <div key={index} className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-medium text-blue-300">{evaluation.evaluator_name}</div>
                            <div className="text-sm text-purple-400">{evaluation.phase.replace('_', ' ')} Phase</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-400">{evaluation.total_score}/60</div>
                            <div className="text-xs text-purple-400">
                              {new Date(evaluation.evaluated_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                          <div className="text-center">
                            <div className="text-sm text-purple-300">Innovation</div>
                            <div className="font-semibold text-blue-400">{evaluation.innovation_score}/10</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-purple-300">Feasibility</div>
                            <div className="font-semibold text-blue-400">{evaluation.feasibility_score}/10</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-purple-300">Market Potential</div>
                            <div className="font-semibold text-blue-400">{evaluation.market_potential_score}/10</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-purple-300">Presentation</div>
                            <div className="font-semibold text-blue-400">{evaluation.presentation_score}/10</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-purple-300">Technical</div>
                            <div className="font-semibold text-blue-400">{evaluation.technical_score}/10</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-purple-300">Business Model</div>
                            <div className="font-semibold text-blue-400">{evaluation.business_model_score}/10</div>
                          </div>
                        </div>

                        {evaluation.comments && (
                          <div className="border-t border-purple-500/20 pt-3">
                            <div className="text-sm text-purple-300 mb-1">Comments:</div>
                            <div className="text-sm text-purple-200 italic">"{evaluation.comments}"</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}