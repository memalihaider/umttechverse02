#!/usr/bin/env node
/**
 * Script: add_team_member_cnic.js
 * Purpose: Backfill missing `cnic` key in team_members JSON array for registrations
 * Usage:
 *   DRY RUN (default): node scripts/add_team_member_cnic.js
 *   APPLY: node scripts/add_team_member_cnic.js --apply
 *
 * Environment variables required:
 *   NEXT_PUBLIC_SUPABASE_URL - your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (required for update)
 *
 * Safety: by default this runs in dry-run mode and prints what would be changed.
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

const args = process.argv.slice(2)
const apply = args.includes('--apply')

async function run() {
  console.log('Connecting to Supabase:', SUPABASE_URL)
  const { data, error } = await supabase
    .from('registrations')
    .select('id, team_members')
    .range(0, 9999) // fetch up to 10k rows; adjust if needed

  if (error) {
    console.error('Error fetching registrations:', error)
    process.exit(1)
  }

  const registrations = data || []
  console.log(`Found ${registrations.length} registrations`)
  let modifiedCount = 0
  const toUpdate = []

  for (const r of registrations) {
    const members = r.team_members || []
    if (!Array.isArray(members) || members.length === 0) continue

    let changed = false
    const newMembers = members.map((m) => {
      if (m && typeof m === 'object') {
        if (!Object.prototype.hasOwnProperty.call(m, 'cnic')) {
          changed = true
          return { ...m, cnic: '' }
        }
        return m
      }
      // ensure we always have an object
      changed = true
      return { name: m?.name || '', email: m?.email || '', university: m?.university || '', rollNo: m?.rollNo || '', cnic: '' }
    })

    if (changed) {
      modifiedCount++
      toUpdate.push({ id: r.id, team_members: newMembers })
    }
  }

  console.log(`Registrations requiring update: ${modifiedCount}`)
  if (!apply) {
    console.log('Dry run mode; no changes applied. Rerun with --apply to apply updates.')
    if (modifiedCount > 0) {
      console.log('The following registration IDs will be updated:')
      console.log(toUpdate.map((u) => u.id).join(', '))
    }
    process.exit(0)
  }

  // Actually apply updates in batches
  for (const item of toUpdate) {
    const { id, team_members } = item
    const { error: upError } = await supabase
      .from('registrations')
      .update({ team_members })
      .eq('id', id)

    if (upError) {
      console.error(`Failed to update registration ${id}:`, upError)
    } else {
      console.log(`Updated registration ${id}`)
    }
  }

  console.log('Migration completed')
}

run().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
