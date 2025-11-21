#!/usr/bin/env node
/**
 * Script: verify_team_member_cnic.js
 * Purpose: Verify how many team member objects are missing a `cnic` key in registrations
 * Usage:
 *   node scripts/verify_team_member_cnic.js
 *
 * Environment variables required:
 *   NEXT_PUBLIC_SUPABASE_URL - your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (for complete read access)
 */

const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
dotenv.config()

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL is not set. Aborting.')
  process.exit(1)
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set. Aborting.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function run() {
  const { data, error } = await supabase
    .from('registrations')
    .select('id, team_members')
    .range(0, 9999)

  if (error) {
    console.error('Error fetching registrations:', error)
    process.exit(1)
  }
  const regs = data || []
  let countMissing = 0
  const missingIds = []
  for (const r of regs) {
    const members = r.team_members || []
    if (Array.isArray(members)) {
      for (const m of members) {
        if (!m || (m && Object.prototype.hasOwnProperty.call(m, 'cnic') === false)) {
          countMissing++
          missingIds.push(r.id)
          break // one missing team member -> count the registration once
        }
      }
    }
  }

  console.log(`Registrations with at least one team_member missing 'cnic': ${countMissing}`)
  if (missingIds.length) console.log('IDs:', missingIds.join(', '))
}

run().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
