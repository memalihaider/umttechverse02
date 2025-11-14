import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 })
    }

    // Create a test email HTML template
    const testEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Techverse 2026 - Email Test</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: #e8f4fd; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🧪 Email Test Successful!</h1>
          <p>Techverse 2026 Email System</p>
        </div>

        <div class="content">
          <p>Dear Test Recipient,</p>

          <p>This is a test email to verify that the Techverse 2026 email system is working correctly.</p>

          <div class="highlight">
            <h3>📧 Test Details</h3>
            <ul>
              <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
              <li><strong>Recipient:</strong> ${email}</li>
              <li><strong>System Status:</strong> ✅ Email delivery working</li>
            </ul>
          </div>

          <p>If you received this email, it means:</p>
          <ul>
            <li>✅ Email configuration is correct</li>
            <li>✅ SMTP server is accessible</li>
            <li>✅ Authentication is working</li>
            <li>✅ HTML email templates are functional</li>
          </ul>

          <p>The Techverse 2026 registration system is ready to send confirmation emails to participants!</p>

          <p>Best regards,<br>
          <strong>Techverse 2026 Development Team</strong><br>
          Email Test System</p>
        </div>

        <div class="footer">
          <p>This is a test email from the Techverse 2026 system.</p>
          <p>© 2025 Techverse 2026. All rights reserved.</p>
        </div>
      </body>
      </html>
    `

    const emailSent = await sendEmail(email, 'Techverse 2026 - Email Test', testEmailHtml)

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully',
        details: {
          recipient: email,
          timestamp: new Date().toISOString(),
          status: 'sent'
        }
      })
    } else {
      return NextResponse.json({
        error: 'Failed to send test email',
        details: 'Check server logs for more information'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({
      error: 'Test email failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}