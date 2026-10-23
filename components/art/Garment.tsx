import { useId } from "react";
import { shade } from "@/lib/color";
import type { Category } from "@/lib/types";

interface Props {
  category: Category;
  color: string;
  className?: string;
  /** Shows the back of the garment (no chest motif) */
  back?: boolean;
}

/** Flat-lay product illustration, stand-in until real product photos arrive. */
export function Garment({ category, color, className, back }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const fill = `url(#g-${uid})`;
  const line = shade(color, -0.16);
  const ink = shade(color, -0.5);

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={shade(color, 0.28)} />
          <stop offset="0.6" stopColor={color} />
          <stop offset="1" stopColor={shade(color, -0.1)} />
        </linearGradient>
        <filter id={`s-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#263B36" floodOpacity="0.16" />
        </filter>
      </defs>

      {category === "bodysuit" && (
        <g filter={`url(#s-${uid})`}>
          <path
            d="M72 40 Q86 54 100 54 Q114 54 128 40 L158 54 Q162 58 160 62 L150 84 L134 78 L134 140 Q134 156 120 160 L112 162 Q100 152 88 162 L80 160 Q66 156 66 140 L66 78 L50 84 L40 62 Q38 58 42 54 Z"
            fill={fill}
          />
          <path d="M72 40 Q86 54 100 54 Q114 54 128 40" stroke={line} strokeWidth="2.5" fill="none" />
          <path d="M80 44 Q84 58 94 56" stroke={line} strokeWidth="1.8" fill="none" opacity="0.7" />
          <path d="M120 44 Q116 58 106 56" stroke={line} strokeWidth="1.8" fill="none" opacity="0.7" />
          {[92, 100, 108].map((x) => (
            <circle key={x} cx={x} cy={158 - (x === 100 ? 0 : 1)} r="2" fill={line} />
          ))}
          {!back && <Motif x={100} y={100} ink={ink} />}
        </g>
      )}

      {category === "romper" && (
        <g filter={`url(#s-${uid})`}>
          <path
            d="M72 32 Q86 46 100 46 Q114 46 128 32 L156 46 L148 74 L134 70 L136 128 L140 172 Q140 178 134 178 L110 178 L104 142 Q100 136 96 142 L90 178 L66 178 Q60 178 60 172 L64 128 L66 70 L52 74 L44 46 Z"
            fill={fill}
          />
          <path d="M80 36 Q100 62 120 36" fill="#FDFBF6" />
          <path d="M80 36 Q100 62 120 36" stroke={line} strokeWidth="1.6" fill="none" />
          <rect x="82" y="96" width="36" height="28" rx="8" fill={shade(color, -0.06)} />
          <path d="M82 104 L118 104" stroke={line} strokeWidth="1.4" strokeDasharray="3 3" />
          {[68, 80].map((y) => (
            <circle key={y} cx="100" cy={y} r="2.6" fill="#FDFBF6" stroke={line} strokeWidth="1" />
          ))}
          <path d="M66 170 L90 170 M110 170 L134 170" stroke={line} strokeWidth="2" />
          {!back && <Motif x={100} y={146} ink={ink} small />}
        </g>
      )}

      {category === "frock" && (
        <g filter={`url(#s-${uid})`}>
          <path
            d="M76 30 Q100 46 124 30 L140 36 Q133 58 136 86 L132 94 Q152 128 168 172 Q100 186 32 172 Q48 128 68 94 L64 86 Q67 58 60 36 Z"
            fill={fill}
          />
          <path d="M76 30 Q100 46 124 30" stroke={line} strokeWidth="2.5" fill="none" />
          <path d="M66 95 Q100 104 134 95" stroke={line} strokeWidth="2" fill="none" />
          {[78, 92, 108, 122].map((x) => (
            <path key={x} d={`M${x} 100 Q${x - 6} 135 ${x - 12} 170`} stroke={line} strokeWidth="1.4" fill="none" opacity="0.6" />
          ))}
          {!back && <Motif x={100} y={66} ink={ink} small />}
        </g>
      )}

      {category === "jabla" && (
        <g filter={`url(#s-${uid})`}>
          <path
            d="M68 34 L86 32 Q94 58 100 72 Q106 58 114 32 L132 34 Q132 56 152 68 L152 160 Q100 170 48 160 L48 68 Q68 56 68 34 Z"
            fill={fill}
          />
          <path d="M86 32 Q94 58 100 72 Q106 58 114 32" stroke={line} strokeWidth="2.5" fill="none" />
          <path d="M100 72 L100 164" stroke={line} strokeWidth="2" />
          {[92, 112, 132, 150].map((y) => (
            <circle key={y} cx="100" cy={y} r="2.8" fill="#FDFBF6" stroke={line} strokeWidth="1" />
          ))}
          {!back && <Motif x={74} y={110} ink={ink} small />}
        </g>
      )}

      {category === "gift-set" && (
        <g filter={`url(#s-${uid})`}>
          <path d="M70 70 Q78 52 92 58 L100 70 L108 58 Q122 52 130 70" fill={shade(color, 0.3)} opacity="0.9" />
          <rect x="40" y="92" width="120" height="82" rx="16" fill={fill} />
          <rect x="33" y="76" width="134" height="28" rx="12" fill={shade(color, -0.05)} />
          <rect x="92" y="76" width="16" height="98" fill="#E6A99D" />
          <path d="M100 76 C82 52 64 62 76 74 C82 80 92 78 100 76 Z" fill="#E6A99D" />
          <path d="M100 76 C118 52 136 62 124 74 C118 80 108 78 100 76 Z" fill="#E6A99D" />
          <circle cx="100" cy="76" r="6" fill={shade("#E6A99D", -0.12)} />
          <rect x="120" y="120" width="26" height="18" rx="4" fill="#FDFBF6" transform="rotate(-8 133 129)" />
          {!back && <Motif x={60} y={140} ink={ink} small />}
        </g>
      )}
    </svg>
  );
}

function Motif({ x, y, ink, small }: { x: number; y: number; ink: string; small?: boolean }) {
  const s = small ? 0.8 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={ink} opacity="0.55">
      <circle r="2.8" />
      <circle cx="-7" cy="-5" r="2.5" />
      <circle cx="7" cy="-5" r="2.5" />
      <circle cx="-4.5" cy="6.5" r="2.5" />
      <circle cx="4.5" cy="6.5" r="2.5" />
    </g>
  );
}
