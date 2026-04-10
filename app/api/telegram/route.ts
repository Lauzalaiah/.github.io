import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const update = await req.json()

    console.log('📩 TELEGRAM UPDATE:', JSON.stringify(update, null, 2))

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN

    if (!TOKEN) {
      throw new Error('Missing TELEGRAM_BOT_TOKEN')
    }

    // 👉 Gestion des boutons (inline keyboard)
    if (update.callback_query) {
      const data = update.callback_query.data
      const chatId = update.callback_query.message.chat.id
      const callbackId = update.callback_query.id

      console.log('👉 Button clicked:', data)

      let text = ''

      // ⚡ Actions boutons
      switch (data) {
        case 'respond':
          text = "Hey! Thanks for applying 👋\nTell me more about your goals"
          break

        case 'follow_up':
          text = "Just checking — are you still interested?"
          break

        case 'ignore':
          text = "Lead ignored ❌"
          break

        default:
          text = "Unknown action"
      }

      // ✅ Envoi message
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text
        })
      })

      // ⚠️ CRUCIAL → débloque le bouton côté Telegram
      await fetch(`https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_query_id: callbackId
        })
      })
    }

    return NextResponse.json({ ok: true })

  } catch (error: any) {
    console.error('❌ WEBHOOK ERROR:', error?.message || error)

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || 'Server error'
      },
      { status: 500 }
    )
  }
}