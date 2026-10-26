import { NextResponse } from "next/server";
import { getCustomerOrders, getWishlist } from "@/lib/queries";
import { currentCustomer } from "@/lib/session";

/** Everything the browser needs on load: who you are, what you saved, what you ordered. */
export async function GET() {
  const customer = await currentCustomer();
  if (!customer) return NextResponse.json({ customer: null, wishlist: [], orders: [] });
  const [wishlist, orders] = await Promise.all([getWishlist(customer.id), getCustomerOrders(customer.id)]);
  return NextResponse.json({ customer, wishlist, orders });
}
