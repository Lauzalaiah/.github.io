import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    console.log("🔥 API CALLED")

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID

    console.log("TOKEN:", TOKEN)
    console.log("CHAT_ID:", CHAT_ID)

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

    console.log("DATA:", { name, instagramRaw, email })

    // 🔧 clean instagram
    const instagram = instagramRaw
      .replace('https://instagram.com/', '')
      .replace('http://instagram.com/', '')
      .replace('@', '')
      .trim()

    // ❌ sécurité champs
    if (!name || !instagram || !email) {
      console.log("❌ Missing fields")
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
      const makeRes = await fetch("https://hook.eu1.make.com/9dl5ej6usplkz27oggvri5smtits63za", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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

      console.log("MAKE STATUS:", makeRes.status)
    } catch (e) {
      console.log("❌ Make error:", e)
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
              text: message
            })
          }
        )

        console.log("TELEGRAM STATUS:", telegramRes.status)

        if (!telegramRes.ok) {
          const errText = await telegramRes.text()
          console.log("❌ TELEGRAM ERROR:", errText)
        }

      } catch (err) {
        console.log('❌ Telegram crash:', err)
      }
    } else {
      console.log("⚠️ TELEGRAM SKIPPED (missing env)")
    }

    // =========================
    // ✅ SUCCESS
    // =========================

    return NextResponse.json({
      status: 'ok',
      debug: {
        token: TOKEN ? 'OK' : 'MISSING',
        chat: CHAT_ID ? 'OK' : 'MISSING'
      }
    })

  } catch (error: any) {
    console.error('❌ API ERROR:', error)

    return NextResponse.json(
      {
        status: 'error',
        message: error?.message || 'server error'
      },
      { status: 500 }
    )
  }
}