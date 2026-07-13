const sections = [
  {
    title: "Marketplace Role",
    body: "Brewpoint connects independent sellers with buyers. Transactions, shipping, and fulfillment are arranged directly between buyer and seller unless otherwise stated.",
  },
  {
    title: "Account Responsibilities",
    body: "You're responsible for the accuracy of listings you create and for maintaining the security of your account credentials.",
  },
  {
    title: "Reviews",
    body: "Reviews must reflect genuine experiences with a purchased product. Reviews that violate this may be removed.",
  },
  {
    title: "Limitation of Liability",
    body: "Brewpoint is not liable for disputes arising directly between buyers and sellers regarding product quality, shipping, or fulfillment.",
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl text-cream">Terms of Service</h1>
      <p className="mt-2 text-sm text-cream/50">Last updated: July 2026</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl text-cream">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-cream/70">{s.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
