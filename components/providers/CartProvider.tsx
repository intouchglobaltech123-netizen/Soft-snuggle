"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "ss-cart-v1";

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  hydrated: boolean;
  open: () => void;
  close: () => void;
  add: (item: CartItem) => void;
  setQty: (productId: number, size: string, colour: string | undefined, qty: number) => void;
  remove: (productId: number, size: string, colour?: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId && i.size === item.size && i.colour === item.colour);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: Math.min(10, i.qty + item.qty) } : i));
      }
      return [...prev, item];
    });
    setOpen(true);
  }, []);

  const same = (i: CartItem, productId: number, size: string, colour?: string) =>
    i.productId === productId && i.size === size && i.colour === colour;

  const setQty = useCallback((productId: number, size: string, colour: string | undefined, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !same(i, productId, size, colour))
        : prev.map((i) => (same(i, productId, size, colour) ? { ...i, qty: Math.min(10, qty) } : i)),
    );
  }, []);

  const remove = useCallback((productId: number, size: string, colour?: string) => {
    setItems((prev) => prev.filter((i) => !same(i, productId, size, colour)));
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((s, i) => s + i.qty * i.price, 0),
      isOpen,
      hydrated,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      setQty,
      remove,
      clear: () => setItems([]),
    }),
    [items, isOpen, hydrated, add, setQty, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
