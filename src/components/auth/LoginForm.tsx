"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const DEMO_EMAIL = "demo.user@brewpoint.com";
const DEMO_PASSWORD = "Demo@1234";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setError("");
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push(redirectTo);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="font-display text-3xl text-cream">Welcome back</h1>
      <p className="mt-2 text-sm text-cream/60">
        Log in to manage your listings and orders.
      </p>

      <button
        onClick={fillDemo}
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-sage/40 bg-sage/10 px-4 py-2.5 text-sm font-medium text-sage transition-colors hover:bg-sage/20"
      >
        <Sparkles size={16} />
        Fill Demo Credentials
      </button>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs text-cream/50">Email</label>
          <div className="relative mt-1">
            <Mail
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full border border-cream/20 bg-espresso-light py-3 pl-11 pr-4 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-cream/50">Password</label>
          <div className="relative mt-1">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-full border border-cream/20 bg-espresso-light py-3 pl-11 pr-4 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-cream/60">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-gold hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
