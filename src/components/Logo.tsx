import { cn } from "../utils/cn";

type LogoProps = {
  variant: "MH" | "JE";
  className?: string;
  hideText?: boolean;
};

/**
 * Brand logo. Uses the real logo artwork provided:
 * - MH = Mohammad Hossein (IT/Network) — black glyph on white chip.
 * - JO = Jovaynee (Editing), shown as "JE" — white glyph on black chip.
 */
export default function Logo({ variant, className, hideText }: LogoProps) {
  const isMH = variant === "MH";
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <div
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border",
          isMH ? "border-white/15 bg-white" : "border-white/15 bg-black"
        )}
        aria-hidden
      >
        <img
          src={isMH ? "/images/mh-logo.png" : "/images/je-logo.png"}
          alt={isMH ? "MH logo" : "JE logo"}
          className="h-[70%] w-[70%] object-contain"
          draggable={false}
        />
      </div>
      {!hideText && (
        <div className="leading-none">
          <div className="text-[13px] font-semibold tracking-[0.18em] text-white">
            {isMH ? "MOHAMMAD" : "JOVAYNEE"}
          </div>
          <div className="text-[10px] font-medium tracking-[0.32em] text-white/50">
            {isMH ? "IT · NETWORK" : "EDITING"}
          </div>
        </div>
      )}
    </div>
  );
}
