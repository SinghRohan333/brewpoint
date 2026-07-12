"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I start selling on Brewpoint?",
    answer:
      "Create an account, then head to Add Item from the navbar. Fill in your product details and it's live on the marketplace immediately — no approval wait.",
  },
  {
    question: "Are the roasters independently verified?",
    answer:
      "Each roaster listing includes their origin and business details. We're a marketplace connecting buyers and sellers directly, so we recommend reviewing seller ratings before purchasing.",
  },
  {
    question: "What if I want to remove a listing?",
    answer:
      "Go to Manage Items from the navbar. You'll see every product you've listed with a Delete option on each one.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Shipping is arranged directly between buyer and seller, so it depends on the individual roaster or maker's listed location and policies.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-center text-sm uppercase tracking-[0.2em] text-sage">
        FAQ
      </p>
      <h2 className="mt-2 text-center font-display text-3xl text-cream sm:text-4xl">
        Common Questions
      </h2>

      <div className="mt-10 space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-cream/10 bg-espresso-light"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-medium text-cream sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <p className="px-6 pb-4 text-sm leading-relaxed text-cream/60">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
