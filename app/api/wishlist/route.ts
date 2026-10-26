import { NextResponse } from "next/server";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/lib/queries";
import { currentCustomer } from "@/lib/session";

const needsAccount = NextResponse.json({ error: "Please log in to save pieces." }, { status: 401 });

export async function POST(req: Request) {
  const customer = await currentCustomer();
  if (!customer) return needsAccount;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const productId = Number(body.productId);
  if (!Number.isInteger(productId)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  if (body.saved === false) await removeFromWishlist(customer.id, productId);
  else await addToWishlist(customer.id, productId);

  return NextResponse.json({ wishlist: await getWishlist(customer.id) });
}
