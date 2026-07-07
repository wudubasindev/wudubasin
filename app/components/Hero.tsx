import { BadgeCheckIcon, MapPinIcon, ToolIcon } from "./icons";
import { siteConfig } from "@/lib/site-config";

const trustPoints = [
  { icon: BadgeCheckIcon, label: "Certified ceramic fixtures" },
  { icon: ToolIcon, label: "Professional installation" },
  { icon: MapPinIcon, label: `Based in ${siteConfig.serviceArea}` },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-sand-50">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-basin-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-sage-100/70 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center sm:py-28">
        <span className="rounded-full border border-basin-200 bg-basin-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-basin-700">
          Serving {siteConfig.serviceAreaLong}
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl sm:leading-tight">
          {siteConfig.tagline}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">
          Book a ceramic wudu sink with professional installation for a{" "}
          <span className="font-semibold text-basin-700">
            {siteConfig.depositAmount} deposit
          </span>{" "}
          — pay the remaining balance once the work is done. Built for homes,
          mosques, and Islamic schools.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#book"
            className="rounded-full bg-basin-700 px-7 py-3.5 text-sm font-semibold text-sand-50 shadow-sm shadow-basin-900/10 transition-colors hover:bg-basin-800"
          >
            Book Your Installation — {siteConfig.depositAmount} Deposit
          </a>
          <a
            href="#how-it-works"
            className="rounded-full border border-sand-300 bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 transition-colors hover:border-basin-300 hover:text-basin-700"
          >
            See How It Works
          </a>
        </div>

        <dl className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-x-6 gap-y-6">
          {trustPoints.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-basin-700 shadow-sm">
                <Icon className="h-5 w-5" />
              </span>
              <dt className="sr-only">{label}</dt>
              <dd className="text-xs font-medium leading-snug text-ink-600">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
