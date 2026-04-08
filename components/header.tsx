"use client"

import Link from "next/link"

export function Header() {
  return (
    <header className="flex items-center justify-between px-[10%] py-5 border-b border-border">
      <div className="text-primary font-bold text-xl md:text-2xl">
        LEO OFM ELITE
      </div>
      <nav className="flex items-center gap-5">
        <Link 
          href="#services" 
          className="text-foreground hover:text-primary transition-colors text-sm md:text-base"
        >
          Services
        </Link>
        <Link 
          href="#process" 
          className="text-foreground hover:text-primary transition-colors text-sm md:text-base"
        >
          Process
        </Link>
        <Link 
          href="#apply" 
          className="text-foreground hover:text-primary transition-colors text-sm md:text-base"
        >
          Apply
        </Link>
      </nav>
    </header>
  )
}
