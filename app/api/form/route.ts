import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID

    // =========================
    // 📥 DATA (FORM + JSON SAFE)
    // =========================

    let name = ''
    let instagramRaw = ''
    let email = ''

    try {
      const formData = await req.formData()
      name = formData.get('name')?.toString() || ''
      instagramRaw = formData.get('instagram')?.toString() || ''
      email = formData.get('email')?.toString() || ''
    } catch {
      const body = await req.json()
      name = body.name || ''
      instagramRaw = body.instagram || ''
      email = body.email || ''
    }

    // 🔧 clean instagram
    const instagram = instagramRaw
      .replace('https://instagram.com/', '')
      .replace('http://instagram.com/', '')
      .replace('@', '')
      .trim()

    // ❌ sécurité champs
    if (!name || !instagram || !email) {
      return NextResponse.json(
        { status: 'error', message: 'Missing fields' },
        { status: 400 }
      )
    }

    // 🔥 SCORING
    let score = 'LOW'
    if (instagram.includes('model') || instagram.length > 8) {
      score = 'HIGH'
    }

    // 🌍 GEO DETECTION
    const countryCode =
      req.headers.get('x-vercel-ip-country') || 'Unknown'

    const countryMap: any = {
      FR: 'France',
      US: 'United States',
      GB: 'United Kingdom',
      CA: 'Canada',
      AU: 'Australia'
    }

    const country =
      countryCode && countryCode !== 'Unknown'
        ? countryMap[countryCode] || countryCode
        : 'Not detected'

    // 📡 IP
    const ip = req.headers.get('x-forwarded-for') || 'Unknown'

    // =========================
    // 🚀 ENVOI VERS MAKE (SAFE)
    // =========================

    try {
      await fetch("https://hook.eu1.make.com/9dl5ej6usplkz27oggvri5smtits63za", {
        method: "POST",
        body: JSON.stringify({
          name,
          instagram: `https://instagram.com/${instagram}`,
          email,
          priority: score,
          country,
          ip,
          source: "website_form"
        })
      })
    } catch (e) {
      console.log("Make error:", e)
    }

    // =========================
    // 📩 TELEGRAM (SAFE)
    // =========================

    if (TOKEN && CHAT_ID) {
      try {
        const message = `🔥 NEW CREATOR LEAD

👤 Name: ${name}
📸 IG: https://instagram.com/${instagram}
📧 Email: ${email}

⚡ Priority: ${score}
🌍 Country: ${country}
📡 IP: ${ip}`

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
        )

        if (!telegramRes.ok) {
          console.log('Telegram error')
        }

      } catch (err) {
        console.log('Telegram crash:', err)
      }
    }

    // =========================
    // ✅ SUCCESS
    // =========================

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