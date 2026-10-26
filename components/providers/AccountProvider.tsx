"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Customer, OrderSummary } from "@/lib/queries";

interface AccountContextValue {
  customer: Customer | null;
  wishlist: number[];
  orders: OrderSummary[];
  ready: boolean;
  saved: (productId: number) => boolean;
  toggleSaved: (productId: number) => Promise<"saved" | "removed" | "needs-login">;
  login: (phone: string, password: string) => Promise<string | null>;
  signup: (input: { name: string; phone: string; email: string; password: string }) => Promise<string | null>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AccountContext = createContext<AccountContextValue | null>(null);

/** In development the server sends the real cause; showing it beats guessing. */
function withDetail(data: Record<string, unknown>) {
  const error = (data.error as string) ?? "Something went wrong.";
  return data.detail ? `${error} (${data.detail as string})` : error;
}

/**
 * A server that crashes answers with an empty body or an HTML error page, and
 * res.json() then throws a parse error that says nothing about what went wrong.
 * This keeps the real failure visible and always hands back something usable.
 */
async function send(url: string, body: unknown): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    let data: Record<string, unknown> = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: res.ok ? "We got an unexpected reply from the server." : text.slice(0, 200) };
      }
    } else if (!res.ok) {
      data = { error: `The server stopped responding (error ${res.status}). Please try again.` };
    }
    return { ok: res.ok, data };
  } catch {
    return { ok: false, data: { error: "We couldn't reach the server. Check your connection and try again." } };
  }
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      setCustomer(data.customer ?? null);
      setWishlist(data.wishlist ?? []);
      setOrders(data.orders ?? []);
    } catch {
      // Offline or the server is restarting: stay signed out rather than break the page.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saved = useCallback((productId: number) => wishlist.includes(productId), [wishlist]);

  const toggleSaved = useCallback<AccountContextValue["toggleSaved"]>(
    async (productId) => {
      if (!customer) return "needs-login";
      const wasSaved = wishlist.includes(productId);
      // Flip it straight away: a heart that waits for the server feels broken.
      setWishlist((prev) => (wasSaved ? prev.filter((id) => id !== productId) : [productId, ...prev]));
      try {
        const { data } = await send("/api/wishlist", { productId, saved: !wasSaved });
        if (Array.isArray(data.wishlist)) setWishlist(data.wishlist as number[]);
      } catch {
        setWishlist((prev) => (wasSaved ? [productId, ...prev] : prev.filter((id) => id !== productId)));
      }
      return wasSaved ? "removed" : "saved";
    },
    [customer, wishlist],
  );

  const login = useCallback<AccountContextValue["login"]>(async (phone, password) => {
    const { ok, data } = await send("/api/auth/login", { phone, password });
    if (!ok) return withDetail(data);
    await refresh();
    return null;
  }, [refresh]);

  const signup = useCallback<AccountContextValue["signup"]>(async (input) => {
    const { ok, data } = await send("/api/auth/signup", input);
    if (!ok) return withDetail(data);
    await refresh();
    return null;
  }, [refresh]);

  const logout = useCallback(async () => {
    await send("/api/auth/logout", {});
    setCustomer(null);
    setWishlist([]);
    setOrders([]);
  }, []);

  const value = useMemo<AccountContextValue>(
    () => ({ customer, wishlist, orders, ready, saved, toggleSaved, login, signup, logout, refresh }),
    [customer, wishlist, orders, ready, saved, toggleSaved, login, signup, logout, refresh],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used inside AccountProvider");
  return ctx;
}
