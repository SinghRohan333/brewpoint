"use client";

import { useState } from "react";
import AdminRoute from "@/components/auth/AdminRoute";
import StatsCards from "@/components/admin/StatsCards";
import UsersTable from "@/components/admin/UsersTable";
import AdminProductsTable from "@/components/admin/AdminProductsTable";

type Tab = "users" | "products";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("users");

  return (
    <AdminRoute>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="font-display text-3xl text-cream sm:text-4xl">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-sm text-cream/60">
          Platform-wide user and product management.
        </p>

        <div className="mt-8">
          <StatsCards />
        </div>

        <div className="mt-10 flex gap-2 border-b border-cream/10">
          {(["users", "products"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm capitalize transition-colors ${
                tab === t
                  ? "border-b-2 border-gold font-medium text-gold"
                  : "text-cream/60 hover:text-cream"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "users" ? <UsersTable /> : <AdminProductsTable />}
        </div>
      </main>
    </AdminRoute>
  );
}
