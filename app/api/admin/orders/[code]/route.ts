import { NextResponse } from "next/server";
import { currentAdmin } from "@/lib/admin";
import { AdminError, ORDER_ACTIONS, type OrderAction, updateOrder } from "@/lib/admin-queries";
import { fromOwnSite } from "@/lib/site";

const str = (v: unknown) => (typeof v === "string" ? v : undefined);

/** Moves an order along (confirm, pack, ship…) or adds a note to its history. */
export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const admin = await currentAdmin();
  if (!admin) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  if (!fromOwnSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });

  const { code } = await params;
  const body = await req.json().catch(() => ({}));
  const action = body.action as OrderAction;
  if (!ORDER_ACTIONS.includes(action)) return NextResponse.json({ error: "Unknown action." }, { status: 400 });

  try {
    await updateOrder(
      code,
      action,
      { courier: str(body.courier), trackingNumber: str(body.trackingNumber), trackingUrl: str(body.trackingUrl), note: str(body.note) },
      admin.email,
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof AdminError) return NextResponse.json({ error: err.message }, { status: 409 });
    console.error("admin order update failed", err);
    return NextResponse.json({ error: "That didn't save. Please try again." }, { status: 500 });
  }
}
