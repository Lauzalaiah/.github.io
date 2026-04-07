import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ test: 'ok' })
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const name = formData.get('name')?.toString() || ''
    const instagram = formData.get('instagram')?.toString() || ''
    const email = formData.get('email')?.toString() || ''

    // 🔥 ENVOI TELEGRAM
    await fetch(`https://api.telegram.org/bot 8294126339:AAFXoYDNuCNn9GZxA6rPJ
EqD9Ew2_2o_tbM/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '1434625657',
        text: `🔥 NEW LEAD\n\n👤 Name: ${name}\n📸 IG: ${instagram}\n📧 Email: ${email}`
      })
    })

    return NextResponse.json({
      status: 'ok',
      data: { name, instagram, email }
    })

  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error?.message || 'server error'
      },
      { status: 500 }
    )
  }
}