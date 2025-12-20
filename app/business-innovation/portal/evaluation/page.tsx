'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Participant {
  id: string
  name: string
  university: string
  email: string
  current_phase: string
  submission_status: string
  idea_title: string
  idea_description: string
  github_repo: string
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
}

interface EvaluationForm {
  innovation_score: number
  feasibility_score: number
  market_potential_score: number
  presentation_score: number
  technical_score: number
  business_model_score: number
  comments: string
}

export default function Evaluation() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [evaluationForm, setEvaluationForm] = useState<EvaluationForm>({
    innovation_score: 5,
    feasibility_score: 5,
    market_potential_score: 5,
    presentation_score: 5,
    technical_score: 5,
    business_model_score: 5,
    comments: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [filter, setFilter] = useState<string>('all')
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
      if (!parsed.authenticated || parsed.role !== 'evaluator') {
        router.push('/business-innovation')
        return
      }
      setUserData(parsed)

      // Fetch participants for evaluation
      fetchParticipants(parsed.email, parsed.accessCode)
    } catch (error) {
      console.error('Auth data parsing error:', error)
      router.push('/business-innovation')
      return
    }
  }, [router])

  const fetchParticipants = async (email: string, accessCode: string) => {
    try {
      const response = await fetch(`/api/business-innovation/leaderboard?email=${encodeURIComponent(email)}&accessCode=${encodeURIComponent(accessCode)}`)
      if (response.ok) {
        const data = await response.json()
        setParticipants(data.leaderboard || [])
      } else {
        console.error('Failed to fetch participants')
      }
    } catch (error) {
      console.error('Error fetching participants:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEvaluationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedParticipant || !userData) return

    setSubmitting(true)
    try {
      const totalScore = evaluationForm.innovation_score +
                        evaluationForm.feasibility_score +
                        evaluationForm.market_potential_score +
                        evaluationForm.presentation_score +
                        evaluationForm.technical_score +
                        evaluationForm.business_model_score

      const response = await fetch('/api/business-innovation/evaluation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantId: selectedParticipant.id,
          evaluatorEmail: userData.email,
          evaluatorName: userData.name,
          phase: selectedParticipant.current_phase,
          ...evaluationForm,
          total_score: totalScore
        })
      })

      if (response.ok) {
        alert('Evaluation submitted successfully!')
        setSelectedParticipant(null)
        setEvaluationForm({
          innovation_score: 5,
          feasibility_score: 5,
          market_potential_score: 5,
          presentation_score: 5,
          technical_score: 5,
          business_model_score: 5,
          comments: ''
        })
        // Refresh participants
        fetchParticipants(userData.email, userData.accessCode)
      } else {
        const error = await response.json()
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error)
      alert('Failed to submit evaluation')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePhaseUpdate = async (participantId: string, newPhase: string) => {
    if (!userData) return

    try {
      const response = await fetch('/api/business-innovation/phase', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantId,
          newPhase,
          evaluatorEmail: userData.email
        })
      })

      if (response.ok) {
        alert('Phase updated successfully!')
        fetchParticipants(userData.email, userData.accessCode)
      } else {
        const error = await response.json()
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      console.error('Error updating phase:', error)
      alert('Failed to update phase')
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

  const filteredParticipants = participants.filter(participant => {
    if (filter === 'all') return true
    return participant.current_phase === filter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <div className="text-purple-300 text-xl">Loading Evaluation Portal...</div>
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
                Evaluation Portal - Business Innovation
              </h1>
              <p className="text-purple-300 text-sm">Evaluate participants and manage phase progression</p>
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
        {/* Filter Controls */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Participants' },
              { value: 'idea_selection', label: 'Idea Selection' },
              { value: 'design', label: 'Design Phase' },
              { value: 'development', label: 'Development' },
              { value: 'submission', label: 'Final Submission' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === option.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-900/30 text-purple-200 hover:bg-purple-800/30'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Participants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParticipants.map((participant) => (
            <div key={participant.id} className="bg-black/80 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-300">{participant.name}</h3>
                  <p className="text-purple-400 text-sm">{participant.university}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPhaseColor(participant.current_phase)}`}>
                  {participant.current_phase.replace('_', ' ')}
                </span>
              </div>

              {participant.idea_title && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-purple-200 mb-1">Idea Title:</h4>
                  <p className="text-sm text-purple-300">{participant.idea_title}</p>
                </div>
              )}

              <div className="mb-4">
                <h4 className="text-sm font-medium text-purple-200 mb-1">Evaluations:</h4>
                <p className="text-sm text-purple-300">{participant.evaluations.length} received</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedParticipant(participant)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 transition-colors"
                >
                  Evaluate Team
                </button>

                {/* Phase Management */}
                <div className="flex gap-1">
                  {participant.current_phase === 'idea_selection' && (
                    <button
                      onClick={() => handlePhaseUpdate(participant.id, 'design')}
                      className="flex-1 inline-flex justify-center items-center px-2 py-1 border border-green-500/50 rounded text-xs font-medium text-green-200 bg-green-900/30 hover:bg-green-800/30 transition-colors"
                    >
                      → Design
                    </button>
                  )}
                  {participant.current_phase === 'design' && (
                    <button
                      onClick={() => handlePhaseUpdate(participant.id, 'development')}
                      className="flex-1 inline-flex justify-center items-center px-2 py-1 border border-green-500/50 rounded text-xs font-medium text-green-200 bg-green-900/30 hover:bg-green-800/30 transition-colors"
                    >
                      → Development
                    </button>
                  )}
                  {participant.current_phase === 'development' && (
                    <button
                      onClick={() => handlePhaseUpdate(participant.id, 'submission')}
                      className="flex-1 inline-flex justify-center items-center px-2 py-1 border border-green-500/50 rounded text-xs font-medium text-green-200 bg-green-900/30 hover:bg-green-800/30 transition-colors"
                    >
                      → Submission
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Evaluation Modal */}
        {selectedParticipant && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl border border-purple-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-blue-300">
                    Evaluate: {selectedParticipant.name}
                  </h3>
                  <button
                    onClick={() => setSelectedParticipant(null)}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <form onSubmit={handleEvaluationSubmit} className="p-6 space-y-6">
                {/* Participant Info */}
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-purple-200 mb-2">Participant Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-400">University:</span>
                      <span className="text-purple-200 ml-2">{selectedParticipant.university}</span>
                    </div>
                    <div>
                      <span className="text-purple-400">Current Phase:</span>
                      <span className="text-purple-200 ml-2">{selectedParticipant.current_phase.replace('_', ' ')}</span>
                    </div>
                  </div>
                  {selectedParticipant.idea_title && (
                    <div className="mt-2">
                      <span className="text-purple-400">Idea:</span>
                      <span className="text-purple-200 ml-2">{selectedParticipant.idea_title}</span>
                    </div>
                  )}
                </div>

                {/* Evaluation Criteria */}
                <div>
                  <h4 className="font-medium text-purple-200 mb-4">Evaluation Criteria (0-10 scale)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'innovation_score', label: 'Innovation & Originality' },
                      { key: 'feasibility_score', label: 'Technical Feasibility' },
                      { key: 'market_potential_score', label: 'Market Potential' },
                      { key: 'presentation_score', label: 'Presentation Quality' },
                      { key: 'technical_score', label: 'Technical Implementation' },
                      { key: 'business_model_score', label: 'Business Model Viability' }
                    ].map((criterion) => (
                      <div key={criterion.key}>
                        <label className="block text-sm font-medium text-purple-200 mb-2">
                          {criterion.label}
                        </label>
                        <select
                          value={evaluationForm[criterion.key as keyof EvaluationForm]}
                          onChange={(e) => setEvaluationForm(prev => ({
                            ...prev,
                            [criterion.key]: parseInt(e.target.value)
                          }))}
                          className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500/50 rounded-lg text-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {Array.from({ length: 11 }, (_, i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Comments & Feedback
                  </label>
                  <textarea
                    value={evaluationForm.comments}
                    onChange={(e) => setEvaluationForm(prev => ({ ...prev, comments: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500/50 rounded-lg text-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Provide constructive feedback..."
                  />
                </div>

                {/* Total Score */}
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-purple-200">Total Score:</span>
                    <span className="text-2xl font-bold text-green-400">
                      {evaluationForm.innovation_score +
                       evaluationForm.feasibility_score +
                       evaluationForm.market_potential_score +
                       evaluationForm.presentation_score +
                       evaluationForm.technical_score +
                       evaluationForm.business_model_score}/60
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedParticipant(null)}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting ? 'Submitting...' : 'Submit Evaluation'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}