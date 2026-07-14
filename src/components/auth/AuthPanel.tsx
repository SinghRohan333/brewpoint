import { Coffee } from "lucide-react";

export default function AuthPanel() {
  return (
    <div className="relative hidden overflow-hidden bg-espresso-light lg:block">
      <img
        src="/auth-panel.png"
        alt=""
        className="h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-espresso via-espresso/60 to-transparent p-12">
        <Coffee className="text-gold" size={32} />
        <h2 className="mt-4 font-display text-3xl text-cream">
          Coffee, traced back to its roaster.
        </h2>
        <p className="mt-3 max-w-sm text-sm text-cream/70">
          Join a marketplace built on direct relationships between roasters,
          makers, and the people who brew.
        </p>
      </div>
    </div>
  );
}
