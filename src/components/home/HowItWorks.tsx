const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Browse beans and gear by roast, origin, category, and rating.",
  },
  {
    number: "02",
    title: "Order",
    description:
      "Buy directly from the roaster or maker — no middleman markup.",
  },
  {
    number: "03",
    title: "Brew",
    description: "Get brewing notes and roast profiles tailored to your gear.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-espresso-light py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-sage">Process</p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
          How Brewpoint Works
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-display text-4xl text-gold/40">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-xl text-cream">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
