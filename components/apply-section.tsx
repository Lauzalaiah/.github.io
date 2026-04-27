"use client"

import { useState } from "react"

export function ApplySection() {
  const [formData, setFormData] = useState({
    name: "",
    instagram: "",
    country: "",
    email: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // ✅ TRACKING SUBMIT
    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event: "form_submit" }),
    })

    // ✅ ENVOI LEAD → BACKEND (TELEGRAM)
    await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        instagram: formData.instagram,
        country: formData.country,
        email: formData.email,
        source: document.referrer || "direct",
        sessionId: crypto.randomUUID(),
      }),
    });

    // ✅ (OPTIONNEL) ENVOI FORMSPREE
    const form = e.currentTarget
    const data = new FormData(form)

    await fetch("https://formspree.io/f/mvzwdazo", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })

    // ✅ REDIRECTION
    window.location.href = "/thanks"
  }

  return (
    <section id="apply" className="relative py-16 px-4 pb-24">
      <h2 className="font-serif text-3xl md:text-4xl text-center text-[#c9a050] mb-10">
        Apply for Private Management →
      </h2>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <input type="hidden" name="_subject" value="New Application - Leo OFM Elite" />
        <input type="hidden" name="_captcha" value="false" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full bg-[#1a1a1a] border border-[#3a3a3a] px-4 py-3 text-[#d4c4a8]"
          />

          <input
            type="text"
            name="instagram"
            placeholder="Instagram / Social Media"
            required
            value={formData.instagram}
            onChange={(e) =>
              setFormData({ ...formData, instagram: e.target.value })
            }
            className="w-full bg-[#1a1a1a] border border-[#3a3a3a] px-4 py-3 text-[#d4c4a8]"
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            required
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            className="w-full bg-[#1a1a1a] border border-[#3a3a3a] px-4 py-3 text-[#d4c4a8]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-[#1a1a1a] border border-[#3a3a3a] px-4 py-3 text-[#d4c4a8]"
          />

        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            onClick={() => {
              fetch("/api/track", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ event: "apply_click" }),
              })
            }}
            className="px-12 py-3 bg-[#c9a050] text-black"
          >
            Submit Application
          </button>
        </div>
      </form>

      <p className="text-center text-[#6a6a6a] text-sm mt-16">
        © 2026 We Scale Creators to $10k+/Month. All rights reserved.
      </p>
    </section>
  )
}