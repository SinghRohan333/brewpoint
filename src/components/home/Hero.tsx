import Link from "next/link";
import RoastSlider from "./RoastSlider";

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sage">
            Specialty Coffee Marketplace
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
            Coffee, traced back to its roaster.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70">
            Brewpoint connects independent roasters and equipment makers
            directly with home baristas — every bag and every tool comes with a
            name, a story, and a roast profile behind it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-espresso transition-opacity hover:opacity-90"
            >
              Explore the Marketplace
            </Link>
            <Link
              href="/items/add"
              className="rounded-full border border-cream/20 px-7 py-3 text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Sell Your Roast
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <RoastSlider />
        </div>
      </div>
    </section>
  );
}
