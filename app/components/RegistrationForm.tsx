'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { validateEmailForFrontend } from '@/lib/email-validation-client'
import ConfirmationModal from './ConfirmationModal'

interface TeamMember {
  name: string
  email: string
  university: string
  rollNo: string
  cnic?: string
}

interface FormData {
  name: string
  email: string
  cnic: string
  phone: string
  university: string
  rollNo: string
  module: string
  hostel: string
  ambassadorCode?: string
  teamName?: string
  paymentReceipt?: File
}

// Valid ambassador codes for 10% discount
const VALID_AMBASSADOR_CODES = [ 
  'UMT.TECHVERSE',
  'SUPERIOR.IEEE',
  'COMSAT.TECHVERSE',
  'FAST.TECHVERSE',
  'NUCES.TECHVERSE',
  'NUST.TECHVERSE',
  'UET.TECHVERSE',
  'GIKI.TECHVERSE',
  'IQRA.TECHVERSE',
  'IBA.TECHVERSE',
  'ACM.TECHVERSE',
  'CYBER.TECHVERSE',
  'GAMERS.TECHVERSE',
  'INTELAI.TECHVERSE',
  'UCP.TECHVERSE',
  'LGU.TECHVERSE',
  'TECHSPHERE.TECHVERSE',
  'SAE.TECHVERSE',
  'IEEEBAHRIA.TECHVERSE',
  'BAHRIA.TECHVERSE',
  'BUSINESS.TECHVERSE'

]

// Helper function to check if ambassador code is valid
const isValidAmbassadorCode = (code: string | undefined): boolean => {
  if (!code) return false
  return VALID_AMBASSADOR_CODES.includes(code.toUpperCase() as any)
}

const modules = [
  {
    name: 'Business Innovation - Idea to Startup',
    fee: 3999,
    contactPerson: 'Largify Solutions - +966 59 736 9443 & +92 309 699 3535',
    teamSize: '1-5 members',
    winnerPrize: 40000,
    runnerUpPrize: 30000
  },
  {
    name: 'AI Hackathon',
    fee: 2500,
    contactPerson: 'Umair Khan - +92 308 6707770',
    teamSize: '2-4 members',
    winnerPrize: 30000,
    runnerUpPrize: 15000
  },
  {
    name: 'Cyber Hackathon',
    fee: 1500,
    contactPerson: 'Nabaha Umar - +92 349 4709369',
    teamSize: '1-3 members',
    winnerPrize: 30000,
    runnerUpPrize: 15000
  },
  {
    name: 'FIFA 26',
    fee: 1000,
    contactPerson: 'Asad - +92 324 8443622',
    teamSize: 'Individual/Team',
    winnerPrize: 20000,
    runnerUpPrize: 10000
  },
  {
    name: 'Line Following Robot',
    fee: 1500,
    contactPerson: 'Junaid - +92 324 4768248',
    teamSize: '1-3 members',
    winnerPrize: 15000,
    runnerUpPrize: 10000
  },
  {
    name: 'Obstacle Avoidance Robot',
    fee: 1500,
    contactPerson: 'Junaid - +92 324 4768248',
    teamSize: '1-3 members',
    winnerPrize: 15000,
    runnerUpPrize: 10000
  },
  {
    name: 'PUBG Mobile',
    fee: 2000,
    contactPerson: 'Mueez - +92 307 8630935',
    teamSize: '2-4 members',
    winnerPrize: 20000,
    runnerUpPrize: 10000
  },
  {
    name: 'Scavenger Hunt',
    fee: 2000,
    contactPerson: 'Zunaira Maalik - +92 342 5486444',
    teamSize: '3-5 members',
    winnerPrize: 15000,
    runnerUpPrize: 10000
  },
  {
    name: 'Speed Programming',
    fee: 2500,
    contactPerson: 'Ali Raza - +92 313 0669834',
    teamSize: '1-3 members',
    winnerPrize: 30000,
    runnerUpPrize: 15000
  },
  {
    name: 'Speed Wiring',
    fee: 1500,
    contactPerson: 'Junaid - +92 324 4768248',
    teamSize: '1-3 members',
    winnerPrize: 15000,
    runnerUpPrize: 10000
  },
  {
    name: 'Sumo War Robot',
    fee: 2000,
    contactPerson: 'Junaid - +92 324 4768248',
    teamSize: '1-3 members',
    winnerPrize: 15000,
    runnerUpPrize: 10000
  },
  {
    name: 'Tekken 8',
    fee: 1000,
    contactPerson: 'Zain - +92 331 5758888',
    teamSize: 'Individual',
    winnerPrize: 20000,
    runnerUpPrize: 10000
  },
  {
    name: 'UI/UX Competition',
    fee: 2000,
    contactPerson: 'Zainab Salman - +92 302 1402652',
    teamSize: '2-4 members',
    winnerPrize: 20000,
    runnerUpPrize: 10000
  },
  {
    name: 'Valorant',
    fee: 2500,
    contactPerson: 'Muhammad Moeed - +92 324 4932912',
    teamSize: '5 members + 1 sub',
    winnerPrize: 25000,
    runnerUpPrize: 10000
  },
  {
    name: 'Web Hackathon',
    fee: 2500,
    contactPerson: 'Muhammad Faizan - +92 341 4123652',
    teamSize: '1-3 members',
    winnerPrize: 30000,
    runnerUpPrize: 15000
  },
  {
    name: 'Operation CyberQuest',
    fee: 2500,
    contactPerson: 'Ali Iftikhar - +92 309 5420081',
    teamSize: '1 member',
    winnerPrize: 25000,
    runnerUpPrize: 15000
  }
]

