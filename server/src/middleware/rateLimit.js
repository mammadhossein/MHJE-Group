import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

/**
 * Per-IP rate limiter for the public submission endpoint.
 */
export const submissionLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests. Please try again later." },
  handler: (req, res, next, options) => {
    logger.warn("Rate limit hit", {
      ip: req.ip,
      source: req.body?.source,
    });
    res.status(429).json(options.message);
  },
});

/**
 * Stricter limiter for admin endpoints.
 */
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many admin requests." },
});
