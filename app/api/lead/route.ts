import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, instagram, country, email, source, sessionId } = body

    // ✅ validation simple
    if (!name || !instagram || !country || !email) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    // ✅ TELEGRAM
    const message = `
🔥 NEW LEAD

👤 Name: ${name}
📸 IG: ${instagram}
🌍 Country: ${country}
📧 Email: ${email}

📊 Source: ${source}
🆔 Session: ${sessionId}
    `

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    })

    // ✅ TRÈS IMPORTANT
    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("API ERROR:", err)

    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    )
  }
}