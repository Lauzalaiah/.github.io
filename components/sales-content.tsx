"use client"

import {
  DollarSign,
  Shield,
  Zap,
  BookOpen,
  Users,
  TrendingUp,
  Target,
  BarChart3,
  Megaphone,
  Settings,
  Award,
  Mail,
  Lock,
} from "lucide-react"
import Link from "next/link"

const MODULE_LIST = [
  { icon: BookOpen, title: "Introduction au modèle Fansly", desc: "Comprendre la plateforme et son écosystème" },
  { icon: Users, title: "Recruter des créateurs", desc: "Trouver et convaincre les meilleurs talents" },
  { icon: Target, title: "Stratégie de contenu", desc: "Planifier et structurer le contenu gagnant" },
  { icon: TrendingUp, title: "Monétisation avancée", desc: "Maximiser les revenus de chaque créateur" },
  { icon: Megaphone, title: "Marketing et promotion", desc: "Attirer du trafic et convertir en abonnés" },
  { icon: BarChart3, title: "Analytics et KPIs", desc: "Mesurer et optimiser les performances" },
  { icon: Settings, title: "Automatisation", desc: "Automatiser les tâches répétitives" },
  { icon: Shield, title: "Gestion juridique", desc: "Contrats, fiscalité et conformité" },
  { icon: Award, title: "Fidélisation", desc: "Garder vos créateurs et abonnés engagés" },
  { icon: TrendingUp, title: "Scaler votre agence", desc: "Passer de 1 à 10+ créateurs" },
]

export function SalesContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
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
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-white/90 md:text-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              {"10 modules complets pour construire, g\u00e9rer et scaler votre agence. Du recrutement de cr\u00e9ateurs \u00e0 l'automatisation, tout y est."}
            </p>

            <div className="mt-8 rounded-xl border-2 border-primary bg-black/70 p-6 backdrop-blur-sm">
              <p className="mb-4 font-sans text-base font-bold uppercase tracking-wider text-primary" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                {"Après votre achat à 597\u00A0€"}
              </p>
              <div className="flex flex-col gap-3 font-sans text-sm text-white">
                <p className="flex items-center gap-3" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                  <Mail className="size-5 shrink-0 text-primary" />
                  {"Vous recevez instantanément un email avec vos identifiants de connexion"}
                </p>
                <p className="flex items-center gap-3" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                  <Lock className="size-5 shrink-0 text-primary" />
                  {"Un identifiant (email) + un mot de passe sécurisé généré automatiquement"}
                </p>
                <p className="flex items-center gap-3" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                  <Zap className="size-5 shrink-0 text-primary" />
                  {"Connectez-vous et accédez immédiatement aux 10 modules de formation"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-6 py-4 font-sans text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
              >
                {"D\u00e9j\u00e0 membre ? Se connecter"}
              </Link>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 px-4 py-3 backdrop-blur-sm">
                <Shield className="size-5 text-primary" />
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">{"Paiement s\u00e9curis\u00e9"}</p>
                  <p className="font-sans text-xs text-muted-foreground">Via Stripe</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 px-4 py-3 backdrop-blur-sm">
                <Mail className="size-5 text-primary" />
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">{"Identifiants par email"}</p>
                  <p className="font-sans text-xs text-muted-foreground">{"Envoy\u00e9s apr\u00e8s paiement"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-xl">
            <h2 className="font-serif text-2xl font-bold text-white md:text-3xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              10 modules pour tout maitriser
            </h2>
            <p className="mt-3 font-sans text-white/90" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              {"Chaque module contient des cours detailles et des QCM pour valider vos connaissances."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {MODULE_LIST.map((mod, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:bg-card/60"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <mod.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-foreground">
                    Module {i + 1} : {mod.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs text-muted-foreground">
                    {mod.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 font-serif text-2xl font-bold text-white md:text-3xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {"Comment ça marche ?"}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Achetez la formation (597\u00A0\u20AC)",
                desc: "Paiement 100% s\u00e9curis\u00e9 par carte bancaire via Stripe.",
              },
              {
                step: "2",
                title: "Recevez vos identifiants par email",
                desc: "Imm\u00e9diatement apr\u00e8s le paiement, un email est envoy\u00e9 avec votre identifiant et mot de passe unique.",
              },
              {
                step: "3",
                title: "Connectez-vous et apprenez",
                desc: "Utilisez vos identifiants pour acc\u00e9der \u00e0 la plateforme et progressez \u00e0 votre rythme dans les 10 modules.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-start rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary font-serif text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 font-sans text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {"Pret a lancer votre agence ?"}
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-white/90" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {"Rejoignez la formation et commencez \u00e0 construire votre business d\u00e8s aujourd'hui."}
          </p>
          <div className="mt-8">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-6 py-4 font-sans text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
            >
              {"Deja membre ? Se connecter"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="font-sans text-sm font-medium text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}>
              Fansly Agency Mastery &mdash; Formation premium.
            </p>
            <p className="font-sans text-sm font-medium text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}>
              Paiement securise via Stripe.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
