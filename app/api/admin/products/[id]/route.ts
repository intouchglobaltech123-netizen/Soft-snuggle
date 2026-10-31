import { NextResponse } from "next/server";
import { currentAdmin } from "@/lib/admin";
import { AdminError, setStock } from "@/lib/admin-queries";
import { fromOwnSite } from "@/lib/site";

/** Marks a product, or some of its sizes, sold out or back in stock. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await currentAdmin();
  if (!admin) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  if (!fromOwnSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });

  const productId = Number((await params).id);
  if (!Number.isInteger(productId)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const inStock = typeof body.inStock === "boolean" ? body.inStock : undefined;
  const soldOutSizes = Array.isArray(body.soldOutSizes)
    ? body.soldOutSizes.filter((s: unknown): s is string => typeof s === "string").slice(0, 20)
    : undefined;
  if (inStock === undefined && soldOutSizes === undefined) {
    return NextResponse.json({ error: "Nothing to change." }, { status: 400 });
  }

  try {
    await setStock(productId, { inStock, soldOutSizes });
    console.info(`stock changed by ${admin.email}: product ${productId}`, { inStock, soldOutSizes });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof AdminError) return NextResponse.json({ error: err.message }, { status: 409 });
    console.error("stock update failed", err);
    return NextResponse.json({ error: "That didn't save. Please try again." }, { status: 500 });
  }
}
