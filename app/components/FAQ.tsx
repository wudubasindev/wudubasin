import { siteConfig } from "@/lib/site-config";

const faqs = [
  {
    question: "Is the deposit refundable?",
    // TODO: confirm the exact refund/cancellation policy with the business owner.
    answer:
      `Your ${siteConfig.depositAmount} deposit reserves your installation date and is credited toward your total price. It's non-refundable once your install date is confirmed, but if your plans change, reach out and we'll do our best to work with you on rescheduling.`,
  },
  {
    question: "How long does the installation take?",
    // TODO: confirm typical install duration with the installation team.
    answer:
      "Most installs are completed in a single visit, typically within a few hours depending on your existing plumbing setup.",
  },
  {
    question: "Do you serve areas outside London?",
    answer: `We're currently based in and serving ${siteConfig.serviceAreaLong}. If you're just outside that area, reach out and let us know your location — we're actively looking to expand.`,
  },
  {
    question: "What if I already have my own sink?",
    // TODO: confirm whether install-only service is offered and its pricing.
    answer:
      "If you already have a wudu sink and just need professional installation, contact us and we'll quote the install-only service separately.",
  },
  {
    question: "What's covered under warranty?",
    // TODO: confirm whether installation workmanship is separately warrantied.
    answer:
      "Every sink comes with a 3-year warranty on the fixture itself, covering manufacturing defects in the ceramic and hardware.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-sand-100 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-sand-200 bg-white p-5 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink-900">
                {faq.question}
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sand-100 text-ink-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