// Parse a human-readable teamSize string (e.g. "1-5 members", "2-4 members", "Individual/Team", "5 members + 1 sub")
// and return a conservative maximum allowed number of team members (number).
function parseMaxTeamSize(teamSize: string): number {
  if (!teamSize) return Infinity

  // range like 1-5
  const rangeMatch = teamSize.match(/(\d+)\s*-\s*(\d+)/)
  if (rangeMatch) {
    return Number(rangeMatch[2])
  }

  // find all numbers and return the largest (e.g., "5 members + 1 sub" -> 5)
  const nums = Array.from(teamSize.matchAll(/(\d+)/g)).map(m => Number(m[0]))
  if (nums.length > 0) {
    return Math.max(...nums)
  }

  // common words
  if (/individual/i.test(teamSize)) return 1
  if (/team/i.test(teamSize)) return 5 // fallback guess for vague "team"

  // fallback: allow up to 5
  return 5
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    cnic: '',
    phone: '',
    university: '',
    rollNo: '',
    module: '',
    hostel: 'none',
    ambassadorCode: '',
    teamName: '',
  })

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  const [loading, setLoading] = useState(false)
  const [teamLimitError, setTeamLimitError] = useState('')
  const [showBankDetails, setShowBankDetails] = useState(false)
  const [teamNameError, setTeamNameError] = useState('')
  const [emailErrors, setEmailErrors] = useState<{[key: string]: string}>({})
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [registrationCodes, setRegistrationCodes] = useState<{ accessCode: string; uniqueId: string } | null>(null)

  // Math problem state
  const [mathProblem, setMathProblem] = useState<{ question: string; answer: number }>({ question: '', answer: 0 })
  const [mathAnswer, setMathAnswer] = useState('')
  const [mathError, setMathError] = useState('')

  // Memoized calculations for performance
  const selectedModule = useMemo(() => {
    return formData.module ? modules.find(m => m.name === formData.module) : null
  }, [formData.module])

  const maxTeamSize = useMemo(() => {
    if (!selectedModule) return Infinity
    return parseMaxTeamSize(selectedModule.teamSize)
  }, [selectedModule])

  // The registering user (team leader) counts as one team member.
  const slotsRemaining = useMemo(() => {
    if (!Number.isFinite(maxTeamSize)) return Infinity
    const remaining = Math.max(0, maxTeamSize - 1 - teamMembers.length)
    return remaining
  }, [maxTeamSize, teamMembers.length])

  const hasValidAmbassadorCode = useMemo(() => {
    return isValidAmbassadorCode(formData.ambassadorCode)
  }, [formData.ambassadorCode])

  const originalModuleFee = useMemo(() => {
    return selectedModule ? selectedModule.fee : 0
  }, [selectedModule])

  const moduleFee = useMemo(() => {
    if (!selectedModule) return 0
    let fee = selectedModule.fee
    if (hasValidAmbassadorCode) {
      fee = Math.floor(fee * 0.9) // 10% discount, rounded down
    }
    return fee
  }, [selectedModule, hasValidAmbassadorCode])

  const discountAmount = useMemo(() => {
    return hasValidAmbassadorCode ? originalModuleFee - moduleFee : 0
  }, [hasValidAmbassadorCode, originalModuleFee, moduleFee])

  const hostelFee = useMemo(() => {
    if (formData.hostel === 'one_day') return 2000
    if (formData.hostel === 'three_days') return 5000
    return 0
  }, [formData.hostel])

  const totalAmount = useMemo(() => {
    return moduleFee + hostelFee
  }, [moduleFee, hostelFee])

  // Debounced email validation
  const emailValidationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const validateEmail = useCallback((email: string, field: string) => {
    const validation = validateEmailForFrontend(email)
    setEmailErrors(prev => ({
      ...prev,
      [field]: validation.isValid ? '' : validation.message
    }))
    return validation.isValid
  }, [])

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target
    handleInputChange(e)

    // Clear previous timeout
    if (emailValidationTimeoutRef.current) {
      clearTimeout(emailValidationTimeoutRef.current)
    }

    // Debounce validation
    emailValidationTimeoutRef.current = setTimeout(() => {
      if (value) {
        validateEmail(value, field)
      } else {
        setEmailErrors(prev => ({ ...prev, [field]: '' }))
      }
    }, 300) // 300ms debounce
  }, [validateEmail])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const formatCNIC = useCallback((value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{5})(\d{7})(\d{1})?$/)
    if (match) {
      return `${match[1]}-${match[2]}${match[3] ? '-' + match[3] : ''}`
    }
    return cleaned
  }, [])

  const formatPhone = useCallback((value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.startsWith('92')) {
      return `+${cleaned}`
    } else if (cleaned.startsWith('0')) {
      return `+92${cleaned.slice(1)}`
    } else if (!cleaned.startsWith('92') && cleaned.length === 10) {
      return `+92${cleaned}`
    } else if (cleaned.startsWith('+92')) {
      return cleaned
    }
    return cleaned
  }, [])

  const handleCNICChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow up to 17 characters total (14 digits + special chars)
    if (value.length <= 14) {
      // Try to format it automatically, but allow any input
      const formatted = formatCNIC(value)
      const finalValue = formatted || value
      setFormData(prev => ({ ...prev, cnic: finalValue }))
    }
  }, [formatCNIC])

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow up to 15 characters maximum
    if (value.length <= 14) {
      // Try to format it automatically, but allow any input
      const formatted = formatPhone(value)
      setFormData(prev => ({ ...prev, phone: formatted || value }))
    }
  }, [formatPhone])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, paymentReceipt: file }))
    }
  }, [])

  // Generate random math problem
  const generateMathProblem = useCallback(() => {
    const operations = ['+', '-']
    const operation = operations[Math.floor(Math.random() * operations.length)]
    let num1, num2, answer

    if (operation === '+') {
      num1 = Math.floor(Math.random() * 20) + 1
      num2 = Math.floor(Math.random() * 20) + 1
      answer = num1 + num2
    } else {
      num1 = Math.floor(Math.random() * 20) + 10
      num2 = Math.floor(Math.random() * 10) + 1
      answer = num1 - num2
    }

    setMathProblem({
      question: `${num1} ${operation} ${num2} = ?`,
      answer
    })
    setMathAnswer('')
    setMathError('')
  }, [])

  // Initialize math problem on component mount
  useEffect(() => {
    generateMathProblem()
  }, [generateMathProblem])

  const handleTeamMemberChange = useCallback((index: number, field: keyof TeamMember, value: string) => {
    setTeamMembers(prev => {
      const updated = [...prev]
      // If the field is cnic, apply formatting
      if (field === 'cnic') {
        const cleaned = (value || '').replace(/\D/g, '')
        const limited = cleaned.slice(0, 13)
        const formatted = formatCNIC(limited)
        updated[index] = { ...updated[index], [field]: formatted }
      } else {
        updated[index] = { ...updated[index], [field]: value }
      }
      return updated
    })
  }, [formatCNIC])

  const addTeamMember = useCallback(() => {
    // Enforce maximum team size for the selected module (leader counts as 1)
    if (selectedModule) {
      if (!Number.isFinite(maxTeamSize)) {
        // no limit
      } else if (teamMembers.length >= Math.max(0, maxTeamSize - 1)) {
        setTeamLimitError(`Maximum ${maxTeamSize} team members allowed for this module (including you).`)
        return
      }
    }

    setTeamLimitError('')
    setTeamMembers(prev => [...prev, { name: '', email: '', university: '', rollNo: '', cnic: '' }])
  }, [selectedModule, teamMembers, maxTeamSize])

  const removeTeamMember = useCallback((index: number) => {
    setTeamMembers(prev => {
      const updated = prev.filter((_, i) => i !== index)

      setEmailErrors(current => {
        const next: { [key: string]: string } = {}
        Object.entries(current).forEach(([key, value]) => {
          if (key === 'email') {
            next[key] = value
            return
          }

          if (key.startsWith('teamMember-')) {
            const idx = Number(key.split('-')[1])
            if (Number.isNaN(idx) || idx === index) {
              return
            }
            const newIdx = idx > index ? idx - 1 : idx
            next[`teamMember-${newIdx}`] = value
            return
          }

          next[key] = value
        })
        return next
      })

      return updated
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Pre-submit: ensure all required leader fields are present (ambassadorCode is explicitly optional)
    const missingLeaderFields: string[] = []
    if (!formData.name || formData.name.trim() === '') missingLeaderFields.push('Full Name')
    if (!formData.email || formData.email.trim() === '') missingLeaderFields.push('Email')
    if (!formData.cnic || formData.cnic.trim() === '') missingLeaderFields.push('CNIC')
    if (!formData.phone || formData.phone.trim() === '') missingLeaderFields.push('Phone')
    if (!formData.university || formData.university.trim() === '') missingLeaderFields.push('University')
    if (!formData.rollNo || formData.rollNo.trim() === '') missingLeaderFields.push('Roll Number')
  if (!formData.module || formData.module.trim() === '') missingLeaderFields.push('Module')
  if (!formData.teamName || formData.teamName.trim() === '') missingLeaderFields.push('Team Name')
    if (!formData.paymentReceipt) missingLeaderFields.push('Payment Receipt')

    if (missingLeaderFields.length > 0) {
      alert('Please fill the required fields: ' + missingLeaderFields.join(', '))
      return
    }

    // Validate team members: if any team member is added, all their fields are required
    for (let i = 0; i < teamMembers.length; i++) {
      const m = teamMembers[i]
      if (!m.name || m.name.trim() === '') {
        alert(`Team member ${i + 1}: Name is required.`)
        return
      }
      if (!m.email || m.email.trim() === '') {
        alert(`Team member ${i + 1}: Email is required.`)
        return
      }
      const emailValid = validateEmailForFrontend(m.email)
      if (!emailValid.isValid) {
        alert(`Team member ${i + 1}: ${emailValid.message}`)
        return
      }
      if (!m.university || m.university.trim() === '') {
        alert(`Team member ${i + 1}: University is required.`)
        return
      }
      if (!m.rollNo || m.rollNo.trim() === '') {
        alert(`Team member ${i + 1}: Roll Number is required.`)
        return
      }
      if (!m.cnic || m.cnic.trim() === '') {
        alert(`Team member ${i + 1}: CNIC is required.`)
        return
      }
    }

    // Validate all emails before submission
    let hasEmailErrors = false
    const newEmailErrors: {[key: string]: string} = {}

    // Validate main email
    if (formData.email) {
      const validation = validateEmailForFrontend(formData.email)
      if (!validation.isValid) {
        newEmailErrors.email = validation.message
        hasEmailErrors = true
      }
    }

    // Validate team member emails only if they have content
    teamMembers.forEach((member, index) => {
      if (member.email && member.email.trim() !== '') {
        const validation = validateEmailForFrontend(member.email)
        if (!validation.isValid) {
          newEmailErrors[`teamMember-${index}`] = validation.message
          hasEmailErrors = true
        }
      }
    })

    setEmailErrors(newEmailErrors)

    if (hasEmailErrors) {
      alert('Please fix the email validation errors before submitting.')
      return
    }

    // Validate math problem
    if (parseInt(mathAnswer) !== mathProblem.answer) {
      setMathError('Incorrect answer. Please solve the math problem correctly.')
      generateMathProblem() // Generate new problem
      return
    }

    // Validate total team size including the registering user (leader)
    if (Number.isFinite(maxTeamSize) && (1 + teamMembers.length) > maxTeamSize) {
      alert(`Team size exceeds the allowed maximum (${maxTeamSize}) for this module. Please remove some members or choose a different module.`)
      return
    }

    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('cnic', formData.cnic)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('university', formData.university)
      formDataToSend.append('rollNo', formData.rollNo)
      formDataToSend.append('module', formData.module)
      formDataToSend.append('hostel', formData.hostel)
  formDataToSend.append('ambassadorCode', formData.ambassadorCode || '')
  formDataToSend.append('teamName', formData.teamName || '')
      // The registering user is also a team member (leader). Prepend leader info to the
      // teamMembers array before sending so server receives a full list including the leader.
      const payloadTeamMembers = [
        {
          name: formData.name,
          email: formData.email,
          university: formData.university,
          rollNo: formData.rollNo,
          cnic: formData.cnic,
        },
        ...teamMembers
      ]
      formDataToSend.append('teamMembers', JSON.stringify(payloadTeamMembers))
      if (formData.paymentReceipt) {
        formDataToSend.append('paymentReceipt', formData.paymentReceipt)
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        body: formDataToSend,
      })

      const responseData = await response.json()

      if (!response.ok) {
        // Show specific error message from API
        const errorMessage = responseData.message || responseData.error || responseData.details?.join(', ') || 'Registration failed'
        throw new Error(errorMessage)
      }

      // Store registration codes for the success modal
      setRegistrationCodes({
        accessCode: responseData.accessCode,
        uniqueId: responseData.uniqueId
      })

      // Show confirmation modal instead of alert
      setShowConfirmationModal(true)
    } catch (error) {
      console.error(error)
      const errorMessage = error instanceof Error ? error.message : 'Error submitting registration. Please try again.'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 py-4 px-2 sm:py-6 sm:px-3 lg:py-8 lg:px-8">
      <div className="max-w-6xl mx-auto bg-black/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-500/30 p-3 sm:p-4 lg:p-6 xl:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 sm:mb-3">
            Powered By Largify Solutions
          </h3>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-purple-300 max-w-2xl mx-auto leading-relaxed px-2">
            Fill out the form below to register for your chosen module and join Techverse 2026.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Personal Information Section */}
          <div className="bg-linear-to-br from-purple-900/40 to-blue-900/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-purple-500/30 shadow-xl backdrop-blur-sm">
            <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-300">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
              <div className="w-full">
                <label htmlFor="name" className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e, 'email')}
                  className={`w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60 ${
                    emailErrors.email ? 'border-red-500/60 focus:ring-red-400 focus:border-red-400' : ''
                  }`}
                  placeholder="your.email@example.com"
                />
                {emailErrors.email && (
                  <p className="mt-2 text-xs sm:text-sm text-red-400 flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {emailErrors.email}
                  </p>
                )}
                <p className="mt-2 text-xs sm:text-sm text-purple-400">Enter your original email address – we will send important updates (and Business Innovation portal access codes, if applicable) to this email.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="cnic" className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">CNIC Number</label>
                  <input
                    type="text"
                    id="cnic"
                    name="cnic"
                    required
                    value={formData.cnic}
                    onChange={handleCNICChange}
                    maxLength={17}
                    className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
                    placeholder="12345-1234567-1"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-purple-400">Enter your CNIC</p>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                    className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
                    placeholder="+92 300 1234567"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-purple-400">Enter your correct phone number, we can verify by calling you.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="university" className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">University Name</label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    required
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
                    placeholder="University of Management and Technology"
                  />
                </div>
                <div>
                  <label htmlFor="rollNo" className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">Roll Number</label>
                  <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    required
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
                    placeholder="Your roll number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Module Selection Section */}
          <div className="bg-linear-to-br from-blue-900/40 to-purple-900/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-blue-500/30 shadow-xl backdrop-blur-sm">
            <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-green-500 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-300">Module Selection</h2>
            </div>
            <div className="mb-4 sm:mb-6">
              <label htmlFor="module" className="block text-sm sm:text-base font-semibold text-purple-200 mb-3 sm:mb-4">Choose Your Module</label>
              <select
                id="module"
                name="module"
                required
                value={formData.module}
                onChange={handleInputChange}
                className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60 appearance-none"
              >
                <option value="" className="bg-black">Select a module to participate in</option>
                {modules.map((module) => (
                  <option key={module.name} value={module.name} className="bg-black">
                    {module.name} - PKR {module.fee.toLocaleString()} ({module.teamSize})
                  </option>
                ))}
              </select>
            </div>

              {/* Team Name */}
              <div className="mb-4 sm:mb-6">
                <label htmlFor="teamName" className="block text-sm sm:text-base font-semibold text-purple-200 mb-3 sm:mb-4">Team Name</label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  required
                  value={formData.teamName || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your team's name"
                  className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
                />
              </div>

            {/* Module Details Display */}
            {formData.module && (
              <div className="bg-linear-to-br from-blue-900/30 to-purple-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-blue-500/40 shadow-lg">
                <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-4 sm:mb-6 text-blue-300 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Module Details
                </h3>
                {(() => {
                  const selectedModule = modules.find(m => m.name === formData.module)
                  return selectedModule ? (
                    <div className="space-y-4 sm:space-y-6">
                      {/* Module Info Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-black/40 rounded-lg p-3 sm:p-4 border border-purple-500/20">
                          <div className="flex items-center mb-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 mr-2 sm:mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4h10M7 4v10a2 2 0 002 2h6a2 2 0 002-2V4" />
                            </svg>
                            <p className="text-purple-200 font-semibold text-sm sm:text-base">Module</p>
                          </div>
                          <p className="text-white text-sm sm:text-base lg:text-lg font-medium">{selectedModule.name}</p>
                        </div>
                        <div className="bg-black/40 rounded-lg p-3 sm:p-4 border border-purple-500/20">
                          <div className="flex items-center mb-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 mr-2 sm:mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-purple-200 font-semibold text-sm sm:text-base">Team Size</p>
                          </div>
                          <p className="text-white text-sm sm:text-base lg:text-lg font-medium">{selectedModule.teamSize}</p>
                        </div>
                        <div className="bg-black/40 rounded-lg p-3 sm:p-4 border border-purple-500/20">
                          <div className="flex items-center mb-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 mr-2 sm:mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <p className="text-purple-200 font-semibold text-sm sm:text-base">Contact</p>
                          </div>
                          <p className="text-white text-sm sm:text-base lg:text-lg font-medium break-all">{selectedModule.contactPerson}</p>
                        </div>
                        <div className="bg-black/40 rounded-lg p-3 sm:p-4 border border-purple-500/20">
                          <div className="flex items-center mb-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <p className="text-purple-200 font-semibold text-sm sm:text-base">Entry Fee</p>
                          </div>
                          <p className="text-green-300 text-lg sm:text-xl lg:text-2xl font-bold">PKR {selectedModule.fee.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Prize Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-black/40 rounded-lg p-3 sm:p-4 border border-purple-500/20">
                          <div className="flex items-center mb-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2 sm:mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <p className="text-purple-200 font-semibold text-sm sm:text-base">Winner Prize</p>
                          </div>
                          <p className="text-yellow-300 text-lg sm:text-xl lg:text-2xl font-bold">PKR {selectedModule.winnerPrize.toLocaleString()}</p>
                        </div>
                        <div className="bg-black/40 rounded-lg p-3 sm:p-4 border border-purple-500/20">
                          <div className="flex items-center mb-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 sm:mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <p className="text-purple-200 font-semibold text-sm sm:text-base">Runner-up Prize</p>
                          </div>
                          <p className="text-blue-300 text-lg sm:text-xl lg:text-2xl font-bold">PKR {selectedModule.runnerUpPrize.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ) : null
                })()}
              </div>
            )}
          </div>

          {/* Ambassador Code Section */}
          {/* <div className="bg-linear-to-br from-green-900/40 to-blue-900/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-green-500/30 shadow-xl backdrop-blur-sm">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-green-500 to-yellow-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-300">Ambassador Code</h2>
            </div>
            <div>
              <label htmlFor="ambassadorCode" className="block text-sm sm:text-base font-semibold text-purple-200 mb-3 sm:mb-4">Ambassador Code (Optional)</label>
              <input
                type="text"
                id="ambassadorCode"
                name="ambassadorCode"
                value={formData.ambassadorCode}
                onChange={handleInputChange}
                placeholder="Enter ambassador code for 10% discount"
                className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
              />
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-xs sm:text-sm text-green-200 flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Enter a valid ambassador code to get <strong>10% discount</strong> on your module fee. Leave empty if you don&apos;t have one.</span>
                </p>
              </div>
            </div>
          </div> */}

          {/* Accommodation Section */}
          {/* <div className="bg-linear-to-br from-orange-900/40 to-purple-900/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-orange-500/30 shadow-xl backdrop-blur-sm">
            <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-300">Accommodation</h2>
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-purple-200 mb-4 sm:mb-6">Hostel Accommodation (Optional)</label>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-black/40 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="hostel"
                      value="none"
                      checked={formData.hostel === 'none'}
                      onChange={handleInputChange}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 focus:ring-purple-500 border-purple-500/50 bg-black/50 mt-0.5 sm:mt-1 mr-3 sm:mr-4"
                    />
                    <div className="flex-1">
                      <span className="text-sm sm:text-base lg:text-lg font-semibold text-purple-200">Self-arranged accommodation</span>
                      <p className="text-purple-400 text-xs sm:text-sm mt-1">I will arrange my own accommodation</p>
                    </div>
                  </label>
                </div>
                <div className="bg-black/40 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="hostel"
                      value="one_day"
                      checked={formData.hostel === 'one_day'}
                      onChange={handleInputChange}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 focus:ring-purple-500 border-purple-500/50 bg-black/50 mt-0.5 sm:mt-1 mr-3 sm:mr-4"
                    />
                    <div className="flex-1">
                      <span className="text-sm sm:text-base lg:text-lg font-semibold text-purple-200">Hostel for 1 day - <span className="text-green-400 font-bold">PKR 2,000</span></span>
                      <p className="text-purple-400 text-xs sm:text-sm mt-1">Perfect for day participants or single day attendance</p>
                    </div>
                  </label>
                </div>
                <div className="bg-black/40 rounded-lg sm:rounded-xl p-3 sm:p-5 border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="hostel"
                      value="three_days"
                      checked={formData.hostel === 'three_days'}
                      onChange={handleInputChange}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 focus:ring-purple-500 border-purple-500/50 bg-black/50 mt-0.5 sm:mt-1 mr-3 sm:mr-4"
                    />
                    <div className="flex-1">
                      <span className="text-sm sm:text-base lg:text-lg font-semibold text-purple-200">Hostel for 3 days - <span className="text-green-400 font-bold">PKR 5,000</span></span>
                      <p className="text-purple-400 text-xs sm:text-sm mt-1">Full event coverage (5-11 January 2026)</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 p-3 sm:p-5 bg-blue-900/20 border border-blue-500/30 rounded-lg sm:rounded-xl">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-blue-300 mb-2 sm:mb-3 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hostel Information
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-purple-200">
                  <p className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-0.5">🏨</span>
                    <span>Comfortable accommodation at UMT campus</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-0.5">🚪</span>
                    <span>Separate facilities for male and female participants</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-0.5">🍽️</span>
                    <span>Includes breakfast and basic amenities</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-0.5">💰</span>
                    <span>Payment to be made separately at the venue</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-0.5">⏰</span>
                    <span>Limited rooms available - first come, first served</span>
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Total Amount Display */}
          {formData.module && (
            <div className="bg-linear-to-br from-emerald-900/40 to-green-900/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-emerald-500/30 shadow-xl backdrop-blur-sm">
              <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-emerald-500 to-green-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-emerald-300">Payment Summary</h2>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-green-500/20">
                  <span className="text-purple-200 text-sm sm:text-base">Module Fee ({formData.module}):</span>
                  <div className="text-right">
                    {hasValidAmbassadorCode ? (
                      <>
                        <span className="text-red-400 line-through text-xs sm:text-sm">PKR {originalModuleFee.toLocaleString()}</span>
                        <br />
                        <span className="text-blue-300 font-semibold text-sm sm:text-base">PKR {moduleFee.toLocaleString()}</span>
                        <span className="text-green-400 text-xs ml-1 sm:ml-2">(10% discount applied)</span>
                      </>
                    ) : (
                      <span className="text-blue-300 font-semibold text-sm sm:text-base">PKR {moduleFee.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-green-500/20">
                    <span className="text-purple-200 text-sm sm:text-base">Ambassador Discount (10%):</span>
                    <span className="text-green-400 font-semibold text-sm sm:text-base">- PKR {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                {formData.hostel !== 'none' && (
                  <div className="flex justify-between items-center py-2 border-b border-green-500/20">
                    <span className="text-purple-200 text-sm sm:text-base">
                      Hostel Fee ({formData.hostel === 'one_day' ? '1 Day' : '3 Days'}):
                    </span>
                    <span className="text-blue-300 font-semibold text-sm sm:text-base">PKR {hostelFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3 border-t-2 border-green-500/30 pt-3">
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-green-300">Total Amount:</span>
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">PKR {totalAmount.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <p className="text-xs sm:text-sm text-yellow-200">
                  <strong>💳 Payment Note:</strong> Please transfer exactly <strong className="text-yellow-300 text-sm sm:text-base">PKR {totalAmount.toLocaleString()}</strong> to the bank account shown below.
                  {formData.hostel !== 'none' && ' This includes both your module fee and hostel accommodation.'}
                  {discountAmount > 0 && ' Ambassador discount has been applied to your module fee.'}
                </p>
              </div>
            </div>
          )}

          {formData.module && (
            <div className="bg-linear-to-br from-indigo-900/40 to-purple-900/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-indigo-500/30 shadow-xl backdrop-blur-sm">
              <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-indigo-300">Team Members</h2>
              </div>
              <p className="text-sm sm:text-base text-purple-300 mb-4 sm:mb-6 leading-relaxed">
                You are the team leader. Add your team members below (optional - only add if you have team members).
              </p>
              {teamMembers.length === 0 && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-dashed border-indigo-500/40 rounded-lg sm:rounded-xl bg-black/30 text-sm sm:text-base text-purple-200">
                  No team members added yet. Click <span className="font-semibold text-indigo-200">“Add Team Member”</span> to include your teammates (optional).
                </div>
              )}
              {teamMembers.map((member, index) => (
                <div key={index} className="space-y-3 sm:space-y-4 lg:space-y-6 mb-4 sm:mb-6 p-3 sm:p-4 lg:p-5 xl:p-6 bg-black/40 rounded-lg sm:rounded-xl border border-indigo-500/20 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <h3 className="text-base sm:text-lg font-semibold text-indigo-300 flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Team Member {index + 1}
                    </h3>
                    {teamMembers.length > 0 && (
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="inline-flex items-center px-3 py-1.5 border border-red-500/50 rounded-lg text-sm font-medium text-red-300 bg-red-900/20 hover:bg-red-800/30 transition-all duration-300 self-start sm:self-auto"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                        required
                        className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">Email</label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => {
                          handleTeamMemberChange(index, 'email', e.target.value)
                          if (e.target.value) {
                            validateEmail(e.target.value, `teamMember-${index}`)
                          } else {
                            setEmailErrors(prev => ({ ...prev, [`teamMember-${index}`]: '' }))
                          }
                        }}
                        required
                        className={`w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60 ${
                          emailErrors[`teamMember-${index}`] ? 'border-red-500/60 focus:ring-red-400 focus:border-red-400' : ''
                        }`}
                        placeholder="member.email@example.com"
                      />
                      {emailErrors[`teamMember-${index}`] && (
                        <p className="mt-2 text-xs sm:text-sm text-red-400 flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {emailErrors[`teamMember-${index}`]}
                        </p>
                      )}
                    </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">University Name</label>
                        <input
                          type="text"
                          value={member.university}
                          onChange={(e) => handleTeamMemberChange(index, 'university', e.target.value)}
                          required
                          className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
                          placeholder="University name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">Roll Number</label>
                        <input
                          type="text"
                          value={member.rollNo}
                          onChange={(e) => handleTeamMemberChange(index, 'rollNo', e.target.value)}
                          required
                          className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
                          placeholder="Roll number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-purple-200 mb-2 sm:mb-3">CNIC</label>
                        <input
                          type="text"
                          value={member.cnic}
                          inputMode="numeric"
                          maxLength={15}
                          onChange={(e) => handleTeamMemberChange(index, 'cnic', e.target.value)}
                          required
                          className="w-full bg-black/60 border-2 border-purple-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-purple-400 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-purple-400/60"
                          placeholder="xxxxx-xxxxxxx-x"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addTeamMember}
                disabled={!(Number.isFinite(slotsRemaining) ? slotsRemaining > 0 : true)}
                className={`inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-indigo-500/50 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold text-indigo-200 bg-indigo-900/30 hover:bg-indigo-800/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  Number.isFinite(slotsRemaining) && slotsRemaining <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {Number.isFinite(slotsRemaining) ? (slotsRemaining > 0 ? 'Add Team Member' : `Max ${maxTeamSize} reached`) : 'Add Team Member'}
              </button>
              {Number.isFinite(slotsRemaining) && (
                <p className="mt-2 text-xs sm:text-sm text-purple-300">Slots remaining (including you): {slotsRemaining}</p>
              )}
              {teamLimitError && (
                <p className="mt-2 text-xs sm:text-sm text-red-400">{teamLimitError}</p>
              )}
            </div>
          )}

          <div className="bg-linear-to-br from-amber-900/40 to-yellow-900/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-amber-500/30 shadow-xl backdrop-blur-sm">
            <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-amber-500 to-yellow-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-amber-300">Payment Details</h2>
            </div>
            <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 xl:p-6 mb-4 sm:mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-2 sm:mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-yellow-200 font-bold text-sm sm:text-base lg:text-lg mb-2">Bank Transfer Required</p>
                  <p className="text-yellow-200 text-xs sm:text-sm lg:text-base leading-relaxed">
                    {formData.module ? (
                      <>
                        Please transfer exactly <strong className="text-yellow-300 text-sm sm:text-base lg:text-lg">PKR {totalAmount.toLocaleString()}</strong> to our bank account.
                        {formData.hostel !== 'none' && ' This includes both your module fee and hostel accommodation.'}
                      </>
                    ) : (
                      'Please transfer the exact amount for your selected module. Hostel accommodation fees (if selected) will be collected separately at the venue.'
                    )}
                    <br />
                    Click &quot;View Bank Details&quot; to see the account information.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBankDetails(!showBankDetails)}
                className="mt-3 sm:mt-4 inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-yellow-500/50 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold text-yellow-200 bg-yellow-900/30 hover:bg-yellow-800/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showBankDetails ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  )}
                </svg>
                {showBankDetails ? 'Hide Bank Details' : 'View Bank Details'}
              </button>
              {showBankDetails && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 lg:p-5 xl:p-6 bg-black/60 border-2 border-purple-500/30 rounded-lg sm:rounded-xl shadow-lg">
                  <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-3 sm:mb-4 text-blue-300 flex items-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Bank Details
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 text-sm sm:text-base text-purple-200">
                    <div className="space-y-2 sm:space-y-3">
                      <p className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-semibold text-purple-300 mb-1 sm:mb-0">Account Title:</span>
                        <span className="text-white wrap-break-word">University of Management and Technology (UMT)</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-semibold text-purple-300 mb-1 sm:mb-0">Bank Name:</span>
                        <span className="text-white">Habib Bank Limited</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-semibold text-purple-300 mb-1 sm:mb-0">Account Number:</span>
                        <span className="text-white font-mono">53737000007252</span>
                      </p>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <p className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-semibold text-purple-300 mb-1 sm:mb-0">IBAN:</span>
                        <span className="text-white font-mono break-all">PK10 HABB 0053737000007252</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-semibold text-purple-300 mb-1 sm:mb-0">Branch Code:</span>
                        <span className="text-white font-mono">5373</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:justify-between">
                        <span className="font-semibold text-purple-300 mb-1 sm:mb-0">SWIFT Code:</span>
                        <span className="text-white font-mono">HABBPKKA</span>
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-purple-400 bg-purple-900/20 p-2 sm:p-3 rounded-lg border border-purple-500/20">
                    <strong className="text-purple-300">Branch:</strong> UMT Branch, Lahore
                  </p>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="paymentReceipt" className="block text-sm sm:text-base font-semibold text-purple-200 mb-3 sm:mb-4">
                Upload Payment Receipt
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="paymentReceipt"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm sm:text-base text-purple-200 file:mr-4 sm:file:mr-6 file:py-3 sm:file:py-4 file:px-4 sm:file:px-6 file:rounded-lg sm:file:rounded-xl file:border-0 file:text-sm sm:file:text-base file:font-semibold file:bg-amber-900/50 file:text-amber-200 hover:file:bg-amber-800/60 file:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-xl file:transition-all file:duration-300 file:shadow-lg file:hover:shadow-xl file:cursor-pointer"
                  required={true}
                />
              </div>
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-200 flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Upload a clear image of your payment receipt. <strong>Max size: 1MB</strong>. Supported formats: JPEG, PNG, GIF, WebP.<br />
                  <strong className="text-blue-300">Note:</strong> Your payment receipt is required to complete the registration process and verify your payment.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Security Math Problem Section */}
          <div className="bg-linear-to-br from-red-900/40 to-pink-900/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-red-500/30 shadow-xl backdrop-blur-sm">
            <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-red-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-red-300">Security Verification</h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-black/40 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-red-500/20">
                <p className="text-sm sm:text-base lg:text-lg text-purple-200 mb-4">
                  Please solve this simple math problem to verify you are human:
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-300 mr-4">
                      {mathProblem.question}
                    </span>
                    <button
                      type="button"
                      onClick={generateMathProblem}
                      className="inline-flex items-center px-3 py-2 border border-red-500/50 rounded-lg text-sm font-medium text-red-300 bg-red-900/20 hover:bg-red-800/30 transition-all duration-300"
                      title="Generate new problem"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={mathAnswer}
                      onChange={(e) => {
                        setMathAnswer(e.target.value)
                        if (mathError) setMathError('')
                      }}
                      className={`w-full bg-black/60 border-2 border-red-500/40 rounded-lg sm:rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-white placeholder-red-400 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:border-red-400/60 ${
                        mathError ? 'border-red-500/60 focus:ring-red-400 focus:border-red-400' : ''
                      }`}
                      placeholder="Enter your answer"
                      required
                    />
                  </div>
                </div>
                {mathError && (
                  <p className="mt-3 text-xs sm:text-sm text-red-400 flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {mathError}
                  </p>
                )}
              </div>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-red-200 flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span><strong className="text-red-300">Security Check:</strong> This helps prevent automated submissions and ensures only real users can register for Techverse 2026.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-5 px-8 border-2 border-transparent rounded-2xl shadow-2xl text-xl font-bold text-white bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-3xl"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing - Powered by Largify Solutions...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Submit Registration</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        title="Registration Successful! 🎉"
        message="Your registration has been submitted successfully! Please check your email for confirmation details and important updates about Techverse 2026."
        redirectTo="/"
        autoRedirectDelay={0}
        registrationCodes={registrationCodes}
      />
    </div>
  )
}
