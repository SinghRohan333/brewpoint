import Link from "next/link";
import { Coffee } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Coffee className="text-gold" size={40} />
      <h1 className="mt-4 font-display text-5xl text-cream">404</h1>
      <p className="mt-3 text-lg text-cream/70">
        This page has been fully brewed and consumed.
      </p>
      <p className="mt-1 text-sm text-cream/50">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso transition-opacity hover:opacity-90"
        >
          Back to Home
        </Link>
        <Link
          href="/explore"
          className="rounded-full border border-cream/20 px-6 py-3 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
        >
          Explore Marketplace
        </Link>
      </div>
    </main>
  );
}
