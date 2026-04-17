"use client"

import { modules } from "@/lib/modules-data"
import { ModuleCard } from "@/components/module-card"
import { BonusModuleCard } from "@/components/bonus-module-card"

export function ModulesList() {
  return (
    <section className="flex flex-col gap-4">
      {modules.map((mod) => (
        <div key={mod.id} id={`module-${mod.id}`} className="scroll-mt-24">
          {mod.id === 11 ? (
            <BonusModuleCard module={mod} />
          ) : (
            <ModuleCard module={mod} />
          )}
        </div>
      ))}
    </section>
  )
}
