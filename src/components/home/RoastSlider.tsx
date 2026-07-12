"use client";

import { useState } from "react";
import Link from "next/link";

const roasts = {
  light: {
    label: "Light Roast",
    notes: "Bright, floral, citrus-forward",
    color: "#D9B98A",
  },
  medium: {
    label: "Medium Roast",
    notes: "Balanced, caramel, gentle acidity",
    color: "#A9702E",
  },
  dark: {
    label: "Dark Roast",
    notes: "Bold, smoky, deep cocoa",
    color: "#4A2E1D",
  },
} as const;

type RoastKey = keyof typeof roasts;
const order: RoastKey[] = ["light", "medium", "dark"];

export default function RoastSlider() {
  const [index, setIndex] = useState(1);
  const key = order[index];
  const roast = roasts[key];

  return (
    <div className="w-full max-w-sm">
      <div
        className="flex h-40 w-full items-end justify-center rounded-2xl p-6 transition-colors duration-500"
        style={{ backgroundColor: roast.color }}
      >
        <span className="font-display text-xl text-espresso">
          {roast.label}
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={2}
        step={1}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        className="mt-5 w-full accent-gold"
        aria-label="Select roast level"
      />
      <div className="mt-1 flex justify-between text-xs text-cream/50">
        <span>Light</span>
        <span>Medium</span>
        <span>Dark</span>
      </div>

      <p className="mt-4 text-sm text-cream/70">{roast.notes}</p>

      <Link
        href={`/explore?roastLevel=${key}`}
        className="mt-4 inline-block text-sm font-medium text-gold underline-offset-4 hover:underline"
      >
        Explore {roast.label.toLowerCase()}s →
      </Link>
    </div>
  );
}
