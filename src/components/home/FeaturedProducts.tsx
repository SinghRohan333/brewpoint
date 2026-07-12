"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Product } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiFetch<{ data: Product[] }>(
          "/products?sort=rating_desc&limit=4",
        );
        setProducts(data.data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sage">
            Handpicked
          </p>
          <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
            Featured Products
          </h2>
        </div>
        <Link
          href="/explore"
          className="hidden text-sm font-medium text-gold hover:underline sm:block"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-cream/50">
            No products yet — be the first to list one.
          </p>
        )}
      </div>
    </section>
  );
}
