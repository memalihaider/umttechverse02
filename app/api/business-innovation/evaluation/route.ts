import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const {
      participantId,
      evaluatorEmail,
      evaluatorName,
      phase,
      innovation_score,
      feasibility_score,
      market_potential_score,
      presentation_score,
      technical_score,
      business_model_score,
      total_score,
      comments
    } = await request.json()

    // Validate required fields
    if (!participantId || !evaluatorEmail || !evaluatorName || !phase) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
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

    // Verify participant exists in registrations table and is Business Innovation approved
    const { data: participant, error: participantError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', participantId)
      .maybeSingle()

    if (participantError || !participant) {
      return NextResponse.json(
        { error: 'Participant not found' },
        { status: 404 }
      )
    }

    const statusNormalized = String(participant.status ?? '').trim().toLowerCase()
    if (statusNormalized !== 'approved') {
      return NextResponse.json({ error: 'Participant not approved' }, { status: 403 })
    }

    const moduleMatches = typeof participant.module === 'string' && /business[\s-]*innovation/i.test(participant.module)
    if (!moduleMatches) {
      return NextResponse.json({ error: 'Participant not part of Business Innovation' }, { status: 403 })
    }

    // Insert evaluation
    const { data: evaluation, error: evaluationError } = await supabase
      .from('business_innovation_evaluations')
      .insert({
        participant_id: participantId,
        evaluator_id: evaluator.id,
        evaluator_name: evaluatorName,
        phase: phase,
        innovation_score: innovation_score,
        feasibility_score: feasibility_score,
        market_potential_score: market_potential_score,
        presentation_score: presentation_score,
        technical_score: technical_score,
        business_model_score: business_model_score,
        total_score: total_score,
        comments: comments || '',
        evaluated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (evaluationError) {
      console.error('Evaluation insert error:', evaluationError)
      return NextResponse.json(
        { error: 'Failed to save evaluation' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      evaluation: evaluation
    })

  } catch (error) {
    console.error('Evaluation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const participantId = searchParams.get('participantId')

    if (!participantId) {
      return NextResponse.json(
        { error: 'Participant ID required' },
        { status: 400 }
      )
    }

    // Get evaluations for participant
    const { data: evaluations, error } = await supabase
      .from('business_innovation_evaluations')
      .select('*')
      .eq('participant_id', participantId)
      .order('evaluated_at', { ascending: false })

    if (error) {
      console.error('Fetch evaluations error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch evaluations' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      evaluations: evaluations || []
    })

  } catch (error) {
    console.error('Evaluation GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}