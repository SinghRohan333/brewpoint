import { MapPin } from "lucide-react";

const roasters = [
  {
    name: "Cedar & Stone Roasters",
    location: "Portland, OR",
    tagline: "Small-batch roasting focused on single-origin transparency.",
    since: "2019",
    image:
      "https://res.cloudinary.com/dcu16rh2e/image/upload/v1783979276/1_Cedar_Stone_Roasters-clean_xo3qtj.png",
  },
  {
    name: "Pourhouse Supply Co.",
    location: "Austin, TX",
    tagline: "Equipment makers obsessed with precision brewing.",
    since: "2021",
    image:
      "https://res.cloudinary.com/dcu16rh2e/image/upload/v1783979284/2_Pourhouse_Supply_Co-clean_uohcnk.png",
  },
  {
    name: "Northbound Coffee",
    location: "Minneapolis, MN",
    tagline:
      "Direct-trade beans sourced through long-term farmer partnerships.",
    since: "2017",
    image:
      "https://res.cloudinary.com/dcu16rh2e/image/upload/v1783979281/3_Northbound_Coffee-clean_ymgzeu.png",
  },
];

export default function FeaturedRoasters() {
  return (
    <section className="bg-espresso-light py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-sage">
          Community
        </p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
          Featured Roasters
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {roasters.map((roaster) => (
            <div
              key={roaster.name}
              className="overflow-hidden rounded-xl border border-cream/10 bg-espresso"
            >
              <div className="aspect-4/3 w-full overflow-hidden">
                <img
                  src={roaster.image}
                  alt={roaster.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-cream">
                  {roaster.name}
                </h3>
                <span className="mt-1 flex items-center gap-1 text-xs text-cream/50">
                  <MapPin size={12} />
                  {roaster.location} · Since {roaster.since}
                </span>
                <p className="mt-3 text-sm text-cream/60">{roaster.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
