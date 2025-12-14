import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
// modules import removed: not required in approve route as templates handle module conditional logic
import { quickValidateEmail } from '@/lib/email-validation'
import { generateApprovedRegistrationEmail } from '@/lib/email-templates'
import { getAdditionalTeamMembers, normalizeTeamMember } from '@/lib/team-members'
// NOTE: generateTeamPassPdf imports `pdfkit` which brings in `fontkit`.
// That in turn triggers a Turbopack static analysis error when bundling the app route
// (applyDecoratedDescriptor export mismatch in @swc/helpers). To avoid this, we
// dynamically import the PDF helper only at runtime when needed (on approval).
import type { RegistrationData } from '@/lib/email-templates'

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
    const members = getAdditionalTeamMembers(registration)
    if (members.length > 0) {
      members.forEach((member: any) => {
        const normalized = normalizeTeamMember(member)
        const email = normalized.email || member.email
        if (email && !emailAddresses.includes(email)) {
          emailAddresses.push(email)
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
    
    const subject = status === 'approved' ? 'Techverse 2026 - Registration Approved' : 'Techverse 2026 - Registration Rejected'

  let html: string
  if (status === 'approved') {
      // Prepare registration data for email template
      const registrationData: RegistrationData = {
        name: registration.name,
        email: registration.email,
        cnic: registration.cnic,
        phone: registration.phone,
        university: registration.university,
        roll_no: registration.roll_no,
        module: registration.module,
        hostel: registration.hostel,
        ambassador_code: registration.ambassador_code,
        team_members: registration.team_members,
        access_code: registration.access_code,
        unique_id: registration.unique_id,
        status: 'approved' as const,
        team_name: registration.team_name || undefined,
      }
      // If a pass already exists, construct a public URL so it can be included in the email
      if (registration.team_pass_path) {
        try {
          const { data: publicData } = supabase.storage.from('passes').getPublicUrl(registration.team_pass_path)
          if (publicData && (publicData as any).publicUrl) {
            registrationData.team_pass_url = (publicData as any).publicUrl
          }
        } catch (err) {
          console.warn('Could not construct public URL for existing team pass:', err)
        }
      }

      // Generate team pass PDF and upload to Supabase (only if it doesn't already exist)
      try {
        const membersForPdf = Array.isArray(registration.team_members) && registration.team_members.length > 0
          ? registration.team_members
          : [{ name: registration.name, email: registration.email, university: registration.university, rollNo: registration.roll_no, cnic: registration.cnic }]

        const uniqueId = registration.unique_id || registration.access_code || registration.id

        // Only generate pass if not already present
          if (!registration.team_pass_path) {
          // Dynamically import the PDF helper at runtime to avoid bundling `pdfkit`.
          const { generateTeamPassPdf } = await import('@/lib/generate-team-pass')
          const pdfBuffer = await generateTeamPassPdf({
          teamName: registration.team_name || registration.name,
          moduleName: registration.module,
          teamMembers: membersForPdf,
          uniqueId,
          })

          const fileName = `team-pass-${uniqueId}.pdf`

        // Upload PDF to storage bucket 'passes'
        const { error: uploadError } = await supabase.storage.from('passes').upload(fileName, pdfBuffer as any, { contentType: 'application/pdf' })
          if (uploadError) {
          console.warn('Failed to upload team pass PDF:', uploadError)
        } else {
          // Save pass path in DB and create a public URL
            const passPath = fileName
          await supabase.from('registrations').update({ team_pass_path: passPath }).eq('id', id)
          const { data: publicData } = supabase.storage.from('passes').getPublicUrl(passPath)
          if (publicData && (publicData as any).publicUrl) {
            // Include pass URL in email template
            registrationData.team_pass_url = (publicData as any).publicUrl
          }
          }
        }
      } catch (passErr) {
        console.error('Error generating or uploading team pass PDF:', passErr)
      }

      html = generateApprovedRegistrationEmail(registrationData)
    } else {
      html = `
        <h1>Registration Update</h1>
        <p>Dear ${registration.name},</p>
        <p>We regret to inform you that your registration for ${registration.module} has been rejected.</p>
        <p>If you have any questions, please contact us.</p>
        <p>Best regards,<br>Techverse 2026 Team</p>
      `
    }

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