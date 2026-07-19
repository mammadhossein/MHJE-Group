import { z } from "zod";
import { list, append, remove } from "../services/portfolioStore.js";
import { logger } from "../utils/logger.js";

const portfolioSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  tag: z.string().trim().min(1, "Tag is required").max(50),
  videoUrl: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
  gradient: z.string().trim().default("from-[#9B4DFF] via-[#5a1a99] to-black"),
});

export async function getPortfolio(req, res, next) {
  try {
    const items = await list();
    res.json({ ok: true, items });
  } catch (err) {
    next(err);
  }
}

export async function addPortfolioItem(req, res, next) {
  try {
    const parsed = portfolioSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "Invalid data", issues: parsed.error.issues });
    }
    
    const record = await append(parsed.data);
    logger.info("Portfolio item added", { id: record.id, title: record.title });
    res.status(201).json({ ok: true, item: record });
  } catch (err) {
    next(err);
  }
}

export async function deletePortfolioItem(req, res, next) {
  try {
    const removed = await remove(req.params.id);
    if (!removed) return res.status(404).json({ ok: false, error: "Not found" });
    logger.info("Portfolio item deleted", { id: req.params.id });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
