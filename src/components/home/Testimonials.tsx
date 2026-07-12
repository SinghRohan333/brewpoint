"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Nair",
    role: "Home barista, 2 years",
    quote:
      "The roast-level filter alone sold me. I found a Kenya AA in under a minute that actually matched what I was craving.",
    rating: 5,
  },
  {
    name: "Marcus Webb",
    role: "Small cafe owner",
    quote:
      "I've sourced three of my house blends through Brewpoint roasters directly. Cuts out the distributor markup entirely.",
    rating: 5,
  },
  {
    name: "Elena Fischer",
    role: "Pour-over enthusiast",
    quote:
      "Listing my old grinder on Manage Items took five minutes and it sold within a week. Genuinely easier than other marketplaces.",
    rating: 4,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-sage">
        Testimonials
      </p>
      <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
        What Buyers Say
      </h2>

      <div className="mt-10 rounded-2xl border border-cream/10 bg-espresso-light p-8 sm:p-12">
        <Quote className="text-gold" size={32} />
        <p className="mt-4 max-w-2xl font-display text-xl leading-relaxed text-cream sm:text-2xl">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-cream">{testimonial.name}</p>
            <p className="text-sm text-cream/50">{testimonial.role}</p>
            <div className="mt-1 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < testimonial.rating
                      ? "fill-gold text-gold"
                      : "text-cream/20"
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="rounded-full border border-cream/20 p-2 text-cream/70 hover:border-gold hover:text-gold"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="rounded-full border border-cream/20 p-2 text-cream/70 hover:border-gold hover:text-gold"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
