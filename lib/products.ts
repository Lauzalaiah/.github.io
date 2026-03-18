export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const PRODUCTS: Product[] = [
  {
    id: "fansly-agency-mastery",
    name: "Fansly Agency Mastery",
    description:
      "Formation complete en 10 modules pour apprendre a gerer une agence Fansly de A a Z. Acces a vie.",
    priceInCents: 59700, // 597.00 EUR
  },
]
