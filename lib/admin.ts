import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { seal, unseal } from "./auth";

/**
 * Who may open the admin panel: the Google accounts listed in ADMIN_EMAILS,
 * comma separated. The list is checked on every request, not only at sign-in,
 * so taking an address off it locks that person out at once.
 */
export function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const isAdminEmail = (email: string) => adminEmails().includes(email.trim().toLowerCase());

export const ADMIN_COOKIE = "ss_admin";
/** Holds state and nonce for the few minutes the admin spends on Google's screen. */
export const OAUTH_COOKIE = "ss_oauth";
export const ADMIN_MAX_AGE = 7 * 24 * 60 * 60;

// "admin:" keeps these apart from customer sessions, which are signed with the
// same secret: neither can be passed off as the other.
export function createAdminSession(email: string) {
  return seal(`admin:${Buffer.from(email).toString("base64url")}.${Date.now() + ADMIN_MAX_AGE * 1000}`);
}

function readAdminSession(token: string | undefined): string | null {
  const body = unseal(token);
  const match = body?.match(/^admin:([A-Za-z0-9_-]+)\.(\d+)$/);
  if (!match || Number(match[2]) < Date.now()) return null;
  return Buffer.from(match[1], "base64url").toString("utf8");
}

export interface Admin {
  email: string;
}

export async function currentAdmin(): Promise<Admin | null> {
  const jar = await cookies();
  const email = readAdminSession(jar.get(ADMIN_COOKIE)?.value);
  return email && isAdminEmail(email) ? { email } : null;
}

/** For admin pages: the signed-in admin, or off to the sign-in page. */
export async function requireAdmin(): Promise<Admin> {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export const adminCookieOptions = {
  httpOnly: true,
  // lax, not strict: the link in a new-order email must open the order
  // already signed in. Cross-site POSTs still go without the cookie.
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: ADMIN_MAX_AGE,
};
