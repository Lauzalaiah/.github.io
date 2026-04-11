import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const update = await req.json()

    console.log('FULL UPDATE:', JSON.stringify(update))

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN

    if (!TOKEN) {
      throw new Error('Missing TELEGRAM_BOT_TOKEN')
    }

    // =========================
    // ✅ COMMANDES (/start)
    // =========================
    if (update.message?.text === '/start') {
      console.log('CHAT ID:', update.message.chat.id)

      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: update.message.chat.id,
          text: 'Bot ready 🚀'
        })
      })
    }

    // =========================
    // ✅ BOUTONS (callback_query)
    // =========================
    if (update.callback_query) {
      const data = update.callback_query.data
      const chatId = update.callback_query.message.chat.id
      const callbackId = update.callback_query.id

      // 🔥 récupérer le texte du lead
      const messageText = update.callback_query.message.text

      // 🔥 extraction des données
      const name = messageText?.match(/Name: (.*)/)?.[1]
      const ig = messageText?.match(/IG: (.*)/)?.[1]

      let text = ''

      // =========================
      // ⚡ RESPOND
      // =========================
      if (data === 'respond') {
        text = `Hey ${name || ''}! 👋\nI saw your IG: ${ig}\nTell me more about your goals`

        // 🔥 priorité HIGH override
        if (messageText?.includes('Priority: HIGH')) {
          text = `Hey ${name}! 🔥\nWe’d love to fast-track you.\nTell me your goals`
        }
      }

      // =========================
      // 🕒 FOLLOW UP
      // =========================
      if (data === 'follow_up') {
        text = 'Just checking — are you still interested?'
      }

      // =========================
      // ❌ IGNORE
      // =========================
      if (data === 'ignore') {
        text = 'Lead ignored ❌'
      }

      // =========================
      // 📩 ENVOI MESSAGE
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

      // =========================
      // 🔒 SUPPRIMER LES BOUTONS
      // =========================
      await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageReplyMarkup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: update.callback_query.message.message_id,
          reply_markup: {
            inline_keyboard: []
          }
        })
      })

      // =========================
      // 🔥 IMPORTANT (évite bug boutons)
      // =========================
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
// ✅ TEST URL (GET)
// =========================
export async function GET() {
  return new Response('Telegram webhook is alive')
}