import { BookIcon, CalendarIcon, ToolIcon, CheckCircleIcon } from "./icons";
import { siteConfig } from "@/lib/site-config";

const steps = [
  {
    icon: BookIcon,
    title: `Book with a ${siteConfig.depositAmount} deposit`,
    description:
      "Reserve your sink and installation package online in a couple of minutes.",
  },
  {
    icon: CalendarIcon,
    title: "We schedule your install",
    description:
      "We confirm a date that works for your home, mosque, or school.",
  },
  {
    icon: ToolIcon,
    title: "Delivery & installation",
    description:
      "Our team brings the sink and handles the full install, start to finish.",
  },
  {
    icon: CheckCircleIcon,
    title: "Pay the balance on completion",
    description:
      "Once everything's installed and running, you settle the remaining balance.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            A simple, four-step process from booking to a finished
            installation.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-sand-200 bg-sand-50 p-6 shadow-sm"
            >
              <span className="absolute right-5 top-5 font-display text-2xl font-semibold text-sand-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-basin-700 text-sand-50">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
