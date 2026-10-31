import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, OAUTH_COOKIE, adminCookieOptions, createAdminSession, isAdminEmail } from "@/lib/admin";
import { unseal } from "@/lib/auth";
import { googleIdentity } from "@/lib/google";
import { siteOrigin } from "@/lib/site";

/** Google sends the admin back here with a one-time code. */
export async function GET(req: Request) {
  const origin = siteOrigin(req);
  const url = new URL(req.url);
  const fail = (error: string) => {
    const res = NextResponse.redirect(`${origin}/admin/login?error=${error}`);
    res.cookies.delete({ name: OAUTH_COOKIE, path: "/api/admin/auth" });
    return res;
  };

  // They pressed Cancel on Google's screen.
  if (url.searchParams.get("error")) return fail("cancelled");

  const saved = unseal((await cookies()).get(OAUTH_COOKIE)?.value)?.match(/^oauth:([\w-]+)\.([\w-]+)\.(\d+)$/);
  const code = url.searchParams.get("code");
  if (!saved || !code || saved[1] !== url.searchParams.get("state") || Number(saved[3]) < Date.now()) {
    return fail("expired");
  }

  try {
    const who = await googleIdentity({ code, redirectUri: `${origin}/api/admin/auth/google/callback`, nonce: saved[2] });
    if (!who.emailVerified || !isAdminEmail(who.email)) {
      console.warn("admin sign-in refused for", who.email);
      return fail("denied");
    }
    const res = NextResponse.redirect(`${origin}/admin`);
    res.cookies.delete({ name: OAUTH_COOKIE, path: "/api/admin/auth" });
    res.cookies.set(ADMIN_COOKIE, createAdminSession(who.email), adminCookieOptions);
    return res;
  } catch (err) {
    console.error("admin sign-in failed", err);
    return fail("failed");
  }
}
