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

    // Allow multiple registrations with the same CNIC - always return false
    return NextResponse.json({
      isRegistered: false,
      message: 'CNIC is available'
    })
  } catch (error) {
    console.error('CNIC check error:', error)
    return NextResponse.json({ error: 'Failed to check CNIC' }, { status: 500 })
  }
}