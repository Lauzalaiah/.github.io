import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import crypto from "crypto"

function generatePassword(length = 12): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%"
  let password = ""
  const randomBytes = crypto.randomBytes(length)
  for (let i = 0; i < length; i++) {
    password += chars[randomBytes[i] % chars.length]
  }
  return password
}

export async function POST(request: Request) {
  // ✅ INIT DANS LA FONCTION (IMPORTANT)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const resend = new Resend(process.env.RESEND_API_KEY!)

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const body = await request.text()
  const sig = request.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("[v0] Webhook signature verification failed:", message)
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    )
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any
    const customerEmail = session.customer_details?.email

    if (!customerEmail) {
      return NextResponse.json(
        { error: "No customer email" },
        { status: 400 }
      )
    }

    // Vérifie si user existe
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = existingUsers?.users?.find(
      (u) => u.email === customerEmail
    )

    if (existingUser) {
      try {
        await resend.emails.send({
          from: "Formation Fansly <noreply@goalphaleo.fr>",
          to: customerEmail,
          subject: "Votre acces a la formation Fansly Agency Mastery",
          html: `<p>Vous avez deja un compte.</p>`,
        })
      } catch (e) {
        console.error(e)
      }

      return NextResponse.json({ received: true })
    }

    // Création user
    const password = generatePassword(14)

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: customerEmail,
        password,
        email_confirm: true,
      })

    if (authError) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      )
    }

    // Insert DB
    if (authData.user) {
      await supabaseAdmin.from("students").insert({
        id: authData.user.id,
        email: customerEmail,
        stripe_session_id: session.id,
      })
    }

    // Email
    try {
      await resend.emails.send({
        from: "Formation Fansly <noreply@goalphaleo.fr>",
        to: customerEmail,
        subject: "Vos identifiants",
        html: `<p>Email: ${customerEmail}<br/>Password: ${password}</p>`,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return NextResponse.json({ received: true })
}