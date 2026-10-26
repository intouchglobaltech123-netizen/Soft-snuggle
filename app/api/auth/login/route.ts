import { NextResponse } from "next/server";
import { normalisePhone, verifyPassword } from "@/lib/auth";
import { findCustomerByPhone, noteLogin } from "@/lib/queries";
import { startSession } from "@/lib/session";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const phone = normalisePhone(typeof body.phone === "string" ? body.phone : "");
  const password = typeof body.password === "string" ? body.password : "";
  // One message for a wrong number and a wrong password, so this cannot be used
  // to find out which mobile numbers have accounts.
  const wrong = NextResponse.json({ error: "That number and password don't match." }, { status: 401 });
  if (!phone || !password) return wrong;

  const row = await findCustomerByPhone(phone);
  if (!row || !(await verifyPassword(password, row.password_hash))) return wrong;

  await noteLogin(row.id);
  await startSession(row.id);
  const { password_hash: _ignored, ...customer } = row;
  return NextResponse.json({ customer });
}
