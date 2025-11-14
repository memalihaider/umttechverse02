import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    console.log('📤 Attempting to send email to:', to)
    console.log('Using Resend API')

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: [to],
      subject,
      html,
    })

    if (error) {
      console.error('❌ Resend API error:', error)
      return false
    }

    console.log('✅ Email sent successfully via Resend!')
    console.log('Email ID:', data?.id || 'N/A')
    return true
  } catch (error) {
    console.error('❌ Email send error via Resend:', error)

    // Check for specific Resend errors
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Error details:', errorMessage)

    if (errorMessage.includes('API key')) {
      console.error('❌ Resend API key is missing or invalid')
      console.error('Please set RESEND_API_KEY in your .env.local file')
    } else if (errorMessage.includes('domain') || errorMessage.includes('from')) {
      console.error('❌ Sender email domain is not verified in Resend')
      console.error('Please verify the EMAIL_FROM domain in Resend dashboard')
    }

    // Don't throw error to prevent API failure
    return false
  }
}