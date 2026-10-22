/** Studio shots (1–3) sit on white and blend into the card colour; lifestyle (4+) is shown as-is. */
export function isStudioShot(src: string) {
  const name = src.split("/").pop() ?? "";
  return /^[123]\./.test(name);
}
