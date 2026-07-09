import Link from "next/link";
import Stripe from "stripe";
import { CheckCircleIcon, DropletIcon, MapPinIcon, ToolIcon } from "../components/icons";
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
      <section className="relative overflow-hidden bg-sand-50">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sand-200/50 blur-3xl" />
        <div className="relative mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            We couldn&apos;t confirm your payment
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            It looks like this checkout wasn&apos;t completed. If you believe
            this is a mistake, please contact us directly.
          </p>
          <Link
            href="/#book"
            className="mt-8 rounded-full bg-basin-700 px-6 py-3 text-sm font-semibold text-sand-50 shadow-sm shadow-basin-900/10 transition-colors hover:bg-basin-800"
          >
            Back to Booking Form
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-sand-50">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-basin-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-sage-100/70 blur-3xl" />

      <div className="relative mx-auto flex max-w-xl flex-col items-center px-6 py-20 text-center sm:py-28">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-basin-700 text-sand-50">
            <DropletIcon className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
            {siteConfig.name}
          </span>
        </Link>

        <div className="relative mt-8 flex h-20 w-20 items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full bg-basin-200 opacity-60" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-basin-100 text-basin-700 shadow-sm">
            <CheckCircleIcon className="h-8 w-8" />
          </span>
        </div>

        <h1 className="mt-7 font-display text-4xl font-semibold leading-tight text-ink-900">
          Your deposit is confirmed
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink-600">
          Thank you for booking with {siteConfig.name}. We&apos;ll be in
          touch shortly to confirm your installation date.
        </p>

        {trackingNumber && (
          <div className="mt-8 w-full max-w-sm rounded-3xl border border-sand-200 bg-white p-6 text-left shadow-sm shadow-basin-900/5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                Booking reference
              </p>
              <span className="rounded-full bg-basin-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-basin-700">
                Deposit paid
              </span>
            </div>
            <p className="mt-2 font-display text-3xl font-semibold tracking-wide text-basin-700">
              {trackingNumber}
            </p>
            <div className="mt-4 border-t border-dashed border-sand-300 pt-4">
              <p className="text-xs leading-relaxed text-ink-400">
                Save this number for your records — mention it if you contact
                us about your installation. We&apos;ve also emailed a copy of
                this confirmation to you.
              </p>
            </div>
          </div>
        )}

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-basin-700 px-7 py-3.5 text-sm font-semibold text-sand-50 shadow-sm shadow-basin-900/10 transition-colors hover:bg-basin-800"
          >
            Back to Home
          </Link>
          <Link
            href="/#designs"
            className="rounded-full border border-sand-300 bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 transition-colors hover:border-basin-300 hover:text-basin-700"
          >
            Browse Sink Designs
          </Link>
        </div>

        <dl className="mt-14 grid w-full max-w-sm grid-cols-2 gap-x-6 gap-y-6">
          {[
            { icon: ToolIcon, label: "Professional installation" },
            { icon: MapPinIcon, label: `Based in ${siteConfig.serviceArea}` },
          ].map(({ icon: Icon, label }) => (
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
