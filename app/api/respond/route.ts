export async function POST(req: Request) {
  console.log("API HIT")

  try {
    const data = await req.json()

    await fetch("https://hook.eu1.make.com/9dl5ej6usplkz27oggvri5smtits63z", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200
    })
  } catch (err) {
    console.error(err)

    return new Response(JSON.stringify({ error: "error" }), {
      status: 500
    })
  }
}