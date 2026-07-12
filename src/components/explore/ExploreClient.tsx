"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Product } from "@/lib/types";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import SearchBar from "./SearchBar";
import FilterPanel, { Filters } from "./FilterPanel";
import SortSelect from "./SortSelect";
import Pagination from "./Pagination";

export default function ExploreClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [filters, setFilters] = useState<Filters>({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    rating: searchParams.get("rating") || "",
    roastLevel: searchParams.get("roastLevel") || "",
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebouncedValue(search, 400);

  // Reset to page 1 whenever filters/search/sort change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters, sort]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (filters.category) params.set("category", filters.category);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.rating) params.set("rating", filters.rating);
    if (filters.roastLevel) params.set("roastLevel", filters.roastLevel);
    params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", "12");

    router.replace(`/explore?${params.toString()}`, { scroll: false });

    try {
      const data = await apiFetch<{
        data: Product[];
        pagination: { totalPages: number; total: number };
      }>(`/products?${params.toString()}`);
      setProducts(data.data);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filters, sort, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      roastLevel: "",
    });
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-cream sm:text-4xl">
          Explore the Marketplace
        </h1>
        <p className="mt-2 text-sm text-cream/60">
          {loading
            ? "Searching..."
            : `${total} product${total !== 1 ? "s" : ""} found`}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2.5 text-sm text-cream lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
          />
        </aside>

        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full py-12 text-center text-cream/50">
                No products match your filters. Try adjusting or clearing them.
              </p>
            )}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </main>
  );
}
