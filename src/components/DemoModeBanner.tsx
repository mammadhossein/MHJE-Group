import { useState } from "react";
import { isApiConfigured } from "../lib/api";

/**
 * Small dismissible banner shown at the top of the page when the backend
 * is not connected (VITE_API_URL is empty). Helps the developer know that
 * form submissions are running in demo mode.
 *
 * Hidden automatically when the API is configured.
 */
export default function DemoModeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (isApiConfigured() || dismissed) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] border-b border-amber-400/20 bg-amber-500/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-400" />
        <p className="flex-1 text-[11px] font-medium tracking-wide text-amber-100/90 sm:text-xs">
          <strong className="font-bold">Demo mode</strong> — backend not connected.
          Form submissions are simulated. Set{" "}
          <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-amber-200">
            VITE_API_URL
          </code>{" "}
          in your <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-amber-200">.env</code> to receive real submissions via Telegram.
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-full p-1 text-amber-100/60 transition-colors hover:text-amber-100"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
