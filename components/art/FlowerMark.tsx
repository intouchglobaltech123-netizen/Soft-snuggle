interface Props {
  className?: string;
  petal?: string;
  center?: string;
}

/** The little five-petal flower used as the Soft Snuggle mark. */
export function FlowerMark({ className, petal = "#7F9C88", center = "#F1D47A" }: Props) {
  return (
    <svg viewBox="-20 -20 40 40" className={className} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-8.5" rx="6" ry="8.5" transform={`rotate(${a})`} fill={petal} />
      ))}
      <circle r="4.6" fill={center} />
    </svg>
  );
}
