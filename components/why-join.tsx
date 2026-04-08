import { Check } from "lucide-react"

const benefits = [
  "Professional marketing strategy",
  "Fan messaging management",
  "Revenue optimization",
  "Audience growth",
]

export function WhyJoin() {
  return (
    <section className="py-24 px-[10%] text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Join Our Agency</h2>
      <div className="flex flex-col items-center gap-4">
        {benefits.map((benefit) => (
          <div key={benefit} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-lg">{benefit}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
