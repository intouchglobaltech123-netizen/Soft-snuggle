import { isStudioShot } from "@/lib/photo";
import type { Category } from "@/lib/types";
import { Garment } from "../art/Garment";

interface Props {
  image?: string;
  category: Category;
  garment: string;
  className?: string;
}

/** Small product picture for the bag and checkout: photo when there is one, illustration otherwise. */
export function ProductThumb({ image, category, garment, className }: Props) {
  if (!image) return <Garment category={category} color={garment} className={className} />;
  return (
    <img
      src={image}
      alt=""
      className={`h-full w-full object-cover ${isStudioShot(image) ? "mix-blend-multiply" : ""}`}
      draggable={false}
    />
  );
}
