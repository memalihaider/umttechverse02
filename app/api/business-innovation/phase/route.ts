import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
  const { email, accessCode, newPhase, githubRepo, submissionMetadata } = await request.json()

    if (!email || !accessCode || !newPhase) {
      return NextResponse.json({ error: 'Email, access code, and new phase are required' }, { status: 400 })
    }

    const validPhases = ['idea_selection', 'design', 'development', 'submission']
    if (!validPhases.includes(newPhase)) {
      return NextResponse.json({ error: 'Invalid phase' }, { status: 400 })
    }

    // Normalize and verify by access code (allow team members)
    const normalizedEmail = String(email).trim().toLowerCase()
    const normalizedAccessCode = String(accessCode).trim().toUpperCase()

    const { data, error: authError } = await supabase
      .from('registrations')
      .select('*')
      .eq('access_code', normalizedAccessCode)
      .maybeSingle()

    const user = data
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
    const teamMembers: any[] = Array.isArray(user.team_members) ? user.team_members : []
    const isTeamMember = teamMembers.some((m: any) => {
      if (!m) return false
      if (typeof m === 'string') return m.trim().toLowerCase() === normalizedEmail
      if (typeof m === 'object' && m.email) return String(m.email).trim().toLowerCase() === normalizedEmail
      return false
    })
    if (!isLeader && !isTeamMember) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Validate phase progression - allow jumping from design to submission
    const phaseOrder = ['idea_selection', 'design', 'development', 'submission']
    const currentPhaseIndex = phaseOrder.indexOf(user.current_phase || 'idea_selection')
    const newPhaseIndex = phaseOrder.indexOf(newPhase)

    // Allow progression to later phases, but not backwards (except allow design->submission)
    if (newPhaseIndex < currentPhaseIndex && !(user.current_phase === 'design' && newPhase === 'submission')) {
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

      // Accept optional final submission metadata (submissionMetadata) and add it under business_idea.final_submission
      if (submissionMetadata && typeof submissionMetadata === 'object') {
        const existingIdea = user.business_idea || {}
        updateData.business_idea = { ...existingIdea, final_submission: submissionMetadata }
      }
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

    // Normalize and verify by access code (allow team members)
    const normalizedEmail = String(email).trim().toLowerCase()
    const normalizedAccessCode = String(accessCode).trim().toUpperCase()

    const { data, error: authError } = await supabase
      .from('registrations')
      .select('id, current_phase, submission_status, github_repo, business_idea, email, team_members, team_name, status, module')
      .eq('access_code', normalizedAccessCode)
      .maybeSingle()

    const user = data
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
    const teamMembers: any[] = Array.isArray(user.team_members) ? user.team_members : []
    const isTeamMember = teamMembers.some((m: any) => {
      if (!m) return false
      if (typeof m === 'string') return m.trim().toLowerCase() === normalizedEmail
      if (typeof m === 'object' && m.email) return String(m.email).trim().toLowerCase() === normalizedEmail
      return false
    })
    if (!isLeader && !isTeamMember) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    return NextResponse.json({
      currentPhase: user.current_phase,
      submissionStatus: user.submission_status,
      githubRepo: user.github_repo,
      finalSubmission: user.business_idea?.final_submission || null
    })
  } catch (error) {
    console.error('Phase fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}