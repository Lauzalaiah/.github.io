const services = [
  {
    title: "Marketing",
    description: "Growth strategy on social media platforms.",
  },
  {
    title: "Fan Messaging",
    description: "Professional chat team managing conversations.",
  },
  {
    title: "Account Growth",
    description: "Optimised pricing and content strategy.",
  },
  {
    title: "Traffic",
    description: "Targeted traffic acquisition.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-16 px-4">

      <h2 className="font-serif text-3xl md:text-4xl text-center text-[#c9a050] mb-12">
        Our Services
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative bg-[#0f0f0f]/80 border border-[#c9a050]/30 rounded-sm p-6 text-center group hover:border-[#c9a050]/60 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#c9a050]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />

            <h3 className="font-serif text-lg md:text-xl text-[#c9a050] mb-1 relative z-10">
              {service.title}
            </h3>

            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c9a050] to-transparent mx-auto mb-4" />

            <p className="text-[#8a8078] text-sm leading-relaxed relative z-10">
              {service.description}
            </p>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#c9a050]/40 to-transparent" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#c9a050]/30 to-transparent" />

    </section>
  )
}