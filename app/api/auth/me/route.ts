import { NextResponse } from "next/server";
import { getCustomerOrders, getWishlist } from "@/lib/queries";
import { currentCustomer } from "@/lib/session";

/** Everything the browser needs on load: who you are, what you saved, what you ordered. */
const SIGNED_OUT = { customer: null, wishlist: [], orders: [] };

export async function GET() {
  try {
    const customer = await currentCustomer();
    if (!customer) return NextResponse.json(SIGNED_OUT);
    const [wishlist, orders] = await Promise.all([getWishlist(customer.id), getCustomerOrders(customer.id)]);
    return NextResponse.json({ customer, wishlist, orders });
  } catch (err) {
    // Every page asks this on load, so it must never throw: a database hiccup
    // should show a signed-out header, not break the whole site.
    console.error("session lookup failed", err);
    return NextResponse.json(SIGNED_OUT);
  }
}
