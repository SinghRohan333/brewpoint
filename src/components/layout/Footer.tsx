import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-espresso-light">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl text-gold">Brewpoint</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              A marketplace connecting independent roasters and equipment makers
              with home baristas who care where their coffee comes from.
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-cream/60 hover:text-gold"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-cream/60 hover:text-gold"
              >
                <FaXTwitter size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-cream/60 hover:text-gold"
              >
                <FaFacebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-cream">
              Marketplace
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li>
                <Link
                  href="/explore?category=beans"
                  className="hover:text-gold"
                >
                  Coffee Beans
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=equipment"
                  className="hover:text-gold"
                >
                  Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=accessories"
                  className="hover:text-gold"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/items/add" className="hover:text-gold">
                  Sell on Brewpoint
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-cream">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li>
                <Link href="/about" className="hover:text-gold">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-cream">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gold" />
                <a
                  href="mailto:hello@brewpoint.com"
                  className="hover:text-gold"
                >
                  hello@brewpoint.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gold" />
                <a href="tel:+12065550148" className="hover:text-gold">
                  +1 (206) 555-0148
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-gold" />
                <span>Seattle, WA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-sm text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Brewpoint. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
