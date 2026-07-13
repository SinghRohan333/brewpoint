import Link from "next/link";
import { Users, Leaf, Award, Globe2 } from "lucide-react";
import RoastDivider from "@/components/layout/RoastDivider";

const values = [
  {
    icon: Globe2,
    title: "Direct Sourcing",
    description:
      "Every listing connects you straight to the roaster or maker — no distributor markup, no anonymous supply chain.",
  },
  {
    icon: Award,
    title: "Craft Over Volume",
    description:
      "We favor small-batch producers who roast in weeks, not months, and stand behind what they make.",
  },
  {
    icon: Leaf,
    title: "Honest Sourcing Info",
    description:
      "Origin, roast date, and roast level are listed on every product — not buried in fine print.",
  },
  {
    icon: Users,
    title: "Built for Community",
    description:
      "Buyers leave real reviews, sellers respond directly, and the marketplace stays accountable to both sides.",
  },
];

const team = [
  {
    name: "Dana Okafor",
    role: "Co-Founder & CEO",
    bio: "Ran green coffee sourcing for a Seattle roastery for six years before starting Brewpoint.",
  },
  {
    name: "Tomás Reyes",
    role: "Co-Founder & Head of Engineering",
    bio: "Previously built marketplace infrastructure for a farm-to-table logistics startup.",
  },
  {
    name: "Wren Halligan",
    role: "Community Lead",
    bio: "Q-grader and former cafe manager who now vets every new roaster that joins the platform.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-sage">
          About Brewpoint
        </p>
        <h1 className="mt-3 font-display text-4xl text-cream sm:text-5xl">
          We built the marketplace we wished existed.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-cream/70">
          Brewpoint connects independent coffee roasters and equipment makers
          directly with the people who care where their coffee comes from — no
          distributors, no anonymous sourcing, no guesswork about what&apos;s
          actually in the bag.
        </p>
      </section>

      <RoastDivider />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sage">
              Our Story
            </p>
            <h2 className="mt-2 font-display text-3xl text-cream">
              Started in a Seattle roastery, not a boardroom.
            </h2>
          </div>
          <div className="space-y-4 text-cream/70">
            <p>
              Brewpoint started in 2023 after our co-founder Dana spent years
              watching small roasteries get squeezed between rising green coffee
              costs and distributors who took a cut without adding much value.
              Great coffee was getting made — it just wasn&apos;t reaching the
              people who wanted it.
            </p>
            <p>
              We built Brewpoint as a direct line between roasters, equipment
              makers, and home baristas. Every seller sets their own prices,
              writes their own listings, and builds their own reputation through
              real reviews — we just handle the infrastructure.
            </p>
            <p>
              Today, over a hundred independent roasters and makers list on
              Brewpoint, and we&apos;re still run by people who&apos;d rather be
              talking about roast curves than quarterly earnings.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-espresso-light py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-sm uppercase tracking-[0.2em] text-sage">
            What We Stand For
          </p>
          <h2 className="mt-2 text-center font-display text-3xl text-cream sm:text-4xl">
            Our Values
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-cream/10 bg-espresso p-6"
              >
                <Icon size={24} className="text-gold" />
                <h3 className="mt-4 font-display text-lg text-cream">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center text-sm uppercase tracking-[0.2em] text-sage">
          The Team
        </p>
        <h2 className="mt-2 text-center font-display text-3xl text-cream sm:text-4xl">
          Who&apos;s Behind Brewpoint
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-xl border border-cream/10 bg-espresso-light p-6 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 font-display text-xl text-gold">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="mt-4 font-display text-lg text-cream">
                {member.name}
              </h3>
              <p className="text-xs text-sage">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-espresso-light py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">
            Want to Sell on Brewpoint?
          </h2>
          <p className="mt-3 text-sm text-cream/60">
            Join independent roasters and makers already reaching buyers
            directly.
          </p>
          <Link
            href="/items/add"
            className="mt-6 inline-block rounded-full bg-gold px-7 py-3 text-sm font-medium text-espresso transition-opacity hover:opacity-90"
          >
            Start Selling
          </Link>
        </div>
      </section>
    </main>
  );
}
