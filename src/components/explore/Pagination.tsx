"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="rounded-full border border-cream/20 p-2 text-cream/70 hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-cream/20 disabled:hover:text-cream/70"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, i) => (
        <div key={p} className="flex items-center gap-2">
          {i > 0 && pages[i - 1] !== p - 1 && (
            <span className="text-cream/30">…</span>
          )}
          <button
            onClick={() => onChange(p)}
            className={`h-9 w-9 rounded-full text-sm transition-colors ${
              p === page
                ? "bg-gold text-espresso"
                : "text-cream/70 hover:bg-cream/10"
            }`}
          >
            {p}
          </button>
        </div>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="rounded-full border border-cream/20 p-2 text-cream/70 hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-cream/20 disabled:hover:text-cream/70"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
