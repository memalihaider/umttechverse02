import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, accessCode, businessIdea } = await request.json()

    if (!email || !accessCode || !businessIdea) {
      return NextResponse.json({ error: 'Email, access code, and business idea are required' }, { status: 400 })
    }

    // Verify user authentication
    const { data: user, error: authError } = await supabase
      .from('registrations')
      .select('*')
      .eq('email', email)
      .eq('access_code', accessCode.toUpperCase())
      .eq('module', 'Business Innovation')
      .eq('status', 'approved')
      .single()

    if (authError || !user) {
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

    // Verify user authentication
    const { data: user, error: authError } = await supabase
      .from('registrations')
      .select('business_idea, current_phase')
      .eq('email', email)
      .eq('access_code', accessCode.toUpperCase())
      .eq('module', 'Business Innovation')
      .eq('status', 'approved')
      .single()

    if (authError || !user) {
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