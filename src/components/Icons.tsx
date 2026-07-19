import { cn } from "../utils/cn";

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconNetwork(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a13.5 13.5 0 0 1 0 18" />
      <path d="M12 3a13.5 13.5 0 0 0 0 18" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function IconWrench(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5Z" />
    </svg>
  );
}

export function IconShield(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconServer(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  );
}

export function IconCloud(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M7 18a4 4 0 0 1 0-8 6 6 0 0 1 11.5 1.5A4.5 4.5 0 0 1 17 18H7Z" />
      <path d="M12 12v6" />
      <path d="m9 15 3-3 3 3" />
    </svg>
  );
}

export function IconActivity(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    </svg>
  );
}

export function IconFilm(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M3 12h18" />
    </svg>
  );
}

export function IconPalette(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M12 22a10 10 0 1 1 10-10c0 3-2 3-4 3h-2a2 2 0 0 0-2 2v1c0 2-1 4-2 4Z" />
      <circle cx="7.5" cy="10.5" r="1" />
      <circle cx="9.5" cy="6.5" r="1" />
      <circle cx="14.5" cy="6.5" r="1" />
      <circle cx="17.5" cy="10.5" r="1" />
    </svg>
  );
}

export function IconMotion(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M5 12h14" />
      <path d="M5 6h10" />
      <path d="M5 18h6" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}

export function IconSocial(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconMegaphone(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M3 11v2a2 2 0 0 0 2 2h2l5 4V5L7 9H5a2 2 0 0 0-2 2Z" />
      <path d="M16 8a4 4 0 0 1 0 8" />
    </svg>
  );
}

export function IconPlay(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M7 5v14l12-7L7 5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMail(props: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", props.className)} {...baseProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function IconPhone(props: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", props.className)} {...baseProps}>
      <path d="M22 16.92V21a1 1 0 0 1-1.1 1A19 19 0 0 1 2 4.1 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.27 1L7 10.5a16 16 0 0 0 6.5 6.5l1.75-1.82a1 1 0 0 1 1-.27l4 1a1 1 0 0 1 .75 1Z" />
    </svg>
  );
}

export function IconSend(props: { className?: string }) {
  return (
    <svg className={cn("h-4 w-4", props.className)} {...baseProps}>
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function IconArrowRight(props: { className?: string }) {
  return (
    <svg className={cn("h-4 w-4", props.className)} {...baseProps}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function IconArrowDown(props: { className?: string }) {
  return (
    <svg className={cn("h-4 w-4", props.className)} {...baseProps}>
      <path d="M12 5v14" />
      <path d="m5 12 7 7 7-7" />
    </svg>
  );
}

export function IconCheck(props: { className?: string }) {
  return (
    <svg className={cn("h-4 w-4", props.className)} {...baseProps}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function IconInstagram(props: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", props.className)} {...baseProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconTelegram(props: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", props.className)} {...baseProps}>
      <path d="m22 3-3 18-7-5-3 3-1-6 14-10Z" />
    </svg>
  );
}

export function IconYoutube(props: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", props.className)} {...baseProps}>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconX(props: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", props.className)} {...baseProps}>
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}

export function IconLinkedin(props: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", props.className)} {...baseProps}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </svg>
  );
}

export function IconWhatsapp(props: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", props.className)} {...baseProps}>
      <path d="M3 21l1.6-4.4A8 8 0 1 1 8.4 20L3 21Z" />
      <path d="M9 9c0 3 3 6 6 6l1.5-1.5-2-1-1 .8c-1.2-.5-2.3-1.6-2.8-2.8l.8-1-1-2L9 9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSound(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

export function IconType(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M4 7V5h16v2M9 19h6M12 5v14" />
    </svg>
  );
}

export function IconVideoDesign(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <rect x="3" y="5" width="13" height="14" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
      <path d="M7 9h5M7 13h3" />
    </svg>
  );
}

export function IconServiceNet(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <rect x="8" y="3" width="8" height="5" rx="1" />
      <rect x="2" y="16" width="6" height="5" rx="1" />
      <rect x="16" y="16" width="6" height="5" rx="1" />
      <path d="M12 8v4M12 12H5v4M12 12h7v4" />
    </svg>
  );
}

export function IconCode(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 6l-4 12" />
    </svg>
  );
}

export function IconTerminal(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </svg>
  );
}

export function IconGraduation(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M22 9 12 5 2 9l10 4 10-4Z" />
      <path d="M6 11v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </svg>
  );
}

export function IconUser(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

export function IconTag(props: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", props.className)} {...baseProps}>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconStar(props: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", props.className)} {...baseProps}>
      <path d="m12 3 2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3Z" />
    </svg>
  );
}
