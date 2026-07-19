import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

/**
 * Sends a message to the configured Telegram chat via the Bot API.
 * Docs: https://core.telegram.org/bots/api#sendmessage
 */
export async function sendTelegram(text) {
  if (!env.telegram.isConfigured) {
    logger.warn("Telegram not configured (missing TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID).");
    return { ok: false, skipped: true };
  }

  const url = `https://api.telegram.org/bot${env.telegram.botToken}/sendMessage`;
  const body = JSON.stringify({
    chat_id: env.telegram.chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const data = await res.json();
    if (!data.ok) {
      logger.error("Telegram API error", data);
      return { ok: false, error: data.description };
    }
    logger.info("Telegram notification sent.", { messageId: data.result?.message_id });
    return { ok: true, messageId: data.result?.message_id };
  } catch (err) {
    logger.error("Telegram fetch failed", err.message);
    return { ok: false, error: err.message };
  }
}

/**
 * Builds a nicely formatted HTML message for Telegram.
 */
export function buildTelegramMessage(submission) {
  const { source, name, email, projectType, videoType, fileLink, description, ip, receivedAt } = submission;

  const brand = source === "MH" ? "Mohammad Hossein — IT & Network" : "Jovaynee Editing";
  const kind = source === "MH" ? projectType : videoType;

  const lines = [
    `🔔 <b>New Submission — ${brand}</b>`,
    ``,
    `👤 <b>Name:</b> ${escapeHtml(name)}`,
    `✉️ <b>Email:</b> ${escapeHtml(email)}`,
  ];

  if (kind) lines.push(`🏷 <b>Service:</b> ${escapeHtml(kind)}`);
  if (fileLink) lines.push(`🔗 <b>File:</b> ${escapeHtml(fileLink)}`);
  if (description) {
    lines.push(``);
    lines.push(`💬 <b>Message:</b>`);
    lines.push(escapeHtml(description));
  }

  lines.push(``);
  lines.push(`⏱ <b>At:</b> ${receivedAt}`);
  if (ip) lines.push(`🌐 <b>IP:</b> ${ip}`);

  return lines.join("\n");
}

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
