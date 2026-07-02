import { NextResponse } from "next/server";
import Stripe from "stripe";

type CheckoutPayload = {
  name: string;
  phone: string;
  email: string;
  address: string;
  preferredDate?: string;
  bookingId?: number | string;
};

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const depositPriceId = process.env.STRIPE_DEPOSIT_PRICE_ID;

  if (!secretKey || secretKey.includes("REPLACE_WITH") || !depositPriceId) {
    return NextResponse.json(
      { ok: false, error: "Online payment isn't set up yet. Please contact us directly to book." },
      { status: 501 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Partial<CheckoutPayload>;

  if (!body.name || !body.phone || !body.email || !body.address) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, phone, email, and address before paying." },
      { status: 400 },
    );
  }

  try {
    const stripe = new Stripe(secretKey);
    const price = await stripe.prices.retrieve(depositPriceId);

    if (!price.unit_amount || !price.currency) {
      throw new Error("Deposit price is missing a fixed amount.");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: price.currency,
      payment_method_types: ["card"],
      receipt_email: body.email,
      metadata: {
        name: body.name,
        phone: body.phone,
        address: body.address,
        preferredDate: body.preferredDate || "",
        bookingId: body.bookingId ? String(body.bookingId) : "",
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error("Stripe did not return a client secret.");
    }

    return NextResponse.json({ ok: true, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
