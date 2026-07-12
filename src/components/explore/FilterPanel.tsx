"use client";

import { X } from "lucide-react";

export interface Filters {
  category: string;
  minPrice: string;
  maxPrice: string;
  rating: string;
  roastLevel: string;
}

const categories = [
  { value: "", label: "All" },
  { value: "beans", label: "Beans" },
  { value: "equipment", label: "Equipment" },
  { value: "accessories", label: "Accessories" },
];

const ratings = [
  { value: "", label: "Any Rating" },
  { value: "4", label: "4+ Stars" },
  { value: "4.5", label: "4.5+ Stars" },
];

const roastLevels = [
  { value: "", label: "Any Roast" },
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "dark", label: "Dark" },
];

export default function FilterPanel({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
}) {
  const set = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });
  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  const pillGroup = (
    label: string,
    options: { value: string; label: string }[],
    key: keyof Filters,
  ) => (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cream/50">
        {label}
      </h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => set(key, opt.value)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              filters[key] === opt.value
                ? "border-gold bg-gold text-espresso"
                : "border-cream/20 text-cream/70 hover:border-gold hover:text-gold"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 rounded-xl border border-cream/10 bg-espresso-light p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-cream">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-cream/50 hover:text-gold"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {pillGroup("Category", categories, "category")}
      {pillGroup("Roast Level", roastLevels, "roastLevel")}
      {pillGroup("Rating", ratings, "rating")}

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cream/50">
          Price Range
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => set("minPrice", e.target.value)}
            className="w-full rounded-lg border border-cream/20 bg-espresso px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
          />
          <span className="text-cream/30">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => set("maxPrice", e.target.value)}
            className="w-full rounded-lg border border-cream/20 bg-espresso px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
