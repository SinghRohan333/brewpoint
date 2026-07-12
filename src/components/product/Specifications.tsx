import { Product } from "@/lib/types";

export default function Specifications({ product }: { product: Product }) {
  const specs = [
    { label: "Category", value: product.category },
    { label: "Origin", value: product.origin || "—" },
    ...(product.roastLevel
      ? [{ label: "Roast Level", value: product.roastLevel }]
      : []),
    { label: "Price", value: `$${product.price.toFixed(2)}` },
    { label: "Stock", value: `${product.stock} units` },
    {
      label: "Listed",
      value: new Date(product.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  return (
    <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
      <div>
        <h2 className="font-display text-2xl text-cream">Overview</h2>
        <p className="mt-4 leading-relaxed text-cream/70">
          {product.fullDescription}
        </p>
      </div>

      <div className="rounded-xl border border-cream/10 bg-espresso-light p-6">
        <h3 className="font-display text-lg text-cream">Specifications</h3>
        <dl className="mt-4 space-y-3">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between border-b border-cream/10 pb-2 text-sm last:border-0 last:pb-0"
            >
              <dt className="text-cream/50">{spec.label}</dt>
              <dd className="capitalize text-cream">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
