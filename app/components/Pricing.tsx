import { CheckCircleIcon } from "./icons";
import { siteConfig } from "@/lib/site-config";

const included = [
  "Ceramic wudu sink (glossy finish, 12L capacity)",
  "Delivery to your home, mosque, or school",
  "Professional floor-mounted installation",
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-sand-100 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            One package: the sink, delivery, and professional installation.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-sand-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="font-display text-5xl font-semibold text-basin-700">
              {siteConfig.depositAmount}
            </span>
            <span className="text-sm font-medium text-ink-600">
              deposit, due today, to book your installation
            </span>
          </div>

          <p className="mx-auto mt-6 max-w-sm text-center text-sm text-ink-600">
            Your final price depends on your site&apos;s setup and will be
            confirmed in a written quote before any work begins. Your deposit
            is credited toward that total.
          </p>

          <ul className="mt-10 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-basin-600" />
                <span className="text-sm text-ink-600">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <a
              href="#book"
              className="rounded-full bg-basin-700 px-7 py-3.5 text-sm font-semibold text-sand-50 shadow-sm shadow-basin-900/10 transition-colors hover:bg-basin-800"
            >
              Book Your Installation — {siteConfig.depositAmount} Deposit
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-ink-400">
            You&apos;ll share a few details about your install before paying.
          </p>
        </div>
      </div>
    </section>
  );
}
