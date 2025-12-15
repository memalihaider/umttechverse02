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
  team_pass_url?: string
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
      <title>Techverse 2026 - Registration Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #667eea; padding-bottom: 20px; margin-bottom: 30px; }
        .status { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
        .details { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: #667eea; margin: 0;">Techverse 2026</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px;">Registration Confirmation</p>
        </div>

        <p>Dear ${data.name},</p>

        <p>Thank you for registering for Techverse 2026. Your registration has been received and is currently under review.</p>

        <div class="status">
          <strong>Registration Status: Pending Approval</strong>
        </div>

        <div class="details">
          <h3>Registration Details</h3>
          <ul>
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Module:</strong> ${data.module}</li>
            <li><strong>Team Name:</strong> ${data.team_name || data.name}</li>
            <li><strong>Unique ID:</strong> ${data.unique_id}</li>
          </ul>
        </div>

        <p>For any questions, please contact us at <a href="mailto:techverse@umt.edu.pk">techverse@umt.edu.pk</a></p>

        <p>Best regards,<br>
        Techverse 2026 Organizing Committee<br>
        University of Management and Technology</p>
      </div>

      <div class="footer">
        <p>This email was sent to ${data.email}. Please do not reply to this message.</p>
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
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #28a745; padding-bottom: 20px; margin-bottom: 30px; }
        .status { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
        .details { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: #28a745; margin: 0;">Techverse 2026</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px;">Registration Approved</p>
        </div>

        <p>Dear ${data.name},</p>

        <p>Congratulations! Your registration for Techverse 2026 has been approved.</p>

        <div class="status">
          <strong>Registration Status: Approved</strong>
        </div>

        <div class="details">
          <h3>Registration Details</h3>
          <ul>
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Module:</strong> ${data.module}</li>
            <li><strong>Team Name:</strong> ${data.team_name || data.name}</li>
            <li><strong>Unique ID:</strong> ${data.unique_id}</li>
          </ul>
        </div>

        <div class="details">
          <h3>Event Information</h3>
          <ul>
            <li><strong>Event Dates:</strong> January 5-11, 2026</li>
            <li><strong>Venue:</strong> University of Management and Technology (UMT), Lahore</li>
          </ul>
        </div>

        <p>For any questions, please contact us at <a href="mailto:techverse@umt.edu.pk">techverse@umt.edu.pk</a></p>

        <p>We look forward to your participation in Techverse 2026.</p>

        <p>Best regards,<br>
        Techverse 2026 Organizing Committee<br>
        University of Management and Technology</p>
      </div>

      <div class="footer">
        <p>This email was sent to ${data.email}. Please do not reply to this message.</p>
        <p>© 2025 Techverse 2026. All rights reserved.</p>
      </div>
    </body>
    </html>
  `
}
