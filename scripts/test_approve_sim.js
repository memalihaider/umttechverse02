/*
Simple local script to test team pass PDF generation and filename creation logic.
Run: node scripts/test_approve_sim.js
*/
const { generateTeamPassPdf } = require('../lib/generate-team-pass')

async function run() {
  const registration = {
    id: 'fake-uuid',
    name: 'Local Leader',
    email: 'local@example.com',
    cnic: '35201123456789',
    university: 'Local University',
    roll_no: 'LU-001',
    module: 'AI Hackathon',
    access_code: 'AC12345',
    unique_id: 'TV2025-UNITEST',
    team_name: 'Local Team',
    team_members: [{ name: 'Local Leader', email: 'local@example.com', cnic: '35201123456789' }]
  }

  const uniqueId = registration.unique_id || registration.access_code || registration.id
  const fileName = `team-pass-${uniqueId}.pdf`
  console.log('Would generate file name:', fileName)

  try {
    const buffer = await generateTeamPassPdf({ teamName: registration.team_name || registration.name, moduleName: registration.module, teamMembers: registration.team_members, uniqueId })
    console.log('Generated PDF Buffer length:', buffer.length)
  } catch (err) {
    console.error('Failed to generate PDF:', err)
    process.exitCode = 1
  }
}

run()
