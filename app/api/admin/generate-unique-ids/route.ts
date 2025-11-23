import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { supabase } from '@/lib/supabase'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

function generateUniqueCertificateId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomPart = ''
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `TV2025-${randomPart}`
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded: any = jwt.verify(token, JWT_SECRET)

    const { data: admin, error: adminError } = await supabase
      .from('admin_credentials')
      .select('id, email, role, is_active')
      .eq('id', decoded.id)
      .eq('is_active', true)
      .single()

    if (adminError || !admin) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Fetch registrations without unique_id
    const { data: regs, error: fetchError } = await supabase
      .from('registrations')
      .select('id')
      .is('unique_id', null)

    if (fetchError) {
      console.error('Error fetching registrations without unique_id:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 })
    }

    const registrations = regs || []
    const updated: Array<{ id: string; unique_id: string }> = []

    for (const r of registrations) {
      let newId = generateUniqueCertificateId()
      // Ensure uniqueness by checking database
      let exists = true
      while (exists) {
        const { data: existing, error: existsErr } = await supabase
          .from('registrations')
          .select('id')
          .eq('unique_id', newId)
          .limit(1)

        if (existsErr) {
          console.error('Error checking unique_id existence:', existsErr)
          break
        }
        exists = (existing || []).length > 0
        if (exists) newId = generateUniqueCertificateId()
      }

      // Update registration with new unique_id
      const { error: updateErr } = await supabase
        .from('registrations')
        .update({ unique_id: newId })
        .eq('id', r.id)

      if (!updateErr) {
        updated.push({ id: r.id, unique_id: newId })
      } else {
        console.error('Failed to update unique_id for registration', r.id, updateErr)
      }
    }

    return NextResponse.json({ success: true, updatedCount: updated.length, results: updated })
  } catch (error) {
    console.error('Error in generate-unique-ids:', error)
    return NextResponse.json({ error: 'Generate unique IDs failed' }, { status: 500 })
  }
}
