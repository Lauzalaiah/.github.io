const steps = [
  {
    number: "1",
    title: "Submit your application",
  },
  {
    number: "2",
    title: "Our team reviews your profile",
  },
  {
    number: "3",
    title: "If accepted we onboard you and scale your account",
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 px-[10%] text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
      <div className="flex flex-col items-center gap-8 max-w-xl mx-auto">
        {steps.map((step) => (
          <div key={step.number} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              {step.number}
            </div>
            <p className="text-lg text-left">{step.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
