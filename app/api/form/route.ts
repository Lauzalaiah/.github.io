import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// 🔐 config (remplace plus tard par env si tu veux clean)
const TOKEN = '8294126339:AAFXoYDNuCNn9GZxA6rPJEqD9Ew2_2o_tbM'
const CHAT_ID = '1434625657'

export async function GET() {
  return NextResponse.json({ test: 'ok' })
}

export async function POST(req: Request) {
  try {
    // 🛑 sécurité config
    if (!TOKEN || !CHAT_ID) {
      console.error('Missing Telegram config')

      return NextResponse.json(
        {
          status: 'error',
          message: 'Server misconfiguration'
        },
        { status: 500 }
      )
    }

    const formData = await req.formData()

    const name = formData.get('name')?.toString() || ''
    const instagram = formData.get('instagram')?.toString() || ''
    const email = formData.get('email')?.toString() || ''

    // 🔥 ENVOI TELEGRAM + DEBUG
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `🔥 NEW LEAD

👤 Name: ${name}
📸 IG: ${instagram}
📧 Email: ${email}`
        })
      }
    )

    const telegramData = await telegramRes.json()

    console.log('TELEGRAM:', telegramData)

    return NextResponse.json({
      status: 'ok',
      data: { name, instagram, email }
    })

  } catch (error: any) {
    console.error('API ERROR:', error)

    return NextResponse.json(
      {
        status: 'error',
        message: error?.message || 'server error'
      },
      { status: 500 }
    )
  }
}