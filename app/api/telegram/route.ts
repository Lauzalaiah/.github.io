import { NextResponse } from 'next/server'

declare global {
  var processedMessages: Record<number, boolean>
}

export async function POST(req: Request) {
  try {
    const update = await req.json()

    console.log('FULL UPDATE:', JSON.stringify(update))

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN
    if (!TOKEN) throw new Error('Missing TELEGRAM_BOT_TOKEN')

    // =========================
    // COMMANDES
    // =========================
    if (update.message?.text === '/start') {
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
    // CALLBACK BUTTONS
    // =========================
    if (update.callback_query) {
      console.log("BUTTON CLICK DETECTED")

      const data = update.callback_query.data
      const chatId = update.callback_query.message.chat.id
      const callbackId = update.callback_query.id
      const messageId = update.callback_query.message.message_id

      // 🔒 anti double click
      const processedMessages = (globalThis as any).processedMessages || {}

      if (processedMessages[messageId]) {
        return NextResponse.json({ ok: true })
      }

      processedMessages[messageId] = true
      ;(globalThis as any).processedMessages = processedMessages

      const messageText = update.callback_query.message.text

      const name = messageText?.match(/Name: (.*)/)?.[1]
      const ig = messageText?.match(/IG: (.*)/)?.[1]

      let text = ''
      let status = ''

      // =========================
      // RESPOND
      // =========================
      if (data === 'respond') {
        status = 'Responded ✅'
        text = `Hey ${name || ''}! 👋\nTell me more about your goals`

        // 🔥 TRACKING + ENVOI DATA COMPLET
        await fetch("https://www.leofmelite.com/api/respond", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            ig,
            status,
            action: data,
            priority: messageText?.includes("HIGH") ? "HIGH" : "LOW",
            country: messageText?.match(/Country: (.*)/)?.[1],
            ip: messageText?.match(/IP: (.*)/)?.[1]
          })
        })
      }

      // =========================
      // FOLLOW UP
      // =========================
      if (data === 'follow_up') {
        status = 'Followed up ⏳'
        text = 'Just checking — are you still interested?'
      }

      // =========================
      // IGNORE
      // =========================
      if (data === 'ignore') {
        status = 'Ignored ❌'
        text = 'Lead ignored ❌'
      }

      // =========================
      // SEND MESSAGE
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
      // UPDATE STATUS
      // =========================
      if (status) {
        const newText = `${messageText}

📌 Status: ${status}`

        await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: newText
          })
        })
      }

      // =========================
      // REMOVE BUTTONS
      // =========================
      await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageReplyMarkup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          reply_markup: { inline_keyboard: [] }
        })
      })

      // =========================
      // ANSWER CALLBACK
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

export async function GET() {
  return new Response('Telegram webhook is alive')
}