import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, accessCode } = await request.json()

    if (!email || !accessCode) {
      return NextResponse.json({ error: 'Email and access code are required' }, { status: 400 })
    }

    // Query registration by email and access code
    const { data: registration, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('email', email)
      .eq('access_code', accessCode.toUpperCase())
      .eq('module', 'Business Innovation')
      .eq('status', 'approved')
      .single()

    if (error || !registration) {
      return NextResponse.json({
        error: 'Invalid credentials or registration not approved. Please check your email and access code.'
      }, { status: 401 })
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