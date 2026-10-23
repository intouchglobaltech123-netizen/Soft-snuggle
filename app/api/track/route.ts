import { NextResponse } from "next/server";
import { trackOrder } from "@/lib/queries";
import { normaliseOrderCode } from "@/lib/tracking";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const code = normaliseOrderCode(typeof body.code === "string" ? body.code : "");
  const phone = typeof body.phone === "string" ? body.phone.replace(/\D/g, "") : "";

  if (!code || phone.length < 10) {
    return NextResponse.json({ error: "Please enter your order ID and the 10-digit mobile number you ordered with." }, { status: 422 });
  }
  const order = await trackOrder(code, phone);
  if (!order) {
    return NextResponse.json(
      { error: "We couldn't find an order with that ID and mobile number. Please check both and try again." },
      { status: 404 },
    );
  }
  return NextResponse.json(order);
}
