import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type BookingPayload = {
  name: string;
  phone: string;
  email: string;
  address: string;
  preferredDate?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<BookingPayload>;

  if (!body.name || !body.phone || !body.email || !body.address) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, phone, email, and address." },
      { status: 400 },
    );
  }

  try {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.from("bookings").insert({
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: body.address,
      preferred_date: body.preferredDate || null,
      message: body.message || null,
    });

    if (error) {
      console.error("Failed to save booking:", error);
      return NextResponse.json(
        { ok: false, error: "Could not save your booking. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking route error:", err);
    return NextResponse.json(
      { ok: false, error: "Booking is temporarily unavailable. Please try again shortly." },
      { status: 500 },
    );
  }
}
