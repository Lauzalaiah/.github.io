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

    // 🔥 SCORING
    let score = 'LOW'

    if (instagram.includes('model') || instagram.length > 8) {
      score = 'HIGH'
    }

    // 🌍 (placeholder)
    const country = 'Unknown'

    const message = `🔥 NEW CREATOR LEAD

👤 Name: ${name}
📸 IG: https://instagram.com/${instagram}
📧 Email: ${email}

⚡ Priority: ${score}
🌍 Country: ${country}`

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          reply_markup: {
            inline_keyboard: [
              [
                { text: '⚡ Respond', callback_data: 'respond' },
                { text: '❌ Ignore', callback_data: 'ignore' }
              ],
              [
                { text: '🕒 Follow up', callback_data: 'follow_up' }
              ]
            ]
          }
        })
      }
    ) // ✅ ICI

    const telegramData = await telegramRes.json()

    console.log('TELEGRAM STATUS:', telegramRes.status)
    console.log('TELEGRAM RESPONSE:', telegramData)

    return NextResponse.json({ status: 'ok' })

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