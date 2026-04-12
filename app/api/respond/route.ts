export async function GET() {
  console.log("GET /api/respond HIT")
  return new Response("OK")
}

export async function POST(req: Request) {
  console.log("POST /api/respond HIT")

  try {
    const body = await req.json()
    console.log("BODY:", body)

    console.log("🚀 SENDING TO MAKE...")

    // 📊 envoi vers Make
    await fetch("https://hook.eu1.make.com/9dl5ej6usplkz27oggvri5smtits63za", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    console.log("✅ SENT TO MAKE")

    // ✅ RETURN ICI (unique)
    return new Response("OK")

  } catch (err) {
    console.error(err)

    return new Response(JSON.stringify({ error: "error" }), {
      status: 500
    })
  }
}