import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const name = formData.get('name')?.toString() || ''
    const instagram = formData.get('instagram')?.toString() || ''
    const email = formData.get('email')?.toString() || ''

    const message = `
🚀 New Lead OFM

👤 Name: ${name}
📸 Instagram: ${instagram}
📧 Email: ${email}
`

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('API ERROR:', error)

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}