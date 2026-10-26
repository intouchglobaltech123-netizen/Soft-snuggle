import { NextResponse } from "next/server";
import { hashPassword, normalisePhone } from "@/lib/auth";
import { AuthError, createCustomer } from "@/lib/queries";
import { startSession } from "@/lib/session";

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = str(body.name, 80);
  const phone = normalisePhone(str(body.phone, 20));
  const email = str(body.email, 120) || null;
  const password = typeof body.password === "string" ? body.password : "";

  if (name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  if (!phone) return NextResponse.json({ error: "Please enter a valid 10-digit mobile number." }, { status: 422 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please check your email address." }, { status: 422 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Please choose a password of at least 6 characters." }, { status: 422 });
  }

  try {
    const customer = await createCustomer({ phone, name, email, passwordHash: await hashPassword(password) });
    await startSession(customer.id);
    return NextResponse.json({ customer }, { status: 201 });
  } catch (err) {
    if (err instanceof AuthError) return NextResponse.json({ error: err.message }, { status: 409 });
    console.error("signup failed", err);
    return NextResponse.json({ error: "We couldn't create your account. Please try again." }, { status: 500 });
  }
}
