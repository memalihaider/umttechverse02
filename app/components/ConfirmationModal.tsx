'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  redirectTo?: string
  autoRedirectDelay?: number
  registrationCodes?: { accessCode: string; uniqueId: string } | null
  // Optional confirm action button (used by admin for confirm dialogs)
  showConfirm?: boolean
  confirmLabel?: string
  confirmVariant?: 'danger' | 'success' | 'neutral'
  onConfirm?: () => void | Promise<void>
  confirmLoading?: boolean
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  title,
  message,
  redirectTo = '/',
  autoRedirectDelay = 0,
  registrationCodes
  ,
  showConfirm = false,
  confirmLabel = 'Confirm',
  confirmVariant = 'success',
  onConfirm,
  confirmLoading = false
}: ConfirmationModalProps) {
  const router = useRouter()

  useEffect(() => {
    if (isOpen && autoRedirectDelay > 0) {
      const timer = setTimeout(() => {
        router.push(redirectTo)
      }, autoRedirectDelay)

      return () => clearTimeout(timer)
    }
  }, [isOpen, autoRedirectDelay, redirectTo, router])

  useEffect(() => {
    if (isOpen && autoRedirectDelay > 0) {
      const timer = setTimeout(() => {
        router.push(redirectTo)
      }, autoRedirectDelay)

      return () => clearTimeout(timer)
    }
  }, [isOpen, autoRedirectDelay, redirectTo, router])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Enhanced background overlay with animated gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Enhanced modal content with glassmorphism effect */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full mx-auto border border-white/20 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-500">
        {/* Decorative gradient border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 p-[1px]">
          <div className="h-full w-full rounded-3xl bg-white/95 backdrop-blur-xl"></div>
        </div>

        <div className="relative p-8">
          {/* Success icon with animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-in bounce-in duration-700">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-4 border-green-400/30 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border-2 border-green-400/20 animate-ping animation-delay-300"></div>
            </div>
          </div>

          {/* Title with enhanced styling */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 animate-in slide-in-from-top duration-500">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
          </div>

          {/* Message with better typography */}
          <div className="text-center mb-8">
            <p className="text-gray-700 text-lg leading-relaxed animate-in slide-in-from-bottom duration-500 animation-delay-200">
              {message}
            </p>
          </div>

          {/* Enhanced registration codes section */}
          {registrationCodes && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100 mb-8 animate-in slide-in-from-bottom duration-500 animation-delay-400">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-800">Your Registration Details</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/80 rounded-xl p-4 border border-purple-200/50 shadow-sm">
                  <div className="text-sm font-medium text-purple-700 mb-2">Unique Certificate ID</div>
                  <div className="text-xl font-mono font-bold text-purple-800 bg-purple-100 px-4 py-2 rounded-lg select-all">
                    {registrationCodes.uniqueId}
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl p-4 border border-blue-200/50 shadow-sm">
                  <div className="text-sm font-medium text-blue-700 mb-2">Access Code</div>
                  <div className="text-xl font-mono font-bold text-blue-800 bg-blue-100 px-4 py-2 rounded-lg select-all">
                    {registrationCodes.accessCode}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-yellow-800 mb-1">Important!</p>
                    <p className="text-sm text-yellow-700">
                      Please save these codes securely. You&apos;ll need them to access your account, certificate, and future updates about Techverse 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 animate-in slide-in-from-left duration-500 animation-delay-600"
              onClick={() => router.push(redirectTo)}
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Home
              </span>
            </button>

            <button
              type="button"
              className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 animate-in slide-in-from-right duration-500 animation-delay-700"
              onClick={() => window.open('https://mail.google.com', '_blank')}
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Check Gmail
              </span>
            </button>

            {showConfirm && (
              <button
                type="button"
                className={`px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  confirmVariant === 'danger' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800' :
                  confirmVariant === 'neutral' ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800' :
                  'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                }`}
                onClick={async () => {
                  if (onConfirm) await onConfirm()
                  onClose()
                }}
                disabled={confirmLoading}
              >
                {confirmLoading ? 'Processing...' : confirmLabel}
              </button>
            )}

            <button
              type="button"
              className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 animate-in slide-in-from-bottom duration-500 animation-delay-800"
              onClick={onClose}
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}