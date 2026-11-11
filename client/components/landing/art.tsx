import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Silk waves (hero)                                                   */
/* ------------------------------------------------------------------ */
export function SilkWaves({ className }: { className?: string }) {
  const lines = Array.from({ length: 30 }, (_, i) => i);
  return (
    <svg viewBox="0 0 1000 560" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="silkA" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#B99AFF" stopOpacity="0" />
          <stop offset=".45" stopColor="#EEE6FF" stopOpacity=".95" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id="silkB" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#5932A8" stopOpacity="0" />
          <stop offset=".6" stopColor="#9068DC" stopOpacity=".95" />
          <stop offset="1" stopColor="#D2C0F5" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id="silkFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7138DC" stopOpacity=".05" />
          <stop offset="1" stopColor="#9068DC" stopOpacity=".55" />
        </linearGradient>
        <filter id="blurXL" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="blurSm">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      <g data-wave>
        {/* ambient glow */}
        <ellipse cx="720" cy="360" rx="330" ry="150" fill="#7138DC" opacity=".35" filter="url(#blurXL)" />
        <path
          d="M40 560 C 250 300, 420 240, 570 300 S 840 430, 1000 160 L1000 560 Z"
          fill="url(#silkFill)"
          opacity=".55"
          filter="url(#blurXL)"
        />

        {/* lower sweeping ribbon */}
        {lines.map((i) => (
          <path
            key={`a${i}`}
            d={`M ${40 + i * 4} 560 C ${250 + i * 5} ${330 - i * 2}, ${430 + i * 3} ${250 + i * 4}, ${580 + i * 4} ${310 + i * 3} S ${830 + i * 3} ${440 - i * 3}, 1000 ${170 + i * 5}`}
            stroke="url(#silkA)"
            strokeWidth={0.9}
            opacity={0.22 + (i % 5) * 0.09}
            filter="url(#blurSm)"
          />
        ))}

        {/* right rising ribbon */}
        {lines.map((i) => (
          <path
            key={`b${i}`}
            d={`M ${600 + i * 5} 560 C ${700 + i * 5} ${470 - i * 3}, ${820 + i * 3} ${300 + i * 2}, 1000 ${150 + i * 7}`}
            stroke="url(#silkB)"
            strokeWidth={1}
            opacity={0.2 + (i % 4) * 0.12}
            filter="url(#blurSm)"
          />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Server racks (Why section)                                          */
/* ------------------------------------------------------------------ */
type RackProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  dx: number;
  dy: number;
  rows: number;
};

function Rack({ x, y, w, h, dx, dy, rows }: RackProps) {
  const rowH = (h - 24) / rows;
  const stroke = "rgba(185,154,255,.22)";
  return (
    <g data-rack>
      {/* top */}
      <polygon
        points={`${x},${y} ${x + w},${y} ${x + w + dx},${y - dy} ${x + dx},${y - dy}`}
        fill="url(#rackTop)"
        stroke={stroke}
      />
      {/* side */}
      <polygon
        points={`${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y - dy + h} ${x + w},${y + h}`}
        fill="url(#rackSide)"
        stroke={stroke}
      />
      {/* front */}
      <rect x={x} y={y} width={w} height={h} fill="url(#rackFront)" stroke={stroke} />
      {Array.from({ length: rows }, (_, i) => {
        const ry = y + 12 + i * rowH;
        return (
          <g key={i}>
            <rect
              x={x + 10}
              y={ry}
              width={w - 20}
              height={rowH - 6}
              rx={2}
              fill="#0A0C17"
              stroke="rgba(255,255,255,.07)"
            />
            <rect x={x + 34} y={ry + (rowH - 6) / 2 - 1} width={w - 74} height={2} rx={1} fill="rgba(255,255,255,.07)" />
            <circle cx={x + 20} cy={ry + (rowH - 6) / 2} r={2} fill="#B99AFF" className="drop-shadow-[0_0_5px_#B99AFF]" />
            <circle cx={x + w - 20} cy={ry + (rowH - 6) / 2} r={2} fill={i % 3 === 0 ? "#B99AFF" : "#7138DC"} className="drop-shadow-[0_0_5px_#9068DC]" />
          </g>
        );
      })}
    </g>
  );
}

export function ServerRacks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 620 520" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="rackFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1B1D2E" />
          <stop offset="1" stopColor="#0B0D18" />
        </linearGradient>
        <linearGradient id="rackSide" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10121F" />
          <stop offset="1" stopColor="#05060C" />
        </linearGradient>
        <linearGradient id="rackTop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2A2C42" />
          <stop offset="1" stopColor="#151728" />
        </linearGradient>
        <radialGradient id="floorGlow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#9068DC" stopOpacity=".55" />
          <stop offset="1" stopColor="#9068DC" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* floor rings + glow */}
      <ellipse cx="310" cy="440" rx="290" ry="70" fill="url(#floorGlow)" />
      {[270, 230, 190].map((rx, i) => (
        <ellipse
          key={rx}
          cx="310"
          cy="440"
          rx={rx}
          ry={rx * 0.22}
          stroke="rgba(185,154,255,.28)"
          strokeWidth={1}
          opacity={0.9 - i * 0.2}
        />
      ))}

      <Rack x={100} y={190} w={140} h={230} dx={46} dy={26} rows={7} />
      <Rack x={290} y={110} w={170} h={320} dx={56} dy={30} rows={10} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Planet (pricing banner)                                             */
/* ------------------------------------------------------------------ */
export function Planet({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square rounded-full", className)} aria-hidden>
      <div className="absolute -inset-[8%] rounded-full bg-primary/30 blur-3xl" />
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 28% 22%, #8C6BE0 0%, #4B2FA0 22%, #1A1040 52%, #07060F 78%)",
          boxShadow:
            "inset -34px -44px 100px rgba(0,0,0,.85), inset 10px 10px 50px rgba(185,154,255,.5), 0 0 100px rgba(144,104,220,.4)",
        }}
      >
        <div
          data-swirl
          className="absolute -inset-[20%] opacity-40 mix-blend-screen"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(185,154,255,.55), transparent 30%, rgba(113,56,220,.55) 55%, transparent 78%)",
            filter: "blur(32px)",
          }}
        />
      </div>
      <div className="absolute inset-0 rounded-full ring-1 ring-[#B99AFF]/40" />
    </div>
  );
}