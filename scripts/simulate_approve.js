#!/usr/bin/env node
/**
 * Simulate Approval Flow
 * 1) Finds a pending registration (or by email provided as first arg)
 * 2) Generates a small Team Pass PDF (in-memory via pdfkit)
 * 3) Uploads it to Supabase storage 'passes' bucket
 * 4) Updates the registration.team_pass_path with the uploaded file name
 * 5) Prints the public URL
 *
 * Usage:
 *   SUPABASE_URL=<your url> SUPABASE_KEY=<service role or anon key> node scripts/simulate_approve.js [email]
 */

const { createClient } = require('@supabase/supabase-js')
const PDFDocument = require('pdfkit')

async function generatePdfBuffer({ teamName, moduleName, members, uniqueId }) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 })
      const buffers = []

      doc.on('data', (chunk) => buffers.push(Buffer.from(chunk)))
      doc.on('end', () => resolve(Buffer.concat(buffers)))

      doc.fontSize(20).text('Techverse 2026', { align: 'center' })
      doc.moveDown(0.5)
      doc.fontSize(14).text('Team Pass', { align: 'center' })
      doc.moveDown(1)

      doc.fontSize(12).text(`Team Name: ${teamName}`)
      doc.text(`Module: ${moduleName}`)
      doc.text(`Unique Code: ${uniqueId}`)
      doc.moveDown(0.5)

      doc.fontSize(11).text('Team Members:', { underline: true })
      doc.moveDown(0.25)
      members.forEach((m, i) => {
        const cnic = m.cnic ? ` | CNIC: ${m.cnic}` : ''
        const uni = m.university ? ` | ${m.university}` : ''
        const roll = m.rollNo ? ` | Roll: ${m.rollNo}` : ''
        doc.text(`${i + 1}. ${m.name} (${m.email || '—'})${uni}${roll}${cnic}`)
      })

      doc.moveDown(1)
      doc.fontSize(10).text('Please present this pass at the event entrance.', { align: 'left' })

      doc.end()
    } catch (err) {
      reject(err)
    }
  })
}

async function main() {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Please set SUPABASE_URL and SUPABASE_KEY (service role recommended) as env vars')
    process.exit(1)
  }

  const client = createClient(SUPABASE_URL, SUPABASE_KEY)
  const emailArg = process.argv[2]

  // Find one pending registration (optionally by email)
  const query = client.from('registrations').select('*').eq('status', 'pending').limit(1)
  const byEmailQuery = client.from('registrations').select('*').eq('email', emailArg).limit(1)

  const { data: rows, error: rowsErr } = emailArg ? await byEmailQuery : await query
  if (rowsErr) {
    console.error('Failed to fetch registration:', rowsErr)
    process.exit(1)
  }

  const registration = (rows || [])[0]
  if (!registration) {
    console.error('No registration found to approve (pending or by email)')
    process.exit(1)
  }

  console.log('Will simulate approve for registration:', registration.email, registration.id)

  const members = Array.isArray(registration.team_members) && registration.team_members.length > 0
    ? registration.team_members
    : [{ name: registration.name, email: registration.email, university: registration.university, rollNo: registration.roll_no, cnic: registration.cnic }]

  const uniqueId = registration.unique_id || registration.access_code || registration.id
  const fileName = `team-pass-${uniqueId}.pdf`

  const pdfBuffer = await generatePdfBuffer({ teamName: registration.team_name || registration.name, moduleName: registration.module, members, uniqueId })
  console.log('Generated PDF Buffer length:', pdfBuffer.length)

  // Upload to Supabase storage bucket 'passes'
  const { data: uploadData, error: uploadErr } = await client.storage.from('passes').upload(fileName, Buffer.from(pdfBuffer), { contentType: 'application/pdf', upsert: true })
  if (uploadErr) {
    console.error('Failed to upload PDF to passes bucket:', uploadErr)
    process.exit(1)
  }

  console.log('Uploaded file:', uploadData)

  // Update registration
  const { error: updateErr } = await client.from('registrations').update({ team_pass_path: fileName, status: 'approved' }).eq('id', registration.id)
  if (updateErr) {
    console.error('Failed to update registration with team_pass_path:', updateErr)
    process.exit(1)
  }
  console.log('Registration updated with team_pass_path:', fileName)

  // Get public URL
  const { data: publicData } = client.storage.from('passes').getPublicUrl(fileName)
  console.log('Public URL:', publicData.publicUrl)

  console.log('Done')
}

main().catch(err => {
  console.error('Script error:', err)
  process.exit(1)
})
