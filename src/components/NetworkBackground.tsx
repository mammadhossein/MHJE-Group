import { useMemo } from "react";

/**
 * Animated network/node background for the MH hero.
 * Pure SVG; performance-friendly (no animation on every frame).
 */
export default function NetworkBackground() {
  const nodes = useMemo(() => {
    // Deterministic random for SSR/build stability
    let s = 12345;
    const r = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const count = 28;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 8 + r() * 84,
      y: 10 + r() * 80,
      r: 1.5 + r() * 2.4,
      delay: r() * 3,
    }));
  }, []);

  const links = useMemo(() => {
    const out: { a: number; b: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 26) out.push({ a: i, b: j });
      }
    }
    return out;
  }, [nodes]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-90"
      >
        <defs>
          <radialGradient id="g-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00C8FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g-purple" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9B4DFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9B4DFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="g-link" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#9B4DFF" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Links */}
        {links.map((l, i) => (
          <line
            key={`l-${i}`}
            x1={nodes[l.a].x}
            y1={nodes[l.a].y}
            x2={nodes[l.b].x}
            y2={nodes[l.b].y}
            stroke="url(#g-link)"
            strokeWidth="0.12"
            opacity="0.55"
          />
        ))}

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={`n-${n.id}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r * 1.2}
              fill={n.id % 3 === 0 ? "url(#g-purple)" : "url(#g-blue)"}
              className="net-pulse"
              style={{ animationDelay: `${n.delay}s` }}
            />
            <circle cx={n.x} cy={n.y} r={n.r * 0.45} fill="#ffffff" />
          </g>
        ))}
      </svg>

      {/* Soft glow blobs */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#00C8FF]/15 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#9B4DFF]/20 blur-3xl" />
    </div>
  );
}
