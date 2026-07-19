import { Router } from "express";
import { submissionLimiter, adminLimiter } from "../middleware/rateLimit.js";
import { requireAdmin } from "../middleware/errorHandler.js";
import {
  createSubmission,
  health,
  listSubmissions,
  deleteSubmission,
} from "../controllers/submissions.js";

const router = Router();

// Public
router.get("/health", health);
router.post("/submissions", submissionLimiter, createSubmission);

// Admin
router.get("/submissions", adminLimiter, requireAdmin, listSubmissions);
router.delete("/submissions/:id", adminLimiter, requireAdmin, deleteSubmission);

export default router;
