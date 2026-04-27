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
      // ✅ TRACKING SUBMIT
      await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: "form_submit" }),
      });

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
        setName("");
        setInstagram("");
        setCountry("");
        setEmail("");

        setTimeout(() => {
          window.location.href = "/thanks";
        }, 1000);
      } else {
        setLoading(false);
        alert("Erreur serveur");
      }
    } catch {
      setLoading(false);
      alert("Erreur réseau");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0705] text-white">

      <section className="text-center px-6 pt-28 pb-20">
        <h1 className="text-4xl text-[#c9a050] mb-6">
          We Help Creators Grow Their Income
        </h1>

        <a
          href="#apply"
          className="inline-block mt-8 px-8 py-3 bg-[#c9a050] text-black"
        >
          Apply →
        </a>
      </section>

      <section id="apply" className="px-6 pb-20 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border"
          />

          <input
            value={instagram}
            placeholder="@instagram"
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full p-3 border"
          />

          <input
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 border"
          />

          <input
            value={email}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border"
          />

          <button
            type="submit"
            disabled={loading}
            onClick={() => {
              fetch("/api/track", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ event: "apply_click" }),
              })
            }}
            className="w-full bg-[#c9a050] text-black py-3"
          >
            {loading ? "Sending..." : "Apply Now"}
          </button>

        </form>
      </section>

    </main>
  );
}