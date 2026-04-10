import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const update = await req.json()

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN

    if (!TOKEN) {
      throw new Error('Missing TELEGRAM_BOT_TOKEN')
    }

    // 👉 Quand tu cliques sur un bouton
    if (update.callback_query) {
      const data = update.callback_query.data
      const chatId = update.callback_query.message.chat.id

      let text = ''

      if (data === 'respond') {
        text = "Hey! Thanks for applying 👋\nTell me more about your goals"
      }

      if (data === 'follow_up') {
        text = "Just checking — are you still interested?"
      }

      if (data === 'ignore') {
        text = "Lead ignored ❌"
      }

      // ✅ envoyer réponse
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text
        })
      })

      // ⚠️ IMPORTANT → éviter bouton qui freeze
      await fetch(`https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_query_id: update.callback_query.id
        })
      })
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: true }, { status: 500 })
  }
}