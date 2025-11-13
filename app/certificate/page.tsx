'use client'

import { useState } from 'react'

interface CertificateData {
  name: string
  cnic: string
  uniqueId: string
  module: string
  isVerified: boolean
}

export default function CertificatePage() {
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
    uniqueId: ''
  })
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setCertificateData(null)

    try {
      const response = await fetch('/api/certificate/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          cnic: formData.cnic,
          uniqueId: formData.uniqueId
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Verification failed')
      }

      const data = await response.json()
      setCertificateData(data)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : 'Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!certificateData) return

    // Create a new window for certificate
    const certificateWindow = window.open('', '_blank')
    if (!certificateWindow) return

    const certificateHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Techverse 2026 Certificate - ${certificateData.name}</title>
          <style>
            body {
              font-family: 'Times New Roman', serif;
              margin: 0;
              padding: 20px;
              background: #f5f5f5;
            }
            .certificate {
              max-width: 800px;
              margin: 0 auto;
              background: linear-gradient(135deg, #000000 0%, #581c87 50%, #1e40af 100%);
              padding: 40px;
              position: relative;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
              color: white;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logos {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
            }
            .logo {
              width: 80px;
              height: 80px;
              background: #ddd;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: #666;
            }
            .title {
              font-size: 36px;
              font-weight: bold;
              color: #ffffff;
              text-align: center;
              margin: 20px 0;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .subtitle {
              font-size: 18px;
              color: #e0e7ff;
              text-align: center;
              margin-bottom: 40px;
            }
            .content {
              text-align: center;
              margin: 40px 0;
            }
            .participant-name {
              font-size: 28px;
              font-weight: bold;
              color: #fbbf24;
              margin: 20px 0;
              text-transform: uppercase;
            }
            .participant-type {
              font-size: 20px;
              color: #c084fc;
              margin: 15px 0;
            }
            .unique-id {
              font-size: 14px;
              color: #a78bfa;
              margin-top: 20px;
              font-family: monospace;
            }
            .footer {
              margin-top: 60px;
              font-size: 12px;
              color: #9ca3af;
              text-align: center;
              border-top: 1px solid rgba(255,255,255,0.2);
              padding-top: 20px;
            }
            .signatures {
              display: flex;
              justify-content: space-between;
              margin-top: 40px;
              padding: 0 40px;
            }
            .signature {
              text-align: center;
              width: 200px;
            }
            .signature-line {
              border-bottom: 1px solid #ffffff;
              margin-bottom: 5px;
            }
            .signature-title {
              font-size: 12px;
              color: #d1d5db;
            }
            @media print {
              body { background: linear-gradient(135deg, #000000 0%, #581c87 50%, #1e40af 100%) !important; }
              .certificate { border: none; box-shadow: none; background: linear-gradient(135deg, #000000 0%, #581c87 50%, #1e40af 100%) !important; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <div class="logos">
                <div class="logo">UMT</div>
                <div class="logo">TECHVERSE</div>
              </div>
              <div class="title">Certificate of Participation</div>
              <div class="subtitle">Techverse 2026</div>
            </div>

            <div class="content">
              <p>This is to certify that</p>
              <div class="participant-name">${certificateData.name}</div>
              <div class="participant-type">
                ${certificateData.module === 'General' ? 'Techverse Participant' : `${certificateData.module} Participant`}
              </div>
              <p>has successfully participated in Techverse 2026</p>
              <div class="unique-id">Certificate ID: ${certificateData.uniqueId}</div>
            </div>

            <div class="signatures">
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-title">UMT OPA</div>
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-title">President M Shehryar Rana</div>
              </div>
            </div>

            <div class="footer">
              This certificate is generated by System - powered by Largify Solutions - approved by UMT and Techverse
            </div>
          </div>
        </body>
      </html>
    `

    certificateWindow.document.write(certificateHTML)
    certificateWindow.document.close()

    // Trigger print dialog
    setTimeout(() => {
      certificateWindow.print()
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            🏆 Certificate Generation & Verification
          </h1>
          <p className="mt-2 text-purple-300">Generate and verify your Techverse 2026 participation certificate</p>
        </div>

        {/* Verification Form */}
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-300">Verify Your Details</h2>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-purple-200">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
                />
              </div>
              <div>
                <label htmlFor="cnic" className="block text-sm font-medium text-purple-200">CNIC</label>
                <input
                  type="text"
                  id="cnic"
                  name="cnic"
                  required
                  value={formData.cnic}
                  onChange={handleInputChange}
                  placeholder="Enter your CNIC"
                  className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
                />
              </div>
              <div>
                <label htmlFor="uniqueId" className="block text-sm font-medium text-purple-200">Unique ID</label>
                <input
                  type="text"
                  id="uniqueId"
                  name="uniqueId"
                  required
                  value={formData.uniqueId}
                  onChange={handleInputChange}
                  placeholder="Enter unique ID from email"
                  className="mt-1 block w-full bg-black/50 border-purple-500/50 rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400 text-white placeholder-purple-400"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? 'Verifying...' : 'Verify & Generate Certificate'}
              </button>
            </div>
          </form>
        </div>

        {/* Certificate Display */}
        {certificateData && certificateData.isVerified && (
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-500/20 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-green-300">✅ Verification Successful!</h2>
              <p className="text-green-200">Your certificate is ready for download</p>
            </div>

            {/* Certificate Preview */}
            <div className="bg-gradient-to-br from-black via-purple-900 to-blue-900 rounded-lg p-8 mb-6 max-w-4xl mx-auto text-white">
              <div className="text-center border-4 border-white/20 p-8">
                {/* Header with logos */}
                <div className="flex justify-between items-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center font-bold text-white">UMT</div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center font-bold text-white">TECHVERSE</div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">CERTIFICATE OF PARTICIPATION</h1>
                <p className="text-lg text-purple-200 mb-8">Techverse 2026</p>

                <div className="my-8">
                  <p className="text-lg mb-4">This is to certify that</p>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-2">{certificateData.name}</h2>
                  <p className="text-lg text-purple-300 mb-4">
                    {certificateData.module === 'General' ? 'Techverse Participant' : `${certificateData.module} Participant`}
                  </p>
                  <p className="text-lg">has successfully participated in Techverse 2026</p>
                  <p className="text-sm text-purple-400 mt-4 font-mono">Certificate ID: {certificateData.uniqueId}</p>
                </div>

                {/* Signatures */}
                <div className="flex justify-between mt-12 px-8">
                  <div className="text-center">
                    <div className="border-b border-white w-32 mx-auto mb-1"></div>
                    <p className="text-sm text-gray-300">UMT OPA</p>
                  </div>
                  <div className="text-center">
                    <div className="border-b border-white w-32 mx-auto mb-1"></div>
                    <p className="text-sm text-gray-300">President M Shehryar Rana</p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/20">
                  <p className="text-xs text-gray-400">
                    This certificate is generated by System - powered by Largify Solutions - approved by UMT and Techverse
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
              >
                📄 Download Certificate
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-semibold mb-4 text-blue-300">📋 How to Get Your Certificate</h3>
          <div className="space-y-3 text-sm text-purple-200">
            <p><strong>1.</strong> Complete your registration for Techverse 2026</p>
            <p><strong>2.</strong> Check your email for the unique certificate ID</p>
            <p><strong>3.</strong> Enter your full name, CNIC, and unique ID above</p>
            <p><strong>4.</strong> Click "Verify & Generate Certificate"</p>
            <p><strong>5.</strong> Download and print your certificate</p>
          </div>
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-200">
              <strong>🔒 Security Note:</strong> Your certificate can only be generated using your registered CNIC and unique ID for security purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}