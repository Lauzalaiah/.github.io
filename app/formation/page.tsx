import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { FormationHeader } from "@/components/formation-header"
import { CourseContent } from "@/components/course-content"

export default async function FormationPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-repeat"
      style={{ backgroundImage: "url('/images/dollar-bg-bright.jpg')" }}
    >
      {/* Overlay leger pour lisibilite du texte */}
      <div className="absolute inset-0 z-0 bg-black/20" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10">
        <FormationHeader email={user.email ?? ""} />

        <main>
          <section className="py-10">
            <div className="mx-auto max-w-7xl px-6">
              <h1 className="font-serif text-3xl font-bold text-white md:text-4xl" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>
                Votre Formation
              </h1>
              <p className="mt-2 font-sans text-lg font-medium text-white/90" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                {"Progressez à votre rythme dans les 10 modules."}
              </p>
            </div>
          </section>
          <CourseContent />
        </main>

        <footer className="py-8">
          <div className="mx-auto max-w-7xl px-6">
            <p className="font-sans text-sm font-medium text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}>
              {"Fansly Agency Mastery — Contenu réservé aux membres."}
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
