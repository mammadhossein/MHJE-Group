import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DATA_DIR = path.resolve(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "projects.json");

const defaultProjects = [
  { id: "1", title: "MH × JE Website", tag: "Front-End / Web", link: "" },
  { id: "2", title: "Digital Menu Project", tag: "Web App", link: "" },
  { id: "3", title: "Network Labs", tag: "Networking", link: "" },
  { id: "4", title: "Active Directory Labs", tag: "System Admin", link: "" },
  { id: "5", title: "Windows Server Labs", tag: "Networking", link: "" },
  { id: "6", title: "Student Projects", tag: "Programming", link: "" },
];

async function read() {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") {
      await write(defaultProjects);
      return defaultProjects;
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
  items.unshift(record);
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
