const sections = [
  {
    title: "Information We Collect",
    body: "We collect the information you provide when creating an account — name, email, and listings you create — along with basic usage data to keep the marketplace running smoothly.",
  },
  {
    title: "How We Use It",
    body: "Your information is used to operate your account, process listings and reviews, and communicate with you about your activity on Brewpoint. We do not sell your data to third parties.",
  },
  {
    title: "Data Security",
    body: "Passwords are hashed and never stored in plain text. Access tokens are short-lived, and refresh tokens are stored in secure, HTTP-only cookies.",
  },
  {
    title: "Your Rights",
    body: "You can request access to or deletion of your account data at any time by contacting us through the Contact page.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl text-cream">Privacy Policy</h1>
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
