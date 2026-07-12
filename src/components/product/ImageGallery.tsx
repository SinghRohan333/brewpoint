"use client";

import { useState } from "react";

export default function ImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-4/3 items-center justify-center rounded-xl border border-cream/10 bg-espresso-light text-cream/20">
        No image available
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-4/3 overflow-hidden rounded-xl border border-cream/10 bg-espresso-light">
        <img
          src={images[active]}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                active === i ? "border-gold" : "border-cream/10"
              }`}
            >
              <img
                src={img}
                alt={`${title} ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
