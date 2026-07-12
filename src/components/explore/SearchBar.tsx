"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search beans, equipment, accessories..."
        className="w-full rounded-full border border-cream/20 bg-espresso-light py-3 pl-11 pr-4 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
      />
    </div>
  );
}
