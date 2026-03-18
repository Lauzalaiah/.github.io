"use client"

import { ProgressProvider } from "@/lib/progress-context"
import { ModulesList } from "@/components/modules-list"
import { SidebarProgress } from "@/components/sidebar-progress"
import { GlobalProgressBar } from "@/components/global-progress-bar"

export function CourseContent() {
  return (
    <ProgressProvider>
      <GlobalProgressBar />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
          {/* Modules - left aligned */}
          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-bold text-white" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>
                Programme Complet
              </h2>
              <p className="mt-1 font-sans text-base font-medium text-white/90" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                {"10 modules pour maîtriser la gestion d'une agence Fansly de A à Z"}
              </p>
            </div>
            <ModulesList />
          </div>

          {/* Sidebar - right */}
          <SidebarProgress />
        </div>
      </div>
    </ProgressProvider>
  )
}
