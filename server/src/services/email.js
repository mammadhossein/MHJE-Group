import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

let transporter = null;
function getTransporter() {
  if (!env.email.isConfigured) return null;
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: env.email.host,
    port: env.email.port,
    secure: env.email.port === 465,
    auth: env.email.user ? { user: env.email.user, pass: env.email.pass } : undefined,
  });
  return transporter;
}

export async function sendEmail(submission) {
  const t = getTransporter();
  if (!t) {
    logger.debug("Email not configured (SMTP_HOST empty). Skipping email notification.");
    return { ok: false, skipped: true };
  }

  const brand = submission.source === "MH" ? "Mohammad Hossein — IT & Network" : "Jovaynee Editing";
  const kind = submission.source === "MH" ? submission.projectType : submission.videoType;

  const text = [
    `New submission on ${brand}`,
    ``,
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    kind ? `Service: ${kind}` : null,
    submission.fileLink ? `File link: ${submission.fileLink}` : null,
    ``,
    `Description:`,
    submission.description,
    ``,
    `Received at: ${submission.receivedAt}`,
    submission.ip ? `From IP: ${submission.ip}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const html = [
    `<h2 style="font-family:sans-serif">🔔 New Submission — ${brand}</h2>`,
    `<table style="font-family:sans-serif;border-collapse:collapse">`,
    `<tr><td style="padding:6px 12px;font-weight:bold">Name</td><td style="padding:6px 12px">${escape(submission.name)}</td></tr>`,
    `<tr><td style="padding:6px 12px;font-weight:bold">Email</td><td style="padding:6px 12px"><a href="mailto:${escape(submission.email)}">${escape(submission.email)}</a></td></tr>`,
    kind ? `<tr><td style="padding:6px 12px;font-weight:bold">Service</td><td style="padding:6px 12px">${escape(kind)}</td></tr>` : "",
    submission.fileLink ? `<tr><td style="padding:6px 12px;font-weight:bold">File</td><td style="padding:6px 12px"><a href="${escape(submission.fileLink)}">link</a></td></tr>` : "",
    `</table>`,
    `<p style="font-family:sans-serif;margin-top:16px"><b>Description:</b></p>`,
    `<p style="font-family:sans-serif;white-space:pre-wrap">${escape(submission.description)}</p>`,
    `<hr/><small style="font-family:sans-serif;color:#888">Received at ${submission.receivedAt}${submission.ip ? ` from ${submission.ip}` : ""}</small>`,
  ].join("\n");

  try {
    const info = await t.sendMail({
      from: `"${brand} Website" <${env.email.user || "no-reply@localhost"}>`,
      to: env.email.to,
      subject: `🔔 New ${brand} submission — ${submission.name}`,
      text,
      html,
    });
    logger.info("Email sent.", { messageId: info.messageId });
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    logger.error("Email send failed", err.message);
    return { ok: false, error: err.message };
  }
}

function escape(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
