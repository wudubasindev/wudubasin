import { DepositButton } from "./DepositButton";
import { BookingForm } from "./BookingForm";
import { siteConfig } from "@/lib/site-config";

export function BookingSection() {
  return (
    <section id="book" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            Ready to book your installation?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            Pay your {siteConfig.depositAmount} deposit to lock in your spot,
            or send us your details and we&apos;ll follow up with you.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-sand-200 bg-basin-50 p-8 text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-basin-700">
              Fastest way to book
            </span>
            <p className="text-sm text-ink-600">
              Secure payment, powered by Stripe. Your deposit is credited
              toward your total price.
            </p>
            <DepositButton />
          </div>

          <div className="rounded-3xl border border-sand-200 bg-sand-50 p-8">
            <p className="mb-5 text-sm font-semibold text-ink-900">
              Prefer we contact you first?
            </p>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
