import { Router } from "express";
import { adminLimiter } from "../middleware/rateLimit.js";
import { requireAdmin } from "../middleware/errorHandler.js";
import { getProjects, addProjectItem, deleteProjectItem } from "../controllers/projects.js";

const router = Router();

// Public: Everyone can view MH projects
router.get("/projects", getProjects);

// Admin: Only Mohammad can add or delete
router.post("/projects", adminLimiter, requireAdmin, addProjectItem);
router.delete("/projects/:id", adminLimiter, requireAdmin, deleteProjectItem);

export default router;
