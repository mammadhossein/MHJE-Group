import Logo from "./Logo";
import { IconInstagram, IconTelegram, IconWhatsapp, IconLinkedin } from "./Icons";

type FooterProps = {
  brand: "MH" | "JE";
  email: string;
  phone: string;
};

export default function Footer({ brand, email, phone }: FooterProps) {
  return (
    <footer
      id="contact"
      className="relative border-t border-white/10 bg-[#070707] py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo variant={brand} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              {brand === "MH"
                ? "High Quality Services at Affordable Prices."
                : "Professional editing, color grading, and cinematic visuals — made for brands that want to stand out."}
            </p>
            {brand === "MH" && (
              <p className="mt-2 max-w-sm text-sm font-medium text-[#9fe7ff]">
                Free Support Included With Every Project.
              </p>
            )}
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[0.3em] text-white/60">
              CONTACT
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="link-underline text-white/80 hover:text-white"
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="link-underline text-white/80 hover:text-white"
                >
                  {phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[0.3em] text-white/60">
              SOCIAL
            </h4>
            <div className="flex items-center gap-2">
              {(brand === "MH"
                ? [
                    { Icon: IconInstagram, label: "Instagram" },
                    { Icon: IconTelegram, label: "Telegram" },
                    { Icon: IconLinkedin, label: "LinkedIn" },
                  ]
                : [
                    { Icon: IconInstagram, label: "Instagram" },
                    { Icon: IconWhatsapp, label: "WhatsApp" },
                    { Icon: IconLinkedin, label: "LinkedIn" },
                  ]
              ).map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={cnSocial(
                    "group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-all hover:text-white",
                    brand === "MH"
                      ? "hover:border-[#00C8FF]/60 hover:shadow-[0_0_20px_rgba(0,200,255,0.35)]"
                      : "hover:border-[#9B4DFF]/60 hover:shadow-[0_0_20px_rgba(155,77,255,0.35)]"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className={
            brand === "MH"
              ? "mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#00C8FF]/40 to-transparent"
              : "mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#9B4DFF]/40 to-transparent"
          }
        />
        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-xs text-white/40 sm:flex-row">
          <div>© {new Date().getFullYear()} {brand === "MH" ? "MH Network Services" : "JO Studio"}. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
            Available for new projects
          </div>
        </div>
      </div>
    </footer>
  );
}

function cnSocial(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}
