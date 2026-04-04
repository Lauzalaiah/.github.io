export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-[#0a0705] flex items-center justify-center px-6 text-center">
      <div className="max-w-xl">

        <h1 className="text-4xl md:text-5xl text-[#c9a050] mb-6 font-serif">
          Application Under Review
        </h1>

        <p className="text-[#b8a88a] mb-6">
          Your application has been successfully submitted.
          <br />
          Our team will review it within 24 hours.
        </p>

        <p className="text-[#c9a050] mb-6">
          High-performing profiles are prioritized.
        </p>

        <a href="/">
          <button className="px-8 py-3 bg-[#c9a050] text-black font-semibold">
            Return to Agency
          </button>
        </a>

      </div>
    </main>
  )
}