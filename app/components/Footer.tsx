import { DropletIcon } from "./icons";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#the-sink", label: "The Sink" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#book", label: "Book Now" },
];

const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund & Cancellation Policy" },
  { href: "/liability-waiver", label: "Installation Agreement & Liability" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand-200 bg-sand-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-basin-700 text-sand-50">
                <DropletIcon className="h-3.5 w-3.5" />
              </span>
              <span className="font-display text-base font-semibold text-ink-900">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              Ceramic wudu sinks and professional installation for homes,
              mosques, and Islamic schools, serving{" "}
              {siteConfig.serviceAreaLong}.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink-900">Explore</p>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-600 transition-colors hover:text-basin-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink-900">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              {/* TODO: confirm real business phone/email before launch */}
              <li>{siteConfig.contactPhone}</li>
              <li>{siteConfig.contactEmail}</li>
              <li>{siteConfig.serviceAreaLong}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-sand-200 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {siteConfig.name}. All rights reserved.
          </span>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-basin-700">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
