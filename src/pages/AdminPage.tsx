import { useState, useEffect, FormEvent, useMemo } from "react";
import {
  fetchPortfolio,
  addPortfolioItem,
  deletePortfolioItem,
  fetchProjects,
  addProjectItem,
  deleteProjectItem,
  verifyAdminKey,
  isApiConfigured,
  type PortfolioItem,
  type ProjectItem,
} from "../lib/api";
import {
  IconX,
  IconCheck,
  IconFilm,
  IconServiceNet,
  IconPlay,
  IconArrowRight,
  IconSend,
} from "../components/Icons";
import Toast, { type ToastData } from "../components/Toast";
import { cn } from "../utils/cn";

const SESSION_KEY = "mh_je_admin_key";
const GRADIENT_PRESETS = [
  "from-[#9B4DFF] via-[#5a1a99] to-black",
  "from-[#1a1a1a] via-[#9B4DFF]/40 to-black",
  "from-[#9B4DFF] via-[#00C8FF]/30 to-black",
  "from-black via-[#9B4DFF]/60 to-[#1a1a1a]",
  "from-[#00C8FF]/30 via-[#9B4DFF]/40 to-black",
  "from-[#9B4DFF] via-[#ff5fb1]/30 to-black",
];

type Tab = "overview" | "portfolio" | "projects";

