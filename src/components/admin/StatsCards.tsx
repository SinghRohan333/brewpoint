"use client";

import { useEffect, useState } from "react";
import { Users, ShieldCheck, Package, Star } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface Stats {
  totalUsers: number;
  totalAdmins: number;
  totalProducts: number;
  totalReviews: number;
}

export default function StatsCards() {
  const { accessToken } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      try {
        const data = await apiFetch<{ data: Stats }>("/admin/stats", {
          token: accessToken,
        });
        setStats(data.data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [accessToken]);

  const cards = [
    { label: "Total Users", value: stats?.totalUsers, icon: Users },
    { label: "Admins", value: stats?.totalAdmins, icon: ShieldCheck },
    { label: "Total Products", value: stats?.totalProducts, icon: Package },
    { label: "Total Reviews", value: stats?.totalReviews, icon: Star },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-cream/10 bg-espresso-light p-5"
        >
          <Icon size={20} className="text-gold" />
          <p className="mt-3 font-display text-2xl text-cream">
            {loading ? "—" : value}
          </p>
          <p className="mt-1 text-xs text-cream/50">{label}</p>
        </div>
      ))}
    </div>
  );
}
