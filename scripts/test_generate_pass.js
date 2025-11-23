const fs = require('fs')
const path = require('path')
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
      doc.fontSize(10).text('Please present this pass at the event entrance. Each team member should carry a valid ID along with this pass.', { align: 'left' })
      doc.moveDown(0.5)
      doc.text('This pass is generated automatically. For any queries, contact techverse@umt.edu.pk.', { align: 'left' })

      // Footer
      doc.moveDown(2)
      doc.fontSize(9).text('University of Management and Technology • Techverse 2026', { align: 'center' })

      doc.end()
    } catch (err) {
      reject(err)
    }
  })
}

async function run() {
  const buffer = await generatePdfBuffer({
    teamName: 'Sample Team',
    moduleName: 'AI Hackathon',
    members: [
      { name: 'Leader One', email: 'leader@example.com', university: 'UMT', rollNo: 'CS-001', cnic: '35201123456789' },
      { name: 'Member Two', email: 'member@example.com', university: 'UMT', rollNo: 'CS-002', cnic: '34512345678901' }
    ],
    uniqueId: 'TV2025-TEST'
  })

  fs.writeFileSync(path.join(__dirname, 'sample-team-pass.pdf'), buffer)
  console.log('Generated sample-team-pass.pdf')
}

run().catch(console.error)
