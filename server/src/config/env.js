import dotenv from "dotenv";
dotenv.config();

function parseOrigins(raw) {
  if (!raw) return ["*"];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function int(value, fallback) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

export const env = {
  port: int(process.env.PORT, 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigins: parseOrigins(process.env.CORS_ORIGIN),

  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    chatId: process.env.TELEGRAM_CHAT_ID || "",
    get isConfigured() {
      return Boolean(this.botToken && this.chatId);
    },
  },

  email: {
    to: process.env.EMAIL_TO || "",
    host: process.env.SMTP_HOST || "",
    port: int(process.env.SMTP_PORT, 587),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    get isConfigured() {
      return Boolean(this.host && this.user && this.pass && this.to);
    },
  },

  adminKey: process.env.ADMIN_KEY || "change-me-admin-key",

  rateLimit: {
    windowMs: int(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: int(process.env.RATE_LIMIT_MAX, 20),
  },
};
