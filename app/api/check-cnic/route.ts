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

    const { data, error } = await supabase
      .from('registrations')
      .select('cnic')
      .eq('cnic', cleanCnic)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      throw error
    }

    const isRegistered = !!data

    return NextResponse.json({
      isRegistered,
      message: isRegistered ? 'This CNIC is already registered' : 'CNIC is available'
    })
  } catch (error) {
    console.error('CNIC check error:', error)
    return NextResponse.json({ error: 'Failed to check CNIC' }, { status: 500 })
  }
}