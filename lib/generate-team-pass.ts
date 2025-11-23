import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { Buffer } from 'buffer'

type TeamMember = { name: string; email?: string; university?: string; rollNo?: string; cnic?: string }

export async function generateTeamPassPdf({
  teamName,
  moduleName,
  teamMembers,
  uniqueId,
}: {
  teamName: string
  moduleName: string
  teamMembers: TeamMember[]
  uniqueId: string
}): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89]) // A4 in points
  const { width, height } = page.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const margin = 50
  let y = height - margin

  // Header
  page.drawText('Techverse 2026', {
    x: margin,
    y: y,
    size: 18,
    font: titleFont,
    color: rgb(0.1, 0.1, 0.1),
  })
  y -= 28
  page.drawText('Team Pass', { x: margin, y, size: 14, font, color: rgb(0.15, 0.15, 0.15) })
  y -= 24

  // Team details
  page.drawText(`Team Name: ${teamName}`, { x: margin, y, size: 12, font })
  y -= 18
  page.drawText(`Module: ${moduleName}`, { x: margin, y, size: 12, font })
  y -= 18
  page.drawText(`Unique Code: ${uniqueId}`, { x: margin, y, size: 12, font })
  y -= 22

  // Members
  page.drawText('Team Members:', { x: margin, y, size: 11, font: titleFont })
  y -= 16
  teamMembers.forEach((m, i) => {
    const parts = [m.name, m.email || '', m.university || '', m.rollNo || '', m.cnic || '']
      .filter(Boolean)
      .join(' | ')
    page.drawText(`${i + 1}. ${parts}`, { x: margin + 10, y, size: 10, font })
    y -= 14
  })

  y -= 10
  // Footer
  page.drawText(
    'Please present this pass at the event entrance. Each team member must carry a valid ID along with this pass.',
    { x: margin, y, size: 9, font }
  )
  y -= 16
  page.drawText('University of Management and Technology • Techverse 2026', { x: margin, y, size: 8, font })

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}
