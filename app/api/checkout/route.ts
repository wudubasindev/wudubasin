import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const depositPriceId = process.env.STRIPE_DEPOSIT_PRICE_ID;

  if (!secretKey || secretKey.includes("REPLACE_WITH") || !depositPriceId) {
    return NextResponse.json(
      { ok: false, error: "Online payment isn't set up yet. Please contact us directly to book." },
      { status: 501 },
    );
  }

  try {
    const stripe = new Stripe(secretKey);
    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: depositPriceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/booking-confirmed`,
      cancel_url: `${origin}/#book`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
