import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

/**
 * Simple JSON-file-backed store. No external DB required.
 * Swap for a real DB (Postgres, SQLite, Mongo) when scaling.
 */
const DATA_DIR = path.resolve(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "submissions.json");

async function read() {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function write(items) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(items, null, 2), "utf-8");
  await fs.rename(tmp, FILE); // atomic
}

export async function append(item) {
  const items = await read();
  const record = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ...item,
  };
  items.unshift(record);
  await write(items);
  return record;
}

export async function list({ limit = 100 } = {}) {
  const items = await read();
  return items.slice(0, limit);
}

export async function remove(id) {
  const items = await read();
  const next = items.filter((i) => i.id !== id);
  await write(next);
  return items.length - next.length;
}

export async function count() {
  const items = await read();
  return items.length;
}
