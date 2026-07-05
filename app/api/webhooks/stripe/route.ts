import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// Stripe requires the raw request body to verify the webhook signature,
// so this route reads request.text() directly (the App Router does not
// parse the body automatically).
export async function POST(request: Request) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
        console.error("Stripe webhook route is missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET.");
        return NextResponse.json({ ok: false, error: "Webhook not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
    const rawBody = await request.text();

  const stripe = new Stripe(secretKey);
    let event: Stripe.Event;

  try {
        if (!signature) {
                throw new Error("Missing stripe-signature header.");
        }
        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
        console.error("Stripe webhook signature verification failed:", err);
        return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;

      try {
              const supabase = createSupabaseServerClient();

          if (bookingId) {
                    const { error } = await supabase
                      .from("bookings")
                      .update({
                                    deposit_paid: true,
                                    paid_at: new Date().toISOString(),
                                    stripe_session_id: session.id,
                      })
                      .eq("id", bookingId);

                if (error) {
                            console.error("Failed to mark booking as paid:", error);
                }
          } else {
                    console.warn("checkout.session.completed had no bookingId in metadata.", session.id);
          }
      } catch (err) {
              console.error("Error updating booking after payment:", err);
      }

      // Customer-facing payment confirmation is sent by Stripe's own
      // "Successful payments" receipt email (Stripe Dashboard > Settings >
      // Emails), so no separate email service is required here.
  }

  return NextResponse.json({ received: true });
}
