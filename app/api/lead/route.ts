import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const { name, instagram, country, email, source, sessionId } = body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log("TOKEN:", token);
    console.log("CHAT:", chatId);

    if (!token || !chatId) {
      return NextResponse.json({ error: "Missing env" }, { status: 500 });
    }

    const message = `🔥 NEW LEAD

👤 ${name}
📸 ${instagram}
🌍 ${country}
📧 ${email}

📊 ${source}
🆔 ${sessionId}`;

    // 🔥 TEST TELEGRAM ULTRA SIMPLE
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    const res = await fetch(url);

    const data = await res.json();

    console.log("TELEGRAM RESPONSE:", data);

    return NextResponse.json({ success: true, data });

  } catch (err: any) {
    console.error("ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}