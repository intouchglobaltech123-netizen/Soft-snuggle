"use client";

import { createContext, useContext, useState } from "react";

/** Tells page sections when the loading screen has lifted, so entrances play on cue. */
const IntroContext = createContext<{ ready: boolean; setReady: (v: boolean) => void }>({
  ready: true,
  setReady: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  return <IntroContext.Provider value={{ ready, setReady }}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
