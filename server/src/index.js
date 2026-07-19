import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import submissionsRouter from "./routes/submissions.js";
import portfolioRouter from "./routes/portfolio.js";
import projectsRouter from "./routes/projects.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// --- Security headers ---
app.use(
  helmet({
    contentSecurityPolicy: false, // allow inline scripts from any client
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// --- CORS ---
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow same-origin & curl
    if (env.corsOrigins.includes("*") || env.corsOrigins.includes(origin)) {
      return cb(null, true);
    }
    return cb(null, false); // block silently
  },
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "X-Admin-Key"],
  maxAge: 86400,
};
app.use(cors(corsOptions));

// --- Body parsing ---
app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: false }));

// --- Request logging ---
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`, { ip: req.ip });
  next();
});

// --- Routes ---
app.get("/", (_req, res) => {
  res.json({
    service: "mh-jo-api",
    status: "running",
    endpoints: {
      health: "GET /api/health",
      submit: "POST /api/submissions",
      list: "GET /api/submissions (X-Admin-Key)",
      delete: "DELETE /api/submissions/:id (X-Admin-Key)",
    },
    telegram: env.telegram.isConfigured ? "configured" : "NOT configured",
    email: env.email.isConfigured ? "configured" : "not configured",
  });
});

app.use("/api", submissionsRouter);
app.use("/api", portfolioRouter);
app.use("/api", projectsRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "Not found" });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(env.port, () => {
  logger.info(`mh-jo-api listening on :${env.port} (${env.nodeEnv})`, {
    corsOrigins: env.corsOrigins,
    telegram: env.telegram.isConfigured,
    email: env.email.isConfigured,
  });
});
