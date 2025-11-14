import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    console.log('Delete API called with id:', id)

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Database delete error:', error)
      throw error
    }

    console.log('Database delete successful for id:', id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete failed:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}