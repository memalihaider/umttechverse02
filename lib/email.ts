import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const result = await transporter.sendMail({
      from: `"Techverse 2026" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    })
    console.log('Email sent successfully to:', to, 'Message ID:', result.messageId)
    return true
  } catch (error) {
    console.error('Email send error to', to, ':', error)
    // Don't throw error to prevent API failure
    return false
  }
}