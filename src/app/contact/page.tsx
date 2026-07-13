import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

const info = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@brewpoint.com",
    href: "mailto:hello@brewpoint.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (206) 555-0148",
    href: "tel:+12065550148",
  },
  { icon: MapPin, label: "Location", value: "Seattle, WA" },
  { icon: Clock, label: "Response Time", value: "1–2 business days" },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-sage">
          Get in Touch
        </p>
        <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm text-cream/60">
          Questions about an order, a listing, or just want to say hello?
          We&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-cream/10 bg-espresso-light p-6 sm:p-8">
          <ContactForm />
        </div>
        <div className="space-y-4">
          {info.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-xl border border-cream/10 bg-espresso-light p-4"
            >
              <Icon size={18} className="mt-0.5 text-gold" />
              <div>
                <p className="text-xs text-cream/50">{label}</p>
                {href ? (
                  <a href={href} className="text-sm text-cream hover:text-gold">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-cream">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
