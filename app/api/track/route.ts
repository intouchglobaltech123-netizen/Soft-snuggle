import { NextResponse } from "next/server";
import { trackOrder, trackOwnOrder } from "@/lib/queries";
import { currentCustomer } from "@/lib/session";
import { normaliseOrderCode } from "@/lib/tracking";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const code = normaliseOrderCode(typeof body.code === "string" ? body.code : "");
  const phone = typeof body.phone === "string" ? body.phone.replace(/\D/g, "") : "";

  if (!code) {
    return NextResponse.json({ error: "Please enter your order ID." }, { status: 422 });
  }

  try {
    // Signed in and it's your own order: you proved who you are when you logged
    // in, so there is nothing more to ask for.
    const customer = await currentCustomer();
    if (customer) {
      const own = await trackOwnOrder(code, customer.id);
      if (own) return NextResponse.json(own);
    }

    // Otherwise the phone number on the order is the proof.
    if (phone.length < 10) {
      return NextResponse.json(
        { error: "Please enter the 10-digit mobile number you ordered with." },
        { status: 422 },
      );
    }
    const order = await trackOrder(code, phone);
    if (!order) {
      return NextResponse.json(
        { error: "We couldn't find an order with that ID and mobile number. Please check both and try again." },
        { status: 404 },
      );
    }
    return NextResponse.json(order);
  } catch (err) {
    console.error("tracking failed", err);
    return NextResponse.json(
      { error: "We couldn't look that up just now. Please try again in a moment." },
      { status: 500 },
    );
  }
}
