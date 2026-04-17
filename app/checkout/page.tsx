"use client"

import { createCheckoutSession } from "@/app/actions/stripe"
import { Loader2 } from "lucide-react"
import { useState, useTransition } from "react"

export default function CheckoutPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleBuy() {
    setError(null)
    startTransition(async () => {
      try {
        const result = await createCheckoutSession("fansly-agency-mastery")
        if (result.url) {
          window.location.href = result.url
        }
      } catch {
        setError("Une erreur est survenue. Veuillez r\u00e9essayer.")
      }
    })
  }

  return (
    <div 
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-8"
      style={{ backgroundImage: "url('/images/dollar-bg-bright.jpg')" }}
    >
      {/* Overlay leger pour lisibilite du texte */}
      <div className="absolute inset-0 z-0 bg-black/20" aria-hidden="true" />
      <div className="relative z-10 max-w-md rounded-xl border border-border bg-card p-8 text-center">
        <h1 className="font-serif text-2xl font-bold text-foreground">
          {"Fansly Agency Mastery"}
        </h1>
        <p className="mt-2 font-sans text-3xl font-bold text-primary">
          {"597\u00A0\u20AC"}
        </p>
        <p className="mt-4 font-sans text-sm text-muted-foreground">
          {"Apr\u00e8s le paiement, vous recevrez vos identifiants de connexion par email."}
        </p>
        <button
          onClick={handleBuy}
          disabled={isPending}
          className="mt-6 w-full cursor-pointer rounded-lg bg-primary px-6 py-4 font-sans text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-5 animate-spin" />
              {"Redirection vers Stripe..."}
            </span>
          ) : (
            "Payer maintenant"
          )}
        </button>
        {error && (
          <p className="mt-4 font-sans text-sm text-red-400">{error}</p>
        )}
      </div>
    </div>
  )
}
