import { NextResponse } from "next/server";
import { submitUtr } from "@/lib/queries";

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const body = await req.json().catch(() => ({}));
  const key = typeof body.key === "string" ? body.key : "";
  const utr = typeof body.utr === "string" ? body.utr.replace(/\s/g, "").toUpperCase() : "";

  // UPI references are 12 digits; some apps show longer alphanumeric transaction IDs.
  if (!/^[A-Z0-9]{10,24}$/.test(utr)) {
    return NextResponse.json({ error: "Please enter the 12-digit UTR / transaction ID from your UPI app." }, { status: 422 });
  }
  const ok = await submitUtr(code, key, utr);
  if (!ok) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json({ ok: true, utr });
}
