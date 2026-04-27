import { NextResponse } from "next/server";

function getClientInfo(req: Request) {
  const headers = req.headers;

  return {
    ip:
      headers.get("x-forwarded-for") ||
      headers.get("x-real-ip") ||
      "unknown",
    userAgent: headers.get("user-agent") || "unknown",
    referer: headers.get("referer") || "direct",
  };
}

export async function POST(req: Request) {
  try {
    let body;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400 }
      );
    }

    const client = getClientInfo(req);

    // =========================
    // ✅ CAS 1 : TRACKING EVENT
    // =========================
    if (body.event) {
      console.log("📊 EVENT TRACKED:", {
        event: body.event,
        timestamp: new Date().toISOString(),
        ...client,
      });

      return NextResponse.json({ success: true });
    }

    // =========================
    // ✅ CAS 2 : LEAD FORM
    // =========================
    const { name, instagram, country, email, source, sessionId } = body;

    if (!name || !instagram || !country || !email) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { error: "Missing Telegram config" },
        { status: 500 }
      );
    }

    const formattedDate = new Date().toLocaleString("fr-FR", {
      timeZone: "UTC",
    });

    // ✅ MESSAGE CLEAN (PAS DE SAUT AU DÉBUT)
    const message = `🔥 NEW LEAD

👤 Name: ${name}
📸 IG: ${instagram}
🌍 Country: ${country}
📧 Email: ${email}

📊 Source: ${source || client.referer}
🆔 Session: ${sessionId || "N/A"}

🌐 IP: ${client.ip}
📱 Device: ${client.userAgent}

⏱ Time: ${formattedDate}`;

    const telegramRes = await fetch(
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

    const data = await telegramRes.json();

    if (!telegramRes.ok) {
      return NextResponse.json(
        { error: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}