import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { AccountProvider } from "@/components/providers/AccountProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: { default: "Soft Snuggle · Little clothes, lots of love", template: "%s · Soft Snuggle" },
  description:
    "Soft, thoughtful baby essentials made for milk-drunk mornings, first wiggles and every cuddle in between. Organic cotton bodysuits, rompers and gift sets.",
};

export const viewport: Viewport = { themeColor: "#F7F4EC" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      {/*
        Browser extensions write their own attributes onto <body> before React
        loads: Grammarly adds data-gr-ext-installed, password managers and
        translators do similar. React then sees a <body> that does not match
        what the server sent and reports a hydration mismatch that no change
        here could fix. This tells React to ignore attribute differences on
        this one element. It does not extend to anything inside it, so real
        mismatches in the app are still reported.
      */}
      <body suppressHydrationWarning>
        <SmoothScroll>
          <IntroProvider>
            <AccountProvider>
              <CartProvider>
              <Loader />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
              <WhatsAppFab />
              </CartProvider>
            </AccountProvider>
          </IntroProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
