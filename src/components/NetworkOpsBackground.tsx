import { useMemo } from "react";

/**
 * A richer, more "network operations center" styled background for the MH hero.
 * Layers: hex/circuit grid, animated glowing circuit traces with traveling
 * current, a radar sweep, and floating IP/latency HUD chips.
 * Pure CSS + SVG — no heavy JS loops, safe for low-end devices.
 */
export default function NetworkOpsBackground() {
  const traces = useMemo(() => {
    // Deterministic pseudo-random circuit paths (stable across renders/builds)
    let s = 7331;
    const r = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: 10 }, (_, i) => {
      const y = 8 + i * 9 + r() * 3;
      const x1 = r() * 20;
      const x2 = 30 + r() * 30;
      const x3 = 70 + r() * 25;
      return { id: i, y, x1, x2, x3, delay: r() * 6, dur: 5 + r() * 4 };
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base deep gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,#0a1420_0%,#050708_55%,#020203_100%)]" />

      {/* Hex grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 0L56 16V50L28 66L0 50V16Z' fill='none' stroke='%2300C8FF' stroke-width='0.6'/%3E%3C/svg%3E\")",
          backgroundSize: "56px 100px",
        }}
      />

      {/* Circuit traces with animated glow current */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-70">
        <defs>
          <linearGradient id="trace-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00C8FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00C8FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#9B4DFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {traces.map((t) => (
          <g key={t.id}>
            <path
              d={`M ${t.x1} ${t.y} H ${t.x2} L ${t.x2 + 4} ${t.y - 3} H ${t.x3}`}
              fill="none"
              stroke="#00C8FF"
              strokeOpacity="0.12"
              strokeWidth="0.15"
            />
            <circle cx={t.x1} cy={t.y} r="0.4" fill="#00C8FF" opacity="0.5" />
            <circle cx={t.x3} cy={t.y} r="0.4" fill="#9B4DFF" opacity="0.5" />
            <rect
              x={t.x1}
              y={t.y - 0.6}
              width="6"
              height="1.2"
              fill="url(#trace-glow)"
              opacity="0.9"
            >
              <animate
                attributeName="x"
                from={t.x1 - 6}
                to={t.x3 + 6}
                dur={`${t.dur}s`}
                begin={`${t.delay}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        ))}
      </svg>

      {/* Radar sweep */}
      <div className="absolute right-[6%] top-[12%] hidden h-40 w-40 items-center justify-center opacity-40 sm:flex lg:h-56 lg:w-56">
        <div className="absolute inset-0 rounded-full border border-[#00C8FF]/25" />
        <div className="absolute inset-4 rounded-full border border-[#00C8FF]/15" />
        <div className="absolute inset-8 rounded-full border border-[#00C8FF]/10" />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, rgba(0,200,255,0.35), transparent 30%)",
            animation: "spin 4s linear infinite",
          }}
        />
        <span className="absolute h-1.5 w-1.5 rounded-full bg-[#00C8FF] shadow-[0_0_10px_#00C8FF]" />
      </div>

      {/* Glow blobs */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#00C8FF]/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#9B4DFF]/15 blur-3xl" />

      {/* Scanline sweep */}
      <div className="scan-sweep absolute inset-x-0 h-32 bg-gradient-to-b from-[#00C8FF]/10 via-[#00C8FF]/0 to-transparent" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
}
