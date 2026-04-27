"use client"

export function Header() {
  return (
    <header className="flex items-center justify-between px-[10%] py-5 border-b border-border">

      <div className="text-primary font-bold text-xl md:text-2xl">
        LEO OFM ELITE
      </div>

      <nav className="flex items-center gap-5">

        <a href="#services" className="hover:text-primary">
          Services
        </a>

        <a href="#process" className="hover:text-primary">
          Process
        </a>

        <a href="#apply" className="hover:text-primary">
          Apply
        </a>

      </nav>
    </header>
  )
}
