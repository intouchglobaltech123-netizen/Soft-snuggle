import type { Metadata } from "next";
import { AccountDashboard } from "@/components/account/AccountDashboard";

export const metadata: Metadata = { title: "Your account" };

export default function AccountPage() {
  return (
    <div className="speckle min-h-[80vh]">
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <AccountDashboard />
      </section>
    </div>
  );
}
