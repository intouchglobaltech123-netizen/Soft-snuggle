# Google Flow image prompts — Soft Snuggle

Generate these in Google Flow (labs.google/flow), download, rename exactly as shown, and drop them
into the folder. The site picks them up automatically on the next page load. No code changes needed.

## Rules for every image

- **Studio shots (1, 2, 3) must be on a pure white background.** The site blends white into each card's
  soft colour, so the clothes look like they float on sage, peach or sky.
- Portrait framing (3:4 or 4:5). Keep the garment centred with some space around it.
- Same lighting and angle for every product, so the grid looks like one brand.
- JPG or WebP, around 1500 px tall, under 400 KB each (compress at squoosh.app).
- If Flow adds text, logos or extra items, regenerate.

| File | What |
| --- | --- |
| `1.jpg` | Front, white background |
| `2.jpg` | Back, white background (shown on hover) |
| `3.jpg` | Fabric close-up, white background |
| `4.jpg` | Lifestyle photo with a baby, any background |

---

## Shared prompt pieces

**STUDIO** (append to the studio prompts):
> professional e-commerce product photograph, garment shown on an invisible ghost mannequin, centred,
> pure white seamless background, soft diffused studio lighting, very soft natural shadow, crisp
> realistic cotton texture, true-to-life colour, no props, no text, no logo, no baby, portrait 4:5

**LIFESTYLE** (append to the lifestyle prompts):
> lifestyle photograph, a happy Indian baby wearing it, soft morning window light, cream linen bed
> sheets, warm neutral palette of cream, oat and sage, shallow depth of field, candid and gentle,
> editorial baby-brand style, no text, portrait 4:5

---

## Products

### 1. The Everyday Bodysuit → `public/products/everyday-bodysuit/`
- `1.jpg` Front view of a short-sleeve baby bodysuit with envelope shoulders and snap closures at the bottom, oat-milk off-white organic cotton, small embroidered five-dot flower on the chest, + STUDIO
- `2.jpg` Back view of the same oat-milk off-white baby bodysuit, + STUDIO
- `3.jpg` Macro close-up of oat-milk organic cotton jersey fabric showing the envelope shoulder seam and a nickel-free snap, + STUDIO
- `4.jpg` Baby around 3 months old wearing an oat-milk off-white short-sleeve bodysuit, + LIFESTYLE

### 2. Sunday Morning Romper → `public/products/sunday-morning-romper/`
- `1.jpg` Front view of a short-sleeve baby romper with full snap front, white peter-pan collar and a front pocket, biscuit-beige soft cotton, + STUDIO
- `2.jpg` Back view of the same biscuit-beige baby romper, + STUDIO
- `3.jpg` Macro close-up of biscuit-beige cotton romper showing the peter-pan collar and pocket stitching, + STUDIO
- `4.jpg` Baby around 9 months old sitting up, wearing a biscuit-beige cotton romper, + LIFESTYLE

### 3. Little Bloom Bodysuit → `public/products/little-bloom-bodysuit/`
- `1.jpg` Front view of a short-sleeve baby bodysuit in soft sage-green organic cotton with tiny embroidered pink flowers on the chest, + STUDIO
- `2.jpg` Back view of the same sage-green baby bodysuit, + STUDIO
- `3.jpg` Macro close-up of tiny pink flower embroidery on sage-green organic cotton, + STUDIO
- `4.jpg` Baby around 4 months old wearing a sage-green bodysuit with flower embroidery, + LIFESTYLE

### 4. The Welcome Home Set → `public/products/welcome-home-set/`
- `1.jpg` Baby gift set neatly arranged: fern-green bodysuit, knotted baby bonnet and a folded oat swaddle blanket inside an open cream keepsake box with a pink ribbon, top-down view, + STUDIO
- `2.jpg` The same closed cream keepsake gift box tied with a dusty-pink satin ribbon and a small handwritten tag, + STUDIO
- `3.jpg` Close-up of a fern-green knotted baby bonnet and the soft oat swaddle fabric, + STUDIO
- `4.jpg` Mother's hands holding a newborn wrapped in an oat swaddle and wearing a fern-green bonnet, + LIFESTYLE

