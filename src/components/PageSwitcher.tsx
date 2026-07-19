import { cn } from "../utils/cn";

type PageSwitcherProps = {
  active: "MH" | "JE";
  onChange: (p: "MH" | "JE") => void;
};

/**
 * Floating dual-page switcher. Shown on both pages.
 */
export default function PageSwitcher({ active, onChange }: PageSwitcherProps) {
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 sm:bottom-7">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/70 px-1.5 py-1.5 backdrop-blur-xl">
        <button
          onClick={() => onChange("MH")}
          className={cn(
            "rounded-full px-4 py-2 text-xs font-semibold tracking-widest transition-all",
            active === "MH"
              ? "bg-[#00C8FF] text-black shadow-[0_0_18px_rgba(0,200,255,0.7)]"
              : "text-white/70 hover:text-white"
          )}
        >
          MH
        </button>
        <span className="h-4 w-px bg-white/15" />
        <button
          onClick={() => onChange("JE")}
          className={cn(
            "rounded-full px-4 py-2 text-xs font-semibold tracking-widest transition-all",
            active === "JE"
              ? "bg-[#9B4DFF] text-white shadow-[0_0_18px_rgba(155,77,255,0.7)]"
              : "text-white/70 hover:text-white"
          )}
        >
          JE
        </button>
      </div>
    </div>
  );
}
