/**
 * Cinematic background for JO hero — film strip + light leaks.
 */
export default function CinemaBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Light leaks */}
      <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-[#9B4DFF]/30 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-[#00C8FF]/15 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9B4DFF]/10 blur-3xl" />

      {/* Film strip (top) */}
      <div className="absolute left-0 right-0 top-0 flex h-7 overflow-hidden opacity-30">
        <div className="film-scroll flex shrink-0">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-12 shrink-0 border-x border-white/15"
            />
          ))}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="h-7 w-12 shrink-0 border-x border-white/15"
            />
          ))}
        </div>
      </div>
      {/* Film strip (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 flex h-7 overflow-hidden opacity-30">
        <div
          className="film-scroll flex shrink-0"
          style={{ animationDirection: "reverse" }}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-12 shrink-0 border-x border-white/15"
            />
          ))}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="h-7 w-12 shrink-0 border-x border-white/15"
            />
          ))}
        </div>
      </div>

      {/* Cinematic scanlines */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
