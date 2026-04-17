"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Module } from "@/lib/modules-data"
import { useProgress } from "@/lib/progress-context"
import { Sparkles, CheckCircle2, Gift } from "lucide-react"
import { FanslyAITool } from "./fansly-ai-tool"

export function BonusModuleCard({ module }: { module: Module }) {
  const { isComplete } = useProgress()

  const completedInModule = module.subsections.filter((_, i) =>
    isComplete(`${module.id}-${i}`)
  ).length
  const moduleProgress = Math.round(
    (completedInModule / module.subsections.length) * 100
  )

  return (
    <div className="group relative overflow-hidden rounded-lg border-2 border-primary/50 bg-gradient-to-br from-primary/10 via-card/80 to-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
      {/* Badge Bonus */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1">
        <Gift className="size-3.5 text-primary-foreground" />
        <span className="font-sans text-xs font-bold text-primary-foreground">BONUS</span>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value={`module-${module.id}`} className="border-none">
          <AccordionTrigger className="px-5 py-5 hover:no-underline">
            <div className="flex items-start gap-4 text-left">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary transition-colors group-hover:bg-primary/30">
                <Sparkles className="size-5" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-md bg-primary/20 px-2 py-0.5 font-sans text-xs font-semibold text-primary">
                    Module Bonus
                  </span>
                  {moduleProgress === 100 && (
                    <CheckCircle2 className="size-4 text-green-500" />
                  )}
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {module.title}
                </h3>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  {module.subtitle}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-6">
            <div className="ml-0 sm:ml-16">
              <FanslyAITool />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
