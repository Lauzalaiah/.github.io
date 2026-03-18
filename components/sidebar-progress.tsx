"use client"

import { modules } from "@/lib/modules-data"
import { useProgress } from "@/lib/progress-context"
import { CheckCircle2 } from "lucide-react"

export function SidebarProgress() {
  const { progressPercent, completedCount, totalLessons, isComplete } = useProgress()

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-lg border border-border/60 bg-card/80 p-5 backdrop-blur-sm">
        <h2 className="mb-1 font-serif text-base font-bold text-foreground">
          Votre Progression
        </h2>
        <p className="mb-1 text-xs text-muted-foreground">
          {completedCount} / {totalLessons} lecons terminees
        </p>
        <p className="mb-4 font-sans text-2xl font-bold text-primary">
          {progressPercent}%
        </p>
        <div className="mb-5 h-2.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-foreground/80 transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <nav className="flex flex-col gap-1">
          {modules.map((mod) => {
            const completedInModule = mod.subsections.filter((_, i) =>
              isComplete(`${mod.id}-${i}`)
            ).length
            const allDone = completedInModule === mod.subsections.length
            const started = completedInModule > 0

            return (
              <button
                key={mod.id}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-secondary cursor-pointer"
                onClick={() => {
                  const el = document.getElementById(`module-${mod.id}`)
                  el?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    allDone
                      ? "bg-accent/20 text-accent-foreground"
                      : started
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {allDone ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : (
                    mod.id
                  )}
                </span>
                <span
                  className={`truncate font-sans text-sm transition-colors ${
                    allDone
                      ? "text-accent-foreground"
                      : started
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {mod.title}
                </span>
                {started && !allDone && (
                  <span className="ml-auto shrink-0 font-sans text-xs text-primary">
                    {completedInModule}/{mod.subsections.length}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
        {progressPercent === 100 && (
          <div className="mt-5 rounded-lg border border-accent/30 bg-accent/10 p-4">
            <p className="text-center font-sans text-xs font-semibold leading-relaxed text-accent-foreground">
              Formation terminee ! Vous maitrisez maintenant la gestion d{"'"}agence Fansly.
            </p>
          </div>
        )}
        {progressPercent < 100 && (
          <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-center font-sans text-xs leading-relaxed text-muted-foreground">
              Cliquez sur chaque lecon et lisez le contenu pour debloquer la suite.
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
