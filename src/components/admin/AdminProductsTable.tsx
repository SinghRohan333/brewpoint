"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Eye, Trash2, Star } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { AdminProduct } from "@/lib/types";

export default function AdminProductsTable() {
  const { accessToken } = useAuth();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await apiFetch<{ data: AdminProduct[] }>("/admin/products", {
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
    if (accessToken) fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleDelete = async (id: string) => {
    setBusyId(id);
    try {
      await apiFetch(`/products/${id}`, {
        method: "DELETE",
        token: accessToken || undefined,
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete product",
      );
    } finally {
      setBusyId(null);
      setConfirmId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-xl bg-espresso-light"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-cream/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-espresso-light text-xs uppercase tracking-wide text-cream/50">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Seller</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/10">
            {products.map((p) => (
              <tr key={p._id}>
                <td className="line-clamp-1 px-5 py-4 text-cream">{p.title}</td>
                <td className="px-5 py-4 text-cream/70">{p.sellerName}</td>
                <td className="px-5 py-4 capitalize text-cream/70">
                  {p.category}
                </td>
                <td className="px-5 py-4 text-cream/70">
                  ${p.price.toFixed(2)}
                </td>
                <td className="px-5 py-4 text-cream/70">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="fill-gold text-gold" />
                    {p.rating > 0 ? p.rating.toFixed(1) : "New"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/products/${p._id}`}
                      className="rounded-full border border-cream/20 p-2 text-cream/70 hover:border-gold hover:text-gold"
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      onClick={() => setConfirmId(p._id)}
                      disabled={busyId === p._id}
                      className="rounded-full border border-cream/20 p-2 text-cream/70 hover:border-red-400 hover:text-red-400 disabled:opacity-30"
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

      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-sm rounded-xl border border-cream/10 bg-espresso-light p-6">
            <h3 className="font-display text-lg text-cream">
              Delete this product?
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
                disabled={busyId === confirmId}
                className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {busyId === confirmId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
