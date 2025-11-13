'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Registration {
  id: string
  name: string
  email: string
  cnic: string
  phone: string
  university: string
  roll_no: string
  module: string
  hostel: string
  team_members: { name: string; email: string; university: string; rollNo: string }[]
  payment_receipt_url: string
  access_code: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  // Business Innovation fields
  business_idea?: {
    title: string
    description: string
    problem: string
    solution: string
    marketSize: string
    targetAudience: string
    competitiveAdvantage: string
    revenueModel: string
  }
  current_phase?: string
  submission_status?: string
  github_repo?: string
}

interface BusinessInnovationStats {
  totalParticipants: number
  ideaSubmissions: number
  designPhase: number
  developmentPhase: number
  finalSubmissions: number
  averageScore: number
  totalEvaluations: number
}

interface Evaluation {
  id: string
  registration_id: string
  phase: string
  evaluator_name: string
  evaluator_email: string
  innovation_score: number
  feasibility_score: number
  market_potential_score: number
  presentation_score: number
  technical_score: number
  business_model_score: number
  total_score: number
  comments: string
  evaluated_at: string
}

interface Stats {
  total: number
  pending: number
  approved: number
  rejected: number
  uniqueUniversities: number
  uniqueModules: number
}

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/signin')
      return
    }

    try {
      const response = await fetch('/api/admin/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_email')
        router.push('/admin/signin')
        return
      }

      setIsAuthenticated(true)
    } catch (error) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_email')
      router.push('/admin/signin')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_email')
    router.push('/admin/signin')
  }

  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, approved: 0, rejected: 0, uniqueUniversities: 0, uniqueModules: 0 })
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [moduleFilter, setModuleFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentTab, setCurrentTab] = useState<'registrations' | 'business-innovation'>('registrations')
  const [businessInnovationParticipants, setBusinessInnovationParticipants] = useState<Registration[]>([])
  const [businessInnovationStats, setBusinessInnovationStats] = useState<BusinessInnovationStats>({
    totalParticipants: 0,
    ideaSubmissions: 0,
    designPhase: 0,
    developmentPhase: 0,
    finalSubmissions: 0,
    averageScore: 0,
    totalEvaluations: 0
  })
  const [selectedParticipant, setSelectedParticipant] = useState<Registration | null>(null)
  const [participantEvaluations, setParticipantEvaluations] = useState<Evaluation[]>([])
  const [showEvaluationModal, setShowEvaluationModal] = useState(false)
  const [allParticipantEvaluations, setAllParticipantEvaluations] = useState<Evaluation[]>([])
  const [selectedRegistrations, setSelectedRegistrations] = useState<string[]>([])
  const itemsPerPage = 10

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const regs = data || []
      setRegistrations(regs)
      setFilteredRegistrations(regs)

      // Calculate stats
      const total = regs.length
      const pending = regs.filter(r => r.status === 'pending').length
      const approved = regs.filter(r => r.status === 'approved').length
      const rejected = regs.filter(r => r.status === 'rejected').length
      const uniqueUniversities = new Set(regs.map(r => r.university)).size
      const uniqueModules = new Set(regs.map(r => r.module)).size

      setStats({ total, pending, approved, rejected, uniqueUniversities, uniqueModules })
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBusinessInnovationData = async () => {
    try {
      // Fetch business innovation participants
      const { data: participants, error: participantsError } = await supabase
        .from('registrations')
        .select('*')
        .eq('module', 'Business Innovation')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (participantsError) throw participantsError

      const biParticipants = participants || []
      setBusinessInnovationParticipants(biParticipants)

      // Fetch evaluations for all participants to calculate average scores
      const participantIds = biParticipants.map(p => p.id)
      let allEvaluations: Evaluation[] = []

      if (participantIds.length > 0) {
        const { data: evaluations, error: evalError } = await supabase
          .from('business_innovation_evaluations')
          .select('*')
          .in('registration_id', participantIds)

        if (!evalError && evaluations) {
          allEvaluations = evaluations
        }
      }

      // Calculate stats
      const totalParticipants = biParticipants.length
      const ideaSubmissions = biParticipants.filter(p => p.business_idea && p.business_idea.title).length
      const designPhase = biParticipants.filter(p => p.current_phase === 'design').length
      const developmentPhase = biParticipants.filter(p => p.current_phase === 'development').length
      const finalSubmissions = biParticipants.filter(p => p.submission_status === 'submitted').length

      // Calculate average score across all evaluations
      const totalEvaluations = allEvaluations.length
      const averageScore = totalEvaluations > 0 
        ? allEvaluations.reduce((sum, e) => sum + (e.total_score || 0), 0) / totalEvaluations 
        : 0

      setBusinessInnovationStats({
        totalParticipants,
        ideaSubmissions,
        designPhase,
        developmentPhase,
        finalSubmissions,
        averageScore: Math.round(averageScore * 10) / 10,
        totalEvaluations
      })

      // Store evaluations for average score calculation
      setAllParticipantEvaluations(allEvaluations)
    } catch (error) {
      console.error('Error fetching business innovation data:', error)
    }
  }

  useEffect(() => {
    fetchRegistrations()
    fetchBusinessInnovationData()
  }, [])

  // Filter and sort registrations
  useEffect(() => {
    let filtered = registrations.filter(reg => {
      const matchesSearch = searchTerm === '' ||
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.module.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'all' || reg.status === statusFilter
      const matchesModule = moduleFilter === 'all' || reg.module === moduleFilter

      return matchesSearch && matchesStatus && matchesModule
    })

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Registration]
      let bValue: any = b[sortBy as keyof Registration]

      if (sortBy === 'created_at') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredRegistrations(filtered)
    setCurrentPage(1)
    setSelectedRegistrations([])
  }, [registrations, searchTerm, statusFilter, moduleFilter, sortBy, sortOrder])

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    setActionLoading(id)
    console.log('Updating status for id:', id, 'to:', status)
    try {
      const response = await fetch('/api/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      })

      console.log('API response status:', response.status)
      const responseData = await response.json()
      console.log('API response data:', responseData)

      if (!response.ok) throw new Error('Approval failed')

      // Update local state
      setRegistrations(prev =>
        prev.map(reg => reg.id === id ? { ...reg, status } : reg)
      )

      // Update stats
      setStats(prev => ({
        ...prev,
        [status]: prev[status as keyof Stats] + 1,
        pending: status === 'approved' || status === 'rejected' ? prev.pending - 1 : prev.pending
      }))

      console.log('Status update completed successfully')
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Error updating status. Please try again.')
    } finally {
      setActionLoading(null)
    }
  }

  const bulkUpdateStatus = async (status: 'approved' | 'rejected') => {
    if (selectedRegistrations.length === 0) return

    if (!confirm(`Are you sure you want to ${status} ${selectedRegistrations.length} registration(s)?`)) return

    setActionLoading('bulk')
    try {
      const promises = selectedRegistrations.map(id =>
        fetch('/api/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status }),
        })
      )

      await Promise.all(promises)

      // Update local state
      setRegistrations(prev =>
        prev.map(reg =>
          selectedRegistrations.includes(reg.id) ? { ...reg, status } : reg
        )
      )

      // Update stats
      setStats(prev => ({
        ...prev,
        [status]: prev[status as keyof Stats] + selectedRegistrations.length,
        pending: prev.pending - selectedRegistrations.length
      }))

      setSelectedRegistrations([])
    } catch (error) {
      console.error(error)
      alert('Error updating registrations. Please try again.')
    } finally {
      setActionLoading(null)
    }
  }

  const fetchParticipantEvaluations = async (participantId: string) => {
    try {
      const { data, error } = await supabase
        .from('business_innovation_evaluations')
        .select('*')
        .eq('registration_id', participantId)
        .order('evaluated_at', { ascending: false })

      if (error) throw error

      setParticipantEvaluations(data || [])
    } catch (error) {
      console.error('Error fetching participant evaluations:', error)
      setParticipantEvaluations([])
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'CNIC', 'Phone', 'University', 'Roll No', 'Module', 'Hostel', 'Team Size', 'Status', 'Created At']
    const csvData = filteredRegistrations.map(reg => [
      reg.name,
      reg.email,
      reg.cnic,
      reg.phone,
      reg.university,
      reg.roll_no,
      reg.module,
      reg.hostel === 'none' ? 'Self-arranged' : reg.hostel === 'one_day' ? '1 Day (PKR 2,000)' : '3 Days (PKR 5,000)',
      reg.team_members?.length || 1,
      reg.status,
      new Date(reg.created_at).toLocaleDateString()
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `techverse-registrations-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50'
      case 'approved': return 'bg-green-900/50 text-green-300 border-green-500/50'
      case 'rejected': return 'bg-red-900/50 text-red-300 border-red-500/50'
      default: return 'bg-gray-900/50 text-gray-300 border-gray-500/50'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Pagination
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage)
  const paginatedRegistrations = filteredRegistrations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const uniqueModules = [...new Set(registrations.map(r => r.module))]

  if (authLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <div className="text-purple-300 text-xl">Verifying Admin Access...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Admin Portal - Techverse 2026
            </h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-red-500/50 rounded-lg text-sm font-medium text-red-200 bg-red-900/30 hover:bg-red-800/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-purple-500/20">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setCurrentTab('registrations')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  currentTab === 'registrations'
                    ? 'border-blue-400 text-blue-300'
                    : 'border-transparent text-purple-400 hover:text-purple-300 hover:border-purple-300'
                }`}
              >
                General Registrations
              </button>
              <button
                onClick={() => setCurrentTab('business-innovation')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  currentTab === 'business-innovation'
                    ? 'border-blue-400 text-blue-300'
                    : 'border-transparent text-purple-400 hover:text-purple-300 hover:border-purple-300'
                }`}
              >
                Business Innovation
              </button>
            </nav>
          </div>
        </div>

        {currentTab === 'registrations' ? (
          <div>
            {/* Statistics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-purple-900/30 rounded-xl p-4 text-center border border-purple-500/20">
                <div className="text-2xl font-bold text-blue-300">{stats.total}</div>
                <div className="text-purple-200 text-sm">Total</div>
              </div>
              <div className="bg-yellow-900/30 rounded-xl p-4 text-center border border-yellow-500/20">
                <div className="text-2xl font-bold text-yellow-300">{stats.pending}</div>
                <div className="text-purple-200 text-sm">Pending</div>
              </div>
              <div className="bg-green-900/30 rounded-xl p-4 text-center border border-green-500/20">
                <div className="text-2xl font-bold text-green-300">{stats.approved}</div>
                <div className="text-purple-200 text-sm">Approved</div>
              </div>
              <div className="bg-red-900/30 rounded-xl p-4 text-center border border-red-500/20">
                <div className="text-2xl font-bold text-red-300">{stats.rejected}</div>
                <div className="text-purple-200 text-sm">Rejected</div>
              </div>
              <div className="bg-blue-900/30 rounded-xl p-4 text-center border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-300">{stats.uniqueUniversities}</div>
                <div className="text-purple-200 text-sm">Universities</div>
              </div>
              <div className="bg-indigo-900/30 rounded-xl p-4 text-center border border-indigo-500/20">
                <div className="text-2xl font-bold text-indigo-300">{stats.uniqueModules}</div>
                <div className="text-purple-200 text-sm">Modules</div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 mb-6 border border-purple-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Name, email, university..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/50 border-purple-500/50 rounded-lg px-3 py-2 text-white placeholder-purple-400 focus:ring-purple-400 focus:border-purple-400"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-black/50 border-purple-500/50 rounded-lg px-3 py-2 text-white focus:ring-purple-400 focus:border-purple-400"
                  >
                    <option value="all" className="bg-black">All Status</option>
                    <option value="pending" className="bg-black">Pending</option>
                    <option value="approved" className="bg-black">Approved</option>
                    <option value="rejected" className="bg-black">Rejected</option>
                  </select>
                </div>

                {/* Module Filter */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">Module</label>
                  <select
                    value={moduleFilter}
                    onChange={(e) => setModuleFilter(e.target.value)}
                    className="w-full bg-black/50 border-purple-500/50 rounded-lg px-3 py-2 text-white focus:ring-purple-400 focus:border-purple-400"
                  >
                    <option value="all" className="bg-black">All Modules</option>
                    {uniqueModules.map(module => (
                      <option key={module} value={module} className="bg-black">{module}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-black/50 border-purple-500/50 rounded-lg px-3 py-2 text-white focus:ring-purple-400 focus:border-purple-400"
                  >
                    <option value="created_at" className="bg-black">Date Created</option>
                    <option value="name" className="bg-black">Name</option>
                    <option value="university" className="bg-black">University</option>
                    <option value="module" className="bg-black">Module</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">Order</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="w-full bg-black/50 border-purple-500/50 rounded-lg px-3 py-2 text-white focus:ring-purple-400 focus:border-purple-400"
                  >
                    <option value="desc" className="bg-black">Newest First</option>
                    <option value="asc" className="bg-black">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Bulk Actions */}
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-purple-500/20">
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 transition-colors"
                >
                  📊 Export CSV
                </button>
                {selectedRegistrations.length > 0 && (
                  <>
                    <button
                      onClick={() => bulkUpdateStatus('approved')}
                      disabled={actionLoading === 'bulk'}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-300"
                    >
                      {actionLoading === 'bulk' ? 'Processing...' : `Approve Selected (${selectedRegistrations.length})`}
                    </button>
                    <button
                      onClick={() => bulkUpdateStatus('rejected')}
                      disabled={actionLoading === 'bulk'}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-all duration-300"
                    >
                      {actionLoading === 'bulk' ? 'Processing...' : `Reject Selected (${selectedRegistrations.length})`}
                    </button>
                    <button
                      onClick={() => setSelectedRegistrations([])}
                      className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 transition-colors"
                    >
                      Clear Selection
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Registrations List */}
            <div className="bg-black/80 backdrop-blur-sm shadow-2xl overflow-hidden sm:rounded-2xl border border-purple-500/20">
              {/* Select All */}
              <div className="px-6 py-4 border-b border-purple-500/20">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRegistrations.length === paginatedRegistrations.length && paginatedRegistrations.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRegistrations(paginatedRegistrations.map(r => r.id))
                      } else {
                        setSelectedRegistrations([])
                      }
                    }}
                    className="rounded border-purple-500/50 text-purple-600 focus:ring-purple-500 bg-black/50"
                  />
                  <span className="ml-2 text-sm text-purple-200">
                    Select All ({filteredRegistrations.length} registrations)
                  </span>
                </label>
              </div>

              <ul className="divide-y divide-purple-500/20">
                {paginatedRegistrations.map((reg) => (
                  <li key={reg.id} className="px-6 py-6">
                    <div className="flex items-start">
                      {/* Checkbox */}
                      <div className="shrink-0 mr-4">
                        <input
                          type="checkbox"
                          checked={selectedRegistrations.includes(reg.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRegistrations(prev => [...prev, reg.id])
                            } else {
                              setSelectedRegistrations(prev => prev.filter(id => id !== reg.id))
                            }
                          }}
                          className="rounded border-purple-500/50 text-purple-600 focus:ring-purple-500 bg-black/50"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-medium text-blue-300">{reg.name}</h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(reg.status)}`}>
                            {reg.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-purple-200 mb-3">
                          <p>📧 {reg.email}</p>
                          <p>🏛️ {reg.university}</p>
                          <p>📱 {reg.phone}</p>
                          <p>🎓 Roll: {reg.roll_no}</p>
                          <p>🆔 CNIC: {reg.cnic}</p>
                          <p>🔑 Access Code: <span className="font-mono font-medium">{reg.access_code}</span></p>
                          <p>📅 {new Date(reg.created_at).toLocaleDateString()}</p>
                        </div>

                        <div className="mb-3">
                          <span className="text-sm font-medium text-purple-300">Module: </span>
                          <span className="text-sm text-blue-300">{reg.module}</span>
                        </div>

                        <div className="mb-3">
                          <span className="text-sm font-medium text-purple-300">Accommodation: </span>
                          <span className="text-sm text-green-300">
                            {reg.hostel === 'none' ? 'Self-arranged' : 
                             reg.hostel === 'one_day' ? 'Hostel - 1 Day (PKR 2,000)' : 
                             'Hostel - 3 Days (PKR 5,000)'}
                          </span>
                        </div>

                        {reg.team_members && reg.team_members.length > 1 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-purple-300 mb-1">Team Members ({reg.team_members.length - 1}):</p>
                            <div className="text-sm text-purple-200 max-h-20 overflow-y-auto">
                              {reg.team_members.slice(1).map((member, idx) => (
                                <div key={idx} className="mb-1">
                                  {member.name} ({member.email}) - {member.university}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {reg.payment_receipt_url && (
                          <div className="mb-3">
                            <a
                              href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/receipts/${reg.payment_receipt_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              📄 View Payment Receipt
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="shrink-0 ml-4">
                        {reg.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateStatus(reg.id, 'approved')}
                              disabled={actionLoading === reg.id}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
                            >
                              {actionLoading === reg.id ? '...' : '✓'}
                            </button>
                            <button
                              onClick={() => updateStatus(reg.id, 'rejected')}
                              disabled={actionLoading === reg.id}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
                            >
                              {actionLoading === reg.id ? '...' : '✗'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-purple-500/20 flex items-center justify-between">
                  <div className="text-sm text-purple-300">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRegistrations.length)} of {filteredRegistrations.length} registrations
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <span className="px-3 py-2 text-sm text-purple-300">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Business Innovation Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-purple-900/30 rounded-xl p-4 text-center border border-purple-500/20">
                <div className="text-2xl font-bold text-blue-300">{businessInnovationStats.totalParticipants}</div>
                <div className="text-purple-200 text-sm">Total Participants</div>
              </div>
              <div className="bg-green-900/30 rounded-xl p-4 text-center border border-green-500/20">
                <div className="text-2xl font-bold text-green-300">{businessInnovationStats.ideaSubmissions}</div>
                <div className="text-purple-200 text-sm">Idea Submissions</div>
              </div>
              <div className="bg-blue-900/30 rounded-xl p-4 text-center border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-300">{businessInnovationStats.designPhase}</div>
                <div className="text-purple-200 text-sm">Design Phase</div>
              </div>
              <div className="bg-yellow-900/30 rounded-xl p-4 text-center border border-yellow-500/20">
                <div className="text-2xl font-bold text-yellow-300">{businessInnovationStats.developmentPhase}</div>
                <div className="text-purple-200 text-sm">Development Phase</div>
              </div>
              <div className="bg-orange-900/30 rounded-xl p-4 text-center border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-300">{businessInnovationStats.finalSubmissions}</div>
                <div className="text-purple-200 text-sm">Final Submissions</div>
              </div>
              <div className="bg-indigo-900/30 rounded-xl p-4 text-center border border-indigo-500/20">
                <div className="text-2xl font-bold text-indigo-300">{businessInnovationStats.averageScore}</div>
                <div className="text-purple-200 text-sm">Avg Score</div>
              </div>
            </div>

            {/* Business Innovation Participants List */}
            <div className="bg-black/80 backdrop-blur-sm shadow-2xl overflow-hidden sm:rounded-2xl border border-purple-500/20">
              <div className="px-6 py-4 border-b border-purple-500/20">
                <h3 className="text-xl font-semibold text-blue-300">Business Innovation Participants</h3>
                <p className="text-purple-300 text-sm">All approved participants with their ideas and evaluation status</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-900/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Participant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">University</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Business Idea</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Phase</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Avg Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {businessInnovationParticipants.map((participant) => (
                      <tr key={participant.id} className="hover:bg-purple-900/10 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-300">{participant.name}</div>
                          <div className="text-sm text-purple-400">{participant.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-purple-200">{participant.university}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-purple-200 max-w-xs">
                            {participant.business_idea?.title ? (
                              <div>
                                <div className="font-medium text-blue-300 truncate">{participant.business_idea.title}</div>
                                <div className="text-xs text-purple-400 truncate">{participant.business_idea.problem}</div>
                              </div>
                            ) : (
                              <span className="text-yellow-400">No idea submitted yet</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            participant.current_phase === 'idea_selection' ? 'bg-blue-900/50 text-blue-300 border-blue-500/50' :
                            participant.current_phase === 'design' ? 'bg-purple-900/50 text-purple-300 border-purple-500/50' :
                            participant.current_phase === 'development' ? 'bg-green-900/50 text-green-300 border-green-500/50' :
                            'bg-yellow-900/50 text-yellow-300 border-yellow-500/50'
                          }`}>
                            {participant.current_phase?.replace('_', ' ') || 'idea_selection'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            participant.submission_status === 'submitted' ? 'bg-green-900/50 text-green-300 border-green-500/50' :
                            participant.submission_status === 'in_progress' ? 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50' :
                            'bg-gray-900/50 text-gray-300 border-gray-500/50'
                          }`}>
                            {participant.submission_status?.replace('_', ' ') || 'not_started'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-purple-200">
                            {(() => {
                              // Calculate average score for this participant
                              const participantEvals = allParticipantEvaluations.filter(e => e.registration_id === participant.id)
                              if (participantEvals.length === 0) return '-'
                              
                              const avgScore = participantEvals.reduce((sum, e) => sum + (e.total_score || 0), 0) / participantEvals.length
                              return Math.round(avgScore)
                            })()}/60
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedParticipant(participant)
                              fetchParticipantEvaluations(participant.id)
                              setShowEvaluationModal(true)
                            }}
                            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Evaluation Details Modal */}
        {showEvaluationModal && selectedParticipant && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl border border-purple-500/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-blue-300">
                    Business Innovation Details - {selectedParticipant.name}
                  </h3>
                  <button
                    onClick={() => {
                      setShowEvaluationModal(false)
                      setSelectedParticipant(null)
                      setParticipantEvaluations([])
                    }}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Participant Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-blue-400">{selectedParticipant.university}</div>
                    <div className="text-purple-300 text-sm">University</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                      selectedParticipant.current_phase === 'idea_selection' ? 'bg-blue-900/50 text-blue-300 border-blue-500/50' :
                      selectedParticipant.current_phase === 'design' ? 'bg-purple-900/50 text-purple-300 border-purple-500/50' :
                      selectedParticipant.current_phase === 'development' ? 'bg-green-900/50 text-green-300 border-green-500/50' :
                      'bg-yellow-900/50 text-yellow-300 border-yellow-500/50'
                    }`}>
                      {selectedParticipant.current_phase?.replace('_', ' ') || 'idea_selection'}
                    </span>
                    <div className="text-purple-300 text-sm mt-1">Current Phase</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-green-400">{participantEvaluations.length}</div>
                    <div className="text-purple-300 text-sm">Total Evaluations</div>
                  </div>
                </div>

                {/* Business Idea */}
                {selectedParticipant.business_idea && (
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                    <h4 className="text-lg font-semibold text-purple-200 mb-4">Business Idea</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-purple-400 font-medium">Title:</span>
                        <span className="text-purple-200 ml-2">{selectedParticipant.business_idea.title}</span>
                      </div>
                      <div>
                        <span className="text-purple-400 font-medium">Problem:</span>
                        <p className="text-purple-200 ml-2 mt-1">{selectedParticipant.business_idea.problem}</p>
                      </div>
                      <div>
                        <span className="text-purple-400 font-medium">Solution:</span>
                        <p className="text-purple-200 ml-2 mt-1">{selectedParticipant.business_idea.solution}</p>
                      </div>
                      <div>
                        <span className="text-purple-400 font-medium">Market Size:</span>
                        <p className="text-purple-200 ml-2 mt-1">{selectedParticipant.business_idea.marketSize}</p>
                      </div>
                      <div>
                        <span className="text-purple-400 font-medium">Target Audience:</span>
                        <p className="text-purple-200 ml-2 mt-1">{selectedParticipant.business_idea.targetAudience}</p>
                      </div>
                      <div>
                        <span className="text-purple-400 font-medium">Competitive Advantage:</span>
                        <p className="text-purple-200 ml-2 mt-1">{selectedParticipant.business_idea.competitiveAdvantage}</p>
                      </div>
                      <div>
                        <span className="text-purple-400 font-medium">Revenue Model:</span>
                        <p className="text-purple-200 ml-2 mt-1">{selectedParticipant.business_idea.revenueModel}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Team Members */}
                {selectedParticipant.team_members && selectedParticipant.team_members.length > 1 && (
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                    <h4 className="text-lg font-semibold text-purple-200 mb-4">Team Members</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedParticipant.team_members.slice(1).map((member, index) => (
                        <div key={index} className="bg-black/30 rounded-lg p-3 border border-purple-500/10">
                          <div className="font-medium text-purple-200">{member.name}</div>
                          <div className="text-sm text-purple-400">{member.email}</div>
                          <div className="text-sm text-purple-400">{member.university}</div>
                          <div className="text-sm text-purple-400">Roll: {member.rollNo}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Evaluation History */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-200 mb-4">Evaluation History</h4>
                  {participantEvaluations.length > 0 ? (
                    <div className="space-y-4">
                      {participantEvaluations.map((evaluation, index) => (
                        <div key={index} className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-medium text-blue-300">{evaluation.evaluator_name}</div>
                              <div className="text-sm text-purple-400">{evaluation.phase.replace('_', ' ')} Phase</div>
                              <div className="text-xs text-purple-400">
                                {new Date(evaluation.evaluated_at).toLocaleDateString()} at {new Date(evaluation.evaluated_at).toLocaleTimeString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-400">{evaluation.total_score}/60</div>
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
                  ) : (
                    <div className="text-center py-8 text-purple-400">
                      No evaluations yet for this participant.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}