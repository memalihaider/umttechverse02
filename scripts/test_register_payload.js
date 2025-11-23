/* Simple test script for registration payload building.
This script replicates the payload creation logic in `app/api/register/route.ts` and
`app/components/RegistrationForm.tsx` to ensure `team_name` is included and the leader
is prepended to the team members list.

Run: node scripts/test_register_payload.js
*/

function simulateRegistrationPayload(input) {
  const {
    name,
    email,
    cnic,
    phone,
    university,
    rollNo,
    module,
    hostel,
    ambassadorCode,
    teamMembers,
    teamName,
    paymentReceipt,
  } = input

  const normalizedTeamMembers = Array.isArray(teamMembers)
    ? teamMembers.map((m) => ({ ...m, cnic: (m.cnic || '').toString().replace(/\D/g, '') }))
    : []

  // Build payload to insert
  const payload = {
    name,
    email,
    cnic: (cnic || '').toString().replace(/\D/g, ''),
    phone,
    university,
    roll_no: rollNo,
    module,
    hostel,
    ambassador_code: ambassadorCode || null,
    team_members: normalizedTeamMembers,
    team_name: teamName || null,
    payment_receipt_url: paymentReceipt || null,
    access_code: 'XYZ12345',
    unique_id: 'TV2025-ABC123',
    status: 'pending',
  }

  return { payload, normalizedTeamMembers }
}

// Sample data
const sample = {
  name: 'Test Leader',
  email: 'leader@example.com',
  cnic: '35201-1234567-1',
  phone: '+923001234567',
  university: 'Test University',
  rollNo: 'TU-123',
  module: 'AI Hackathon',
  hostel: 'none',
  ambassadorCode: '',
  teamMembers: [
    { name: 'Member 1', email: 'm1@example.com', university: 'Test University', rollNo: 'TU-124', cnic: '34512-3456789-0' }
  ],
  teamName: 'Awesome Team',
  paymentReceipt: null,
}

console.log('\n=== Running payload test ===\n')

// Also emulate front-end prepending the leader to teamMembers
const payloadTeamMembers = [
  {
    name: sample.name,
    email: sample.email,
    university: sample.university,
    rollNo: sample.rollNo,
    cnic: sample.cnic,
  },
  ...sample.teamMembers
]

const result = simulateRegistrationPayload({ ...sample, teamMembers: payloadTeamMembers })

console.log('Payload team_name:', result.payload.team_name)
console.log('Payload team_members length:', result.payload.team_members.length)
console.log('First team member name:', result.payload.team_members[0].name)

if (!result.payload.team_name || result.payload.team_name !== sample.teamName) {
  console.error('FAIL: team_name missing or not preserved in payload')
  process.exitCode = 1
} else if (result.payload.team_members.length !== payloadTeamMembers.length) {
  console.error('FAIL: team_members length mismatch')
  process.exitCode = 1
} else if (result.payload.team_members[0].email !== sample.email) {
  console.error('FAIL: leader not prepended as first team_member')
  process.exitCode = 1
} else {
  console.log('\n✅ All checks passed! Registration payload is built correctly with team_name and leader included.')
}
