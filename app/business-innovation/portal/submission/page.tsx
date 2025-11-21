 'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


export default function FinalSubmissionPage() {
  const [userData, setUserData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [docsLink, setDocsLink] = useState('')
  const [githubRepo, setGithubRepo] = useState('')
  const [videoLink, setVideoLink] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  useEffect(() => {
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
      fetchExisting(parsed.email, parsed.accessCode)
    } catch (error) {
      router.push('/business-innovation')
      return
    }
  }, [router])

  const fetchExisting = async (email: string, accessCode: string) => {
    try {
      const res = await fetch(`/api/business-innovation/phase?email=${encodeURIComponent(email)}&accessCode=${encodeURIComponent(accessCode)}`)
      if (!res.ok) return
      const data = await res.json()
      if (data.githubRepo) setGithubRepo(data.githubRepo)
      const finalSubmission = data.finalSubmission
      if (finalSubmission) {
        setDocsLink(finalSubmission.docsLink || '')
        setVideoLink(finalSubmission.videoLink || '')
        setDescription(finalSubmission.description || '')
      }
    } catch (e) {
      console.error('Failed fetching existing submission', e)
    } finally {
      setLoading(false)
    }
  }

  // URL validation utility removed (not used yet)

  const validateGithubRepo = (url: string) => {
    // very basic github repo URL validation
    return /^https:\/\/github\.com\/[\w-]+\/[\w-._-]+(\/.*)?$/.test(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userData) return
    if (!validateGithubRepo(githubRepo)) {
      alert('Please enter a valid GitHub repository URL (https://github.com/owner/repo)')
      return
    }
    if (!description || description.trim().length < 10) {
      alert('Please enter a brief final description (10 characters min).')
      return
    }

    setSubmitting(true)
    try {
      const body = {
        email: userData.email,
        accessCode: userData.accessCode,
        newPhase: 'submission',
        githubRepo: githubRepo.trim(),
        submissionMetadata: {
          docsLink: docsLink.trim() || undefined,
          videoLink: videoLink.trim() || undefined,
          description: description.trim()
        }
      }

      const response = await fetch('/api/business-innovation/phase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Submission failed')
      }

      alert('Final submission submitted successfully!')
      router.push('/business-innovation/portal')
    } catch (err) {
      console.error(err)
      alert(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
      <div className="text-center text-purple-200">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900">
      <header className="bg-black/80 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-blue-300">Final Project Submission</h1>
            <p className="text-purple-300 text-sm">Submit your final project deliverables (GitHub repo, docs, video, description).</p>
          </div>
          <button onClick={() => router.push('/business-innovation/portal')} className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-200 bg-purple-900/30 border border-purple-500/50 rounded-lg">Back to Portal</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-black/80 p-6 rounded-2xl border border-purple-500/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">GitHub Repository URL (required)</label>
              <input type="text" required value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} placeholder="https://github.com/owner/repo" className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg px-3 py-3 text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Project Documents Link (Google Drive/Dropbox)</label>
              <input value={docsLink} onChange={(e) => setDocsLink(e.target.value)} placeholder="https://drive.google.com/..." className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg px-3 py-3 text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">YouTube Demo Video Link (optional)</label>
              <input value={videoLink} onChange={(e) => setVideoLink(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg px-3 py-3 text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Final Description (required)</label>
              <textarea required rows={6} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg px-3 py-3 text-white" placeholder="Provide a short summary of the final project, features, and how to run it." />
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={submitting} className="px-6 py-3 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 rounded-xl text-white font-medium">{submitting ? 'Submitting...' : 'Submit Final Project'}</button>
              <button type="button" onClick={() => router.push('/business-innovation/portal')} className="px-4 py-3 bg-black/30 border border-purple-500/30 rounded-xl text-purple-200">Cancel</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