### 5. Dreamy Days Bodysuit → `public/products/dreamy-days-bodysuit/`
- `1.jpg` Front view of a short-sleeve baby bodysuit in blush petal-pink organic cotton, plain and minimal, + STUDIO
- `2.jpg` Back view of the same petal-pink baby bodysuit, + STUDIO
- `3.jpg` Macro close-up of petal-pink organic cotton jersey with a flat seam, + STUDIO
- `4.jpg` Sleepy baby around 2 months old wearing a petal-pink bodysuit, + LIFESTYLE

### 6. The Wiggler Romper → `public/products/wiggler-romper/`
- `1.jpg` Front view of a long baby romper with legs in soft eucalyptus-green stretch jersey, snap front and reinforced knee patches, + STUDIO
- `2.jpg` Back view of the same eucalyptus-green jersey romper, + STUDIO
- `3.jpg` Macro close-up of eucalyptus-green stretch jersey knee patch stitching, + STUDIO
- `4.jpg` Baby around 10 months old crawling on a rug, wearing a eucalyptus-green romper, + LIFESTYLE

### 7. Cloud Nine Bodysuit → `public/products/cloud-nine-bodysuit/`
- `1.jpg` Front view of a short-sleeve baby bodysuit in pale morning-sky blue organic cotton with a small white embroidered cloud on the chest, + STUDIO
- `2.jpg` Back view of the same pale sky-blue baby bodysuit, + STUDIO
- `3.jpg` Macro close-up of a white embroidered cloud on pale sky-blue organic cotton, + STUDIO
- `4.jpg` Smiling baby around 5 months old wearing a pale sky-blue bodysuit, + LIFESTYLE

### 8. A Little Something Set → `public/products/little-something-set/`
- `1.jpg` Baby gift set arranged in an open cream box: petal-pink bodysuit, oat footed pants and a matching petal-pink knit hat, top-down view, + STUDIO
- `2.jpg` The same gift box closed with an oat-coloured ribbon bow, + STUDIO
- `3.jpg` Close-up of a petal-pink knit baby hat next to folded oat footed pants, + STUDIO
- `4.jpg` Baby around 3 months old wearing a petal-pink bodysuit and knit hat, + LIFESTYLE

---

## Hero characters (optional, replaces the drawn babies) → `public/hero/`

Same style for all six: 3D, Pixar-like, standing toddler, full body, **pure white background**.

**HERO** (append):
> cute 3D animated toddler character, Pixar-style, soft clay-like materials, big glossy eyes, rosy
> cheeks, standing full body facing the camera, centred, pure white background, soft studio lighting,
> small soft shadow under the feet, pastel colours, no text, portrait 3:4

| File | Prompt |
| --- | --- |
| `everyday.png` | Light-skinned toddler with a little brown hair tuft, wearing an oat off-white short-sleeve bodysuit and cream socks, holding a small teddy bear, + HERO |
| `sunday.png` | Brown-skinned toddler with curly dark hair under a sage-green knit beanie, wearing a biscuit-beige romper with a heart on the chest, + HERO |
| `bloom.png` | Dark-skinned toddler with curly black hair and a dusty-pink bow, wearing a sage-green bodysuit with a pink flower, + HERO |
| `cloud.png` | Fair toddler in a cream bunny-ear hood, wearing a pale sky-blue bodysuit with a white cloud, holding a yellow star plush, + HERO |
| `wiggler.png` | Toddler with a brown hair tuft wearing a eucalyptus-green romper with a yellow star, holding a teddy bear, + HERO |
| `welcome.png` | Toddler in a fern-green knotted bonnet, wearing a petal-pink bodysuit, holding a yellow star plush, + HERO |
