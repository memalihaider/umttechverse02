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
  autoRedirectDelay = 3000,
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto border border-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start">
            <div className="shrink-0">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {title}
              </h3>
              <div className="text-sm text-gray-600 mb-4">
                {message}
              </div>
              {registrationCodes && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-3">Your Registration Details:</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Unique ID:</span>
                      <span className="text-sm font-mono text-blue-700 bg-blue-100 px-3 py-1 rounded">
                        {registrationCodes.uniqueId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Access Code:</span>
                      <span className="text-sm font-mono text-green-700 bg-green-100 px-3 py-1 rounded">
                        {registrationCodes.accessCode}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Please save these codes for your records. You&apos;ll need them to access your account and certificate.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end border-t border-gray-200">
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            onClick={() => router.push(redirectTo)}
          >
            Go to Home
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            onClick={() => window.open('https://mail.google.com', '_blank')}
          >
            Check Gmail
          </button>
          {showConfirm && (
            <button
              type="button"
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                confirmVariant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' :
                confirmVariant === 'neutral' ? 'bg-gray-600 text-white hover:bg-gray-700' :
                'bg-green-600 text-white hover:bg-green-700'
              }`}
              onClick={async () => {
                if (onConfirm) await onConfirm()
                // close modal after confirming
                onClose()
              }}
              disabled={confirmLoading}
            >
              {confirmLoading ? 'Processing...' : confirmLabel}
            </button>
          )}
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            onClick={onClose}
          >
            Stay Here
          </button>
        </div>

        {autoRedirectDelay > 0 && (
          <div className="bg-gray-100 px-6 py-3 text-center border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Automatically redirecting to home page in {Math.ceil(autoRedirectDelay / 1000)} seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}