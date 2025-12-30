import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const moduleName = searchParams.get('module')

    if (!moduleName) {
      return NextResponse.json(
        { error: 'Module name is required' },
        { status: 400 }
      )
    }

    // Get count of registrations for the specified module
    const { count, error } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .eq('module', moduleName)
      .eq('status', 'approved')

    if (error) {
      console.error('Error fetching registration count:', error)
      return NextResponse.json(
        { error: 'Failed to fetch registration count' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      module: moduleName,
      count: count || 0,
      isLimitReached: (count || 0) >= 15
    })
  } catch (error) {
    console.error('Error in module registration count endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
