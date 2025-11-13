import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { modules } from '@/lib/modules'
import { quickValidateEmail } from '@/lib/email-validation'

export async function POST(request: NextRequest) {
  try {
    const { id, status } = await request.json()
    console.log('Approve API called with:', { id, status })
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set')
    console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set')

    const { error: updateError } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', id)

    if (updateError) {
      console.error('Database update error:', updateError)
      throw updateError
    }

    console.log('Database update successful for id:', id, 'status:', status)

    // Get registration details
    const { data: registration, error: fetchError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Database fetch error:', fetchError)
      throw fetchError
    }

    console.log('Fetched registration:', registration.name, registration.email)

    // Send email to all team members
    const emailAddresses = [registration.email]
    if (registration.team_members && registration.team_members.length > 1) {
      registration.team_members.slice(1).forEach((member: {email: string}) => {
        if (member.email && !emailAddresses.includes(member.email)) {
          emailAddresses.push(member.email)
        }
      })
    }

    // Validate all email addresses before sending
    const invalidEmails: string[] = []
    for (const email of emailAddresses) {
      const validation = quickValidateEmail(email)
      if (!validation.isValid) {
        invalidEmails.push(`${email}: ${validation.errors.join(', ')}`)
      }
    }

    if (invalidEmails.length > 0) {
      console.warn('Invalid emails found, skipping email sending:', invalidEmails)
      return NextResponse.json({ 
        success: true, 
        warning: 'Registration updated but emails not sent due to invalid email addresses',
        invalidEmails 
      })
    }

    // Send email
    const selectedModule = modules.find(m => m.name === registration.module)
    const teamMembersText = registration.team_members && registration.team_members.length > 1 ? 
      `\n\n<strong>Team Members:</strong>\n${registration.team_members.slice(1).map((member: {name: string, email: string}, idx: number) => `${idx + 1}. ${member.name} (${member.email})`).join('\n')}` : ''
    
    const portalAccessText = registration.module === 'Business Innovation' ? 
      `\n\n<strong>Business Innovation Portal Access:</strong>\nYour unique access code: <strong>${registration.access_code}</strong>\nUse this code along with your email (${registration.email}) to access the Business Innovation portal at: https://techverse2026.com/business-innovation` : ''
    
    const subject = status === 'approved' ? 'Techverse 2026 - Registration Approved' : 'Techverse 2026 - Registration Rejected'
    const html = status === 'approved' ?
      `
        <h1>Registration Approved!</h1>
        <p>Dear ${registration.name},</p>
        <p>Congratulations! Your registration for ${registration.module} has been approved.</p>
        <p><strong>Module Details:</strong></p>
        <ul>
          <li>Team Size: ${selectedModule?.teamSize}</li>
          <li>Entry Fee: PKR ${selectedModule?.fee}</li>
          <li>Contact: ${selectedModule?.contact}</li>
        </ul>${teamMembersText}${portalAccessText}
        <p>Please arrive at the venue on time for the event.</p>
        <p>Best regards,<br>Techverse 2026 Team</p>
      ` :
      `
        <h1>Registration Update</h1>
        <p>Dear ${registration.name},</p>
        <p>We regret to inform you that your registration for ${registration.module} has been rejected.</p>
        <p>If you have any questions, please contact us.</p>
        <p>Best regards,<br>Techverse 2026 Team</p>
      `

    // Send email to all team members
    const emailResults = await Promise.all(emailAddresses.map(async (email) => {
      const success = await sendEmail(email, subject, html)
      return { email, success }
    }))

    const failedEmails = emailResults.filter(result => !result.success).map(result => result.email)
    
    if (failedEmails.length > 0) {
      console.warn('Failed to send emails to:', failedEmails)
      // Continue anyway - don't fail the approval due to email issues
    }

    return NextResponse.json({ 
      success: true, 
      emailsSent: emailResults.filter(r => r.success).length,
      emailsFailed: failedEmails.length 
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Approval failed' }, { status: 500 })
  }
}