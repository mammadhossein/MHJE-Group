import { validateSubmission } from "../middleware/validate.js";
import { append, list, remove } from "../services/store.js";
import { sendTelegram, buildTelegramMessage } from "../services/telegram.js";
import { sendEmail } from "../services/email.js";
import { logger } from "../utils/logger.js";

/**
 * POST /api/submissions
 * Body: { source: "MH"|"JE", name, email, projectType?|videoType?, fileLink?, description }
 */
export async function createSubmission(req, res, next) {
  try {
    const parsed = validateSubmission(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      });
    }

    const payload = parsed.data;

    // Capture IP (best-effort, works behind most proxies)
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      req.socket?.remoteAddress ||
      "";

    const submission = { ...payload, ip };

    // 1) Persist locally
    const record = await append(submission);

    // 2) Notify via Telegram + Email (parallel, non-blocking for response)
    const message = buildTelegramMessage(record);
    const [tgResult, emailResult] = await Promise.allSettled([
      sendTelegram(message),
      sendEmail(record),
    ]);

    logger.info("Submission received", {
      id: record.id,
      source: record.source,
      email: record.email,
      telegram: tgResult.status === "fulfilled" ? tgResult.value.ok : "errored",
      email: emailResult.status === "fulfilled" ? emailResult.value.ok : "errored",
    });

    res.status(201).json({
      ok: true,
      message: "Your request has been received. We'll contact you soon.",
      id: record.id,
      delivered: {
        telegram: tgResult.status === "fulfilled" && tgResult.value.ok,
        email: emailResult.status === "fulfilled" && emailResult.value.ok,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/health
 */
export function health(req, res) {
  res.json({
    ok: true,
    service: "mh-jo-api",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}

/**
 * GET /api/submissions  (admin)
 */
export async function listSubmissions(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 500);
    const items = await list({ limit });
    res.json({ ok: true, count: items.length, items });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/submissions/:id  (admin)
 */
export async function deleteSubmission(req, res, next) {
  try {
    const removed = await remove(req.params.id);
    if (!removed) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
}
