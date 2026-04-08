import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-balance">
        We Scale Creators to $10k+/Month
      </h1>
      <p className="max-w-xl mt-6 text-muted-foreground text-lg leading-relaxed">
        We help creators scale their revenue on Fansly through marketing,
        fan messaging and growth strategies.
      </p>
      <Button asChild size="lg" className="mt-8 px-10 py-6 text-base font-bold">
        <Link href="#apply">Apply to Join</Link>
      </Button>
    </section>
  )
}
