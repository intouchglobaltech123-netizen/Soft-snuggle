import type { Metadata } from "next";
import { TrackOrder } from "@/components/track/TrackOrder";

export const metadata: Metadata = { title: "Track your order" };

export default async function TrackPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code } = await searchParams;
  return (
    <div className="speckle min-h-screen">
      <TrackOrder initialCode={code} />
    </div>
  );
}
