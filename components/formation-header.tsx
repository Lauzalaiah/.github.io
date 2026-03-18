"use client"

import { DollarSign, LogOut } from "lucide-react"
import { logout } from "@/app/auth/actions"
import { useTransition } from "react"

export function FormationHeader({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(async () => {
      await logout()
    })
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
            <DollarSign className="size-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-tight text-foreground">
              Fansly Agency Mastery
            </h1>
            <p className="text-xs text-muted-foreground">Formation Premium</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden font-sans text-sm text-muted-foreground md:block">
            {email}
          </span>
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 font-sans text-xs font-medium text-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50"
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  )
}
