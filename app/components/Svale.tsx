/**
 * Svale — flyvende svaler (swallows), Svaleholms navnefugl.
 * En diskret brand-animation der lader et par svaler glide hen over himlen
 * i toppen af hver hero. Positioner er faste (ingen Math.random) for at undgå
 * SSR/CSR-hydration-mismatch.
 */

interface SvaleProps {
  /** lodret placering i hero-toppen, i % */
  top: number;
  /** fuglens bredde i px */
  size: number;
  /** flyve-varighed i sekunder */
  duration: number;
  /** forsinkelse i sekunder (negativ = starter midt i banen) */
  delay: number;
  /** farve */
  color?: string;
  opacity?: number;
}

function Svale({ top, size, duration, delay, color = "#F2EFE7", opacity = 0.7 }: SvaleProps) {
  return (
    <span
      className="svale-fly"
      style={{
        top: `${top}%`,
        left: 0,
        width: size,
        height: size * 0.4,
        opacity,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    >
      <svg className="svale-flap" viewBox="0 0 100 40" width="100%" height="100%" fill={color}>
        <path d="M50 20 C 40 10, 20 3, 2 6 C 22 10, 37 16, 48 22 L 43 34 L 50 26 L 57 34 L 52 22 C 63 16, 78 10, 98 6 C 80 3, 60 10, 50 20 Z" />
      </svg>
    </span>
  );
}

interface SvaleFlockProps {
  /** antal svaler (1–4) */
  count?: number;
  color?: string;
}

// Faste konfigurationer, så flokken ser levende men rolig ud.
const CONFIGS: SvaleProps[] = [
  { top: 14, size: 30, duration: 20, delay: 0,   opacity: 0.7 },
  { top: 22, size: 22, duration: 26, delay: -6,  opacity: 0.55 },
  { top: 9,  size: 26, duration: 23, delay: -13, opacity: 0.6 },
  { top: 28, size: 18, duration: 30, delay: -20, opacity: 0.45 },
];

export function SvaleFlock({ count = 3, color = "#F2EFE7" }: SvaleFlockProps) {
  const n = Math.max(1, Math.min(CONFIGS.length, count));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }} aria-hidden="true">
      {CONFIGS.slice(0, n).map((c, i) => (
        <Svale key={i} {...c} color={color} />
      ))}
    </div>
  );
}
