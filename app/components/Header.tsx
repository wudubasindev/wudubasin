import Link from "next/link";
import { DropletIcon } from "./icons";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#the-sink", label: "The Sink" },
  { href: "#why-us", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-basin-700 text-sand-50">
            <DropletIcon className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-basin-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#book"
          className="rounded-full bg-basin-700 px-4 py-2 text-sm font-semibold text-sand-50 transition-colors hover:bg-basin-800"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}
