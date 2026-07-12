"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const stats = [
  { value: 120, suffix: "+", label: "Independent Roasters" },
  { value: 34, suffix: "", label: "Countries Sourced" },
  { value: 8500, suffix: "+", label: "Orders Shipped" },
  { value: 4.8, suffix: "/5", label: "Average Rating", decimal: true },
];

function StatItem({
  value,
  suffix,
  label,
  decimal,
}: {
  value: number;
  suffix: string;
  label: string;
  decimal?: boolean;
}) {
  const { count, ref } = useCountUp(decimal ? value * 10 : value);
  const display = decimal ? (count / 10).toFixed(1) : count;

  return (
    <div className="text-center">
      <span ref={ref} className="font-display text-4xl text-gold sm:text-5xl">
        {display}
        {suffix}
      </span>
      <p className="mt-2 text-sm text-cream/60">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
