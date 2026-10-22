import { useId } from "react";
import { shade } from "@/lib/color";

export interface BabyLook {
  skin: string;
  hair: string;
  hairStyle: "tuft" | "curls" | "none";
  outfit: string;
  kind: "bodysuit" | "romper";
  detail: "dots" | "flower" | "cloud" | "heart" | "star";
  accessory: "none" | "bow" | "beanie" | "bunny" | "bonnet";
  accessoryColor?: string;
  prop: "none" | "teddy" | "star";
}

interface Props {
  look: BabyLook;
  animated?: boolean;
  className?: string;
}

/**
 * Clay-style toddler illustration. Stand-in for the 3D renders — swap with
 * transparent PNGs later by replacing this component in the hero.
 */
export function Baby({ look, animated = true, className }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${name}-${uid}`;
  const acc = look.accessoryColor ?? shade(look.outfit, -0.1);
  const sock = "#FBF7F0";

  const grad = (name: string, base: string) => (
    <radialGradient id={id(name)} cx="0.36" cy="0.3" r="0.8">
      <stop offset="0" stopColor={shade(base, 0.35)} />
      <stop offset="0.55" stopColor={base} />
      <stop offset="1" stopColor={shade(base, -0.16)} />
    </radialGradient>
  );

  return (
    <svg viewBox="0 0 220 320" className={className} aria-hidden="true">
      <defs>
        {grad("skin", look.skin)}
        {grad("outfit", look.outfit)}
        {grad("hair", look.hair)}
        {grad("acc", acc)}
        {grad("sock", sock)}
        <radialGradient id={id("cheek")}>
          <stop offset="0" stopColor="#F0958B" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F0958B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="110" cy="306" rx="58" ry="9" fill="#263B36" opacity="0.13" />

      <g className={animated ? "anim-bob" : undefined}>
        {/* Hood sits behind the head */}
        {(look.accessory === "bunny" || look.accessory === "bonnet") && (
          <g>
            {look.accessory === "bunny" && (
              <>
                <ellipse cx="78" cy="22" rx="15" ry="38" transform="rotate(-14 78 22)" fill={`url(#${id("acc")})`} />
                <ellipse cx="78" cy="24" rx="7" ry="27" transform="rotate(-14 78 24)" fill="#F4C9C3" />
                <ellipse cx="142" cy="22" rx="15" ry="38" transform="rotate(14 142 22)" fill={`url(#${id("acc")})`} />
                <ellipse cx="142" cy="24" rx="7" ry="27" transform="rotate(14 142 24)" fill="#F4C9C3" />
              </>
            )}
            <circle cx="110" cy="100" r="74" fill={`url(#${id("acc")})`} />
          </g>
        )}

        {/* Legs */}
        {look.kind === "bodysuit" ? (
          <>
            <ellipse cx="90" cy="268" rx="16" ry="24" fill={`url(#${id("skin")})`} />
            <ellipse cx="130" cy="268" rx="16" ry="24" fill={`url(#${id("skin")})`} />
          </>
        ) : (
          <>
            <ellipse cx="89" cy="262" rx="19" ry="28" fill={`url(#${id("outfit")})`} />
            <ellipse cx="131" cy="262" rx="19" ry="28" fill={`url(#${id("outfit")})`} />
            <rect x="71" y="278" width="36" height="9" rx="4.5" fill={shade(look.outfit, -0.12)} />
            <rect x="113" y="278" width="36" height="9" rx="4.5" fill={shade(look.outfit, -0.12)} />
          </>
        )}
        <ellipse cx="87" cy="294" rx="20" ry="11" fill={`url(#${id("sock")})`} />
        <ellipse cx="133" cy="294" rx="20" ry="11" fill={`url(#${id("sock")})`} />
        <path d="M74 296 Q87 302 100 296" stroke={shade(sock, -0.12)} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M120 296 Q133 302 146 296" stroke={shade(sock, -0.12)} strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Body */}
        {look.kind === "bodysuit" ? (
          <path
            d="M76 158 C76 150 84 146 94 146 L126 146 C136 146 144 150 144 158 C152 180 156 205 152 228 C150 244 140 252 128 252 C122 252 118 246 110 246 C102 246 98 252 92 252 C80 252 70 244 68 228 C64 205 68 180 76 158 Z"
            fill={`url(#${id("outfit")})`}
          />
        ) : (
          <path
            d="M76 158 C76 150 84 146 94 146 L126 146 C136 146 144 150 144 158 C152 180 158 210 154 240 C152 252 146 258 136 258 L84 258 C74 258 68 252 66 240 C62 210 68 180 76 158 Z"
            fill={`url(#${id("outfit")})`}
          />
        )}

        {look.kind === "bodysuit" ? (
          <>
            <path d="M86 150 Q92 162 101 157" stroke={shade(look.outfit, -0.14)} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M134 150 Q128 162 119 157" stroke={shade(look.outfit, -0.14)} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {[102, 110, 118].map((x, i) => (
              <circle key={x} cx={x} cy={i === 1 ? 244 : 242} r="2.3" fill={shade(look.outfit, -0.22)} />
            ))}
          </>
        ) : (
          <>
            <path d="M88 147 Q99 166 110 152 Q121 166 132 147 Z" fill="#FDFBF6" />
            <rect x="92" y="200" width="36" height="30" rx="9" fill={shade(look.outfit, -0.07)} />
            <path d="M92 208 L128 208" stroke={shade(look.outfit, -0.16)} strokeWidth="1.6" strokeDasharray="3 3" />
            <circle cx="90" cy="174" r="3.4" fill="#FDFBF6" />
            <circle cx="130" cy="174" r="3.4" fill="#FDFBF6" />
          </>
        )}

        <ChestDetail detail={look.detail} y={look.kind === "bodysuit" ? 196 : 186} outfit={look.outfit} />

        {/* Left arm + prop */}
        {look.prop === "teddy" && <Teddy />}
        {look.prop === "star" && <StarPlush />}
        <ellipse cx="68" cy="184" rx="15" ry="27" transform="rotate(18 68 184)" fill={`url(#${id("outfit")})`} />
        <circle cx="58" cy="210" r="12.5" fill={`url(#${id("skin")})`} />

        {/* Right arm sways */}
        <g
          className={animated ? "anim-sway" : undefined}
          style={{ transformOrigin: "146px 162px", transformBox: "view-box" }}
        >
          <ellipse cx="152" cy="184" rx="15" ry="27" transform="rotate(-18 152 184)" fill={`url(#${id("outfit")})`} />
          <circle cx="162" cy="210" r="12.5" fill={`url(#${id("skin")})`} />
        </g>

        {/* Head */}
        <circle cx="50" cy="106" r="13" fill={`url(#${id("skin")})`} />
        <circle cx="170" cy="106" r="13" fill={`url(#${id("skin")})`} />
        <ellipse cx="51" cy="107" rx="6" ry="7" fill={shade(look.skin, -0.12)} />
        <ellipse cx="169" cy="107" rx="6" ry="7" fill={shade(look.skin, -0.12)} />
        <circle cx="110" cy="98" r="62" fill={`url(#${id("skin")})`} />
        <ellipse cx="86" cy="64" rx="21" ry="11" transform="rotate(-22 86 64)" fill="#fff" opacity="0.22" />

        <Hair look={look} fill={`url(#${id("hair")})`} />
        <Accessory look={look} fill={`url(#${id("acc")})`} color={acc} />

        {/* Face */}
        <g className={animated ? "anim-blink" : undefined}>
          <ellipse cx="88" cy="110" rx="7.2" ry="8.8" fill="#2E2622" />
          <ellipse cx="132" cy="110" rx="7.2" ry="8.8" fill="#2E2622" />
          <circle cx="85.4" cy="106.2" r="2.7" fill="#fff" />
          <circle cx="129.4" cy="106.2" r="2.7" fill="#fff" />
          <circle cx="90.6" cy="113.4" r="1.2" fill="#fff" opacity="0.8" />
          <circle cx="134.6" cy="113.4" r="1.2" fill="#fff" opacity="0.8" />
        </g>
        <ellipse cx="73" cy="127" rx="14" ry="9" fill={`url(#${id("cheek")})`} />
        <ellipse cx="147" cy="127" rx="14" ry="9" fill={`url(#${id("cheek")})`} />
        <ellipse cx="110" cy="121" rx="3.6" ry="2.5" fill={shade(look.skin, -0.18)} />
        <path d="M100 128 Q110 142 120 128 Q110 132 100 128 Z" fill="#9B4F45" />
        <path d="M105 133.5 Q110 138 115 133.5 Q110 135 105 133.5 Z" fill="#E98E86" />

        {look.accessory === "bonnet" && (
          <g>
            <path d="M96 160 L110 152 L124 160" stroke={acc} strokeWidth="5" fill="none" strokeLinecap="round" />
            <ellipse cx="98" cy="164" rx="9" ry="5" transform="rotate(-25 98 164)" fill={`url(#${id("acc")})`} />
            <ellipse cx="122" cy="164" rx="9" ry="5" transform="rotate(25 122 164)" fill={`url(#${id("acc")})`} />
            <circle cx="110" cy="160" r="4.5" fill={shade(acc, -0.1)} />
          </g>
        )}
      </g>
    </svg>
  );
}

