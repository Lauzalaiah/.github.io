"use client"

import { useProgress } from "@/lib/progress-context"

export function GlobalProgressBar() {
  const { progressPercent } = useProgress()

  return (
    <div className="sticky top-[65px] z-40 h-1 w-full bg-transparent">
      <div
        className="h-full bg-foreground/80 transition-all duration-700 ease-out"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  )
}
