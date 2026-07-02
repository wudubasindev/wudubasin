import {
  BadgeCheckIcon,
  MapPinIcon,
  ShieldCheckIcon,
  ToolIcon,
  TruckIcon,
  HomeIcon,
} from "./icons";
import { siteConfig } from "@/lib/site-config";

const reasons = [
  {
    icon: BadgeCheckIcon,
    title: "Certified fixtures",
    description:
      "Our ceramic sinks come from a manufacturer certified to CE, CUPC, and WaterMark standards, with ISO 9001 quality processes behind every batch.",
  },
  {
    icon: TruckIcon,
    title: "Experienced manufacturing partner",
    description:
      "14+ years producing bathroom fixtures, with a strong track record of on-time delivery.",
  },
  {
    icon: ToolIcon,
    title: "Professional installation included",
    description:
      "We don't just drop off a sink — our installers handle the full setup so it's ready to use.",
  },
  {
    icon: HomeIcon,
    title: "Built for community spaces",
    description:
      "Sized and finished for homes, mosques, and Islamic schools alike.",
  },
  {
    icon: MapPinIcon,
    title: `Local to ${siteConfig.serviceArea}`,
    description:
      "We're a local service, not a big-box retailer shipping a box and moving on.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Warranty included",
    description: "Every install comes with 3 years of coverage on the fixture itself.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            Why choose us
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            Trustworthy fixtures, professional installation, and a service
            that&apos;s local to {siteConfig.serviceArea}.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-sand-200 bg-sand-50 p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-basin-700">
                <reason.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-ink-900">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
