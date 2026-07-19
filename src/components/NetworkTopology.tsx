import { IconServiceNet, IconShield, IconServer, IconCloud, IconUser } from "./Icons";

/**
 * A live-looking network topology diagram: Client → Firewall → Router → Server → Cloud
 * with animated packets traveling along the connections (SVG animateMotion — GPU friendly).
 */
export default function NetworkTopology() {
  const nodes = [
    { key: "client", label: "CLIENT", Icon: IconUser, x: 6 },
    { key: "firewall", label: "FIREWALL", Icon: IconShield, x: 30 },
    { key: "router", label: "ROUTER", Icon: IconServiceNet, x: 54 },
    { key: "server", label: "SERVER", Icon: IconServer, x: 78 },
    { key: "cloud", label: "CLOUD", Icon: IconCloud, x: 96 },
  ];

  return (
    <div className="relative w-full overflow-x-auto rounded-2xl border border-[#00C8FF]/20 bg-black/50 p-6 sm:p-10">
      <div className="relative mx-auto h-40 min-w-[560px] max-w-3xl sm:h-48">
        {/* connection line */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="topo-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#9B4DFF" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <line x1="6" y1="50" x2="96" y2="50" stroke="url(#topo-line)" strokeWidth="0.4" />
          <line x1="6" y1="50" x2="96" y2="50" stroke="#00C8FF" strokeWidth="0.15" className="dash-travel" />

          {/* traveling packets */}
          {[0, 1, 2].map((i) => (
            <circle key={i} r="1.1" fill="#00C8FF">
              <animateMotion
                path="M 6 50 L 96 50"
                dur="3.6s"
                begin={`${i * 1.2}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>

        {/* nodes */}
        <div className="absolute inset-0 flex items-center justify-between">
          {nodes.map((n) => (
            <div key={n.key} className="flex flex-col items-center gap-2">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00C8FF]/35 bg-[#00171f] text-[#9fe7ff] shadow-[0_0_20px_rgba(0,200,255,0.2)] sm:h-16 sm:w-16">
                <n.Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-black bg-emerald-400" />
              </div>
              <span className="text-[10px] font-semibold tracking-widest text-white/50">{n.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
