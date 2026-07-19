import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DATA_DIR = path.resolve(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "portfolio.json");

const defaultPortfolio = [
  { id: "1", title: "Neon Drift", tag: "Cinematic Brand Film", gradient: "from-[#9B4DFF] via-[#5a1a99] to-black" },
  { id: "2", title: "Echoes of Tehran", tag: "Documentary", gradient: "from-[#1a1a1a] via-[#9B4DFF]/40 to-black" },
  { id: "3", title: "Pulse Athletic", tag: "Commercial", gradient: "from-[#9B4DFF] via-[#00C8FF]/30 to-black" },
  { id: "4", title: "Midnight Run", tag: "Music Video", gradient: "from-black via-[#9B4DFF]/60 to-[#1a1a1a]" },
  { id: "5", title: "Solar Tech", tag: "Product Launch", gradient: "from-[#00C8FF]/30 via-[#9B4DFF]/40 to-black" },
  { id: "6", title: "Vertex Vlog", tag: "YouTube Series", gradient: "from-[#9B4DFF]/60 via-black to-[#00C8FF]/30" },
  { id: "7", title: "Cityscapes", tag: "Travel Reel", gradient: "from-black via-[#9B4DFF]/40 to-[#0A0A0A]" },
  { id: "8", title: "Glow Cosmetics", tag: "Social Campaign", gradient: "from-[#9B4DFF] via-[#ff5fb1]/30 to-black" },
  { id: "9", title: "Architects of Sound", tag: "Concert Film", gradient: "from-[#1a0033] via-[#9B4DFF] to-black" }
];

async function read() {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") {
      await write(defaultPortfolio);
      return defaultPortfolio;
    }
    throw err;
  }
}

async function write(items) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(items, null, 2), "utf-8");
  await fs.rename(tmp, FILE);
}

export async function list() {
  return await read();
}

export async function append(item) {
  const items = await read();
  const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...item };
  items.unshift(record); // Add to top
  await write(items);
  return record;
}

export async function remove(id) {
  const items = await read();
  const next = items.filter((i) => i.id !== id);
  if (items.length === next.length) return false;
  await write(next);
  return true;
}
