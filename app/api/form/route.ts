import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!TOKEN || !CHAT_ID) {
      throw new Error('Missing env variables')
    }

    const formData = await req.formData()

    const name = formData.get('name')?.toString() || ''
    const instagram = formData.get('instagram')?.toString() || ''
    const email = formData.get('email')?.toString() || ''

    const message = `🔥 NEW LEAD

👤 Name: ${name}
📸 IG: ${instagram}
📧 Email: ${email}`

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      }
    )

    const telegramData = await telegramRes.json()

    console.log("TELEGRAM STATUS:", telegramRes.status)
    console.log("TELEGRAM RESPONSE:", telegramData)

    return NextResponse.json({ status: 'ok' })

  } catch (error: any) {
    console.error('API ERROR:', error)

    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    )
  }
}