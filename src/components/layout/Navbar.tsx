"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
];

const authedLinks = [
  { href: "/items/add", label: "Add Item" },
  { href: "/items/manage", label: "Manage Items" },
];

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const links = user ? [...baseLinks, ...authedLinks] : baseLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cream/10 bg-espresso/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl text-gold">
          Brewpoint
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cream/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {loading ? null : user ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-sm text-cream/80">
                <User size={16} />
                {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/80 transition-colors hover:border-gold hover:text-gold"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-cream/80 transition-colors hover:text-gold"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-espresso transition-opacity hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="text-cream md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-cream/10 bg-espresso px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-cream/80 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-cream/10 pt-4">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="text-left text-sm text-cream/80 hover:text-gold"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-sm text-cream/80 hover:text-gold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-gold px-5 py-2 text-center text-sm font-medium text-espresso"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
