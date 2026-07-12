import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-cream">Product Not Found</h1>
      <p className="mt-3 text-cream/60">
        This listing may have been removed or the link is incorrect.
      </p>
      <Link
        href="/explore"
        className="mt-6 rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso"
      >
        Browse the Marketplace
      </Link>
    </main>
  );
}
