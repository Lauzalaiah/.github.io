export async function GET() {
  console.log("GET /api/respond HIT")
  return new Response("OK")
}

export async function POST(req: Request) {
  console.log("POST /api/respond HIT")

  try {
    const body = await req.json()
    console.log("BODY:", body)

    const {
      name,
      ig,
      status,
      priority,
      country,
      ip,
      action
    } = body

    console.log("🚀 SENDING TO MAKE...")

    await fetch(process.env.MAKE_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        ig,
        status,
        priority,
        country,
        ip,
        agent: "Leonard",
        action,
        timestamp: new Date().toISOString()
      })
    })

    console.log("✅ SENT TO MAKE")

    return new Response("OK")

  } catch (err) {
    console.error(err)
    return new Response("ERROR", { status: 500 })
  }
}