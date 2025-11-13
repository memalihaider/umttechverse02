import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { count, error } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })

    if (error) throw error

    return NextResponse.json({ success: true, count })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ error: 'Database connection failed', details: error }, { status: 500 })
  }
}