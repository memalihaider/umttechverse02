import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
  const { email, accessCode } = await request.json()

    if (!email || !accessCode) {
      return NextResponse.json({ error: 'Email and access code are required' }, { status: 400 })
    }

    // Normalize inputs to avoid case / whitespace mismatches
    const normalizedEmail = String(email).trim().toLowerCase()
    const normalizedAccessCode = String(accessCode).trim().toUpperCase()

    // Query registration by access code and module/status - access_code is unique per registration
    const { data: registration, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('access_code', normalizedAccessCode)
      .ilike('module', '%business innovation%')
      .ilike('status', 'approved')
      .single()

    if (error || !registration) {
      console.error('BI auth lookup failed', { normalizedEmail, error })
      return NextResponse.json({
        error: 'Invalid credentials or registration not approved. Please check your email and access code.'
      }, { status: 401 })
    }

    // Allow login if provided email matches the registration email or any of the team members' emails
    const providedEmailNormalized = normalizedEmail
    const isLeader = String(registration.email).trim().toLowerCase() === providedEmailNormalized
    const teamMembers: any[] = Array.isArray(registration.team_members) ? registration.team_members : []
    const isTeamMember = teamMembers.some((m: any) => m?.email && String(m.email).trim().toLowerCase() === providedEmailNormalized)
    if (!isLeader && !isTeamMember) {
      console.warn('BI auth email not matched on registration or team members', { providedEmailNormalized, registrationId: registration.id })
      return NextResponse.json({ error: 'Invalid credentials or registration not approved. Please check your email and access code.' }, { status: 401 })
    }

    // Return user data (excluding sensitive information)
    return NextResponse.json({
      id: registration.id,
      name: registration.name,
      email: registration.email,
      university: registration.university,
      module: registration.module,
      accessCode: registration.access_code,
      team_members: registration.team_members,
      created_at: registration.created_at
    })
  } catch (error) {
    console.error('Business Innovation auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}