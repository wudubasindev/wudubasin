import Link from "next/link";
import Stripe from "stripe";
import { CheckCircleIcon } from "../components/icons";
import { siteConfig } from "@/lib/site-config";

async function getCheckoutSession(sessionId: string | undefined) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!sessionId || !secretKey) return null;

  try {
    const stripe = new Stripe(secretKey);
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error("Failed to retrieve checkout session:", err);
    return null;
  }
}

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const session = await getCheckoutSession(sessionId);
  const paymentStatus = session?.payment_status ?? null;
  const isPaid = paymentStatus === "paid";
  const bookingId = session?.metadata?.bookingId || null;
  const trackingNumber = bookingId
    ? `WB-${String(bookingId).padStart(5, "0")}`
    : null;

  if (!isPaid) {
    return (
      <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-ink-900">
          We couldn&apos;t confirm your payment
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-600">
          It looks like this checkout wasn&apos;t completed. If you believe
          this is a mistake, please contact us directly.
        </p>
        <Link
          href="/#book"
          className="mt-8 rounded-full bg-basin-700 px-6 py-3 text-sm font-semibold text-sand-50 transition-colors hover:bg-basin-800"
        >
          Back to Booking Form
        </Link>
      </section>
    );
  }

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
        shortly to confirm your installation date.
      </p>

      {trackingNumber && (
        <div className="mt-6 rounded-2xl border border-sand-300 bg-sand-100 px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            Your booking reference
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-wide text-basin-700">
            {trackingNumber}
          </p>
          <p className="mt-1 text-xs text-ink-400">
            Save this number for your records — mention it if you contact us
            about your installation.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-basin-700 px-6 py-3 text-sm font-semibold text-sand-50 transition-colors hover:bg-basin-800"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
