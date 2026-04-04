import { Check } from "lucide-react"

const benefits = [
  "Professional marketing strategy",
  "Fan messaging management",
  "Revenue optimization",
  "Audience growth",
]

export function WhyJoinSection() {
  return (
    <section className="relative py-16 px-4">
      <h2 className="font-serif text-3xl md:text-4xl text-center text-[#c9a050] mb-10">
        Why Join Our Agency
      </h2>
      
      <div className="max-w-md mx-auto space-y-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-4">
            <Check className="w-5 h-5 text-[#c9a050] flex-shrink-0" />
            <span className="text-[#d4c4a8] text-base md:text-lg">{benefit}</span>
          </div>
        ))}
      </div>
      
      {/* Section bottom line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#c9a050]/30 to-transparent" />
    </section>
  )
}
