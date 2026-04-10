import { NextResponse } from 'next/server'

const TOKEN = process.env.TELEGRAM_BOT_TOKEN

async function sendMessage(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text
    })
  })
}

export async function POST(req: Request) {
  try {
    const update = await req.json()

    if (update.callback_query) {
      const data = update.callback_query.data
      const chatId = update.callback_query.message.chat.id

      if (data === 'respond') {
        await sendMessage(
          chatId,
          "Hey! Thanks for applying 👋\nTell me more about your goals"
        )
      }

      if (data === 'follow_up') {
        await sendMessage(
          chatId,
          "Just checking — are you still interested?"
        )
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}