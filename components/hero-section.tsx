"use client"

import { DollarSign, Shield, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary/20">
              <DollarSign className="size-4 text-primary" />
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-primary">
              Formation Premium
            </span>
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">
              {"Maitrisez la Gestion d'une Agence Fansly"}
            </span>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
            {"10 modules complets pour construire, gerer et scaler votre agence. Du recrutement de createurs a l'automatisation, tout y est."}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 px-4 py-3 backdrop-blur-sm">
              <Shield className="size-5 text-primary" />
              <div>
                <p className="font-sans text-sm font-semibold text-foreground">
                  {"Acces securise"}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  Paiement via Stripe
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 px-4 py-3 backdrop-blur-sm">
              <Zap className="size-5 text-primary" />
              <div>
                <p className="font-sans text-sm font-semibold text-foreground">
                  {"Acces immediat"}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {"Apres confirmation de paiement"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-primary/20" />
    </section>
  )
}
