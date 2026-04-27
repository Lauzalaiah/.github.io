import { NextResponse } from "next/server";

// 🔥 force l’exécution côté serveur (pas de cache)
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  console.log("API HIT");

  try {
    const body = await req.json();

    const { name, instagram, country, email, source, sessionId } = body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // 🔍 DEBUG
    console.log("TOKEN:", token);
    console.log("CHAT:", chatId);
    console.log("BODY:", body);

    if (!token || !chatId) {
      return NextResponse.json(
        { error: "Missing Telegram config" },
        { status: 500 }
      );
    }

    const message = `🔥 NEW LEAD

👤 Name: ${name}
📸 IG: ${instagram}
🌍 Country: ${country}
📧 Email: ${email}

📊 Source: ${source || "unknown"}
🆔 Session: ${sessionId || "N/A"}`;

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const data = await res.json();

    console.log("TELEGRAM RESPONSE:", data);

    if (!res.ok) {
      return NextResponse.json(
        { error: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("ERROR:", err);

    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}