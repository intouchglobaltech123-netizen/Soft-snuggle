import { readdirSync } from "node:fs";
import path from "node:path";

// Photos are picked up from /public by file name, so adding or replacing an
// image needs no code change:
//   public/products/<product-slug>/1.jpg  front   (white background)
//   public/products/<product-slug>/2.jpg  back    (white background)
//   public/products/<product-slug>/3.jpg  close-up (white background)
//   public/products/<product-slug>/4.jpg  lifestyle (any background)
//   public/hero/<collection-slug>.png     hero character (white background)
//   public/age/<age-group-slug>.webp      real baby on a Shop by age card

const IMAGE = /\.(png|jpe?g|webp|avif)$/i;

function list(dir: string) {
  try {
    return readdirSync(path.join(process.cwd(), "public", dir))
      .filter((f) => IMAGE.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

export function productImages(slug: string): string[] {
  return list(path.join("products", slug)).map((f) => `/products/${slug}/${f}`);
}

export function heroImages(): Record<string, string> {
  return Object.fromEntries(list("hero").map((f) => [f.replace(IMAGE, ""), `/hero/${f}`]));
}

/** The cut-out beside "Made with love" on the home page, if one has been added.
 *  Any image in public/story is used; without one the section keeps its drawing. */
export function storyImage(): string | undefined {
  const [first] = list("story");
  return first ? `/story/${first}` : undefined;
}

/** Photos for the Shop by age cards, keyed by age-group slug. See public/age/README.txt. */
export function ageImages(): Record<string, string> {
  return Object.fromEntries(list("age").map((f) => [f.replace(IMAGE, ""), `/age/${f}`]));
}

