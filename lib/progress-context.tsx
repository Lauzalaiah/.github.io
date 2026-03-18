"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface ProgressContextType {
  completedLessons: Set<string>
  markComplete: (lessonId: string) => void
  isComplete: (lessonId: string) => boolean
  totalLessons: number
  completedCount: number
  progressPercent: number
}

const ProgressContext = createContext<ProgressContextType | null>(null)

const TOTAL_LESSONS = 30 // 10 modules x 3 subsections

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

  const markComplete = useCallback((lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev)
      next.add(lessonId)
      return next
    })
  }, [])

  const isComplete = useCallback(
    (lessonId: string) => completedLessons.has(lessonId),
    [completedLessons]
  )

  const completedCount = completedLessons.size
  const progressPercent = Math.round((completedCount / TOTAL_LESSONS) * 100)

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        markComplete,
        isComplete,
        totalLessons: TOTAL_LESSONS,
        completedCount,
        progressPercent,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider")
  return ctx
}