/* ------------------------------------------------------------------ */
/* Login Gate                                                          */
/* ------------------------------------------------------------------ */
function LoginGate({ onSuccess }: { onSuccess: (key: string) => void }) {
  const [key, setKey] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;
    setChecking(true);
    setError("");
    const valid = await verifyAdminKey(key.trim());
    setChecking(false);
    if (valid) {
      sessionStorage.setItem(SESSION_KEY, key.trim());
      onSuccess(key.trim());
    } else {
      setError("Invalid admin key or backend unreachable.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] p-6">
      {/* Animated backdrop */}
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-[#00C8FF]/15 blur-[100px]" />
        <div className="absolute right-[10%] bottom-[15%] h-80 w-80 rounded-full bg-[#9B4DFF]/20 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <form
        onSubmit={onSubmit}
        className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
      >
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white">
            <img src="/images/mh-logo.png" alt="MH" className="h-[70%] w-[70%] object-contain" />
          </div>
          <span className="text-lg font-light text-white/30">×</span>
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-black">
            <img src="/images/je-logo.png" alt="JE" className="h-[70%] w-[70%] object-contain" />
          </div>
        </div>
        <h1 className="text-center text-xl font-bold text-white">Admin Control Center</h1>
        <p className="mt-1.5 text-center text-xs text-white/40">
          Manage MH Projects &amp; JE Portfolio content
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-[11px] font-semibold tracking-widest text-white/50">
            ADMIN KEY
          </label>
          <input
            type="password"
            autoFocus
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="••••••••••••••••"
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white tracking-widest transition-all focus:border-[#00C8FF]/60 focus:outline-none focus:ring-2 focus:ring-[#00C8FF]/20"
          />
          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
          {!isApiConfigured() && (
            <p className="mt-2 text-xs text-amber-300/80">
              VITE_API_URL is not set — the panel cannot verify or save anything.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={checking}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C8FF] to-[#9B4DFF] px-4 py-3 text-sm font-bold tracking-widest text-black transition-all hover:shadow-[0_0_30px_rgba(155,77,255,0.4)] disabled:opacity-50"
        >
          {checking ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
          ) : (
            <>UNLOCK PANEL</>
          )}
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Confirm Dialog                                                      */
/* ------------------------------------------------------------------ */
function ConfirmDialog({
  open,
  title,
  desc,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  desc: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onCancel}>
      <div
        className="w-full max-w-sm rounded-2xl border border-red-500/30 bg-[#0d0d0d] p-6 shadow-[0_0_60px_rgba(239,68,68,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-red-400">
          <IconX className="h-6 w-6" />
        </div>
        <h3 className="text-center text-base font-bold text-white">{title}</h3>
        <p className="mt-2 text-center text-sm text-white/50">{desc}</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500/90 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Admin Page                                                     */
/* ------------------------------------------------------------------ */
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(() => sessionStorage.getItem(SESSION_KEY));
  const [tab, setTab] = useState<Tab>("overview");
  const [toast, setToast] = useState<ToastData | null>(null);

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: "portfolio" | "project"; id: string; title: string } | null>(null);

  const loadAll = async () => {
    setLoading(true);
    const [p, pr] = await Promise.all([fetchPortfolio(), fetchProjects()]);
    setPortfolio(p);
    setProjects(pr);
    setLoading(false);
  };

  useEffect(() => {
    if (adminKey) loadAll();
  }, [adminKey]);

  const stats = useMemo(
    () => [
      { label: "JE Portfolio Videos", value: portfolio.length, color: "purple" as const },
      { label: "MH Projects", value: projects.length, color: "blue" as const },
      { label: "Backend Status", value: isApiConfigured() ? "Online" : "Offline", color: isApiConfigured() ? ("emerald" as const) : ("red" as const) },
    ],
    [portfolio, projects]
  );

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAdminKey(null);
  };

  if (!adminKey) {
    return <LoginGate onSuccess={setAdminKey} />;
  }

  const onAddPortfolio = async (data: { title: string; tag: string; videoUrl: string; gradient: string }) => {
    const res = await addPortfolioItem(adminKey, data);
    if (res.ok) {
      setToast({ type: "success", msg: "Video added to JE portfolio!" });
      setShowAddPortfolio(false);
      loadAll();
    } else {
      setToast({ type: "error", msg: res.error || "Failed to add." });
    }
  };

  const onAddProject = async (data: { title: string; tag: string; link: string }) => {
    const res = await addProjectItem(adminKey, data);
    if (res.ok) {
      setToast({ type: "success", msg: "Project added to MH portfolio!" });
      setShowAddProject(false);
      loadAll();
    } else {
      setToast({ type: "error", msg: res.error || "Failed to add." });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const res =
      deleteTarget.type === "portfolio"
        ? await deletePortfolioItem(adminKey, deleteTarget.id)
        : await deleteProjectItem(adminKey, deleteTarget.id);
    if (res.ok) {
      setToast({ type: "success", msg: "Deleted successfully." });
      loadAll();
    } else {
      setToast({ type: "error", msg: res.error || "Failed to delete." });
    }
    setDeleteTarget(null);
  };

  return (
    <div className="relative flex min-h-screen bg-[#050505] text-white">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this item?"
        desc={deleteTarget ? `"${deleteTarget.title}" will be permanently removed.` : ""}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
      {showAddPortfolio && (
        <AddPortfolioModal onClose={() => setShowAddPortfolio(false)} onSubmit={onAddPortfolio} />
      )}
      {showAddProject && (
        <AddProjectModal onClose={() => setShowAddProject(false)} onSubmit={onAddProject} />
      )}

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#00C8FF]/[0.06] blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-[#9B4DFF]/[0.08] blur-[120px]" />
      </div>

      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-20 flex-col items-center border-r border-white/10 bg-white/[0.02] py-6 sm:w-64 sm:items-stretch sm:px-4">
        <div className="mb-8 flex items-center gap-3 px-0 sm:px-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white">
            <img src="/images/mh-logo.png" alt="MH" className="h-[70%] w-[70%] object-contain" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-white">Control Center</div>
            <div className="text-[10px] tracking-widest text-white/40">MH × JE ADMIN</div>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5">
          {(
            [
              { id: "overview", label: "Overview", icon: "◆" },
              { id: "portfolio", label: "JE Portfolio", icon: "▶" },
              { id: "projects", label: "MH Projects", icon: "◈" },
            ] as { id: Tab; label: string; icon: string }[]
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all justify-center sm:justify-start",
                tab === item.id
                  ? "bg-gradient-to-r from-[#00C8FF]/15 to-[#9B4DFF]/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              )}
            >
              <span className="text-base">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-xs font-semibold tracking-widest text-white/50 transition-colors hover:border-red-400/40 hover:text-red-300 sm:justify-start"
        >
          <IconX className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">LOGOUT</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-5 sm:p-10">
          {/* Top bar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-white sm:text-3xl">
                {tab === "overview" && "Dashboard Overview"}
                {tab === "portfolio" && "Jovaynee Portfolio"}
                {tab === "projects" && "Mohammad Hossein Projects"}
              </h1>
              <p className="mt-1 text-sm text-white/40">
                {tab === "overview" && "Snapshot of everything running across both brands."}
                {tab === "portfolio" && "Add or remove short-form video showcases."}
                {tab === "projects" && "Add or remove portfolio projects and labs."}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {isApiConfigured() ? "LIVE" : "DEMO"}
            </div>
          </div>

          {tab === "overview" && (
            <div>
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className={cn(
                      "rounded-2xl border p-6",
                      s.color === "purple" && "border-[#9B4DFF]/25 bg-[#9B4DFF]/[0.06]",
                      s.color === "blue" && "border-[#00C8FF]/25 bg-[#00C8FF]/[0.06]",
                      s.color === "emerald" && "border-emerald-400/25 bg-emerald-400/[0.06]",
                      s.color === "red" && "border-red-400/25 bg-red-400/[0.06]"
                    )}
                  >
                    <div className="text-3xl font-black text-white">{s.value}</div>
                    <div className="mt-1 text-xs tracking-widest text-white/50">{s.label.toUpperCase()}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setTab("portfolio")}
                  className="group flex items-center justify-between rounded-2xl border border-[#9B4DFF]/25 bg-gradient-to-br from-[#9B4DFF]/10 to-transparent p-6 text-left transition-all hover:border-[#9B4DFF]/50"
                >
                  <div>
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#9B4DFF]/30 bg-[#9B4DFF]/10 text-[#dcc6ff]">
                      <IconFilm className="h-5 w-5" />
                    </div>
                    <div className="text-lg font-bold text-white">Manage JE Portfolio</div>
                    <div className="text-sm text-white/40">Add new edits or remove old ones</div>
                  </div>
                  <IconArrowRight className="h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                </button>
                <button
                  onClick={() => setTab("projects")}
                  className="group flex items-center justify-between rounded-2xl border border-[#00C8FF]/25 bg-gradient-to-br from-[#00C8FF]/10 to-transparent p-6 text-left transition-all hover:border-[#00C8FF]/50"
                >
                  <div>
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#00C8FF]/30 bg-[#00C8FF]/10 text-[#9fe7ff]">
                      <IconServiceNet className="h-5 w-5" />
                    </div>
                    <div className="text-lg font-bold text-white">Manage MH Projects</div>
                    <div className="text-sm text-white/40">Showcase your latest IT/network work</div>
                  </div>
                  <IconArrowRight className="h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                </button>
              </div>
            </div>
          )}

          {tab === "portfolio" && (
            <div>
              <button
                onClick={() => setShowAddPortfolio(true)}
                className="mb-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9B4DFF] to-[#5a1a99] px-5 py-3 text-sm font-bold tracking-wide text-white shadow-[0_0_25px_rgba(155,77,255,0.35)] transition-transform hover:scale-[1.02]"
              >
                + ADD NEW VIDEO
              </button>

              {loading ? (
                <SkeletonGrid />
              ) : portfolio.length === 0 ? (
                <EmptyState text="No videos yet. Add your first one!" />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-all hover:border-[#9B4DFF]/50"
                    >
                      <div className={cn("relative flex h-32 items-center justify-center bg-gradient-to-br", item.gradient)}>
                        <IconPlay className="h-8 w-8 text-white/70" />
                        {item.videoUrl && (
                          <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                            LINKED
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="truncate text-sm font-bold text-white">{item.title}</div>
                        <div className="truncate text-xs text-[#dcc6ff]">{item.tag}</div>
                      </div>
                      <button
                        onClick={() => setDeleteTarget({ type: "portfolio", id: item.id, title: item.title })}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/70 opacity-0 backdrop-blur-sm transition-all hover:bg-red-500/80 hover:text-white group-hover:opacity-100"
                        title="Delete"
                      >
                        <IconX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "projects" && (
            <div>
              <button
                onClick={() => setShowAddProject(true)}
                className="mb-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C8FF] to-[#0077a8] px-5 py-3 text-sm font-bold tracking-wide text-black shadow-[0_0_25px_rgba(0,200,255,0.35)] transition-transform hover:scale-[1.02]"
              >
                + ADD NEW PROJECT
              </button>

              {loading ? (
                <SkeletonGrid />
              ) : projects.length === 0 ? (
                <EmptyState text="No projects yet. Add your first one!" />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 transition-all hover:border-[#00C8FF]/50"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#00C8FF]/30 bg-[#00C8FF]/10 text-[#9fe7ff]">
                        <IconServiceNet className="h-5 w-5" />
                      </div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="mt-1 text-xs text-[#9fe7ff]">{item.tag}</div>
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-white/40 underline">
                          {item.link}
                        </a>
                      )}
                      <button
                        onClick={() => setDeleteTarget({ type: "project", id: item.id, title: item.title })}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/70 opacity-0 backdrop-blur-sm transition-all hover:bg-red-500/80 hover:text-white group-hover:opacity-100"
                        title="Delete"
                      >
                        <IconX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]" />
      ))}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-sm text-white/40">
      {text}
    </div>
  );
}

function AddPortfolioModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: { title: string; tag: string; videoUrl: string; gradient: string }) => void;
}) {
  const [gradient, setGradient] = useState(GRADIENT_PRESETS[0]);
  const [saving, setSaving] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSaving(true);
    await onSubmit({
      title: String(fd.get("title") || ""),
      tag: String(fd.get("tag") || ""),
      videoUrl: String(fd.get("videoUrl") || "").trim(),
      gradient,
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-[#9B4DFF]/30 bg-[#0a0a0a] p-6 shadow-[0_0_60px_rgba(155,77,255,0.25)]"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Add Video to JE Portfolio</h3>
          <button type="button" onClick={onClose} className="text-white/40 hover:text-white">
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/50">TITLE</label>
            <input required name="title" className="neon-input purple" placeholder="Neon Drift" />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/50">CATEGORY / TAG</label>
            <input required name="tag" className="neon-input purple" placeholder="Commercial" />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/50">
              VIDEO URL (YouTube / Vimeo — optional)
            </label>
            <input type="url" name="videoUrl" className="neon-input purple" placeholder="https://youtube.com/watch?v=…" />
          </div>
          <div>
            <label className="mb-2 block text-[11px] font-semibold tracking-widest text-white/50">THUMBNAIL COLOR</label>
            <div className="flex flex-wrap gap-2">
              {GRADIENT_PRESETS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGradient(g)}
                  className={cn(
                    "h-9 w-9 rounded-lg bg-gradient-to-br transition-all",
                    g,
                    gradient === g ? "ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]" : "opacity-60 hover:opacity-100"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-neon-purple mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold tracking-widest disabled:opacity-50"
        >
          {saving ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <><IconSend className="h-4 w-4" />SAVE VIDEO</>
          )}
        </button>
      </form>
    </div>
  );
}

function AddProjectModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: { title: string; tag: string; link: string }) => void;
}) {
  const [saving, setSaving] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSaving(true);
    await onSubmit({
      title: String(fd.get("title") || ""),
      tag: String(fd.get("tag") || ""),
      link: String(fd.get("link") || "").trim(),
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-[#00C8FF]/30 bg-[#0a0a0a] p-6 shadow-[0_0_60px_rgba(0,200,255,0.25)]"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Add MH Project</h3>
          <button type="button" onClick={onClose} className="text-white/40 hover:text-white">
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/50">TITLE</label>
            <input required name="title" className="neon-input" placeholder="Network Lab Setup" />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/50">CATEGORY / TAG</label>
            <input required name="tag" className="neon-input" placeholder="Networking" />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/50">LINK (optional)</label>
            <input type="url" name="link" className="neon-input" placeholder="https://github.com/…" />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-neon-blue mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold tracking-widest disabled:opacity-50"
        >
          {saving ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <><IconCheck className="h-4 w-4" />SAVE PROJECT</>
          )}
        </button>
      </form>
    </div>
  );
}
