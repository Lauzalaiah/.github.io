import { NextResponse } from 'next/server'

// ✅ TEST ROUTE (très important)
export async function GET() {
  return new Response('Telegram webhook is alive')
}

export async function POST(req: Request) {
  try {
    const update = await req.json()

    console.log('UPDATE:', JSON.stringify(update))

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN

    if (!TOKEN) {
      throw new Error('Missing TELEGRAM_BOT_TOKEN')
    }

    if (update.callback_query) {
      const data = update.callback_query.data
      const chatId = update.callback_query.message.chat.id
      const callbackId = update.callback_query.id

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

      // 🔥 obligatoire pour les boutons
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