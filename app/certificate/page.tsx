'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
  const [isServiceAvailable, setIsServiceAvailable] = useState(false)

  // Check if certificate service is available (after January 13, 2026)
  useEffect(() => {
    const currentDate = new Date()
    const serviceAvailableDate = new Date('2026-01-13')
    setIsServiceAvailable(currentDate >= serviceAvailableDate)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isServiceAvailable) {
      setError('Certificate service will be available after Techverse 2026 concludes on January 13, 2026, Inshallah.')
      return
    }
    
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
    if (!certificateData || !isServiceAvailable) return

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
    <div className="min-h-screen bg-black overflow-x-hidden scroll-smooth selection:bg-purple-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Navigation */}
      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
            <span className="text-sm font-medium text-purple-300">Official Certification</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
            Certificate Verification
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Verify and download your official Techverse 2026 participation certificate.
          </p>
          
          {!isServiceAvailable && (
            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl max-w-2xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3 text-yellow-200">
                <span className="text-xl">📅</span>
                <p className="text-sm font-medium">
                  <strong>Service Notice:</strong> Certificate generation will be available after the event concludes on <strong>January 13, 2026</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Verification Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Verify Your Details
            </h2>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={!isServiceAvailable}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={isServiceAvailable ? "Enter your full name" : "Available Jan 13, 2026"}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cnic" className="block text-sm font-medium text-gray-300">CNIC</label>
                  <input
                    type="text"
                    id="cnic"
                    name="cnic"
                    required
                    disabled={!isServiceAvailable}
                    value={formData.cnic}
                    onChange={handleInputChange}
                    placeholder={isServiceAvailable ? "Enter your CNIC" : "Available Jan 13, 2026"}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="uniqueId" className="block text-sm font-medium text-gray-300">Unique ID</label>
                  <input
                    type="text"
                    id="uniqueId"
                    name="uniqueId"
                    required
                    disabled={!isServiceAvailable}
                    value={formData.uniqueId}
                    onChange={handleInputChange}
                    placeholder={isServiceAvailable ? "ID from email" : "Available Jan 13, 2026"}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading || !isServiceAvailable}
                  className="w-full flex justify-center items-center gap-2 py-4 px-6 rounded-xl text-sm font-bold text-white bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : !isServiceAvailable ? (
                    'Service Available After Jan 13, 2026'
                  ) : (
                    <>
                      Verify & Generate Certificate
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Certificate Display */}
        {certificateData && certificateData.isVerified && (
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-green-500/30 p-8 md:p-10 mb-12 shadow-2xl animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Successful!</h2>
              <p className="text-gray-400">Your certificate is ready for download</p>
            </div>

            {/* Certificate Preview */}
            <div className="relative bg-white text-black p-8 md:p-12 rounded-xl shadow-2xl max-w-3xl mx-auto mb-8 overflow-hidden">
              {/* Decorative Background for Certificate */}
              <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')] bg-center" />
              <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600" />
              <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600" />
              
              <div className="relative z-10 border-4 border-double border-gray-200 p-6 md:p-8 h-full flex flex-col justify-between">
                {/* Header with logos */}
                <div className="flex justify-between items-center mb-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-xs">UMT</div>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-xs">TECHVERSE</div>
                </div>

                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2 tracking-wide">CERTIFICATE</h1>
                  <p className="text-sm md:text-base text-gray-500 uppercase tracking-[0.2em]">Of Participation</p>
                </div>

                <div className="text-center mb-12">
                  <p className="text-gray-600 italic mb-4">This is to certify that</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2 font-serif">{certificateData.name}</h2>
                  <div className="w-32 h-px bg-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">has successfully participated in</p>
                  <p className="text-xl font-bold text-gray-800">Techverse 2026</p>
                  <p className="text-gray-500 mt-2">
                    as a {certificateData.module === 'General' ? 'Techverse Participant' : `${certificateData.module} Participant`}
                  </p>
                </div>

                <div className="flex justify-between items-end mt-auto pt-8">
                  <div className="text-center">
                    <div className="w-32 border-b border-gray-400 mb-2"></div>
                    <p className="text-xs text-gray-500 font-serif">UMT OPA</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-2 opacity-80">
                      {/* Seal Placeholder */}
                      <div className="w-full h-full border-2 border-purple-200 rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-purple-300 uppercase text-center">Official<br/>Seal</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-32 border-b border-gray-400 mb-2"></div>
                    <p className="text-xs text-gray-500 font-serif">President</p>
                  </div>
                </div>
                
                <div className="absolute bottom-2 right-4 text-[10px] text-gray-400 font-mono">
                  ID: {certificateData.uniqueId}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleDownload}
                disabled={!isServiceAvailable}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-linear-to-r from-green-600 via-emerald-600 to-green-600 shadow-lg shadow-green-500/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Certificate
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-blue-400">📋</span> How to Get Your Certificate
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[
                "Complete your registration for Techverse 2026",
                "Check your email for the unique certificate ID",
                "Enter your full name, CNIC, and unique ID above",
                "Click 'Verify & Generate Certificate'",
                "Download and print your certificate"
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-400 text-sm">{step}</p>
                </div>
              ))}
            </div>
            <div className="bg-purple-500/5 rounded-xl p-6 border border-purple-500/10 flex flex-col justify-center">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h4 className="text-white font-medium mb-1">Secure Verification</h4>
                  <p className="text-sm text-gray-400">
                    Your certificate is protected by a unique ID system. It can only be generated using your registered CNIC and the ID sent to your email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}