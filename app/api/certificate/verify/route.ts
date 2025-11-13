import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { name, cnic, uniqueId } = await request.json()

    if (!name || !cnic || !uniqueId) {
      return NextResponse.json(
        { message: 'Name, CNIC, and Unique ID are required' },
        { status: 400 }
      )
    }

    // Verify the certificate details in the database
    const { data: registration, error } = await supabase
      .from('registrations')
      .select('name, cnic, module, unique_id')
      .eq('cnic', cnic)
      .eq('unique_id', uniqueId)
      .single()

    if (error || !registration) {
      return NextResponse.json(
        { message: 'Certificate verification failed. Please check your details and try again.' },
        { status: 404 }
      )
    }

    // Check if name matches (case-insensitive)
    if (registration.name.toLowerCase() !== name.toLowerCase()) {
      return NextResponse.json(
        { message: 'Name does not match the registered details.' },
        { status: 400 }
      )
    }

    // Return certificate data
    return NextResponse.json({
      name: registration.name,
      cnic: registration.cnic,
      uniqueId: registration.unique_id,
      module: registration.module || 'General',
      isVerified: true
    })

  } catch (error) {
    console.error('Certificate verification error:', error)
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}