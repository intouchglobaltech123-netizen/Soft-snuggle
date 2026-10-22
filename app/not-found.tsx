import Link from "next/link";
import { FlowerMark } from "@/components/art/FlowerMark";

export default function NotFound() {
  return (
    <div className="speckle flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <FlowerMark className="anim-float h-16 w-16" />
      <h1 className="mt-6 font-display text-5xl tracking-tight">
        Oops, this page <em className="text-sage-deep">wandered off</em>
      </h1>
      <p className="mt-3 text-ink-soft">Like a tiny sock in the laundry. Let&apos;s get you back.</p>
      <Link href="/" className="btn-primary mt-6">Back home</Link>
    </div>
  );
}
