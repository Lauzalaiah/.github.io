"use client"

import { DollarSign } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
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
        <div />
      </div>
    </header>
  )
}
