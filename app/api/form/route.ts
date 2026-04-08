import { NextResponse } from 'next/server'

const TOKEN = process.env.8294126339: AAFPg | UiYRd8Z3UQDaUwf
oZEfхcНGWsUHo8!
const CHAT_ID = process.env.1434625657!

export async function POST(req: Request) {
  try {
    if (!TOKEN || !CHAT_ID) {
      console.error('Missing Telegram config')

      return NextResponse.json(
        { status: 'error', message: 'Server misconfiguration' },
        { status: 500 }
      )
    }

    const formData = await req.formData()

    const name = formData.get('name')?.toString() || ''
    const instagram = formData.get('instagram')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const country = formData.get('country')?.toString() || ''

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
🌍 Country: ${country}
📧 Email: ${email}`
        })
      }
    )

    const telegramData = await telegramRes.json()

    console.log('TELEGRAM:', telegramData)

    // ❗ IMPORTANT
    if (!telegramData.ok) {
      console.error('Telegram failed:', telegramData)

      return NextResponse.json(
        {
          status: 'error',
          message: 'Telegram error',
          telegram: telegramData
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'ok'
    })

  } catch (error: any) {
    console.error('API ERROR:', error)

    return NextResponse.json(
      { status: 'error', message: error?.message },
      { status: 500 }
    )
  }
}