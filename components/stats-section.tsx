import { Users } from "lucide-react"

export function StatsSection() {
  return (
    <section className="relative py-12 px-4">
      {/* Top sparkle line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#c9a050]/50 to-transparent" />
      
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl font-serif text-[#c9a050] mb-2">20+</span>
          <span className="text-[#8a8078] text-sm md:text-base">Creators supported<br />worldwide</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl font-serif text-[#c9a050] mb-2">$500,000+</span>
          <span className="text-[#8a8078] text-sm md:text-base">Monthly revenue<br />generated</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Users className="w-8 h-8 md:w-10 md:h-10 text-[#c9a050] mb-2" />
          <span className="text-[#8a8078] text-sm md:text-base">Professional<br />management team</span>
        </div>
      </div>
      
      {/* Bottom sparkle line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#c9a050]/50 to-transparent" />
    </section>
  )
}
