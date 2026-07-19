import { z } from "zod";
import { list, append, remove } from "../services/projectsStore.js";
import { logger } from "../utils/logger.js";

const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  tag: z.string().trim().min(1, "Tag is required").max(50),
  link: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
});

export async function getProjects(req, res, next) {
  try {
    const items = await list();
    res.json({ ok: true, items });
  } catch (err) {
    next(err);
  }
}

export async function addProjectItem(req, res, next) {
  try {
    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "Invalid data", issues: parsed.error.issues });
    }
    const record = await append(parsed.data);
    logger.info("Project item added", { id: record.id, title: record.title });
    res.status(201).json({ ok: true, item: record });
  } catch (err) {
    next(err);
  }
}

export async function deleteProjectItem(req, res, next) {
  try {
    const removed = await remove(req.params.id);
    if (!removed) return res.status(404).json({ ok: false, error: "Not found" });
    logger.info("Project item deleted", { id: req.params.id });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
