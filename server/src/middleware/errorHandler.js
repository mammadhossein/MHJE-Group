import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

/**
 * Centralized error handler. Catches everything and returns JSON.
 */
export function errorHandler(err, req, res, _next) {
  // Zod validation errors are handled by the controller, but just in case:
  if (err?.name === "ZodError") {
    return res.status(400).json({ ok: false, error: "Invalid input", issues: err.issues });
  }

  // Multipart / JSON parse errors
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ ok: false, error: "Invalid JSON body." });
  }

  logger.error("Unhandled error", {
    message: err?.message,
    stack: err?.stack,
    path: req?.path,
    method: req?.method,
  });

  res.status(err?.status || 500).json({
    ok: false,
    error: env.nodeEnv === "production" ? "Internal server error" : err?.message || "Unknown error",
  });
}

/**
 * Require the X-Admin-Key header.
 */
export function requireAdmin(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (!key || key !== env.adminKey) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
  next();
}