function Hair({ look, fill }: { look: BabyLook; fill: string }) {
  if (look.accessory === "beanie" || look.accessory === "bunny" || look.accessory === "bonnet") return null;
  if (look.hairStyle === "curls") {
    return (
      <g fill={fill}>
        {[
          [64, 66, 15], [78, 50, 17], [96, 40, 18], [116, 37, 18], [136, 42, 17], [152, 54, 16], [160, 70, 12], [58, 82, 10],
        ].map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    );
  }
  if (look.hairStyle === "tuft") {
    return (
      <g fill={fill}>
        <path d="M106 40 C100 20 122 10 134 22 C124 20 117 26 119 40 Z" />
        <path d="M96 42 C92 30 100 24 106 28 C101 30 100 36 102 42 Z" />
      </g>
    );
  }
  return <path d="M108 37 C106 28 116 24 120 30 C114 30 112 33 113 38 Z" fill={fill} />;
}

function Accessory({ look, fill, color }: { look: BabyLook; fill: string; color: string }) {
  switch (look.accessory) {
    case "bow":
      return (
        <g transform="translate(146 52) rotate(18)">
          <ellipse cx="-13" cy="0" rx="14" ry="10" fill={fill} />
          <ellipse cx="13" cy="0" rx="14" ry="10" fill={fill} />
          <circle cx="0" cy="0" r="6.5" fill={shade(color, -0.12)} />
        </g>
      );
    case "beanie":
      return (
        <g>
          <path d="M46 92 C46 40 80 26 110 26 C140 26 174 40 174 92 Z" fill={fill} />
          {[70, 90, 110, 130, 150].map((x) => (
            <path key={x} d={`M${x} 36 L${x} 86`} stroke={shade(color, -0.08)} strokeWidth="2" opacity="0.6" />
          ))}
          <rect x="42" y="80" width="136" height="22" rx="11" fill={shade(color, -0.1)} />
          <circle cx="110" cy="24" r="15" fill={fill} />
        </g>
      );
    case "bunny":
    case "bonnet":
      return (
        <g>
          <path d="M40 104 C38 30 182 30 180 104 C168 58 52 58 40 104 Z" fill={fill} />
          {look.accessory === "bonnet" &&
            [52, 70, 90, 110, 130, 150, 168].map((x, i) => (
              <circle key={x} cx={x} cy={i === 0 || i === 6 ? 86 : i === 1 || i === 5 ? 70 : 63} r="6" fill={shade(color, 0.25)} />
            ))}
        </g>
      );
    default:
      return null;
  }
}

function ChestDetail({ detail, y, outfit }: { detail: BabyLook["detail"]; y: number; outfit: string }) {
  const ink = shade(outfit, -0.45);
  switch (detail) {
    case "flower":
      return (
        <g transform={`translate(110 ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-7" rx="5" ry="7" transform={`rotate(${a})`} fill="#E6A99D" />
          ))}
          <circle r="4" fill="#F1D47A" />
        </g>
      );
    case "cloud":
      return (
        <g transform={`translate(110 ${y})`} fill="#FDFBF6">
          <circle cx="-8" cy="2" r="7" />
          <circle cx="2" cy="-3" r="9" />
          <circle cx="11" cy="3" r="6" />
          <rect x="-15" y="2" width="31" height="8" rx="4" />
        </g>
      );
    case "heart":
      return (
        <path
          transform={`translate(110 ${y}) scale(0.9)`}
          d="M0 10 C-14 0 -14 -12 -6 -12 C-2 -12 0 -9 0 -7 C0 -9 2 -12 6 -12 C14 -12 14 0 0 10 Z"
          fill="#E6A99D"
        />
      );
    case "star":
      return (
        <path
          transform={`translate(110 ${y})`}
          d="M0 -11 L3.2 -3.5 L11 -3.4 L4.8 1.6 L7 9.5 L0 5 L-7 9.5 L-4.8 1.6 L-11 -3.4 L-3.2 -3.5 Z"
          fill="#F1D47A"
        />
      );
    default:
      return (
        <g transform={`translate(110 ${y})`} fill={ink} opacity="0.7">
          <circle cx="0" cy="0" r="2.6" />
          <circle cx="-6" cy="-5" r="2.3" />
          <circle cx="6" cy="-5" r="2.3" />
          <circle cx="-4" cy="6" r="2.3" />
          <circle cx="4" cy="6" r="2.3" />
        </g>
      );
  }
}

function Teddy() {
  return (
    <g transform="translate(40 214)">
      <circle cx="0" cy="8" r="17" fill="#C99B72" />
      <ellipse cx="0" cy="12" rx="9" ry="8" fill="#E3C3A2" />
      <circle cx="-11" cy="-20" r="6" fill="#B98A62" />
      <circle cx="11" cy="-20" r="6" fill="#B98A62" />
      <circle cx="0" cy="-12" r="14" fill="#C99B72" />
      <ellipse cx="0" cy="-8" rx="6" ry="4.5" fill="#E3C3A2" />
      <circle cx="-5" cy="-15" r="1.8" fill="#2E2622" />
      <circle cx="5" cy="-15" r="1.8" fill="#2E2622" />
      <circle cx="0" cy="-9.5" r="1.6" fill="#2E2622" />
    </g>
  );
}

function StarPlush() {
  return (
    <g transform="translate(40 200) rotate(-12)">
      <path
        d="M0 -26 L7.6 -8.4 L26 -8 L11.6 3.6 L16.4 22.4 L0 12 L-16.4 22.4 L-11.6 3.6 L-26 -8 L-7.6 -8.4 Z"
        fill="#F1D98A"
        stroke="#E5C766"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="-4.5" cy="0" r="1.8" fill="#2E2622" />
      <circle cx="4.5" cy="0" r="1.8" fill="#2E2622" />
      <path d="M-3 5 Q0 8 3 5" stroke="#2E2622" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </g>
  );
}
