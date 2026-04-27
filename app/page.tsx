"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {

      // ✅ TRACKING
      await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: "form_submit" }),
      });

      // ✅ TON ENVOI NORMAL
      const res = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          instagram: instagram.trim(),
          country: country.trim(),
          email: email.trim(),
        }),
      });

      if (res.ok) {
        console.log("🚀 LEAD SENT SUCCESSFULLY");

        setName("");
        setInstagram("");
        setCountry("");
        setEmail("");

        setTimeout(() => {
          window.location.href = "/thanks";
        }, 1500);

      } else {
        alert("❌ Erreur serveur");
        setLoading(false);
      }

    } catch (err) {
      alert("❌ Network error");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0705] text-white">

      {/* HERO */}
      <section className="text-center px-6 pt-28 pb-20">

        <div className="text-sm text-[#b8a88a] space-y-1 mb-6">
          <p>Trusted by 20+ creators</p>
          <p>$500k+ generated</p>
          <p>Top 1% agency</p>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-[#c9a050] mb-6 leading-tight">
          We Help Creators <br /> Grow Their Income Online
        </h1>

        <div className="mt-6 space-y-2 text-[#d4c4a4] text-sm">
          <p>✔ We handle your DMs</p>
          <p>✔ We grow your audience</p>
          <p>✔ We increase your revenue</p>
          <p>✔ You focus on content</p>
        </div>

        <a
          href="#apply"
          className="inline-block mt-8 px-8 py-3 bg-[#c9a050] text-black font-semibold rounded-md hover:opacity-90 transition"
        >
          Apply for Private Management →
        </a>

        <p className="text-xs text-[#b8a88a] mt-4">
          Limited spots available • We only accept selected creators
        </p>

      </section>

      {/* FORM */}
      <section id="apply" className="px-6 pb-20 max-w-md mx-auto">
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">

          <input
            value={name}
            placeholder="Your name"
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-transparent border border-[#333] text-white"
          />

          <input
            value={instagram}
            placeholder="@yourinstagram"
            required
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full p-3 bg-transparent border border-[#333] text-white"
          />

          <input
            value={country}
            placeholder="Your country"
            required
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 bg-transparent border border-[#333] text-white"
          />

          <input
            value={email}
            placeholder="Your email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-transparent border border-[#333] text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c9a050] text-black py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "🚀 Apply Now"}
          </button>

          <p className="text-xs text-[#777] text-center">
            Takes less than 30 seconds • No commitment
          </p>

        </form>
      </section>

    </main>
  );
}