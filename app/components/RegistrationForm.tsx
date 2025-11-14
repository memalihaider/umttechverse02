'use client'

import { useState } from 'react'
import { validateEmailForFrontend } from '@/lib/email-validation-client'
import ConfirmationModal from './ConfirmationModal'

interface TeamMember {
  name: string
  email: string
  university: string
  rollNo: string
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
  paymentReceipt?: File
}

const modules = [
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
    winnerPrize: 15000,
    runnerUpPrize: 10000
  },
  {
    name: 'UI/UX Competition',
    fee: 2000,
    contactPerson: 'Zainab Salman - +92 302 1402652',
    teamSize: '2-4 members',
    winnerPrize: 15000,
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
    name: 'CyberQuest',
    fee: 2500,
    contactPerson: 'Information Pending',
    teamSize: '1 member',
    winnerPrize: 25000,
    runnerUpPrize: 15000
  },
  {
    name: 'Business Innovation',
    fee: 3999,
    contactPerson: 'Information Pending',
    teamSize: '1-5 members',
    winnerPrize: 40000,
    runnerUpPrize: 30000
  }
]

// Valid ambassador codes for 10% discount
const VALID_AMBASSADOR_CODES = [
  'TECHVERSE2025',
  'UMTAMBASSADOR',
  'TECHVERSE10',
  'UMTSTUDENT',
  'TECHVERSEVIP',
  'UMT2025',
  'TECHVERSEPRO',
  'UMTAMB10',
  'TECHVERSEPLUS',
  'UMTTECH'
]

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
  })

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', email: '', university: '', rollNo: '' }
  ])

  const [loading, setLoading] = useState(false)
  const [showBankDetails, setShowBankDetails] = useState(false)
  const [emailErrors, setEmailErrors] = useState<{[key: string]: string}>({})
  const [cnicError, setCnicError] = useState<string>('')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const validateEmail = (email: string, field: string) => {
    const validation = validateEmailForFrontend(email)
    setEmailErrors(prev => ({
      ...prev,
      [field]: validation.isValid ? '' : validation.message
    }))
    return validation.isValid
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target
    handleInputChange(e)
    if (value) {
      validateEmail(value, field)
    } else {
      setEmailErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const formatCNIC = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{5})(\d{7})(\d{1})?$/)
    if (match) {
      return `${match[1]}-${match[2]}${match[3] ? '-' + match[3] : ''}`
    }
    return cleaned
  }

  const formatPhone = (value: string) => {
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
  }

  const handleCNICChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow up to 17 characters total (14 digits + special chars)
    if (value.length <= 14) {
      // Try to format it automatically, but allow any input
      const formatted = formatCNIC(value)
      const finalValue = formatted || value
      setFormData(prev => ({ ...prev, cnic: finalValue }))

      // Check CNIC uniqueness after a short delay
      if (finalValue.length >= 13) {
        const timeoutId = setTimeout(() => {
          checkCnicUniqueness(finalValue)
        }, 500) // 500ms delay to avoid too many API calls

        return () => clearTimeout(timeoutId)
      } else {
        setCnicError('')
      }
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow up to 15 characters maximum
    if (value.length <= 14) {
      // Try to format it automatically, but allow any input
      const formatted = formatPhone(value)
      setFormData(prev => ({ ...prev, phone: formatted || value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, paymentReceipt: file }))
    }
  }

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...teamMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setTeamMembers(updatedMembers)
  }

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', email: '', university: '', rollNo: '' }])
  }

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index))
    }
  }

  const calculateTotalAmount = () => {
    let total = 0

    // Add module fee
    if (formData.module) {
      const selectedModule = modules.find(m => m.name === formData.module)
      if (selectedModule) {
        let moduleFee = selectedModule.fee
        // Apply 10% discount if valid ambassador code is provided
        if (formData.ambassadorCode && VALID_AMBASSADOR_CODES.includes(formData.ambassadorCode.toUpperCase())) {
          moduleFee = Math.floor(moduleFee * 0.9) // 10% discount, rounded down
        }
        total += moduleFee
      }
    }

    // Add hostel fee (no discount on hostel)
    if (formData.hostel === 'one_day') {
      total += 2000
    } else if (formData.hostel === 'three_days') {
      total += 5000
    }

    return total
  }

  const getModuleFee = () => {
    if (formData.module) {
      const selectedModule = modules.find(m => m.name === formData.module)
      if (selectedModule) {
        let fee = selectedModule.fee
        // Apply 10% discount if valid ambassador code is provided
        if (formData.ambassadorCode && VALID_AMBASSADOR_CODES.includes(formData.ambassadorCode.toUpperCase())) {
          fee = Math.floor(fee * 0.9) // 10% discount, rounded down
        }
        return fee
      }
    }
    return 0
  }

  const getOriginalModuleFee = () => {
    if (formData.module) {
      const selectedModule = modules.find(m => m.name === formData.module)
      return selectedModule ? selectedModule.fee : 0
    }
    return 0
  }

  const getDiscountAmount = () => {
    if (formData.ambassadorCode && VALID_AMBASSADOR_CODES.includes(formData.ambassadorCode.toUpperCase())) {
      return getOriginalModuleFee() - getModuleFee()
    }
    return 0
  }

  const getHostelFee = () => {
    if (formData.hostel === 'one_day') {
      return 2000
    } else if (formData.hostel === 'three_days') {
      return 5000
    }
    return 0
  }

  const checkCnicUniqueness = async (cnic: string) => {
    if (!cnic || cnic.length < 13) return // Don't check incomplete CNICs

    try {
      const response = await fetch('/api/check-cnic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cnic }),
      })

      const data = await response.json()

      if (data.isRegistered) {
        setCnicError('This CNIC is already registered. Each CNIC can only be used once.')
      } else {
        setCnicError('')
      }
    } catch (error) {
      console.error('Error checking CNIC:', error)
      // Don't show error for network issues, just clear any existing error
      setCnicError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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

    // Check for CNIC error
    if (cnicError) {
      alert('Please fix the CNIC error before submitting.')
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
      formDataToSend.append('teamMembers', JSON.stringify(teamMembers))
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
    <div className="min-h-screen bg-linear-to-br from-black via-purple-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-8">
        <div className="text-center mb-8">
          <h3 className="text-1xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Powered By Largify Solutions
          </h3>
          <p className="mt-2 text-purple-300">Fill out the form below to register for your chosen module.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-semibold mb-6 text-blue-300">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-purple-200">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-purple-200">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e, 'email')}
                  className={`mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400 ${
                    emailErrors.email ? 'border-red-500' : ''
                  }`}
                />
                {emailErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{emailErrors.email}</p>
                )}
                <p className="mt-1 text-sm text-purple-400">Enter your original email address - we will send important updates and access codes to this email.</p>
              </div>
              <div>
                <label htmlFor="cnic" className="block text-sm font-medium text-purple-200">CNIC</label>
                <input
                  type="text"
                  id="cnic"
                  name="cnic"
                  required
                  value={formData.cnic}
                  onChange={handleCNICChange}
                  maxLength={17}
                  className={`mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400 ${
                    cnicError ? 'border-red-500' : ''
                  }`}
                />
                <p className="mt-1 text-sm text-purple-400">Enter your CNIC in any format - Enter your origional CNIC</p>
                {cnicError && (
                  <p className="mt-1 text-sm text-red-400">{cnicError}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-purple-200">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  maxLength={15}
                  className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
                />
                <p className="mt-1 text-sm text-purple-400">Enter your correct phone number, we can verify by calling you.</p>
              </div>
              <div>
                <label htmlFor="university" className="block text-sm font-medium text-purple-200">University Name</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  required
                  value={formData.university}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
                />
              </div>
              <div>
                <label htmlFor="rollNo" className="block text-sm font-medium text-purple-200">Roll Number</label>
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  required
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Module Selection</h2>
            <div>
              <label htmlFor="module" className="block text-sm font-medium text-purple-200">Choose a module</label>
              <select
                id="module"
                name="module"
                required
                value={formData.module}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white"
              >
                <option value="" className="bg-black">Select a module</option>
                {modules.map((module) => (
                  <option key={module.name} value={module.name} className="bg-black">
                    {module.name} - PKR {module.fee.toLocaleString()} ({module.teamSize})
                  </option>
                ))}
              </select>
            </div>

            {/* Module Details Display */}
            {formData.module && (
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-300">📋 Module Details</h3>
                {(() => {
                  const selectedModule = modules.find(m => m.name === formData.module)
                  return selectedModule ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-purple-200"><strong>Module:</strong> {selectedModule.name}</p>
                        <p className="text-purple-200"><strong>Team Size:</strong> {selectedModule.teamSize}</p>
                        <p className="text-purple-200"><strong>Contact:</strong> {selectedModule.contactPerson}</p>
                      </div>
                      <div>
                        <p className="text-purple-200"><strong>Entry Fee:</strong> PKR {selectedModule.fee.toLocaleString()}</p>
                        <p className="text-green-300"><strong>Winner Prize:</strong> PKR {selectedModule.winnerPrize.toLocaleString()}</p>
                        <p className="text-yellow-300"><strong>Runner-up Prize:</strong> PKR {selectedModule.runnerUpPrize.toLocaleString()}</p>
                      </div>
                    </div>
                  ) : null
                })()}
              </div>
            )}
          </div>

          {/* Ambassador Code Section */}
          <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Ambassador Code (Optional)</h2>
            <div>
              <label htmlFor="ambassadorCode" className="block text-sm font-medium text-purple-200">Ambassador Code</label>
              <input
                type="text"
                id="ambassadorCode"
                name="ambassadorCode"
                value={formData.ambassadorCode}
                onChange={handleInputChange}
                placeholder="Enter ambassador code for 10% discount"
                className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
              />
              <p className="mt-1 text-sm text-purple-400">
                Enter a valid ambassador code to get discount on your module fee. Leave empty if you don't have one.
              </p>
            </div>
          </div>

          <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Accommodation</h2>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-3">Hostel Accommodation (Optional)</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="hostel-none"
                    name="hostel"
                    value="none"
                    checked={formData.hostel === 'none'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-500/50 bg-black/50"
                  />
                  <label htmlFor="hostel-none" className="ml-3 block text-sm font-medium text-purple-200">
                    <span className="font-semibold">Self-arranged accommodation</span>
                    <span className="block text-purple-400 text-xs">I will arrange my own accommodation</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="hostel-one-day"
                    name="hostel"
                    value="one_day"
                    checked={formData.hostel === 'one_day'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-500/50 bg-black/50"
                  />
                  <label htmlFor="hostel-one-day" className="ml-3 block text-sm font-medium text-purple-200">
                    <span className="font-semibold">Hostel for 1 day - PKR 2,000</span>
                    <span className="block text-purple-400 text-xs">Perfect for day participants or single day attendance</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="hostel-three-days"
                    name="hostel"
                    value="three_days"
                    checked={formData.hostel === 'three_days'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-500/50 bg-black/50"
                  />
                  <label htmlFor="hostel-three-days" className="ml-3 block text-sm font-medium text-purple-200">
                    <span className="font-semibold">Hostel for 3 days - PKR 5,000</span>
                    <span className="block text-purple-400 text-xs">Full event coverage (5-11 January 2026)</span>
                  </label>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-200">
                  <strong>🏨 Hostel Information:</strong><br />
                  • Comfortable accommodation at UMT campus<br />
                  • Separate facilities for male and female participants<br />
                  • Includes breakfast and basic amenities<br />
                  • Payment to be made separately at the venue<br />
                  • Limited rooms available - first come, first served
                </p>
              </div>
            </div>
          </div>

          {/* Total Amount Display */}
          {formData.module && (
            <div className="bg-green-900/30 rounded-xl p-6 border border-green-500/20">
              <h2 className="text-2xl font-semibold mb-4 text-green-300">💰 Total Amount Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-green-500/20">
                  <span className="text-purple-200">Module Fee ({formData.module}):</span>
                  <div className="text-right">
                    {formData.ambassadorCode && VALID_AMBASSADOR_CODES.includes(formData.ambassadorCode.toUpperCase()) ? (
                      <>
                        <span className="text-red-400 line-through text-sm">PKR {getOriginalModuleFee().toLocaleString()}</span>
                        <br />
                        <span className="text-blue-300 font-semibold">PKR {getModuleFee().toLocaleString()}</span>
                        <span className="text-green-400 text-sm ml-2">(10% discount applied)</span>
                      </>
                    ) : (
                      <span className="text-blue-300 font-semibold">PKR {getModuleFee().toLocaleString()}</span>
                    )}
                  </div>
                </div>
                {getDiscountAmount() > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-green-500/20">
                    <span className="text-purple-200">Ambassador Discount (10%):</span>
                    <span className="text-green-400 font-semibold">- PKR {getDiscountAmount().toLocaleString()}</span>
                  </div>
                )}
                {formData.hostel !== 'none' && (
                  <div className="flex justify-between items-center py-2 border-b border-green-500/20">
                    <span className="text-purple-200">
                      Hostel Fee ({formData.hostel === 'one_day' ? '1 Day' : '3 Days'}):
                    </span>
                    <span className="text-blue-300 font-semibold">PKR {getHostelFee().toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3 border-t-2 border-green-500/30 pt-3">
                  <span className="text-lg font-bold text-green-300">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-400">PKR {calculateTotalAmount().toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-200">
                  <strong>💳 Payment Note:</strong> Please transfer exactly <strong>PKR {calculateTotalAmount().toLocaleString()}</strong> to the bank account shown below.
                  {formData.hostel !== 'none' && ' Hostel fees are included in this total amount.'}
                  {getDiscountAmount() > 0 && ' Ambassador discount has been applied to your module fee.'}
                </p>
              </div>
            </div>
          )}

          {formData.module && (
            <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">Team Members</h2>
              <p className="text-sm text-purple-300 mb-4">
                You are the team leader. Add your team members below (optional - only add if you have team members).
              </p>
              {teamMembers.map((member, index) => (
                <div key={index} className="space-y-2 mb-4 p-4 bg-black/30 rounded-lg border border-purple-500/10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-purple-200">Team Member {index + 1}</h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200">Email</label>
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
                      className={`mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400 ${
                        emailErrors[`teamMember-${index}`] ? 'border-red-500' : ''
                      }`}
                    />
                    {emailErrors[`teamMember-${index}`] && (
                      <p className="mt-1 text-sm text-red-400">{emailErrors[`teamMember-${index}`]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200">University Name</label>
                    <input
                      type="text"
                      value={member.university}
                      onChange={(e) => handleTeamMemberChange(index, 'university', e.target.value)}
                      className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200">Roll Number</label>
                    <input
                      type="text"
                      value={member.rollNo}
                      onChange={(e) => handleTeamMemberChange(index, 'rollNo', e.target.value)}
                      className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addTeamMember}
                className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-lg text-sm font-medium text-purple-200 bg-purple-900/30 hover:bg-purple-800/30 transition-colors"
              >
                Add Team Member
              </button>
            </div>
          )}

          <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Payment Details</h2>
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-200">
                <strong>Bank Transfer Required</strong><br />
                {formData.module ? (
                  <>
                    Please transfer exactly <strong>PKR {calculateTotalAmount().toLocaleString()}</strong> to our bank account.
                    {formData.hostel !== 'none' && ' This includes both your module fee and hostel accommodation.'}
                  </>
                ) : (
                  'Please transfer the exact amount for your selected module. Hostel accommodation fees (if selected) will be collected separately at the venue.'
                )}
                <br />
                Click "View Bank Details" to see the account information.
              </p>
              <button
                type="button"
                onClick={() => setShowBankDetails(!showBankDetails)}
                className="mt-2 inline-flex items-center px-4 py-2 border border-yellow-500/50 rounded-lg text-sm leading-4 font-medium text-yellow-200 bg-yellow-900/30 hover:bg-yellow-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
              >
                {showBankDetails ? 'Hide Bank Details' : 'View Bank Details'}
              </button>
              {showBankDetails && (
                <div className="mt-4 p-4 bg-black/50 border border-purple-500/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-blue-300">Bank Details</h3>
                  <div className="space-y-1 text-sm text-purple-200">
                    <p><strong>Account Title:</strong> University of Management and Technology (UMT)</p>
                    <p><strong>Bank Name:</strong> Habib Bank Limited</p>
                    <p><strong>Bank Account Number:</strong> 53737000007252</p>
                    <p><strong>IBAN #</strong> PK10 HABB 0053737000007252</p>
                    <p><strong>Branch Code:</strong> 5373</p>
                    <p><strong>Branch:</strong> UMT Branch, Lahore</p>
                    <p><strong>SWIFT Code:</strong> HABBPKKA</p>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="paymentReceipt" className="block text-sm font-medium text-purple-200">
                Upload Payment Receipt
              </label>
              <input
                type="file"
                id="paymentReceipt"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-purple-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-900/50 file:text-purple-200 hover:file:bg-purple-800/50 file:border-purple-500/50"
                required={true}
              />
              <p className="mt-1 text-sm text-purple-400">
                Upload a clear image of your payment receipt. Max size: 1MB. Supported formats: JPEG, PNG, GIF, WebP.<br />
                Note: Your payment receipt is required to complete the registration process and verify your payment.
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing - Powered by Largify Solutions...
                </div>
              ) : (
                'Submit Registration'
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
        autoRedirectDelay={5000}
      />
    </div>
  )
}
