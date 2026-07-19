import { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: "blue" | "purple";
  center?: boolean;
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  tone = "blue",
  center = true,
}: SectionTitleProps) {
  const grad = tone === "blue" ? "gradient-text-blue" : "gradient-text-purple";
  const dot = tone === "blue" ? "bg-[#00C8FF]" : "bg-[#9B4DFF]";
  const sub = tone === "blue" ? "text-[#00C8FF]" : "text-[#9B4DFF]";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={`mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] ${sub}`}
      >
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
        {eyebrow}
      </div>
      <h2 className={`text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl ${grad}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
