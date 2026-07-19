import { IconArrowRight, IconNetwork, IconFilm } from "../components/Icons";
import PageSwitcher from "../components/PageSwitcher";
import Logo from "../components/Logo";
import DemoModeBanner from "../components/DemoModeBanner";

type Props = { onPick: (p: "MH" | "JE") => void };

export default function LandingPage({ onPick }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
      <DemoModeBanner />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(0,200,255,0.18), transparent 40%), radial-gradient(circle at 80% 80%, rgba(155,77,255,0.2), transparent 45%)",
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <PageSwitcher active="MH" onChange={onPick} />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pt-24 sm:px-6">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.4em] text-white/50">
            <span className="h-px w-10 bg-white/20" />
            MH × JE — DUAL STUDIO
            <span className="h-px w-10 bg-white/20" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            <span className="gradient-text-mix">Choose your path.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/60 sm:text-lg">
            Two studios, one craft. Pick a service to enter the dedicated page.
          </p>

          <div className="mt-14 grid w-full max-w-5xl gap-6 md:grid-cols-2">
            <button
              onClick={() => onPick("MH")}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d1320] to-black p-8 text-left transition-all duration-500 hover:-translate-y-1 hover:border-[#00C8FF]/50 hover:shadow-[0_0_60px_rgba(0,200,255,0.3)]"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#00C8FF]/20 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />
              <div className="mb-6 flex items-center justify-between">
                <Logo variant="MH" />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00C8FF]/30 bg-[#00C8FF]/10 text-[#9fe7ff] transition-all group-hover:shadow-[0_0_20px_rgba(0,200,255,0.5)]">
                  <IconNetwork className="h-6 w-6" />
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">Mohammad Hossein</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                IT, Networking &amp; Front-End services. Affordable pricing, fast delivery, free support.
              </p>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {["Network", "Windows Server", "Front-End", "SQL"].map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10.5px] font-medium tracking-wider text-white/65">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#9fe7ff] transition-transform group-hover:translate-x-1">
                  ENTER
                  <IconArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>

            <button
              onClick={() => onPick("JE")}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#15082b] to-black p-8 text-left transition-all duration-500 hover:-translate-y-1 hover:border-[#9B4DFF]/50 hover:shadow-[0_0_60px_rgba(155,77,255,0.3)]"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#9B4DFF]/20 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />
              <div className="mb-6 flex items-center justify-between">
                <Logo variant="JE" />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#9B4DFF]/30 bg-[#9B4DFF]/10 text-[#dcc6ff] transition-all group-hover:shadow-[0_0_20px_rgba(155,77,255,0.5)]">
                  <IconFilm className="h-6 w-6" />
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">Jovaynee Editing</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Premium short-form editing, color grading, and motion graphics that make content stand out.
              </p>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {["Short-Form", "Color", "Motion", "Sound"].map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10.5px] font-medium tracking-wider text-white/65">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#dcc6ff] transition-transform group-hover:translate-x-1">
                  ENTER
                  <IconArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          </div>
        </div>

        <div className="py-8 text-center text-[11px] tracking-widest text-white/30">
          © {new Date().getFullYear()} MH × JE — TWO WORLDS, ONE STUDIO
        </div>
      </div>
    </div>
  );
}
