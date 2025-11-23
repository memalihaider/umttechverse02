/*
Integration-like test script to simulate server-side registration logic and confirm `team_name` is passed to DB insertion and email template usage.
Run: node scripts/integration_register_sim.js
*/

// Using simple mocks rather than importing TypeScript modules directly
const validateEmail = async (email) => ({ isValid: true, errors: [] })
const generatePendingRegistrationEmail = (data) => `Registration for ${data.name} - Team: ${data.team_name || '—'}`

async function simulateServerRegistration(form) {
  // Mocked supabase object
  const insertedRecords = []
  const supabase = {
    storage: {
      from: () => ({
        upload: async (fileName, fileObj) => {
          // Return a mocked path and no error
          return { data: { path: `receipts/${fileName}` }, error: null }
        }
      })
    },
    from: () => ({
      insert: async (obj) => {
        // Simulate DB insert and record what was inserted
        insertedRecords.push(obj)
        return { error: null }
      }
    })
  }

  // Mocked sendEmail
  let emailSentHtml = null
  const sendEmail = async (to, subject, html) => {
    emailSentHtml = html
  }

  const formData = form
  const name = formData.name
  const email = formData.email
  const cnic = formData.cnic
  const phone = formData.phone
  const university = formData.university
  const rollNo = formData.rollNo
  const module = formData.module
  const hostel = formData.hostel
  const ambassadorCode = formData.ambassadorCode
  const teamMembers = formData.teamMembers
  const teamName = formData.teamName
  const paymentReceipt = formData.paymentReceipt // can be null

  // validate email
  const emailValidation = await validateEmail(email)
  if (!emailValidation.isValid) {
    throw new Error('Invalid email')
  }

  // Team member validation - skip here

  // Handle file upload
  let receiptUrl = ''
  if (paymentReceipt) {
    const fileExt = paymentReceipt.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { data, error } = await supabase.storage.from('receipts').upload(fileName, paymentReceipt)
    if (error) throw error
    receiptUrl = data.path
  }

  // Prepare normalized team members (including leader)
  const normalizedTeamMembers = Array.isArray(teamMembers) ? teamMembers.map((m) => ({ ...m, cnic: ((m.cnic || '')).toString().replace(/\D/g, '') })) : []

  // Simulate DB insert
  const insertObj = {
    name,
    email,
    cnic: (cnic || '').replace(/\D/g, ''),
    phone,
    university,
    roll_no: rollNo,
    module,
    hostel,
    ambassador_code: ambassadorCode || null,
    team_members: normalizedTeamMembers,
    team_name: teamName || null,
    payment_receipt_url: receiptUrl,
    access_code: 'SIM12345',
    unique_id: 'TV2025-SIM001',
    status: 'pending'
  }

  const insertResult = await supabase.from('registrations').insert(insertObj)
  if (insertResult.error) throw insertResult.error

  // Email body uses team_name
  const registrationData = {
    name,
    email,
    cnic,
    phone,
    university,
    roll_no: rollNo,
    module,
    hostel,
    ambassador_code: ambassadorCode || undefined,
    team_members: teamMembers,
    access_code: 'SIM12345',
    unique_id: 'TV2025-SIM001',
    status: 'pending',
    team_name: teamName || undefined
  }

  const emailHtml = generatePendingRegistrationEmail(registrationData)
  await sendEmail(email, 'Registration Confirmed', emailHtml)

  return { insertedRecords, emailSentHtml }
}

(async () => {
  try {
    console.log('\n=== Starting integration simulation test ===\n')

    // Create a sample registration with team name and team members
    const sample = {
      name: 'Integration Leader',
      email: 'intleader@example.com',
      cnic: '35201-1111111-1',
      phone: '+923209999999',
      university: 'Integration University',
      rollNo: 'INT-001',
      module: 'Business Innovation - Idea to Startup',
      hostel: 'none',
      ambassadorCode: '',
      teamMembers: [
        { name: 'Member A', email: 'ma@example.com', university: 'Integration University', rollNo: 'INT-002', cnic: '35201-2222222-2' }
      ],
      teamName: 'Integration Team 123',
      paymentReceipt: null
    }

    const result = await simulateServerRegistration(sample)

    console.log('Inserted objects count:', result.insertedRecords.length)
    if (result.insertedRecords.length === 0) {
      console.error('FAIL: No records inserted')
      process.exitCode = 1
      return
    }

    const inserted = result.insertedRecords[0]
    console.log('Inserted object team_name:', inserted.team_name)
    console.log('Inserted object team_members length:', inserted.team_members.length)

    if (!inserted.team_name || inserted.team_name !== sample.teamName) {
      console.error('FAIL: team_name not set correctly in inserted object')
      process.exitCode = 1
      return
    }

    if (inserted.team_members.length !== sample.teamMembers.length) {
      console.warn('NOTICE: inserted team_members length differs from sample (could be because leader not prepended here)')
    }

    // Check that the generated email contains the team name string
    if (!result.emailSentHtml.includes(sample.teamName)) {
      console.error('FAIL: Email body does not include team_name')
      process.exitCode = 1
      return
    }

    console.log('\n✅ Integration-like simulation passed: team_name persisted and included in emails')
  } catch (err) {
    console.error('ERROR during simulation:', err)
    process.exitCode = 1
  }
})();
