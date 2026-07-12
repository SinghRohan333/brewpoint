"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="bg-espresso-light py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Mail className="mx-auto text-gold" size={32} />
        <h2 className="mt-4 font-display text-3xl text-cream sm:text-4xl">
          Stay in the Loop
        </h2>
        <p className="mt-3 text-sm text-cream/60">
          New roasters, seasonal beans, and gear drops — straight to your inbox,
          no spam.
        </p>

        {submitted ? (
          <div className="mt-6 flex items-center justify-center gap-2 text-sage">
            <CheckCircle2 size={20} />
            <span className="text-sm font-medium">
              You&apos;re subscribed. Welcome aboard.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full border border-cream/20 bg-espresso px-5 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none sm:w-72"
            />
            <button
              type="submit"
              className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso transition-opacity hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        )}
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    </section>
  );
}
