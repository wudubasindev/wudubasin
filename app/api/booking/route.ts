import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { bookingSchema, firstIssueMessage } from "@/lib/validation";
import { isJsonRequest, isSameOriginRequest, rateLimit } from "@/lib/request-security";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request) || !isJsonRequest(request)) {
    return NextResponse.json(
      { ok: false, error: "Request could not be verified. Please try again from the booking form." },
      { status: 403 },
    );
  }

  if (!rateLimit(request, "booking", { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json(
      { ok: false, error: "Too many booking attempts. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: firstIssueMessage(parsed.error) },
      { status: 400 },
    );
  }

  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        address: parsed.data.address,
        preferred_date: parsed.data.preferredDate ?? null,
        message: parsed.data.message ?? null,
        agreed_to_terms: true,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to save booking:", error);
      return NextResponse.json(
        { ok: false, error: "Could not save your booking. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error("Booking route error:", err);
    return NextResponse.json(
      { ok: false, error: "Booking is temporarily unavailable. Please try again shortly." },
      { status: 500 },
    );
  }
}
