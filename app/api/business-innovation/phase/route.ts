import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, accessCode, newPhase, githubRepo } = await request.json()

    if (!email || !accessCode || !newPhase) {
      return NextResponse.json({ error: 'Email, access code, and new phase are required' }, { status: 400 })
    }

    const validPhases = ['idea_selection', 'design', 'development', 'submission']
    if (!validPhases.includes(newPhase)) {
      return NextResponse.json({ error: 'Invalid phase' }, { status: 400 })
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

    // Validate phase progression
    const phaseOrder = ['idea_selection', 'design', 'development', 'submission']
    const currentPhaseIndex = phaseOrder.indexOf(user.current_phase)
    const newPhaseIndex = phaseOrder.indexOf(newPhase)

    if (newPhaseIndex < currentPhaseIndex) {
      return NextResponse.json({ error: 'Cannot move to a previous phase' }, { status: 400 })
    }

    // If moving to submission phase, require GitHub repo
    if (newPhase === 'submission' && !githubRepo) {
      return NextResponse.json({ error: 'GitHub repository link is required for submission' }, { status: 400 })
    }

    // Update phase and submission details
    const updateData: any = {
      current_phase: newPhase,
      updated_at: new Date().toISOString()
    }

    if (newPhase === 'submission' && githubRepo) {
      updateData.github_repo = githubRepo
      updateData.submission_status = 'submitted'
    }

    const { error: updateError } = await supabase
      .from('registrations')
      .update(updateData)
      .eq('id', user.id)

    if (updateError) {
      console.error('Phase update error:', updateError)
      return NextResponse.json({ error: 'Failed to update phase' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully progressed to ${newPhase.replace('_', ' ')} phase.`,
      newPhase
    })
  } catch (error) {
    console.error('Phase update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { participantId, newPhase, evaluatorEmail } = await request.json()

    if (!participantId || !newPhase || !evaluatorEmail) {
      return NextResponse.json(
        { error: 'Participant ID, new phase, and evaluator email are required' },
        { status: 400 }
      )
    }

    const validPhases = ['idea_selection', 'design', 'development', 'submission']
    if (!validPhases.includes(newPhase)) {
      return NextResponse.json({ error: 'Invalid phase' }, { status: 400 })
    }

    // Verify evaluator has access
    const { data: evaluator, error: evaluatorError } = await supabase
      .from('business_innovation_evaluators')
      .select('*')
      .eq('email', evaluatorEmail)
      .single()

    if (evaluatorError || !evaluator) {
      return NextResponse.json(
        { error: 'Unauthorized evaluator' },
        { status: 403 }
      )
    }

    // Get participant data
    const { data: participant, error: participantError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', participantId)
      .eq('module', 'Business Innovation')
      .eq('status', 'approved')
      .single()

    if (participantError || !participant) {
      return NextResponse.json(
        { error: 'Participant not found' },
        { status: 404 }
      )
    }

    // Validate phase progression
    const phaseOrder = ['idea_selection', 'design', 'development', 'submission']
    const currentPhaseIndex = phaseOrder.indexOf(participant.current_phase)
    const newPhaseIndex = phaseOrder.indexOf(newPhase)

    if (newPhaseIndex < currentPhaseIndex) {
      return NextResponse.json(
        { error: 'Cannot move to a previous phase' },
        { status: 400 }
      )
    }

    // Update phase
    const { error: updateError } = await supabase
      .from('registrations')
      .update({
        current_phase: newPhase,
        updated_at: new Date().toISOString()
      })
      .eq('id', participantId)

    if (updateError) {
      console.error('Phase update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update phase' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Successfully progressed participant to ${newPhase.replace('_', ' ')} phase.`,
      newPhase
    })

  } catch (error) {
    console.error('Phase PATCH error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
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
      .select('current_phase, submission_status, github_repo')
      .eq('email', email)
      .eq('access_code', accessCode.toUpperCase())
      .eq('module', 'Business Innovation')
      .eq('status', 'approved')
      .single()

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    return NextResponse.json({
      currentPhase: user.current_phase,
      submissionStatus: user.submission_status,
      githubRepo: user.github_repo
    })
  } catch (error) {
    console.error('Phase fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}