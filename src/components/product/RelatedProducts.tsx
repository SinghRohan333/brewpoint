import Link from "next/link";
import { Product } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";

async function getRelated(
  category: string,
  excludeId: string,
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?category=${category}&limit=5`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data as Product[])
      .filter((p) => p._id !== excludeId)
      .slice(0, 4);
  } catch {
    return [];
  }
}

export default async function RelatedProducts({
  category,
  excludeId,
}: {
  category: string;
  excludeId: string;
}) {
  const related = await getRelated(category, excludeId);
  if (related.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-2xl text-cream">
          You Might Also Like
        </h2>
        <Link
          href={`/explore?category=${category}`}
          className="text-sm font-medium text-gold hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
