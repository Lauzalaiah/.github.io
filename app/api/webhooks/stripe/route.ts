import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import crypto from "crypto"

const resend = new Resend(process.env.RESEND_API_KEY!)

// Use the service role key to bypass RLS for account creation
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
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

  console.log("[v0] Webhook event received:", event.type)

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const customerEmail = session.customer_details?.email

    console.log("[v0] Customer email:", customerEmail)
    console.log("[v0] Session ID:", session.id)
    console.log("[v0] RESEND_API_KEY set:", !!process.env.RESEND_API_KEY)
    console.log("[v0] SUPABASE_SERVICE_ROLE_KEY set:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)

    if (!customerEmail) {
      console.error("[v0] No customer email in session")
      return NextResponse.json(
        { error: "No customer email" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = existingUsers?.users?.find(
      (u) => u.email === customerEmail
    )

    if (existingUser) {
      // User already has an account - just send a reminder email
      try {
        await resend.emails.send({
          from: "Formation Fansly <noreply@goalphaleo.fr>",
          to: customerEmail,
          subject: "Votre acces a la formation Fansly Agency Mastery",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #e5e5e5; padding: 40px; border-radius: 12px;">
              <h1 style="color: #d4a853; font-size: 24px; margin-bottom: 20px;">Merci pour votre achat !</h1>
              <p>Vous avez deja un compte. Connectez-vous avec votre email :</p>
              <div style="background: #1a1a2e; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4a853;">
                <p style="margin: 0;"><strong>Email :</strong> ${customerEmail}</p>
              </div>
              <p style="color: #999; font-size: 14px;">Si vous avez oublie votre mot de passe, utilisez la fonction de reinitialisation sur la page de connexion.</p>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error("[v0] Failed to send reminder email:", emailErr)
      }

      return NextResponse.json({ received: true })
    }

    // Create new user account
    const password = generatePassword(14)

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: customerEmail,
        password: password,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          product_id: session.metadata?.productId,
          stripe_session_id: session.id,
        },
      })

    if (authError) {
      console.error("[v0] Failed to create user:", authError)
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      )
    }

    // Insert into students table
    if (authData.user) {
      const { error: studentError } = await supabaseAdmin
        .from("students")
        .insert({
          id: authData.user.id,
          email: customerEmail,
          stripe_customer_id:
            typeof session.customer === "string" ? session.customer : null,
          stripe_session_id: session.id,
        })

      if (studentError) {
        console.error("[v0] Failed to insert student:", studentError)
      }
    }

    // Send credentials email via Resend
    console.log("[v0] Sending credentials email to:", customerEmail)
    try {
      const emailResult = await resend.emails.send({
        from: "Formation Fansly <noreply@goalphaleo.fr>",
        to: customerEmail,
        subject:
          "Vos identifiants - Fansly Agency Mastery",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #e5e5e5; padding: 40px; border-radius: 12px;">
            <h1 style="color: #d4a853; font-size: 24px; margin-bottom: 8px;">Bienvenue dans la formation !</h1>
            <p style="color: #999; margin-bottom: 30px;">Fansly Agency Mastery - Votre acces est pret.</p>
            
            <div style="background: #1a1a2e; padding: 24px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4a853;">
              <h2 style="color: #d4a853; font-size: 16px; margin: 0 0 16px 0;">Vos identifiants de connexion</h2>
              <p style="margin: 8px 0;"><strong style="color: #d4a853;">Email :</strong> ${customerEmail}</p>
              <p style="margin: 8px 0;"><strong style="color: #d4a853;">Mot de passe :</strong> <code style="background: #222; padding: 4px 8px; border-radius: 4px; font-size: 16px; letter-spacing: 1px;">${password}</code></p>
            </div>

            <div style="background: #1a0a0a; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c0392b;">
              <p style="margin: 0; color: #e74c3c; font-size: 14px;"><strong>IMPORTANT :</strong> Conservez ce mot de passe precieusement. Nous vous recommandons de le changer apres votre premiere connexion.</p>
            </div>

            <p style="margin-top: 30px;">Connectez-vous des maintenant pour commencer votre formation :</p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://" + process.env.VERCEL_URL}/auth/login" 
               style="display: inline-block; background: #d4a853; color: #111; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 12px;">
              Acceder a la formation
            </a>

            <p style="color: #666; font-size: 12px; margin-top: 40px;">Cet email contient des informations confidentielles. Ne le partagez avec personne.</p>
          </div>
        `,
      })
      console.log("[v0] Email sent result:", JSON.stringify(emailResult))
    } catch (emailErr) {
      console.error("[v0] Failed to send credentials email:", JSON.stringify(emailErr))
    }
  }

  console.log("[v0] Webhook processing complete")
  return NextResponse.json({ received: true })
}
