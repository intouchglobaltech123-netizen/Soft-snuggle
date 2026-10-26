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

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
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
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, saved: !wasSaved }),
        });
        const data = await res.json();
        if (Array.isArray(data.wishlist)) setWishlist(data.wishlist);
      } catch {
        setWishlist((prev) => (wasSaved ? [productId, ...prev] : prev.filter((id) => id !== productId)));
      }
      return wasSaved ? "removed" : "saved";
    },
    [customer, wishlist],
  );

  const login = useCallback<AccountContextValue["login"]>(async (phone, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });
    const data = await res.json();
    if (!res.ok) return data.error ?? "Something went wrong.";
    await refresh();
    return null;
  }, [refresh]);

  const signup = useCallback<AccountContextValue["signup"]>(async (input) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) return data.error ?? "Something went wrong.";
    await refresh();
    return null;
  }, [refresh]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
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
