import { useState, useEffect, FormEvent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageSwitcher from "../components/PageSwitcher";
import SectionTitle from "../components/SectionTitle";
import NetworkBackground from "../components/NetworkBackground";
import NetworkOpsBackground from "../components/NetworkOpsBackground";
import NetworkTopology from "../components/NetworkTopology";
import Toast, { type ToastData } from "../components/Toast";
import DemoModeBanner from "../components/DemoModeBanner";
import { submitForm, isApiConfigured, fetchProjects, type SubmissionPayload, type ProjectItem } from "../lib/api";
import {
  IconServiceNet,
  IconCode,
  IconTerminal,
  IconGraduation,
  IconUser,
  IconArrowDown,
  IconArrowRight,
  IconCheck,
  IconSend,
  IconMail,
  IconPhone,
  IconTag,
  IconStar,
  IconInstagram,
  IconTelegram,
  IconLinkedin,
  IconX,
  IconWhatsapp,
} from "../components/Icons";
import { cn } from "../utils/cn";

type PageProps = { onGoTo: (p: "MH" | "JE") => void };

const CONTACT = {
  email: "mhmashayekhii@gmail.com",
  phone: "+98 904 581 0374",
};

const serviceGroups = [
  {
    Icon: IconServiceNet,
    title: "Networking Services",
    items: [
      "Active Directory Setup",
      "Windows Server Configuration",
      "Remote Network Projects",
      "Microsoft Services",
      "Basic Network Troubleshooting",
      "System Administration Services",
    ],
  },
  {
    Icon: IconCode,
    title: "Web Development",
    items: [
      "Front-End Website Design",
      "Responsive Landing Pages",
      "Portfolio Websites",
      "Student Web Projects",
    ],
  },
  {
    Icon: IconTerminal,
    title: "Programming Services",
    items: ["C#", "PHP", "SQL", "Microsoft Access"],
  },
  {
    Icon: IconGraduation,
    title: "Student Projects",
    items: [
      "Computer Engineering Assignments",
      "Networking Projects",
      "Front-End Projects",
      "SQL & Access Projects",
      "Modular Projects (Computer Students)",
    ],
  },
];

const skills = [
  { name: "Networking", level: 88 },
  { name: "Windows Server", level: 85 },
  { name: "Active Directory", level: 82 },
  { name: "Front-End Development", level: 80 },
  { name: "PHP", level: 72 },
  { name: "C#", level: 70 },
  { name: "SQL", level: 78 },
  { name: "Microsoft Access", level: 75 },
  { name: "System Administration", level: 80 },
  { name: "Linux Basics", level: 65 },
  { name: "Git & GitHub", level: 74 },
];

const whyChoose = [
  "Affordable & Competitive Pricing",
  "High Quality Services",
  "Free Technical Support",
  "Fast Delivery",
  "Remote Services Available",
  "Student-Friendly Pricing",
  "Available for Freelance & Internships",
];

const defaultProjects: ProjectItem[] = [
  { id: "1", title: "MH × JE Website", tag: "Front-End / Web" },
  { id: "2", title: "Digital Menu Project", tag: "Web App" },
  { id: "3", title: "Network Labs", tag: "Networking" },
  { id: "4", title: "Active Directory Labs", tag: "System Admin" },
  { id: "5", title: "Windows Server Labs", tag: "Networking" },
  { id: "6", title: "Student Projects", tag: "Programming" },
];

const pricing = [
  { service: "Front-End Website", price: "$25", note: "Responsive & modern design" },
  { service: "Student Projects", price: "$10", note: "Assignments & modular work" },
  { service: "SQL Projects", price: "$10", note: "Database design & queries" },
  { service: "Network Services", price: "Custom", note: "Depends on project scope" },
  { service: "Microsoft Services", price: "Custom", note: "Depends on project scope" },
];

const workProcess = [
  { n: "01", t: "Contact Me", d: "Reach out with your idea or requirement." },
  { n: "02", t: "Project Discussion", d: "We define scope, timeline, and a fixed quote." },
  { n: "03", t: "Development", d: "I build and test with regular updates." },
  { n: "04", t: "Delivery", d: "You receive the final files and documentation." },
  { n: "05", t: "Free Support", d: "Continued support included with every project." },
];

const availability = [
  "Remote Projects",
  "Freelance Work",
  "Student Projects",
  "Internship Opportunities",
  "IT Support Services",
  "Networking Projects",
];

export default function MHPage({ onGoTo }: PageProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<ToastData | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);

  const [liveStats, setLiveStats] = useState({ ping: 11, uptime: 99.98, threats: 0 });

  useEffect(() => {
    if (isApiConfigured()) {
      fetchProjects().then((data) => {
        if (data.length > 0) setProjects(data);
      });
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setLiveStats((s) => ({
        ping: 8 + Math.round(Math.random() * 14),
        uptime: Math.min(99.999, 99.9 + Math.random() * 0.09),
        threats: s.threats,
      }));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const fd = new FormData(e.currentTarget);
    const payload: SubmissionPayload = {
      source: "MH",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      projectType: String(fd.get("projectType") || ""),
      description: String(fd.get("description") || ""),
    };

    setStatus("loading");
    const result = await submitForm(payload);
    setStatus(result.ok ? "success" : "error");
    setToast({
      type: result.ok ? "success" : "error",
      msg: result.ok
        ? isApiConfigured()
          ? "Your request was sent. I'll get back to you soon."
          : "Demo mode — backend not connected. Set VITE_API_URL to receive real submissions via Telegram."
        : result.error || `Couldn't send. Please email me directly at ${CONTACT.email}`,
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
        brand="MH"
        items={[
          { label: "Home", href: "#top" },
          { label: "About", href: "#about" },
          { label: "Services", href: "#services" },
          { label: "Projects", href: "#projects" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ]}
        onNavigate={scrollTo}
      />

      <PageSwitcher active="MH" onChange={onGoTo} />

      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-center pt-28">
        <NetworkOpsBackground />
        <NetworkBackground />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="reveal inline-flex items-center gap-2 rounded-full border border-[#00C8FF]/30 bg-[#00C8FF]/5 px-3 py-1.5 text-xs font-semibold tracking-[0.2em] text-[#9fe7ff]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00C8FF]" />
                IT · NETWORK · WEB
              </div>
              <h1 className="reveal reveal-d1 mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-glow-blue">Mohammad</span>
                <br />
                <span className="gradient-text-mix">Hossein</span>
              </h1>
              <p className="reveal reveal-d2 mt-4 text-sm font-semibold tracking-wide text-[#9fe7ff] sm:text-base">
                Junior Network Engineer · SysAdmin · Front-End Developer · IT Services
              </p>
              <p className="reveal reveal-d2 mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                Affordable IT &amp; Network Services with Fast Delivery and Free Support.
              </p>
              <div className="reveal reveal-d3 mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                  className="btn-neon-blue group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wider"
                >
                  Hire Me
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold tracking-wider text-white hover:border-white/30"
                >
                  View My Projects
                </a>
              </div>
            </div>

            {/* Hero visual: terminal card */}
            <div className="reveal reveal-d2 lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-[#00C8FF]/20 to-[#9B4DFF]/20 blur-2xl" />
                <div className="rounded-2xl border border-white/10 bg-black/60 p-1 shadow-[0_0_60px_rgba(0,200,255,0.15)]">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] tracking-widest text-white/40">mh@server:~$</span>
                  </div>
                  <div className="space-y-2 px-5 py-5 font-mono text-[12.5px] leading-relaxed text-white/75 sm:text-[13px]">
                    <div><span className="text-[#00C8FF]">$</span> whoami</div>
                    <div className="text-white/55">mohammad_hossein — junior network engineer</div>
                    <div><span className="text-[#00C8FF]">$</span> services --list</div>
                    <div className="text-white/55">[✓] Active Directory / Windows Server</div>
                    <div className="text-white/55">[✓] Front-End (HTML/CSS/JS)</div>
                    <div className="text-white/55">[✓] C# · PHP · SQL · MS Access</div>
                    <div><span className="text-[#00C8FF]">$</span> status</div>
                    <div className="text-emerald-400">● Available for freelance &amp; internships</div>
                    <div className="flex items-center gap-2 text-white/55">
                      <span className="text-[#00C8FF]">$</span>
                      <span className="inline-block h-4 w-2 animate-pulse bg-[#00C8FF]" />
                    </div>
                  </div>
                </div>
                <div className="floaty absolute -left-6 -top-6 hidden rounded-full border border-[#00C8FF]/30 bg-black/70 px-3 py-1.5 text-[11px] font-semibold tracking-widest text-[#9fe7ff] shadow-[0_0_20px_rgba(0,200,255,0.35)] sm:flex">
                  ▲ FAST DELIVERY
                </div>
                <div className="floaty absolute -bottom-5 -right-3 hidden rounded-full border border-[#9B4DFF]/30 bg-black/70 px-3 py-1.5 text-[11px] font-semibold tracking-widest text-[#dcc6ff] shadow-[0_0_20px_rgba(155,77,255,0.35)] sm:flex" style={{ animationDelay: "1.5s" }}>
                  ◆ FREE SUPPORT
                </div>
              </div>
            </div>
          </div>

          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollTo("about"); }}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] tracking-[0.3em] text-white/40 hover:text-white sm:flex"
          >
            SCROLL
            <IconArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative border-y border-white/5 bg-black/40 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-[#00C8FF]/20 to-[#9B4DFF]/20 blur-2xl" />
                <div className="card-blue flex aspect-square items-center justify-center rounded-3xl">
                  <div className="text-center">
                    <div className="mx-auto mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-[#00C8FF]/30 bg-[#00C8FF]/10 text-[#9fe7ff]">
                      <IconUser className="h-10 w-10" />
                    </div>
                    <div className="text-2xl font-black text-white">Mohammad Hossein</div>
                    <div className="mt-1 text-xs tracking-widest text-[#9fe7ff]">JUNIOR NETWORK ENGINEER</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <SectionTitle
                tone="blue"
                center={false}
                eyebrow="ABOUT ME"
                title={<>Hello! I'm <span className="text-white">Mohammad Hossein.</span></>}
              />
              <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">
                A Junior Network Engineer and Front-End Developer. I provide affordable IT, networking,
                and programming services for students, businesses, and remote clients. My goal is to
                deliver high-quality work with fast delivery and free support.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Networking", "Windows Server", "Active Directory", "Front-End", "C#", "PHP", "SQL"].map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium tracking-wider text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 dot-grid opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            tone="blue"
            eyebrow="WHAT I DO"
            title={<>Services <span className="text-white">I offer.</span></>}
            subtitle="From networks to websites and student projects — high-quality work at competitive prices."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {serviceGroups.map((g) => (
              <article key={g.title} className="card-blue lift group relative overflow-hidden p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00C8FF]/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#00C8FF]/30 bg-[#00C8FF]/10 text-[#9fe7ff] transition-all group-hover:border-[#00C8FF]/70 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(0,200,255,0.45)]">
                  <g.Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{g.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-sm text-white/65">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#00C8FF]/40 bg-[#00C8FF]/10 text-[#9fe7ff]">
                        <IconCheck className="h-2.5 w-2.5" />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            tone="blue"
            eyebrow="SKILLS"
            title={<>Tools &amp; <span className="text-white">technologies.</span></>}
          />
          <div className="mt-14 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-white/85">{s.name}</span>
                  <span className="font-mono text-xs text-[#9fe7ff]">{s.level}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00C8FF] to-[#9B4DFF] shadow-[0_0_12px_rgba(0,200,255,0.5)]"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE NETWORK OPERATIONS */}
      <section className="relative border-y border-white/5 bg-black/50 py-24 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-net-grid opacity-40" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            tone="blue"
            eyebrow="NETWORK OPERATIONS"
            title={<>Live network <span className="text-white">status.</span></>}
            subtitle="A simulated real-time view of the kind of infrastructure health I monitor for clients — 24/7."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            <div className="card-blue rounded-2xl p-6 text-center">
              <div className="font-mono text-3xl font-black text-[#9fe7ff]">{liveStats.ping}<span className="text-lg">ms</span></div>
              <div className="mt-1 text-[11px] tracking-widest text-white/50">LIVE PING</div>
            </div>
            <div className="card-blue rounded-2xl p-6 text-center">
              <div className="font-mono text-3xl font-black text-emerald-300">{liveStats.uptime.toFixed(2)}%</div>
              <div className="mt-1 text-[11px] tracking-widest text-white/50">UPTIME (30D)</div>
            </div>
            <div className="card-blue rounded-2xl p-6 text-center">
              <div className="font-mono text-3xl font-black text-[#dcc6ff]">{liveStats.threats}</div>
              <div className="mt-1 text-[11px] tracking-widest text-white/50">THREATS BLOCKED TODAY</div>
            </div>
          </div>

          <div className="mt-8">
            <NetworkTopology />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative py-24 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-net-grid opacity-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            tone="blue"
            eyebrow="PORTFOLIO"
            title={<>Selected <span className="text-white">projects.</span></>}
            subtitle="A mix of real projects and personal labs that show my hands-on experience."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.id} className="card-blue lift group relative overflow-hidden p-6">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#00C8FF]/15 blur-2xl opacity-60 transition-opacity group-hover:opacity-100" />
                <div className="text-[10.5px] font-semibold tracking-[0.3em] text-[#9fe7ff]">{p.tag.toUpperCase()}</div>
                <h3 className="mt-2 text-lg font-bold text-white">{p.title}</h3>
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#9fe7ff] transition-opacity"
                  >
                    VIEW <IconArrowRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#9fe7ff] opacity-0 transition-opacity group-hover:opacity-100">
                    VIEW <IconArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ME */}
      <section className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            tone="blue"
            eyebrow="WHY WORK WITH ME"
            title={<>Reasons to <span className="text-white">choose me.</span></>}
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w) => (
              <div key={w} className="card-blue lift flex items-center gap-3 p-5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#00C8FF]/30 bg-[#00C8FF]/10 text-[#9fe7ff]">
                  <IconStar className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-white/85">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-24 sm:py-28">
        <div className="absolute inset-0 -z-10 dot-grid opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            tone="blue"
            eyebrow="PRICING"
            title={<>Affordable &amp; <span className="text-white">competitive.</span></>}
            subtitle="Student-friendly and budget-friendly services. Final quotes are agreed before we start."
          />
          <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-[#00C8FF]/20">
            <div className="grid grid-cols-3 border-b border-white/10 bg-[#00C8FF]/5 px-5 py-3 text-[11px] font-semibold tracking-widest text-[#9fe7ff] sm:px-8">
              <div className="col-span-2">SERVICE</div>
              <div className="text-right">STARTING PRICE</div>
            </div>
            {pricing.map((row, i) => (
              <div
                key={row.service}
                className={cn(
                  "grid grid-cols-3 items-center px-5 py-4 transition-colors hover:bg-white/[0.02] sm:px-8",
                  i !== pricing.length - 1 && "border-b border-white/5"
                )}
              >
                <div className="col-span-2">
                  <div className="flex items-center gap-2.5">
                    <IconTag className="h-4 w-4 text-[#9fe7ff]" />
                    <span className="text-sm font-semibold text-white">{row.service}</span>
                  </div>
                  <div className="mt-0.5 pl-6 text-xs text-white/45">{row.note}</div>
                </div>
                <div className="text-right text-lg font-black gradient-text-blue">{row.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK PROCESS */}
      <section className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            tone="blue"
            eyebrow="WORK PROCESS"
            title={<>Simple, clear <span className="text-white">steps.</span></>}
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {workProcess.map((p) => (
              <div key={p.n} className="card-blue lift relative overflow-hidden p-6">
                <div className="font-mono text-xs tracking-widest text-[#00C8FF]">STEP {p.n}</div>
                <h4 className="mt-3 text-base font-bold text-white">{p.t}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.d}</p>
                <div className="pointer-events-none absolute -right-3 -bottom-4 text-6xl font-black text-white/[0.04]">{p.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVAILABILITY */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="card-blue relative overflow-hidden rounded-2xl p-6 sm:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00C8FF]/15 blur-3xl" />
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-[11px] font-semibold tracking-[0.3em] text-emerald-300">CURRENTLY AVAILABLE FOR</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {availability.map((a) => (
                <span key={a} className="rounded-full border border-[#00C8FF]/30 bg-[#00C8FF]/5 px-4 py-2 text-sm font-medium text-white/85">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLLABORATION FORM */}
      <section id="collab" className="relative py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-net-grid opacity-60" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionTitle
                tone="blue"
                center={false}
                eyebrow="HIRE ME"
                title={<>Let's start your <span className="text-white">project.</span></>}
                subtitle="Tell me what you need. I'll reply with a clear plan and a fixed quote — plus free support after delivery."
              />
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                {[
                  "Fast delivery on every project",
                  "Free technical support included",
                  "Remote services available worldwide",
                  "Student-friendly and budget-friendly",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2.5">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#00C8FF]/50 bg-[#00C8FF]/10 text-[#9fe7ff]">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={onSubmit} className="card-blue relative overflow-hidden rounded-2xl p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#00C8FF]/20 blur-3xl" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/55">NAME</label>
                  <input required name="name" type="text" placeholder="Your name" className="neon-input" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/55">EMAIL</label>
                  <input required name="email" type="email" placeholder="you@email.com" className="neon-input" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/55">SERVICE</label>
                  <select required name="projectType" className="neon-input appearance-none">
                    <option value="">Select a service…</option>
                    {serviceGroups.map((g) => (
                      <option key={g.title} value={g.title} className="bg-[#0A0A0A]">{g.title}</option>
                    ))}
                    <option value="other" className="bg-[#0A0A0A]">Other / Not sure</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-white/55">DESCRIPTION</label>
                  <textarea required name="description" rows={5} placeholder="Tell me about your project, scope, and timeline…" className="neon-input resize-none" />
                </div>
                <div className="sm:col-span-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[11px] text-white/40">I usually reply within a day.</p>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-neon-blue group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wider disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />SENDING…</>
                    ) : status === "success" ? (
                      <><IconCheck className="h-4 w-4" />SENT ✓</>
                    ) : status === "error" ? (
                      <><IconX className="h-4 w-4" />FAILED</>
                    ) : (
                      <><IconSend className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />SEND REQUEST</>
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
          <div className="card-blue relative overflow-hidden rounded-2xl p-6 sm:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#9B4DFF]/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[#00C8FF]/15 blur-3xl" />
            <div className="grid items-center gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="text-[11px] font-semibold tracking-[0.3em] text-[#9fe7ff]">GET IN TOUCH</div>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Let's build something.</h3>
                <p className="mt-2 text-sm text-white/60">Services available worldwide 🌍</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 md:col-span-2">
                <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-4 transition-all hover:border-[#00C8FF]/50">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#00C8FF]/30 bg-[#00C8FF]/10 text-[#9fe7ff]">
                    <IconMail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[10.5px] tracking-widest text-white/40">EMAIL</div>
                    <div className="text-sm font-semibold text-white break-all">{CONTACT.email}</div>
                  </div>
                </a>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-4 transition-all hover:border-[#00C8FF]/50">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#00C8FF]/30 bg-[#00C8FF]/10 text-[#9fe7ff]">
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
    href: "https://www.instagram.com/mhnetlab?igsh=MWx2azFjdXZkdGhqcg==",
  },
  {
    Icon: IconWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/message/WOWKYHS5KBAEA1",
  },
  {
    Icon: IconLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-hossein-b710a8420?utm_source=share_via&utm_content=profile&utm_medium=member_android",
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

      <Footer brand="MH" email={CONTACT.email} phone={CONTACT.phone} />
    </div>
  );
}
