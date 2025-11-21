import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { cnic } = await request.json()

    if (!cnic) {
      return NextResponse.json({ error: 'CNIC is required' }, { status: 400 })
    }

    // Clean the CNIC (remove dashes and spaces)
    const cleanCnic = cnic.replace(/[-\s]/g, '')

    // Check if CNIC exists either as main registrant CNIC or in team_members[*].cnic
    const teamMembersQuery = JSON.stringify([{ cnic: cleanCnic }])
    const { data, error } = await supabase
      .from('registrations')
      .select('cnic')
      .or(`cnic.eq.${cleanCnic},team_members.cs.${teamMembersQuery}`)
      .limit(1)

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      throw error
    }

  // `data` is an array when using PostgREST. If empty array, it is truthy, so check length instead.
  const isRegistered = Array.isArray(data) ? data.length > 0 : !!data

    return NextResponse.json({
      isRegistered,
      message: isRegistered ? 'This CNIC is already registered' : 'CNIC is available'
    })
  } catch (error) {
    console.error('CNIC check error:', error)
    return NextResponse.json({ error: 'Failed to check CNIC' }, { status: 500 })
  }
}