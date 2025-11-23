import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type Registration = {
  id?: string
  email?: string
  team_members?: Array<{ email?: string } | string>
  business_idea?: unknown
  current_phase?: string
  status?: string
  module?: string
}

export async function POST(request: NextRequest) {
  try {
    const { email, accessCode, businessIdea } = await request.json()

    if (!email || !accessCode || !businessIdea) {
      return NextResponse.json({ error: 'Email, access code, and business idea are required' }, { status: 400 })
    }
    // Normalize inputs and verify user authentication by access code (allow team members)
    const normalizedEmail = String(email).trim().toLowerCase()
    const normalizedAccessCode = String(accessCode).trim().toUpperCase()

    // registration shape already defined above; reuse Registration type

    const { data, error: authError } = await supabase
      .from('registrations')
      .select('*')
      .eq('access_code', normalizedAccessCode)
      .maybeSingle()

    const user = data as Registration | null
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const statusNormalized = String(user.status ?? '').trim().toLowerCase()
    if (statusNormalized !== 'approved') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const moduleMatches = typeof user.module === 'string' && /business[\s-]*innovation/i.test(user.module)
    if (!moduleMatches) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Allow team members to submit by checking if provided email matches registration leader or any team member
    const isLeader = String(user.email || '').trim().toLowerCase() === normalizedEmail
  const teamMembers: Array<{ email?: string } | string> = Array.isArray(user.team_members) ? user.team_members : []
  const isTeamMember = teamMembers.some((m: { email?: string } | string) => {
      if (!m) return false
      if (typeof m === 'string') return m.trim().toLowerCase() === normalizedEmail
      if (typeof m === 'object' && m.email) return String(m.email).trim().toLowerCase() === normalizedEmail
      return false
    })
    if (!isLeader && !isTeamMember) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Update business idea and phase
    const { error: updateError } = await supabase
      .from('registrations')
      .update({
        business_idea: businessIdea,
        current_phase: 'design',
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: 'Failed to submit business idea' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Business idea submitted successfully. You have progressed to the Design phase.'
    })
  } catch (error) {
    console.error('Business idea submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const accessCode = searchParams.get('accessCode')

    if (!email || !accessCode) {
      return NextResponse.json({ error: 'Email and access code are required' }, { status: 400 })
    }

    // Normalize inputs and verify user authentication by access code (allow team members)
    const normalizedEmail = String(email).trim().toLowerCase()
    const normalizedAccessCode = String(accessCode).trim().toUpperCase()

      const { data, error: authError } = await supabase
          .from('registrations')
          .select('business_idea, current_phase, email, team_members, team_name, status, module')
      .eq('access_code', normalizedAccessCode)
      .maybeSingle()

    const user = data as Registration | null
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const statusNormalized = String(user.status ?? '').trim().toLowerCase()
    if (statusNormalized !== 'approved') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const moduleMatches = typeof user.module === 'string' && /business[\s-]*innovation/i.test(user.module)
    if (!moduleMatches) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isLeader = String(user.email || '').trim().toLowerCase() === normalizedEmail
  const teamMembers: Array<{ email?: string } | string> = Array.isArray(user.team_members) ? user.team_members : []
  const isTeamMember = teamMembers.some((m: { email?: string } | string) => {
      if (!m) return false
      if (typeof m === 'string') return m.trim().toLowerCase() === normalizedEmail
      if (typeof m === 'object' && m.email) return String(m.email).trim().toLowerCase() === normalizedEmail
      return false
    })
    if (!isLeader && !isTeamMember) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    return NextResponse.json({
      businessIdea: user.business_idea,
      currentPhase: user.current_phase
    })
  } catch (error) {
    console.error('Business idea fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}