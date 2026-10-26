import { NextResponse } from "next/server";
import { getWishlistProducts } from "@/lib/queries";
import { currentCustomer } from "@/lib/session";

export async function GET() {
  const customer = await currentCustomer();
  if (!customer) return NextResponse.json({ products: [] }, { status: 401 });
  return NextResponse.json({ products: await getWishlistProducts(customer.id) });
}
