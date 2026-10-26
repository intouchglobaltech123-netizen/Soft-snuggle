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
      <body>
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
