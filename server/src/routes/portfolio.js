import { Router } from "express";
import { adminLimiter } from "../middleware/rateLimit.js";
import { requireAdmin } from "../middleware/errorHandler.js";
import { getPortfolio, addPortfolioItem, deletePortfolioItem } from "../controllers/portfolio.js";

const router = Router();

// Public: Everyone can view the portfolio
router.get("/portfolio", getPortfolio);

// Admin: Only you can add or delete
router.post("/portfolio", adminLimiter, requireAdmin, addPortfolioItem);
router.delete("/portfolio/:id", adminLimiter, requireAdmin, deletePortfolioItem);

export default router;
