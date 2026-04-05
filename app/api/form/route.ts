import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

async function saveToDB(data: any) {
  const { error } = await supabase.from('leads').insert([data])
  if (error) throw error
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const text =
      (formData.get('name') || '').toString() +
      ' | ' +
      (formData.get('instagram') || '').toString() +
      ' | ' +
      (formData.get('email') || '').toString()
    const { name, email, country, cleanInsta } = body

    const safe = (v: any) => String(v || '').trim()

    const nameSafe = safe(name)
    const emailSafe = safe(email)
    const countrySafe = safe(country)
    const instaSafe = safe(cleanInsta)

    const leadType = 'GOOD' // test simple

    switch (leadType) {

      case 'GOOD': {
        await saveToDB({
          name: nameSafe,
          email: emailSafe,
          instagram: instaSafe,
          country: countrySafe,
          status: 'good'
        })
        break
      }

      default: {
        break
      }
    }

    return NextResponse.json({ status: 'ok' })

  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error?.message },
      { status: 500 }
    )
  }
}