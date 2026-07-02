import Link from "next/link";
import { CheckCircleIcon } from "../components/icons";
import { siteConfig } from "@/lib/site-config";

export default function BookingConfirmedPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-basin-100 text-basin-700">
        <CheckCircleIcon className="h-7 w-7" />
      </span>
      <h1 className="mt-6 text-3xl font-semibold text-ink-900">
        Your deposit is confirmed
      </h1>
      <p className="mt-4 text-base leading-relaxed text-ink-600">
        Thank you for booking with {siteConfig.name}. We&apos;ll be in touch
        shortly to confirm your installation date. If you haven&apos;t
        already sent us your details, please fill out the booking form so we
        can reach you.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/#book"
          className="rounded-full bg-basin-700 px-6 py-3 text-sm font-semibold text-sand-50 transition-colors hover:bg-basin-800"
        >
          Go to Booking Form
        </Link>
        <Link
          href="/"
          className="rounded-full border border-sand-300 bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-basin-300 hover:text-basin-700"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
