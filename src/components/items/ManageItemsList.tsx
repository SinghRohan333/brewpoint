"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Trash2, Eye, Package } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Product } from "@/lib/types";
import { toast } from "react-toastify";

export default function ManageItemsList() {
  const { accessToken } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchMine = async () => {
    try {
      const data = await apiFetch<{ data: Product[] }>("/products/mine", {
        token: accessToken || undefined,
      });
      setProducts(data.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) fetchMine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await apiFetch(`/products/${id}`, {
        method: "DELETE",
        token: accessToken || undefined,
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Item deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete item");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-xl bg-espresso-light"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-cream/10 bg-espresso-light py-16 text-center">
        <Package className="text-cream/20" size={40} />
        <p className="mt-4 text-cream/60">
          You haven&apos;t listed any items yet.
        </p>
        <Link
          href="/items/add"
          className="mt-4 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-espresso"
        >
          Add Your First Item
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-cream/10 lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-espresso-light text-xs uppercase tracking-wide text-cream/50">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/10">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="flex items-center gap-3 px-5 py-4">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-espresso-light">
                    {product.images[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <span className="line-clamp-1 text-cream">
                    {product.title}
                  </span>
                </td>
                <td className="px-5 py-4 capitalize text-cream/70">
                  {product.category}
                </td>
                <td className="px-5 py-4 text-cream/70">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-5 py-4 text-cream/70">{product.stock}</td>
                <td className="px-5 py-4 text-cream/70">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="fill-gold text-gold" />
                    {product.rating > 0 ? product.rating.toFixed(1) : "New"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/products/${product._id}`}
                      className="rounded-full border border-cream/20 p-2 text-cream/70 hover:border-gold hover:text-gold"
                      aria-label="View product"
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      onClick={() => setConfirmId(product._id)}
                      className="rounded-full border border-cream/20 p-2 text-cream/70 hover:border-red-400 hover:text-red-400"
                      aria-label="Delete product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 lg:hidden">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-xl border border-cream/10 bg-espresso-light p-4"
          >
            <div className="flex gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-espresso">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-medium text-cream">
                  {product.title}
                </p>
                <p className="mt-1 text-xs capitalize text-cream/50">
                  {product.category}
                </p>
                <div className="mt-1 flex items-center gap-3 text-sm text-cream/70">
                  <span>${product.price.toFixed(2)}</span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="fill-gold text-gold" />
                    {product.rating > 0 ? product.rating.toFixed(1) : "New"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                href={`/products/${product._id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-cream/20 py-2 text-xs text-cream/70"
              >
                <Eye size={14} />
                View
              </Link>
              <button
                onClick={() => setConfirmId(product._id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-cream/20 py-2 text-xs text-cream/70 hover:border-red-400 hover:text-red-400"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-sm rounded-xl border border-cream/10 bg-espresso-light p-6">
            <h3 className="font-display text-lg text-cream">
              Delete this item?
            </h3>
            <p className="mt-2 text-sm text-cream/60">
              This can&apos;t be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 rounded-full border border-cream/20 py-2.5 text-sm text-cream"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={deletingId === confirmId}
                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {deletingId === confirmId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
