'use client'
import { useState } from 'react'

export default function Home() {

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData(e.target)

    const res = await fetch('/api/form', {
      method: 'POST',
      body: formData
    })

    setLoading(false)

    if (res.ok) {
      alert('Application sent successfully 🚀')
      e.target.reset()
    } else {
      alert('Error, try again')
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0705] text-white">

      {/* HERO */}
      <section className="text-center px-6 pt-28 pb-20">

        {/* PREUVE */}
        <div className="text-sm text-[#b8a88a] space-y-1 mb-6">
          <p>Trusted by 20+ creators</p>
          <p>$500k+ generated</p>
          <p>Top 1% agency</p>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-serif text-[#c9a050] mb-6 leading-tight">
          We Help Creators <br /> Grow Their Income Online
        </h1>

        {/* BENEFITS */}
        <div className="mt-6 space-y-2 text-[#d4c4a4] text-sm">
          <p>✔ We handle your DMs</p>
          <p>✔ We grow your audience</p>
          <p>✔ We increase your revenue</p>
          <p>✔ You focus on content</p>
        </div>

        {/* CTA */}
        <a
          href="#apply"
          className="inline-block mt-8 px-8 py-3 bg-[#c9a050] text-black font-semibold rounded-md hover:opacity-90 transition"
        >
          Apply for Private Management →
        </a>

        {/* URGENCE */}
        <p className="text-xs text-[#b8a88a] mt-4">
          Limited spots available • We only accept selected creators
        </p>

      </section>

      {/* FORM */}
      <section id="apply" className="px-6 pb-20 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Your name"
            required
            className="w-full p-3 bg-transparent border border-[#333] text-white"
          />

          <input
            name="instagram"
            placeholder="@yourinstagram"
            required
            className="w-full p-3 bg-transparent border border-[#333] text-white"
          />

          <input
            name="email"
            type="email"
            placeholder="Your email"
            required
            className="w-full p-3 bg-transparent border border-[#333] text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c9a050] text-black py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : '🚀 Apply Now'}
          </button>

          <p className="text-xs text-[#777] text-center">
            Takes less than 30 seconds • No commitment
          </p>

        </form>
      </section>

    </main>
  )
}