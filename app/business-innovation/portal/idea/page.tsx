'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface BusinessIdea {
  title: string
  description: string
  problem: string
  solution: string
  marketSize: string
  targetAudience: string
  competitiveAdvantage: string
  revenueModel: string
}

export default function BusinessIdeaSubmission() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [existingIdea, setExistingIdea] = useState<BusinessIdea | null>(null)
  const router = useRouter()

  const [formData, setFormData] = useState<BusinessIdea>({
    title: '',
    description: '',
    problem: '',
    solution: '',
    marketSize: '',
    targetAudience: '',
    competitiveAdvantage: '',
    revenueModel: ''
  })

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

      // Fetch existing idea if any
      fetchExistingIdea(parsed.email, parsed.accessCode)
    } catch (error) {
      console.error('Auth data parsing error:', error)
      router.push('/business-innovation')
      return
    }
  }, [router])

  const fetchExistingIdea = async (email: string, accessCode: string) => {
    try {
      const response = await fetch(`/api/business-innovation/idea?email=${encodeURIComponent(email)}&accessCode=${encodeURIComponent(accessCode)}`)
      if (response.ok) {
        const data = await response.json()
        if (data.businessIdea) {
          setExistingIdea(data.businessIdea)
          setFormData(data.businessIdea)
        }
      }
    } catch (error) {
      console.error('Error fetching existing idea:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof BusinessIdea, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userData) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/business-innovation/idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          accessCode: userData.accessCode,
          businessIdea: formData
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Submission failed')
      }

      alert('Business idea submitted successfully! You have progressed to the Design phase.')
      router.push('/business-innovation/portal')
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <div className="text-purple-300 text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Business Innovation - Idea Submission
              </h1>
              <p className="text-purple-300 text-sm">Submit your innovative business idea</p>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8">
          {existingIdea && (
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 mb-6">
              <p className="text-green-300 text-sm">
                ✅ You have already submitted a business idea. You can update it below.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Business Idea Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full bg-black/50 border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:ring-purple-400 focus:border-purple-400"
                placeholder="Enter a compelling title for your business idea"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Problem Statement & Impact *
              </label>
              <textarea
                required
                rows={4}
                value={formData.problem}
                onChange={(e) => handleInputChange('problem', e.target.value)}
                className="w-full bg-black/50 border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:ring-purple-400 focus:border-purple-400"
                placeholder="What problem are you solving? Be specific and detailed."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Solution Description with reference - Links or URLS *
              </label>
              <textarea
                required
                rows={4}
                value={formData.solution}
                onChange={(e) => handleInputChange('solution', e.target.value)}
                className="w-full bg-black/50 border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:ring-purple-400 focus:border-purple-400"
                placeholder="How does your solution address the problem? Describe your approach."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Market Size & Opportunity *
              </label>
              <textarea
                required
                rows={3}
                value={formData.marketSize}
                onChange={(e) => handleInputChange('marketSize', e.target.value)}
                className="w-full bg-black/50 border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:ring-purple-400 focus:border-purple-400"
                placeholder="What's the market size? Who are your competitors? What's your market opportunity?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Target Audience for your product*
              </label>
              <textarea
                required
                rows={3}
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                className="w-full bg-black/50 border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:ring-purple-400 focus:border-purple-400"
                placeholder="Who is your target customer? Describe their demographics, needs, and behaviors."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Competitive Advantage *
              </label>
              <textarea
                required
                rows={3}
                value={formData.competitiveAdvantage}
                onChange={(e) => handleInputChange('competitiveAdvantage', e.target.value)}
                className="w-full bg-black/50 border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:ring-purple-400 focus:border-purple-400"
                placeholder="What makes your solution unique? What's your competitive advantage?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Revenue Model Or Business Model *
              </label>
              <textarea
                required
                rows={3}
                value={formData.revenueModel}
                onChange={(e) => handleInputChange('revenueModel', e.target.value)}
                className="w-full bg-black/50 border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:ring-purple-400 focus:border-purple-400"
                placeholder="How will you make money? Describe your revenue streams and pricing strategy."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Overall Description & Project Link *
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full bg-black/50 border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:ring-purple-400 focus:border-purple-400"
                placeholder="Provide an overall summary of your business idea (optional)"
              />
            </div>

            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
              <h4 className="text-yellow-300 font-semibold mb-2">Important Notes:</h4>
              <ul className="text-yellow-200 text-sm space-y-1">
                <li>• Your idea will be evaluated based on innovation, feasibility, and market potential</li>
                <li>• Be specific and provide concrete examples where possible</li>
                <li>• You can update your idea until the submission deadline</li>
                <li>• Submitting this idea will progress you to the Design phase</li>
              </ul>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                {submitting ? 'Submitting...' : existingIdea ? 'Update Business Idea' : 'Submit Business Idea'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}