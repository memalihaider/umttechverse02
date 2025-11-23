export interface RegistrationData {
  name: string
  email: string
  cnic: string
  phone: string
  university: string
  roll_no: string
  module: string
  hostel: string
  ambassador_code?: string
  team_name?: string
  team_members: any[]
  access_code: string
  unique_id: string
  status: 'pending' | 'approved'
}
import { getTeamMembers, normalizeTeamMember, formatCnicDisplay } from '@/lib/team-members'

export function generatePendingRegistrationEmail(data: RegistrationData): string {
  const members = getTeamMembers(data)
  const teamMembersHtml = members && members.length > 0
    ? `
        <div class="highlight">
          <h3>👥 Team Members</h3>
          <ul>
            ${members.map((m: any, index: number) => {
              const member = normalizeTeamMember(m)
              return `<li><strong>Member ${index + 1}:</strong> ${member.name} (${member.email}${member.cnic ? ' | CNIC: ' + member.cnic_formatted : ''})</li>`
            }).join('')}
          </ul>
        </div>
      `
    : ''

  const ambassadorDiscountHtml = data.ambassador_code
    ? `<li><strong>Ambassador Code Applied:</strong> ${data.ambassador_code} (10% discount)</li>`
    : ''

  const hostelInfo = data.hostel === 'one_day'
    ? '1 Day Accommodation (PKR 2,000)'
    : data.hostel === 'three_days'
    ? '3 Days Accommodation (PKR 5,000)'
    : 'Self-arranged accommodation'

  const isBusinessInnovation = (data.module || '').toLowerCase().includes('business innovation')

  const accessCodeHtml = isBusinessInnovation
    ? `
        <div class="access-code">
          <h3>🔐 Your Access Code</h3>
          <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${data.access_code}</div>
          <p style="margin-top: 10px; font-size: 14px;">Keep this code safe! You'll need it to access the Business Innovation portal.</p>
        </div>
      `
    : ''

  const businessInnovationPortalHtml = isBusinessInnovation
    ? `
          <div class="highlight">
            <h3>💼 Business Innovation Portal Access</h3>
            <div class="access-code">
              <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${data.access_code}</div>
              <p style="margin-top: 10px; font-size: 14px;">Use this code along with your email (${data.email}) to access the Business Innovation portal: <a href="https://umttechverse.com/business-innovation">https://umttechverse.com/business-innovation</a></p>
            </div>
          </div>
        `
    : ''

  const nextStepsList = `
            <li><strong>Payment:</strong> Complete your payment using the bank details provided during registration</li>
            <li><strong>Approval:</strong> Your registration will be approved within 24-48 hours after payment verification</li>
            ${isBusinessInnovation ? '<li><strong>Portal Access:</strong> Once approved, use your access code to log into the Business Innovation portal</li>' : ''}
            <li><strong>Stay Updated:</strong> Check your email regularly for approval notifications and event updates</li>
          `

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Techverse 2026 - Registration Confirmed</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { background: #e8f4fd; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .access-code { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; font-family: monospace; font-size: 18px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Registration Confirmed!</h1>
        <p>Techverse 2026 - University of Management and Technology</p>
      </div>

      <div class="content">
        <p>Dear <strong>${data.name}</strong>,</p>

        <p>Congratulations! Your registration for <strong>Techverse 2026</strong> has been successfully submitted and is now under review.</p>

        <div class="highlight">
          <h3>📋 Registration Details</h3>
          <ul>
            <li><strong>Full Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>CNIC:</strong> ${formatCnicDisplay(data.cnic)}</li>
            <li><strong>Phone:</strong> ${data.phone}</li>
            <li><strong>University:</strong> ${data.university}</li>
            <li><strong>Roll Number:</strong> ${data.roll_no}</li>
              <li><strong>Team Name:</strong> ${data.team_name || '—'}</li>
            <li><strong>Module:</strong> ${data.module}</li>
            <li><strong>Accommodation:</strong> ${hostelInfo}</li>
            ${ambassadorDiscountHtml}
          </ul>
        </div>

        ${teamMembersHtml}

        ${accessCodeHtml}

        ${businessInnovationPortalHtml}

        <div class="highlight">
          <h3>📅 Event Details</h3>
          <ul>
            <li><strong>Event Dates:</strong> January 5-11, 2026</li>
            <li><strong>Venue:</strong> University of Management and Technology (UMT), Lahore</li>
            <li><strong>Certificate ID:</strong> ${data.unique_id}</li>
          </ul>
        </div>

        <div class="warning">
          <h3>⚠️ Important Next Steps</h3>
          <ol>
            ${nextStepsList}
          </ol>
        </div>

        <p>If you have any questions or need assistance, please don't hesitate to contact us:</p>
        <ul>
            <li><strong>Email:</strong> techverse@umt.edu.pk</li>
            <li><strong>Website:</strong> <a href="https://umttechverse.com">umttechverse.com</a></li>
          </ul>

        <p>We look forward to seeing you at Techverse 2026!</p>

        <p>Best regards,<br>
        <strong>Techverse 2026 Organizing Committee</strong><br>
        University of Management and Technology</p>
      </div>

      <div class="footer">
        <p>This email was sent to ${data.email} regarding your Techverse 2026 registration.</p>
        <p>© 2025 Techverse 2026. All rights reserved.</p>
      </div>
    </body>
    </html>
  `
}

export function generateApprovedRegistrationEmail(data: RegistrationData): string {
  const members = getTeamMembers(data)
  const teamMembersHtml = members && members.length > 0
    ? `
        <div class="highlight">
          <h3>👥 Your Team Members</h3>
          <ul>
            ${members.map((m: any, index: number) => {
              const member = normalizeTeamMember(m)
              return `<li><strong>Member ${index + 1}:</strong> ${member.name} (${member.email}${member.cnic ? ' | CNIC: ' + member.cnic_formatted : ''})</li>`
            }).join('')}
          </ul>
        </div>
      `
    : ''

  const ambassadorDiscountHtml = data.ambassador_code
    ? `<li><strong>Ambassador Code Applied:</strong> ${data.ambassador_code} (10% discount)</li>`
    : ''

  const hostelInfo = data.hostel === 'one_day'
    ? '1 Day Accommodation (PKR 2,000)'
    : data.hostel === 'three_days'
    ? '3 Days Accommodation (PKR 5,000)'
    : 'Self-arranged accommodation'

  const isBusinessInnovation = (data.module || '').toLowerCase().includes('business innovation')

  const accessCodeHtml = isBusinessInnovation
    ? `
        <div class="access-code">
          <h3>🔐 Your Access Code</h3>
          <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${data.access_code}</div>
          <p style="margin-top: 10px; font-size: 14px;">Use this code to access the Business Innovation portal and all exclusive content.</p>
        </div>
      `
    : ''

  const businessInnovationPortalHtml = isBusinessInnovation
    ? `
          <div class="highlight">
            <h3>💼 Business Innovation Portal Access</h3>
            <div class="access-code">
              <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${data.access_code}</div>
              <p style="margin-top: 10px; font-size: 14px;">Use this code along with your email (${data.email}) to access the Business Innovation portal: <a href="https://umttechverse.com/business-innovation">https://umttechverse.com/business-innovation</a></p>
            </div>
          </div>
        `
    : ''

  const whatsNextList = `
            ${isBusinessInnovation ? '<li><strong>Access Portal:</strong> Visit the Business Innovation portal and log in with your access code</li>' : ''}
            <li><strong>Event Schedule:</strong> Check the complete event schedule and module details</li>
            <li><strong>Team Communication:</strong> Coordinate with your team members to prepare for the event</li>
            <li><strong>Stay Updated:</strong> Receive real-time updates and announcements</li>
          `

  const portalCtaHtml = isBusinessInnovation
    ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://umttechverse.com/business-innovation" class="portal-link">💼 Open Business Innovation Portal</a>
        </div>
      `
    : ''

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Techverse 2026 - Registration Approved</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .access-code { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; font-family: monospace; font-size: 18px; text-align: center; }
        .portal-link { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>✅ Registration Approved!</h1>
        <p>Techverse 2026 - Welcome to the Event!</p>
      </div>

      <div class="content">
        <p>Dear <strong>${data.name}</strong>,</p>

        <div class="success">
          <h3>🎉 Great News!</h3>
          <p>Your registration for <strong>Techverse 2026</strong> has been <strong>approved</strong>! Welcome to the most exciting tech event of the year.</p>
        </div>

        <div class="highlight">
          <h3>📋 Your Registration Details</h3>
          <ul>
            <li><strong>Full Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>CNIC:</strong> ${formatCnicDisplay(data.cnic)}</li>
            <li><strong>Phone:</strong> ${data.phone}</li>
            <li><strong>University:</strong> ${data.university}</li>
            <li><strong>Roll Number:</strong> ${data.roll_no}</li>
            <li><strong>Module:</strong> ${data.module}</li>
            <li><strong>Accommodation:</strong> ${hostelInfo}</li>
            ${ambassadorDiscountHtml}
          </ul>
        </div>

        ${teamMembersHtml}

        ${accessCodeHtml}

        ${businessInnovationPortalHtml}

        <div class="highlight">
          <h3>🚀 What's Next?</h3>
          <ol>
            ${whatsNextList}
          </ol>
        </div>

        <div class="highlight">
          <h3>📅 Event Information</h3>
          <ul>
            <li><strong>Event Dates:</strong> January 5-11, 2026</li>
            <li><strong>Venue:</strong> University of Management and Technology (UMT), Lahore</li>
            <li><strong>Certificate ID:</strong> ${data.unique_id}</li>
            <li><strong>Registration Status:</strong> ✅ Approved</li>
          </ul>
        </div>

        ${portalCtaHtml}

        <p>If you have any questions or need assistance, our support team is here to help:</p>
        <ul>
          <li><strong>Email:</strong> techverse@umt.edu.pk</li>
          <li><strong>Website:</strong> <a href="https://umttechverse.com">umttechverse.com</a></li>
          <li><strong>Portal:</strong> Access through the event website</li>
        </ul>

        <p>Get ready for an amazing experience at Techverse 2026! We can't wait to see your innovation and creativity.</p>

        <p>Best regards,<br>
        <strong>Techverse 2026 Organizing Committee</strong><br>
        University of Management and Technology</p>
      </div>

      <div class="footer">
        <p>This email was sent to ${data.email} regarding your Techverse 2026 registration approval.</p>
        <p>© 2025 Techverse 2026. All rights reserved.</p>
      </div>
    </body>
    </html>
  `
}
