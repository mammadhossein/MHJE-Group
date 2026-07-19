import { useState, useEffect, FormEvent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageSwitcher from "../components/PageSwitcher";
import SectionTitle from "../components/SectionTitle";
import CinemaBackground from "../components/CinemaBackground";
import Toast, { type ToastData } from "../components/Toast";
import DemoModeBanner from "../components/DemoModeBanner";
import {
  submitForm,
  isApiConfigured,
  type SubmissionPayload,
  fetchPortfolio,
  type PortfolioItem,
} from "../lib/api";
import {
  IconVideoDesign,
  IconPalette,
  IconMotion,
  IconSound,
  IconType,
  IconPlay,
  IconArrowDown,
  IconArrowRight,
  IconCheck,
  IconSend,
  IconMail,
  IconPhone,
  IconInstagram,
  IconWhatsapp,
  IconLinkedin,
  IconX,
} from "../components/Icons";
import { cn } from "../utils/cn";

type PageProps = { onGoTo: (p: "MH" | "JE") => void };

const services = [
  {
    Icon: IconVideoDesign,
    title: "Video Design",
    desc: "Creating a smoother visual experience by selecting the right effects, seamless transitions, and enhancing storytelling to make the message more engaging and easier to follow.",
    tags: ["Effects", "Transition", "Design"],
  },
  {
    Icon: IconPalette,
    title: "Color Grading",
    desc: "Cinematic color science that defines mood, brand consistency, and that signature look your audience will remember.",
    tags: ["LUTs", "ACES", "HDR"],
  },
  {
    Icon: IconMotion,
    title: "Motion Graphics",
    desc: "Dynamic titles, lower thirds, kinetic typography, and 3D elements that elevate your brand above the noise.",
    tags: ["AE", "C4D", "Kinetic"],
  },
  {
    Icon: IconSound,
    title: "Sound Design",
    desc: "Enhancing videos with the right sound effects, audio elements, and mixing to create a more immersive experience.",
    tags: ["Fix Sounds", "Sound Effects", "Conveying Emotion"],
  },
  {
    Icon: IconType,
    title: "Typography",
    desc: "Creating clean, professional, and visually engaging text designs that improve readability and enhance the overall style of the video.",
    tags: ["Trends", "Own Style", "Premium Fonts"],
  },
];

const defaultPortfolio = [
  { id: "1", title: "Neon Drift", tag: "Cinematic Brand Film", gradient: "from-[#9B4DFF] via-[#5a1a99] to-black" },
  { id: "2", title: "Echoes of Tehran", tag: "Documentary", gradient: "from-[#1a1a1a] via-[#9B4DFF]/40 to-black" },
  { id: "3", title: "Pulse Athletic", tag: "Commercial", gradient: "from-[#9B4DFF] via-[#00C8FF]/30 to-black" },
  { id: "4", title: "Midnight Run", tag: "Music Video", gradient: "from-black via-[#9B4DFF]/60 to-[#1a1a1a]" },
  { id: "5", title: "Solar Tech", tag: "Product Launch", gradient: "from-[#00C8FF]/30 via-[#9B4DFF]/40 to-black" },
  { id: "6", title: "Vertex Vlog", tag: "YouTube Series", gradient: "from-[#9B4DFF]/60 via-black to-[#00C8FF]/30" },
  { id: "7", title: "Cityscapes", tag: "Travel Reel", gradient: "from-black via-[#9B4DFF]/40 to-[#0A0A0A]" },
  { id: "8", title: "Glow Cosmetics", tag: "Social Campaign", gradient: "from-[#9B4DFF] via-[#ff5fb1]/30 to-black" },
  { id: "9", title: "Architects of Sound", tag: "Concert Film", gradient: "from-[#1a0033] via-[#9B4DFF] to-black" },
];

const stats = [
  { k: "600+", v: "Videos Edited" },
  { k: "20M+", v: "Views Generated" },
  { k: "2 yrs", v: "Editing Experience" },
  { k: "24h", v: "Avg. Turnaround" },
];

const workflow = [
  { n: "01", t: "Video Enhancement", d: "Improving video quality through color correction, microphone/audio adjustments, and clean professional cuts." },
  { n: "02", t: "Content Planning & Ideation", d: "Collecting trending ideas, developing creative concepts, and planning content strategies for better engagement." },
  { n: "03", t: "Idea Execution", d: "Bringing all prepared concepts and content plans to life through creative execution." },
  { n: "04", t: "Sound Design", d: "Enhancing videos with carefully selected sound effects and audio elements to improve the visual experience and match the video's mood and message." },
];

const CONTACT = {
  email: "manijovayni@gmail.com",
  phone: "+98 903 872 5766",
};

export default function JEPage({ onGoTo }: PageProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<ToastData | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(defaultPortfolio);
  const [activeVideo, setActiveVideo] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    if (isApiConfigured()) {
      fetchPortfolio().then((data) => {
        if (data.length > 0) setPortfolio(data);
      });
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const fd = new FormData(e.currentTarget);
    const payload: SubmissionPayload = {
      source: "JE",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      videoType: String(fd.get("videoType") || ""),
      fileLink: String(fd.get("fileLink") || "").trim() || undefined,
      description: String(fd.get("description") || ""),
    };

    setStatus("loading");
    const result = await submitForm(payload);
    setStatus(result.ok ? "success" : "error");
    setToast({
      type: result.ok ? "success" : "error",
      msg: result.ok
        ? isApiConfigured()
          ? "Project submitted. I'll reply within 24 hours."
          : "Demo mode — backend not connected. Set VITE_API_URL to receive real submissions via Telegram."
        : result.error || `Couldn't submit. Please email me directly at ${CONTACT.email}`,
    });
    if (result.ok) (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="top" className="relative min-h-screen overflow-hidden">
      <DemoModeBanner />
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Header
        brand="JE"
        items={[
          { label: "Home", href: "#top" },
          { label: "Portfolio", href: "#portfolio" },
          { label: "Skills", href: "#services" },
          { label: "Contact", href: "#contact" },
        ]}
        onNavigate={scrollTo}
      />

      <PageSwitcher active="JE" onChange={onGoTo} />

      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-center pt-28">
        <div className="absolute inset-0 -z-10 bg-cinema" />
        <CinemaBackground />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="reveal inline-flex items-center gap-2 rounded-full border border-[#9B4DFF]/30 bg-[#9B4DFF]/5 px-3 py-1.5 text-xs font-semibold tracking-[0.2em] text-[#dcc6ff]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9B4DFF]" />
                SHORT-FORM EDITOR · MOTION GRAPHICS · SMOOTH
              </div>
              <h1 className="reveal reveal-d1 mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-glow-purple">Jovaynee</span>
                <br />
                <span className="gradient-text-mix">Premium Editing</span>
              </h1>
              <p className="reveal reveal-d2 mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                I create high-quality, scroll-stopping edits designed specifically for your content.
                Every video is crafted with a unique editing style that matches your brand, combining
                cinematic visuals, motion graphics, and dynamic pacing to help your content stand out.
              </p>
              <div className="reveal reveal-d3 mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#portfolio"
                  onClick={(e) => { e.preventDefault(); scrollTo("portfolio"); }}
                  className="btn-neon-purple group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wider"
                >
                  Watch Reel
                  <IconPlay className="h-4 w-4" />
                </a>
                <a
                  href="#collab"
                  onClick={(e) => { e.preventDefault(); scrollTo("collab"); }}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold tracking-wider text-white hover:border-white/30"
                >
                  Submit Project
                </a>
              </div>

              <div className="reveal reveal-d4 mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.k} className="card-purple lift rounded-2xl px-4 py-3">
                    <div className="text-xl font-black text-white sm:text-2xl">{s.k}</div>
                    <div className="text-[11px] tracking-widest text-white/50">{s.v.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="reveal reveal-d2 lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-[#9B4DFF]/30 to-[#00C8FF]/20 blur-2xl" />
                <div className="relative aspect-[9/14] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-[0_0_60px_rgba(155,77,255,0.3)] sm:max-w-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#9B4DFF]/40 via-black to-[#00C8FF]/30" />
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 40%), radial-gradient(circle at 70% 80%, rgba(155,77,255,0.4), transparent 50%)",
                    }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <button
                      onClick={() => setActiveVideo(portfolio[0])}
                      className="group/play relative inline-flex h-20 w-20 items-center justify-center rounded-full"
                    >
                      <span className="pulse-ring absolute inset-0 rounded-full border border-[#9B4DFF]/60" />
                      <span className="pulse-ring absolute inset-0 rounded-full border border-[#9B4DFF]/60" style={{ animationDelay: "0.6s" }} />
                      <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white transition-all group-hover/play:scale-110 group-hover/play:border-[#9B4DFF] group-hover/play:shadow-[0_0_40px_rgba(155,77,255,0.7)]">
                        <IconPlay className="h-7 w-7 translate-x-0.5" />
                      </span>
                    </button>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="mb-2 flex items-center justify-between text-[10px] tracking-widest text-white/60">
                      <span>JOVAYNEE · SHOWREEL 2025</span>
                      <span>02:14</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#9B4DFF] to-[#00C8FF]" />
                    </div>
                  </div>
                  <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-white/60" />
                  <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-white/60" />
                  <span className="absolute left-3 bottom-3 h-5 w-5 border-l-2 border-b-2 border-white/60" />
                  <span className="absolute right-3 bottom-3 h-5 w-5 border-r-2 border-b-2 border-white/60" />
                </div>

                <div className="floaty absolute -right-4 top-6 hidden rounded-full border border-[#9B4DFF]/30 bg-black/70 px-3 py-1.5 text-[11px] font-semibold tracking-widest text-[#dcc6ff] shadow-[0_0_20px_rgba(155,77,255,0.35)] sm:flex">
                  ● REC 4K
                </div>
                <div
                  className="floaty absolute -left-3 bottom-10 hidden rounded-full border border-[#00C8FF]/30 bg-black/70 px-3 py-1.5 text-[11px] font-semibold tracking-widest text-[#9fe7ff] shadow-[0_0_20px_rgba(0,200,255,0.35)] sm:flex"
                  style={{ animationDelay: "1.2s" }}
                >
                  ◐ ACES
                </div>
              </div>
            </div>
          </div>

          <a
            href="#portfolio"
            onClick={(e) => { e.preventDefault(); scrollTo("portfolio"); }}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] tracking-[0.3em] text-white/40 hover:text-white sm:flex"
          >
            SCROLL
            <IconArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* TOOLS */}
      <section className="relative border-y border-white/5 bg-black/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 text-center text-[11px] font-semibold tracking-[0.4em] text-white/40">
            TOOLS OF THE CRAFT
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/40">
            {["Premiere Pro", "After Effects"].map((t) => (
              <span key={t} className="text-lg font-black uppercase tracking-widest sm:text-2xl">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 dot-grid opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            tone="purple"
            eyebrow="JOVAYNEE"
            title={<>Short-Form <span className="text-white">Portfolio.</span></>}
            subtitle="Each portfolio piece showcases a different editing style, demonstrating my versatility and ability to adapt to your unique content. If you're looking for a different style, I can create that as well."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVideo(v)}
                className={cn(
                  "group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black text-left",
                  "transition-all duration-500 hover:border-[#9B4DFF]/60 hover:shadow-[0_0_40px_rgba(155,77,255,0.35)]"
                )}
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110", v.gradient)} />
                <div className="absolute inset-0 opacity-30 mix-blend-screen" style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 35%), radial-gradient(circle at 80% 70%, rgba(155,77,255,0.6), transparent 40%)",
                }} />
                <div className="play-btn">
                  <span className="play-btn-core">
                    <IconPlay className="h-6 w-6 translate-x-0.5" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-[10.5px] tracking-[0.3em] text-white/70">{v.tag.toUpperCase()}</div>
                  <div className="mt-1 text-lg font-bold text-white">{v.title}</div>
                </div>
                <span className="absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-white/40" />
                <span className="absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-white/40" />
                <span className="absolute left-2 bottom-2 h-3 w-3 border-l-2 border-b-2 border-white/40" />
                <span className="absolute right-2 bottom-2 h-3 w-3 border-r-2 border-b-2 border-white/40" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS / SERVICES */}
      <section id="services" className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            tone="purple"
            eyebrow="WHAT I OFFER"
            title={<>Jovaynee <span className="text-white">Skills.</span></>}
            subtitle="These are some of my core editing skills that I consistently use to create high-quality and engaging content."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="card-purple lift group relative overflow-hidden p-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#9B4DFF]/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#9B4DFF]/30 bg-[#9B4DFF]/10 text-[#dcc6ff] transition-all group-hover:border-[#9B4DFF]/70 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(155,77,255,0.45)]">
                  <s.Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10.5px] font-medium tracking-wider text-white/65">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#dcc6ff] opacity-0 transition-opacity group-hover:opacity-100">
                  LEARN MORE
                  <IconArrowRight className="h-3.5 w-3.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            tone="purple"
            eyebrow="WORKFLOW"
            title={<>A clean, fast, <span className="text-white">predictable</span> process.</>}
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((p) => (
              <div key={p.n} className="card-purple lift relative overflow-hidden p-6">
                <div className="font-mono text-xs tracking-widest text-[#9B4DFF]">STEP {p.n}</div>
                <h4 className="mt-3 text-lg font-bold text-white">{p.t}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.d}</p>
                <div className="pointer-events-none absolute -right-3 -bottom-4 text-6xl font-black text-white/[0.04]">
                  {p.n}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLABORATION FORM */}
      <section id="collab" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-cinema" />
        <CinemaBackground />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionTitle
                tone="purple"
                center={false}
                eyebrow="WORK WITH JOVAYNEE"
                title={<>Turning ideas into <span className="text-white">visuals.</span></>}
                subtitle="Send me a brief and a sample of your raw footage. I'll come back with a clear plan, a fixed quote, and a delivery date."
              />
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                {[
                  "Free 10-minute consultation call",
                  "Story & pacing direction included",
                  "Color grade in ACES / HDR",
                  "Source files & project archive on delivery",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2.5">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#9B4DFF]/50 bg-[#9B4DFF]/10 text-[#dcc6ff]">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={onSubmit} className="card-purple relative overflow-hidden rounded-2xl p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#9B4DFF]/20 blur-3xl" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/55">NAME</label>
                  <input required name="name" type="text" placeholder="Your name" className="neon-input purple" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/55">EMAIL</label>
                  <input required name="email" type="email" placeholder="you@brand.com" className="neon-input purple" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/55">NICHE</label>
                  <input name="videoType" type="text" placeholder="e.g. Gaming, Fitness, Podcast, Brand…" className="neon-input purple" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/55">FILE LINK</label>
                  <input type="url" name="fileLink" placeholder="https://drive.google.com/…" className="neon-input purple" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/55">DESCRIPTION</label>
                  <textarea required name="description" rows={5} placeholder="Tell me about references, length, deadline, and mood." className="neon-input purple resize-none" />
                </div>
                <div className="sm:col-span-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[11px] text-white/40">Replies within 24 hours.</p>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-neon-purple group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wider disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />SENDING…</>
                    ) : status === "success" ? (
                      <><IconCheck className="h-4 w-4" />SENT ✓</>
                    ) : status === "error" ? (
                      <><IconX className="h-4 w-4" />FAILED</>
                    ) : (
                      <><IconSend className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />SUBMIT PROJECT</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="card-purple relative overflow-hidden rounded-2xl p-6 sm:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#9B4DFF]/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[#00C8FF]/15 blur-3xl" />
            <div className="grid items-center gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="text-[11px] font-semibold tracking-[0.3em] text-[#dcc6ff]">LET'S TALK</div>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Got a project in mind?</h3>
                <p className="mt-2 text-sm text-white/60">Send a brief or just say hi. Quick replies, friendly vibe.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 md:col-span-2">
                <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-4 transition-all hover:border-[#9B4DFF]/50">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#9B4DFF]/30 bg-[#9B4DFF]/10 text-[#dcc6ff]">
                    <IconMail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[10.5px] tracking-widest text-white/40">EMAIL</div>
                    <div className="text-sm font-semibold text-white break-all">{CONTACT.email}</div>
                  </div>
                </a>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-4 transition-all hover:border-[#9B4DFF]/50">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#9B4DFF]/30 bg-[#9B4DFF]/10 text-[#dcc6ff]">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[10.5px] tracking-widest text-white/40">PHONE</div>
                    <div className="text-sm font-semibold text-white">{CONTACT.phone}</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {[
  {
    Icon: IconInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/jovaynee.aep?igsh=MTRuOGhrcnlsZmFpOA==",
  },
  {
    Icon: IconWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/message/42OBYQMWA3XVA1",
  },
  {
    Icon: IconLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mani-jovaynee-2723ab399/",
  },
].map(({ Icon, label, href }) => (
  <a
    key={label}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 text-xs font-semibold tracking-widest text-white/70 transition-all hover:border-[#9B4DFF]/60 hover:text-white hover:shadow-[0_0_18px_rgba(155,77,255,0.35)]"
  >
    <Icon className="h-4 w-4" />
    {label.toUpperCase()}
  </a>
))}
            </div>
          </div>
        </div>
      </section>

      <Footer brand="JE" email={CONTACT.email} phone={CONTACT.phone} />

      {/* Lightbox */}
      {activeVideo !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md" onClick={() => setActiveVideo(null)}>
          <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#9B4DFF]/40 bg-black shadow-[0_0_80px_rgba(155,77,255,0.5)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0A0A0A] p-4">
              <div>
                <div className="text-lg font-bold text-white">{activeVideo.title}</div>
                <div className="text-xs tracking-widest text-[#9B4DFF]">{activeVideo.tag.toUpperCase()}</div>
              </div>
              <button onClick={() => setActiveVideo(null)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white" aria-label="Close">
                <IconX className="h-5 w-5" />
              </button>
            </div>
            <div className={cn("relative w-full bg-black", activeVideo.videoUrl ? "aspect-video" : `aspect-video bg-gradient-to-br ${activeVideo.gradient}`)}>
              {activeVideo.videoUrl ? (
                <iframe
                  src={activeVideo.videoUrl.includes("youtube.com/watch") ? activeVideo.videoUrl.replace("watch?v=", "embed/") : activeVideo.videoUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white">
                      <IconPlay className="h-8 w-8 translate-x-0.5" />
                    </div>
                    <div className="mt-3 text-sm text-white/50">(No video URL provided)</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
