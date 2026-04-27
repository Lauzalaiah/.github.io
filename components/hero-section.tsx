"use client"

export function HeroSection() {
  return (
    <section className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center px-4 pt-20 pb-16">

      {/* Glow (ne bloque plus les clics) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#c9a050]/10 blur-[120px] rounded-full pointer-events-none" />

      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#c9a050] mb-6 tracking-wide text-center">
        We Scale Creators to $10k–$50k/month
      </h1>

      <p className="text-[#b8a88a] text-center text-base md:text-lg max-w-xl mb-10 leading-relaxed">
        We help creators scale to $10k+/month on Fansly using proven marketing and monetization systems.
      </p>

      <button
        type="button"
        onClick={() => {
          const el = document.getElementById("apply")
          if (el) {
            el.scrollIntoView({ behavior: "smooth" })
          }
        }}
        className="relative z-[999] px-8 py-3 bg-[#c9a050] text-black cursor-pointer"
      >
        Apply →
      </button>

    </section>
  )
}
