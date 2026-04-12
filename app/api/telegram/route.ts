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
    // ✅ COMMANDES
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
    // ✅ CALLBACK BUTTONS
    // =========================
    if (update.callback_query) {
      const data = update.callback_query.data
      const chatId = update.callback_query.message.chat.id
      const callbackId = update.callback_query.id
      const messageId = update.callback_query.message.message_id

      // 🔒 ANTI DOUBLE CLICK
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

      // =========================
      // ⚡ RESPOND
      // =========================
      if (data === 'respond') {
        text = `Hey ${name || ''}! 👋\nI saw your IG: ${ig}\nTell me more about your goals`

        if (messageText?.includes('Priority: HIGH')) {
          text = `Hey ${name}! 🔥\nWe’d love to fast-track you.\nTell me your goals`
        }

        // 📩 SCRIPT DM
        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `📩 DM SCRIPT:\n\nHey ${name} 👋  
I came across your profile and I think you have strong potential.

We help creators grow their revenue and handle everything behind the scenes.

Are you open to hearing more?`
          })
        })
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
      // 📩 MESSAGE PRINCIPAL
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
      // 🧠 STATUS
      // =========================
      let status = ''

      if (data === 'respond') status = 'Responded ✅'
      if (data === 'ignore') status = 'Ignored ❌'
      if (data === 'follow_up') status = 'Followed up ⏳'

      const originalText = messageText

      if (status) {
        const agent = 'Leonard'

        const newText = `${originalText}

📌 Status: ${status}
👤 Assigned to: ${agent}`

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
      // 📊 TRACKING (MAKE)
      // =========================
    await fetch('https://hook.eu1.make.com/9dl5ej6usplkz27oggvri5smtits63z', {
        method: 'POST',
        body: JSON.stringify({
          name,
          ig,
          status
        })
      })

      // =========================
      // 🔒 REMOVE BUTTONS
      // =========================
      await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageReplyMarkup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          reply_markup: {
            inline_keyboard: []
          }
        })
      })

      // =========================
      // ⏱️ AUTO FOLLOW UP (1H)
      // =========================
      setTimeout(async () => {
        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `Hey ${name}, just checking 👀`
          })
        })
      }, 3600000)

      // =========================
      // 🔥 CALLBACK RESPONSE
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