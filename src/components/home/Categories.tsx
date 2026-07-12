import Link from "next/link";
import { Coffee, Wrench, Package } from "lucide-react";

const categories = [
  {
    key: "beans",
    label: "Coffee Beans",
    description: "Single-origin and blended beans from independent roasters.",
    icon: Coffee,
  },
  {
    key: "equipment",
    label: "Equipment",
    description: "Grinders, brewers, and kettles built to last.",
    icon: Wrench,
  },
  {
    key: "accessories",
    label: "Accessories",
    description: "Filters, scales, and everything else your setup needs.",
    icon: Package,
  },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-sage">Browse</p>
      <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
        Shop by Category
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {categories.map(({ key, label, description, icon: Icon }) => (
          <Link
            key={key}
            href={`/explore?category=${key}`}
            className="group rounded-xl border border-cream/10 bg-espresso-light p-8 transition-colors hover:border-gold"
          >
            <Icon size={28} className="text-gold" />
            <h3 className="mt-4 font-display text-xl text-cream">{label}</h3>
            <p className="mt-2 text-sm text-cream/60">{description}</p>
            <span className="mt-4 inline-block text-sm font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
              Browse →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
