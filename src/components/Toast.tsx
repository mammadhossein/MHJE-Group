import { useEffect } from "react";
import { cn } from "../utils/cn";

export type ToastType = "success" | "error" | "info";

export type ToastData = {
  type: ToastType;
  msg: string;
};

type ToastProps = {
  toast: ToastData | null;
  onClose: () => void;
};

export default function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 5500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const palette =
    toast.type === "success"
      ? {
          border: "border-emerald-400/40",
          bg: "bg-emerald-500/10",
          text: "text-emerald-200",
          glow: "shadow-[0_0_30px_rgba(16,185,129,0.35)]",
          icon: "✓",
        }
      : toast.type === "error"
      ? {
          border: "border-red-400/40",
          bg: "bg-red-500/10",
          text: "text-red-200",
          glow: "shadow-[0_0_30px_rgba(239,68,68,0.35)]",
          icon: "✕",
        }
      : {
          border: "border-white/15",
          bg: "bg-white/5",
          text: "text-white/85",
          glow: "shadow-[0_0_30px_rgba(0,200,255,0.2)]",
          icon: "ℹ",
        };

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[70] w-[min(92vw,360px)] sm:right-6">
      <div
        className={cn(
          "pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 backdrop-blur-xl transition-all",
          palette.border,
          palette.bg,
          palette.text,
          palette.glow
        )}
        role="status"
      >
        <span
          className={cn(
            "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
            palette.border,
            "bg-black/40"
          )}
        >
          {palette.icon}
        </span>
        <p className="flex-1 text-sm leading-relaxed text-white/90">{toast.msg}</p>
        <button
          onClick={onClose}
          className="shrink-0 text-white/40 transition-colors hover:text-white"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
