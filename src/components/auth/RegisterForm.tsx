"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    if (name.trim().length < 2) return "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success("Account created! Welcome to Brewpoint.");
      router.push("/");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="font-display text-3xl text-cream">Create your account</h1>
      <p className="mt-2 text-sm text-cream/60">
        Join Brewpoint to buy, sell, and review.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs text-cream/50">Full Name</label>
          <div className="relative mt-1">
            <User
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full rounded-full border border-cream/20 bg-espresso-light py-3 pl-11 pr-4 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
            />
          </div>
        </div>

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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-full border border-cream/20 bg-espresso-light py-3 pl-11 pr-12 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 transition-colors hover:text-cream/70"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-cream/50">Confirm Password</label>
          <div className="relative mt-1">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              className="w-full rounded-full border border-cream/20 bg-espresso-light py-3 pl-11 pr-12 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 transition-colors hover:text-cream/70"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-cream/60">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-gold hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
