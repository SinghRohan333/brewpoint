import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ManageItemsList from "@/components/items/ManageItemsList";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-cream sm:text-4xl">
              Manage Items
            </h1>
            <p className="mt-2 text-sm text-cream/60">
              Everything you&apos;ve listed on Brewpoint.
            </p>
          </div>
          <Link
            href="/items/add"
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-espresso sm:flex"
          >
            <Plus size={16} />
            Add Item
          </Link>
        </div>
        <ManageItemsList />
      </main>
    </ProtectedRoute>
  );
}
