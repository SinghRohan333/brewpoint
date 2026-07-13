"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { AdminUser } from "@/lib/types";

export default function UsersTable() {
  const { accessToken, user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const data = await apiFetch<{ data: AdminUser[] }>("/admin/users", {
        token: accessToken || undefined,
      });
      setUsers(data.data);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const toggleRole = async (u: AdminUser) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    setBusyId(u._id);
    try {
      await apiFetch(`/admin/users/${u._id}/role`, {
        method: "PATCH",
        token: accessToken || undefined,
        body: JSON.stringify({ role: newRole }),
      });
      setUsers((prev) =>
        prev.map((x) => (x._id === u._id ? { ...x, role: newRole } : x)),
      );
      toast.success(`${u.name} is now ${newRole}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setBusyId(id);
    try {
      await apiFetch(`/admin/users/${id}`, {
        method: "DELETE",
        token: accessToken || undefined,
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User and their listings deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete user");
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
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Listings</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/10">
            {users.map((u) => {
              const isSelf = u._id === currentUser?.id;
              return (
                <tr key={u._id}>
                  <td className="px-5 py-4 text-cream">
                    {u.name}{" "}
                    {isSelf && (
                      <span className="text-xs text-cream/40">(you)</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-cream/70">{u.email}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs capitalize ${u.role === "admin" ? "bg-gold text-espresso" : "border border-cream/20 text-cream/70"}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-cream/70">{u.productCount}</td>
                  <td className="px-5 py-4 text-cream/50">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleRole(u)}
                        disabled={isSelf || busyId === u._id}
                        title={
                          u.role === "admin"
                            ? "Demote to user"
                            : "Promote to admin"
                        }
                        className="rounded-full border border-cream/20 p-2 text-cream/70 hover:border-gold hover:text-gold disabled:opacity-30"
                      >
                        {u.role === "admin" ? (
                          <ShieldOff size={16} />
                        ) : (
                          <ShieldCheck size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => setConfirmId(u._id)}
                        disabled={isSelf || busyId === u._id}
                        className="rounded-full border border-cream/20 p-2 text-cream/70 hover:border-red-400 hover:text-red-400 disabled:opacity-30"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-sm rounded-xl border border-cream/10 bg-espresso-light p-6">
            <h3 className="font-display text-lg text-cream">
              Delete this user?
            </h3>
            <p className="mt-2 text-sm text-cream/60">
              This also deletes every product they&apos;ve listed and their
              reviews. Can&apos;t be undone.
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
