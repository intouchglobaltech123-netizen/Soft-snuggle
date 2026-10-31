import { randomBytes, scrypt, timingSafeEqual, createHmac } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (p: string, s: string, k: number) => Promise<Buffer>;

const KEYLEN = 64;

/** Hash for storage: salt:hash. scrypt is slow on purpose, so a stolen table is not a list of passwords. */
export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = await scryptAsync(password, salt, KEYLEN);
  return `${salt}:${key.toString("hex")}`;
}

/** Compares in constant time, so the answer takes the same time whether the first byte matched or the last. */
export async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const key = await scryptAsync(password, salt, KEYLEN);
  const expected = Buffer.from(hash, "hex");
  return expected.length === key.length && timingSafeEqual(expected, key);
}

// The session is a signed cookie: the customer id, when it expires, and an HMAC
// over both. Nothing secret travels in it, and a forged one fails the signature.
const MAX_AGE_DAYS = 60;
export const SESSION_COOKIE = "ss_session";
export const SESSION_MAX_AGE = MAX_AGE_DAYS * 24 * 60 * 60;

// The fallback is written in this file for anyone to read, so on a live site it
// would let anyone sign a cookie as any customer. Hosted deploys refuse it.
// Read when a cookie is signed rather than at import, so `next build` still
// runs without the variable.
function secret() {
  const value = process.env.SESSION_SECRET;
  if (value) return value;
  if (process.env.VERCEL || process.env.RAILWAY_ENVIRONMENT) {
    throw new Error("SESSION_SECRET is not set. Add a long random value to the service's variables and redeploy.");
  }
  return "soft-snuggle-dev-secret-change-me";
}

const sign = (body: string) => createHmac("sha256", secret()).update(body).digest("base64url");

export function createSession(customerId: number) {
  const body = `${customerId}.${Date.now() + SESSION_MAX_AGE * 1000}`;
  return `${body}.${sign(body)}`;
}

export function readSession(token: string | undefined): number | null {
  if (!token) return null;
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const body = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = sign(body);
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  const [id, expiry] = body.split(".");
  if (!id || !expiry || Number(expiry) < Date.now()) return null;
  return Number(id);
}

/** 10 digits, Indian mobile. Accepts +91, 91 and spaces, stores the bare 10. */
export function normalisePhone(raw: string) {
  const digits = (raw || "").replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}
