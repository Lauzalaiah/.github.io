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

    const form = e.currentTarget
    const data = new FormData(form)

    // ✅ TRACKING AVANT ENVOI
    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event: "form_submit" }),
    })

    // ✅ ENVOI FORMSPREE
    fetch("https://formspree.io/f/mvzwdazo", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    }).then(() => {
      window.location.href = "/thanks"
    })
  }

  return (
    <section id="apply" className="relative py-16 px-4 pb-24">
      <h2 className="font-serif text-3xl md:text-4xl text-center text-[#c9a050] mb-10">
        Apply for Private Management →
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto"
      >
        {/* Hidden fields */}
        <input type="hidden" name="_subject" value="New Application - Leo OFM Elite" />
        <input type="hidden" name="_captcha" value="false" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-sm px-4 py-3 text-[#d4c4a8] placeholder-[#6a6a6a] focus:border-[#c9a050]/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Instagram */}
          <div className="relative flex items-center gap-3">
            <span className="text-[#c9a050] font-serif text-xl">1</span>
            <input
              type="text"
              name="instagram"
              placeholder="Instagram / Social Media"
              required
              value={formData.instagram}
              onChange={(e) =>
                setFormData({ ...formData, instagram: e.target.value })
              }
              className="flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-sm px-4 py-3 text-[#d4c4a8] placeholder-[#6a6a6a] focus:border-[#c9a050]/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Country */}
          <div className="relative">
            <input
              type="text"
              name="country"
              placeholder="Country"
              required
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-sm px-4 py-3 text-[#d4c4a8] placeholder-[#6a6a6a] focus:border-[#c9a050]/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Email */}
          <div className="relative flex items-center gap-3">
            <span className="text-[#c9a050] font-serif text-xl">3</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-sm px-4 py-3 text-[#d4c4a8] placeholder-[#6a6a6a] focus:border-[#c9a050]/50 focus:outline-none transition-colors"
            />
          </div>

        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-12 py-3 bg-gradient-to-r from-[#c9a050] to-[#d4b366] text-[#0a0a0a] font-medium rounded-sm hover:from-[#d4b366] hover:to-[#c9a050] transition-all duration-300 shadow-lg shadow-[#c9a050]/20"
          >
            Submit Application
          </button>
        </div>
      </form>

      {/* Footer */}
      <p className="text-center text-[#6a6a6a] text-sm mt-16">
        © 2026 We Scale Creators to $10k+/Month. All rights reserved.
      </p>
    </section>
  )
}