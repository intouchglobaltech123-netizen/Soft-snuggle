interface Props {
  className?: string;
}

/** The Soft Snuggle wordmark (transparent background). */
export function Logo({ className = "h-9" }: Props) {
  return (
    <img
      src="/logo.webp"
      alt="Soft Snuggle"
      width={1165}
      height={350}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
