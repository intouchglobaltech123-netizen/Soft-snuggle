import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { OAUTH_COOKIE } from "@/lib/admin";
import { seal } from "@/lib/auth";
import { googleAuthUrl, googleConfigured } from "@/lib/google";
import { siteOrigin } from "@/lib/site";

const TEN_MINUTES = 10 * 60;

/** Sends the admin to Google's account chooser. */
export async function GET(req: Request) {
  const origin = siteOrigin(req);
  if (!googleConfigured()) return NextResponse.redirect(`${origin}/admin/login?error=setup`);

  // state ties Google's reply to this browser (so nobody can sign someone in
  // with a reply meant for another); nonce ties the ID token to this attempt.
  const state = randomBytes(16).toString("base64url");
  const nonce = randomBytes(16).toString("base64url");

  const res = NextResponse.redirect(
    googleAuthUrl({ redirectUri: `${origin}/api/admin/auth/google/callback`, state, nonce }),
  );
  res.cookies.set(OAUTH_COOKIE, seal(`oauth:${state}.${nonce}.${Date.now() + TEN_MINUTES * 1000}`), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/admin/auth",
    maxAge: TEN_MINUTES,
  });
  return res;
}
