import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secretKey || !webhookSecret || !signature) {
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 500 });
  }

  const payload = await request.text();
  const stripe = new Stripe(secretKey);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        const supabase = createSupabaseServerClient();
        // Only matches rows that aren't already marked paid, so retried webhook
        // deliveries for the same session don't send a duplicate email.
        const { data, error } = await supabase
          .from("bookings")
          .update({
            deposit_paid: true,
            deposit_paid_at: new Date().toISOString(),
            stripe_checkout_session_id: session.id,
          })
          .eq("id", bookingId)
          .eq("deposit_paid", false)
          .select("name")
          .maybeSingle();

        if (error) {
          console.error("Failed to mark booking as paid:", error);
        } else if (data) {
          const email = session.customer_email || session.customer_details?.email;
          const name = session.metadata?.name || data.name;
          if (email) {
            const trackingNumber = `WB-${String(bookingId).padStart(5, "0")}`;
            await sendBookingConfirmationEmail({ to: email, name, trackingNumber });
          }
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
