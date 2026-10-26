import { NextResponse } from "next/server";
import { endSession } from "@/lib/session";

export async function POST() {
  try {
    await endSession();
  } catch (err) {
    console.error("logout failed", err);
  }
  // Always answers with JSON: the browser clears its own state either way.
  return NextResponse.json({ ok: true });
}
