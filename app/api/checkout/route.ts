import { NextResponse } from "next/server";
import Stripe from "stripe";
import { checkoutSchema, firstIssueMessage } from "@/lib/validation";
import { isJsonRequest, isSameOriginRequest, rateLimit } from "@/lib/request-security";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request) || !isJsonRequest(request)) {
    return NextResponse.json(
      { ok: false, error: "Request could not be verified. Please try again from the booking form." },
      { status: 403 },
    );
  }

  if (!rateLimit(request, "checkout", { limit: 10, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json(
      { ok: false, error: "Too many checkout attempts. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const depositPriceId = process.env.STRIPE_DEPOSIT_PRICE_ID;

  if (!secretKey || secretKey.includes("REPLACE_WITH") || !depositPriceId) {
    return NextResponse.json(
      { ok: false, error: "Online payment isn't set up yet. Please contact us directly to book." },
      { status: 501 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: firstIssueMessage(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const stripe = new Stripe(secretKey);
    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "elements",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: parsed.data.email,
      line_items: [
        {
          price: depositPriceId,
          quantity: 1,
        },
      ],
      metadata: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        address: parsed.data.address,
        preferredDate: parsed.data.preferredDate ?? "",
        bookingId: parsed.data.bookingId ? String(parsed.data.bookingId) : "",
      },
      return_url: `${origin}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.client_secret) {
      throw new Error("Stripe did not return a client secret.");
    }

    return NextResponse.json({ ok: true, clientSecret: session.client_secret });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
