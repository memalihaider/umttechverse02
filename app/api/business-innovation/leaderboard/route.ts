import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const accessCode = searchParams.get('accessCode')

    // Verify user authentication (optional for leaderboard viewing)
    if (email && accessCode) {
      const normalizedEmail = String(email).trim().toLowerCase()
      const normalizedAccessCode = String(accessCode).trim().toUpperCase()
      const { data, error: authError } = await supabase
        .from('registrations')
        .select('id, email, team_members')
        .eq('access_code', normalizedAccessCode)
        .ilike('module', '%business innovation%')
        .ilike('status', 'approved')
        .single()

      const user = data
      if (authError || !user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const isLeader = String(user.email).trim().toLowerCase() === normalizedEmail
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
    }

    // Get leaderboard data
    const { data: leaderboard, error: leaderboardError } = await supabase
      .from('business_innovation_leaderboard')
      .select('*')
      .order('average_score', { ascending: false })
      .order('evaluation_count', { ascending: false })
      .limit(50)

    if (leaderboardError) {
      console.error('Leaderboard fetch error:', leaderboardError)
      return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
    }

    // Get detailed evaluations for each participant
    const leaderboardWithDetails = await Promise.all(
      leaderboard.map(async (entry) => {
        const { data: evaluations, error: evalError } = await supabase
          .from('business_innovation_evaluations')
          .select(`
            phase,
            evaluator_name,
            innovation_score,
            feasibility_score,
            market_potential_score,
            presentation_score,
            technical_score,
            business_model_score,
            total_score,
            comments,
            evaluated_at
          `)
          .eq('registration_id', entry.id)
          .order('evaluated_at', { ascending: false })

        return {
          ...entry,
          evaluations: evalError ? [] : evaluations,
          rank: leaderboard.findIndex(item => item.id === entry.id) + 1
        }
      })
    )

    return NextResponse.json({
      leaderboard: leaderboardWithDetails,
      totalParticipants: leaderboard.length
    })
  } catch (error) {
    console.error('Leaderboard error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}