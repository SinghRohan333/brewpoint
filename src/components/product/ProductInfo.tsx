"use client";

import { useState } from "react";
import { Star, MapPin, Package, Share2, Check } from "lucide-react";
import { Product } from "@/lib/types";

export default function ProductInfo({ product }: { product: Product }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <span className="rounded-full bg-espresso-light px-3 py-1 text-xs capitalize text-sage">
        {product.category}
      </span>

      <h1 className="mt-4 font-display text-3xl text-cream sm:text-4xl">
        {product.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-cream/70">
        <span className="flex items-center gap-1">
          <Star size={16} className="fill-gold text-gold" />
          {product.rating > 0
            ? `${product.rating.toFixed(1)} (${product.reviewCount} reviews)`
            : "No reviews yet"}
        </span>
        {product.origin && (
          <span className="flex items-center gap-1">
            <MapPin size={16} />
            {product.origin}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Package size={16} />
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>

      <p className="mt-6 font-display text-3xl text-gold">
        ${product.price.toFixed(2)}
      </p>

      <p className="mt-6 leading-relaxed text-cream/70">
        {product.shortDescription}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#reviews"
          className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso transition-opacity hover:opacity-90"
        >
          See Reviews
        </a>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 rounded-full border border-cream/20 px-6 py-3 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          {copied ? "Link Copied" : "Share"}
        </button>
      </div>
    </div>
  );
}
