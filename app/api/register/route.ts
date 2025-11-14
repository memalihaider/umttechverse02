import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { modules } from '@/lib/modules'
import { validateEmail } from '@/lib/email-validation'
import { generatePendingRegistrationEmail } from '@/lib/email-templates'
import type { RegistrationData } from '@/lib/email-templates'

function generateAccessCode(): string {
  // Generate a random 8-character alphanumeric code
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function generateUniqueCertificateId(): string {
  // Generate a unique certificate ID with format: TV2025-XXXXXX
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomPart = ''
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `TV2025-${randomPart}`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const cnic = formData.get('cnic') as string

    console.log('Registration attempt for:', { name, email, cnic })

    // Validate email (temporarily relaxed - only check format and disposable)
    const emailValidation = await validateEmail(email)
    console.log('Email validation result:', emailValidation)

    // For now, only reject if format is invalid or it's disposable
    // Skip MX record check to avoid false positives
    if (!emailValidation.isValid && (emailValidation.errors.includes('Invalid email format') || emailValidation.errors.includes('Disposable email addresses are not allowed'))) {
      return NextResponse.json({
        error: 'Invalid email address',
        details: emailValidation.errors
      }, { status: 400 })
    }

    const phone = formData.get('phone') as string
    const university = formData.get('university') as string
    const rollNo = formData.get('rollNo') as string
    const module = formData.get('module') as string
    const hostel = formData.get('hostel') as string
    const ambassadorCode = formData.get('ambassadorCode') as string
    const teamMembers = JSON.parse(formData.get('teamMembers') as string)
    const paymentReceipt = formData.get('paymentReceipt') as File | null

    // Validate team member emails if provided (temporarily relaxed)
    for (const member of teamMembers) {
      if (member.email && member.email !== email) { // Skip validation for main registrant
        console.log('Validating team member email:', member.email)
        const memberEmailValidation = await validateEmail(member.email)
        console.log('Team member email validation result:', memberEmailValidation)

        // For now, only reject if format is invalid or it's disposable
        if (!memberEmailValidation.isValid && (memberEmailValidation.errors.includes('Invalid email format') || memberEmailValidation.errors.includes('Disposable email addresses are not allowed'))) {
          return NextResponse.json({
            error: `Invalid email for team member: ${member.name}`,
            details: memberEmailValidation.errors
          }, { status: 400 })
        }
      }
    }

    let receiptUrl = ''
    if (paymentReceipt) {
      console.log('Uploading payment receipt...')
      const fileExt = paymentReceipt.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('receipts')
        .upload(fileName, paymentReceipt)
      if (error) {
        console.error('File upload error:', error)
        throw error
      }
      receiptUrl = data.path
      console.log('File uploaded successfully:', receiptUrl)
    }

    // Generate access code and unique certificate ID
    const accessCode = generateAccessCode()
    const uniqueCertificateId = generateUniqueCertificateId()
    console.log('Generated codes:', { accessCode, uniqueCertificateId })

    console.log('Inserting registration into database...')
    const { error } = await supabase
      .from('registrations')
      .insert({
        name,
        email,
        cnic,
        phone,
        university,
        roll_no: rollNo,
        module,
        hostel,
        ambassador_code: ambassadorCode || null,
        team_members: teamMembers,
        payment_receipt_url: receiptUrl,
        access_code: accessCode,
        unique_id: uniqueCertificateId,
        status: 'pending',
      })

    if (error) {
      console.error('Database insertion error:', error)

      // Handle specific database errors
      if (error.code === '23505') {
        if (error.message.includes('cnic')) {
          return NextResponse.json({
            error: 'CNIC already registered',
            message: 'This CNIC has already been used for registration. Each CNIC can only be registered once.'
          }, { status: 400 })
        } else if (error.message.includes('email')) {
          return NextResponse.json({
            error: 'Email already registered',
            message: 'This email address has already been used for registration. Each email can only be registered once.'
          }, { status: 400 })
        }
      }

      throw error
    }
    console.log('Registration inserted successfully')

    // Send booking email
    console.log('Sending confirmation email...')
    const selectedModule = modules.find(m => m.name === module)

    const hostelFee = hostel === 'one_day' ? 2000 : hostel === 'three_days' ? 5000 : 0
    const originalModuleFee = selectedModule?.fee || 0
    const isValidAmbassadorCode = ambassadorCode && ['TECHVERSE2025', 'UMTAMBASSADOR', 'TECHVERSE10', 'UMTSTUDENT', 'TECHVERSEVIP', 'UMT2025', 'TECHVERSEPRO', 'UMTAMB10', 'TECHVERSEPLUS', 'UMTTECH'].includes(ambassadorCode.toUpperCase())
    const discountedModuleFee = isValidAmbassadorCode ? Math.floor(originalModuleFee * 0.9) : originalModuleFee
    const totalAmount = discountedModuleFee + hostelFee

    // Prepare registration data for email template
    const registrationData: RegistrationData = {
      name,
      email,
      cnic,
      phone,
      university,
      roll_no: rollNo,
      module,
      hostel,
      ambassador_code: ambassadorCode || undefined,
      team_members: teamMembers,
      access_code: accessCode,
      unique_id: uniqueCertificateId,
      status: 'pending' as const,
    }

    const bookingEmailHtml = generatePendingRegistrationEmail(registrationData)

    try {
      await sendEmail(email, 'Techverse 2026 - Registration Confirmed', bookingEmailHtml)
      console.log('Confirmation email sent successfully')
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Don't fail the registration if email fails, just log it
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}