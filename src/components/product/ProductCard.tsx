import Link from "next/link";
import { Star, MapPin, Coffee } from "lucide-react";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-cream/10 bg-espresso-light">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-espresso">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-cream/20">
            <Coffee size={40} />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-espresso/80 px-3 py-1 text-xs capitalize text-cream backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 font-display text-lg text-cream">
          {product.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-cream/60">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm text-cream/70">
          <span className="flex items-center gap-1">
            <Star size={14} className="fill-gold text-gold" />
            {product.rating > 0 ? product.rating.toFixed(1) : "New"}
          </span>
          {product.origin && (
            <span className="flex items-center gap-1 truncate">
              <MapPin size={14} />
              {product.origin}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl text-gold">
            ${product.price.toFixed(2)}
          </span>
          <Link
            href={`/products/${product._id}`}
            className="rounded-full border border-cream/20 px-4 py-1.5 text-xs font-medium text-cream transition-colors hover:border-gold hover:text-gold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
