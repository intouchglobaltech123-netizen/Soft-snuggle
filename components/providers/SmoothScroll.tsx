"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Next resets the scroll position itself on navigation, but Lenis keeps its
 * own and writes it back on the next frame, so a new page opened from halfway
 * down the shop used to start halfway down as well. Putting the new page back
 * at the top has to go through Lenis for it to stick.
 */
function ScrollTopOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();
  // Back and forward should land where the page was left, so only forward
  // navigation is sent to the top.
  const wentBack = useRef(false);

  useEffect(() => {
    const onPop = () => {
      wentBack.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const back = wentBack.current;
    wentBack.current = false;
    // A link to #story on another page carries its own destination.
    if (back || window.location.hash) return;
    // force, because the intro holds Lenis stopped while it plays.
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <ScrollTopOnNavigate />
      {children}
    </ReactLenis>
  );
}
