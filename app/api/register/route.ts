import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { modules } from '@/lib/modules'
import { validateEmail } from '@/lib/email-validation'

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

    // Validate email
    const emailValidation = await validateEmail(email)
    if (!emailValidation.isValid) {
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

    // Validate team member emails if provided
    for (const member of teamMembers) {
      if (member.email && member.email !== email) { // Skip validation for main registrant
        const memberEmailValidation = await validateEmail(member.email)
        if (!memberEmailValidation.isValid) {
          return NextResponse.json({
            error: `Invalid email for team member: ${member.name}`,
            details: memberEmailValidation.errors
          }, { status: 400 })
        }
      }
    }

    let receiptUrl = ''
    if (paymentReceipt) {
      const fileExt = paymentReceipt.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('receipts')
        .upload(fileName, paymentReceipt)
      if (error) throw error
      receiptUrl = data.path
    }

    // Generate access code and unique certificate ID
    const accessCode = generateAccessCode()
    const uniqueCertificateId = generateUniqueCertificateId()

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

    if (error) throw error

    // Send booking email
    const selectedModule = modules.find(m => m.name === module)
    const teamMembersText = teamMembers.length > 1 ? 
      `\n\n<strong>Team Members:</strong>\n${teamMembers.slice(1).map((member: {name: string, email: string, university: string, rollNo: string}, idx: number) => `${idx + 1}. ${member.name} (${member.email}) - ${member.university} (${member.rollNo})`).join('\n')}` : ''
    
    const hostelFee = hostel === 'one_day' ? 2000 : hostel === 'three_days' ? 5000 : 0
    const originalModuleFee = selectedModule?.fee || 0
    const isValidAmbassadorCode = ambassadorCode && ['TECHVERSE2025', 'UMTAMBASSADOR', 'TECHVERSE10', 'UMTSTUDENT', 'TECHVERSEVIP', 'UMT2025', 'TECHVERSEPRO', 'UMTAMB10', 'TECHVERSEPLUS', 'UMTTECH'].includes(ambassadorCode.toUpperCase())
    const discountedModuleFee = isValidAmbassadorCode ? Math.floor(originalModuleFee * 0.9) : originalModuleFee
    const discountAmount = isValidAmbassadorCode ? originalModuleFee - discountedModuleFee : 0
    const totalAmount = discountedModuleFee + hostelFee
    
    const hostelText = hostel !== 'none' ? 
      `\n\n<strong>Accommodation:</strong>\n${hostel === 'one_day' ? 'Hostel for 1 day - PKR 2,000' : 'Hostel for 3 days - PKR 5,000'}\nPayment for accommodation will be collected separately at the venue.` : 
      '\n\n<strong>Accommodation:</strong>\nSelf-arranged accommodation'
    
    const paymentText = `\n\n<strong>Payment Details:</strong>\n${isValidAmbassadorCode ? `Original Module Fee: PKR ${originalModuleFee.toLocaleString()}\nDiscounted Module Fee: PKR ${discountedModuleFee.toLocaleString()} (10% ambassador discount applied)` : `Module Fee: PKR ${discountedModuleFee.toLocaleString()}`}${hostel !== 'none' ? `\nHostel Fee: PKR ${hostelFee.toLocaleString()}` : ''}${discountAmount > 0 ? `\nDiscount Amount: -PKR ${discountAmount.toLocaleString()}` : ''}\n<strong>Total Amount: PKR ${totalAmount.toLocaleString()}</strong>`
    
    const portalAccessText = module === 'Business Innovation' ? 
      `\n\n<strong>Business Innovation Portal Access:</strong>\nYour unique access code: <strong>${accessCode}</strong>\nUse this code along with your email (${email}) to access the Business Innovation portal.` : ''
    
    const certificateText = `\n\n<strong>Certificate Information:</strong>\nYour unique certificate ID: <strong>${uniqueCertificateId}</strong>\nKeep this ID safe! You will need it along with your CNIC to generate your participation certificate after the event.`
    
    // Send booking email (temporarily disabled for testing)
    // const bookingEmailHtml = `
    //   <h1>Module Booked Successfully</h1>
    //   <p>Dear ${name},</p>
    //   <p>Your registration for ${module} has been received and is pending approval.</p>
    //   <p><strong>Personal Details:</strong></p>
    //   <ul>
    //     <li>Name: ${name}</li>
    //     <li>Email: ${email}</li>
    //     <li>University: ${university}</li>
    //     <li>Roll Number: ${rollNo}</li>
    //     <li>CNIC: ${cnic}</li>
    //     <li>Phone: ${phone}</li>
    //   </ul>
    //   <p><strong>Module Details:</strong></p>
    //   <ul>
    //     <li>Module: ${module}</li>
    //     <li>Team Size: ${selectedModule?.teamSize}</li>
    //     <li>Entry Fee: ${isValidAmbassadorCode ? `PKR ${originalModuleFee.toLocaleString()} (discounted to PKR ${discountedModuleFee.toLocaleString()})` : `PKR ${discountedModuleFee.toLocaleString()}`}</li>
    //     <li>Contact: ${selectedModule?.contact}</li>
    //     ${ambassadorCode ? `<li>Ambassador Code: ${ambassadorCode} ${isValidAmbassadorCode ? '(Valid - 10% discount applied)' : '(Invalid - no discount applied)'}</li>` : ''}
    //   </ul>${teamMembersText}${hostelText}${paymentText}${portalAccessText}${certificateText}
    //   <p>You will receive another email once your registration is approved.</p>
    //   <p>Best regards,<br>Techverse 2026 Team</p>
    // `
    // await sendEmail(email, 'Techverse 2026 - Module Booked', bookingEmailHtml)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}