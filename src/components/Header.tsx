import { useEffect, useState } from "react";
import Logo from "./Logo";
import { cn } from "../utils/cn";

type HeaderProps = {
  brand: "MH" | "JE";
  items: { label: string; href: string }[];
  onNavigate?: (id: string) => void;
};

export default function Header({ brand, items, onNavigate }: HeaderProps) {
  const isMH = brand === "MH";
  const [ping, setPing] = useState(12);

  useEffect(() => {
    if (!isMH) return;
    const id = setInterval(() => {
      setPing(8 + Math.round(Math.random() * 14));
    }, 2200);
    return () => clearInterval(id);
  }, [isMH]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "relative mx-auto mt-4 flex max-w-7xl items-center justify-between overflow-hidden rounded-full border px-4 py-2.5 backdrop-blur-xl sm:px-6",
          isMH
            ? "border-[#00C8FF]/25 bg-black/70 shadow-[0_0_25px_rgba(0,200,255,0.08)]"
            : "border-white/10 bg-black/60"
        )}
      >
        {isMH && <span className="header-scan-bar" />}

        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.("top");
          }}
          className="flex items-center"
        >
          <Logo variant={brand} />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.(it.href.replace("#", ""));
              }}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white",
                "link-underline"
              )}
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isMH && (
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-[10.5px] tracking-wider text-emerald-300 lg:flex">
              <span className="ping-blip h-1.5 w-1.5 rounded-full bg-emerald-400" />
              PING {ping}ms
            </div>
          )}

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("contact");
            }}
            className={cn(
              "hidden rounded-full px-4 py-2 text-xs font-semibold tracking-widest sm:inline-flex",
              isMH ? "btn-neon-blue" : "btn-neon-purple"
            )}
          >
            {isMH ? "GET A QUOTE" : "HIRE JE"}
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("contact");
            }}
            className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white sm:hidden"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
