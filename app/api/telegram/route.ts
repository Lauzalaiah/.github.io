import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const update = await req.json()

    console.log('UPDATE:', JSON.stringify(update))

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN

    if (!TOKEN) {
      throw new Error('Missing TELEGRAM_BOT_TOKEN')
    }

    // =========================
    // ✅ COMMANDES (/start)
    // =========================
    if (update.message?.text === '/start') {
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: update.message.chat.id,
          text: "Bot ready 🚀"
        })
      })
    }

    // =========================
    // ✅ BOUTONS
    // =========================
    if (update.callback_query) {
      const data = update.callback_query.data
      const chatId = update.callback_query.message.chat.id
      const callbackId = update.callback_query.id

      let text = ''

      // 🔥 RESPOND AMÉLIORÉ
      if (data === 'respond') {

        const messageText = update.callback_query.message.text

        // prénom
        const name = messageText
          ?.match(/Name: (.*)/)?.[1]
          ?.split(' ')[0]

        // IG
        const ig = messageText?.match(/IG: (.*)/)?.[1]

        // 💥 PRIORITY HIGH → message spécial
        if (messageText?.includes('Priority: HIGH')) {
          text = `Hey ${name || ''}! 🔥\nWe’d love to fast-track you.\nTell me your goals`
        } else {
          // 💥 message normal avec IG
          text = `Hey ${name || ''}! 👋\nI saw your IG: ${ig}\nTell me more about your goals`
        }
      }

      if (data === 'follow_up') {
        text = "Just checking — are you still interested?"
      }

      if (data === 'ignore') {
        text = "Lead ignored ❌"
      }

      // =========================
      // ✅ ENVOI MESSAGE
      // =========================
      if (text) {
        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text
          })
        })
      }

      // 🔥 OBLIGATOIRE
      await fetch(`https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_query_id: callbackId
        })
      })
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('WEBHOOK ERROR:', error)
    return NextResponse.json({ error: true }, { status: 500 })
  }
}

// =========================
// ✅ TEST
// =========================
export async function GET() {
  return new Response('Telegram webhook is alive')
}