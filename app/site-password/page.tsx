"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DollarSign } from "lucide-react"

export default function SitePasswordPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const res = await fetch("/api/site-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/")
      router.refresh()
    } else {
      setError("Mot de passe incorrect")
    }
    setIsLoading(false)
  }

  return (
    <div 
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/dollar-bg-bright.jpg')" }}
    >
      <div className="absolute inset-0 z-0 bg-black/20" aria-hidden="true" />
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="rounded-2xl border border-border bg-card/95 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary">
              <DollarSign className="size-7 text-primary-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Accès protégé
            </h1>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              Ce site est en cours de développement
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-1.5 block font-sans text-sm font-medium text-foreground">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            {error && (
              <p className="text-center font-sans text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary px-4 py-3 font-sans text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? "Vérification..." : "Accéder au site"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
