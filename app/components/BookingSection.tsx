import { BookingForm } from "./BookingForm";
import { siteConfig } from "@/lib/site-config";

export function BookingSection() {
  return (
    <section id="book" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            Ready to book your installation?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            Tell us about your install, then you&apos;ll be taken straight to
            a secure {siteConfig.depositAmount} deposit payment to lock in
            your date.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-sand-200 bg-sand-50 p-8">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
