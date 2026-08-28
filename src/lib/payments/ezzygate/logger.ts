import fs from "fs";
import path from "path";
import { EzzygateLogEntry } from "./types";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "ezzygate_history.json");

function ensureLogDirExists() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

export function logEzzygateEvent(type: EzzygateLogEntry["type"], data: unknown): EzzygateLogEntry {
  ensureLogDirExists();

  const entry: EzzygateLogEntry = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    type,
    data,
  };

  try {
    let history: EzzygateLogEntry[] = [];
    if (fs.existsSync(LOG_FILE)) {
      const content = fs.readFileSync(LOG_FILE, "utf-8").trim();
      if (content) {
        try {
          history = JSON.parse(content);
        } catch {
          history = [];
        }
      }
    }
    history.unshift(entry);
    if (history.length > 100) history = history.slice(0, 100);
    fs.writeFileSync(LOG_FILE, JSON.stringify(history, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write Ezzygate log entry:", err);
  }

  return entry;
}

export function getEzzygateLogs(): EzzygateLogEntry[] {
  try {
    if (fs.existsSync(LOG_FILE)) {
      const content = fs.readFileSync(LOG_FILE, "utf-8").trim();
      if (content) return JSON.parse(content);
    }
  } catch (_err) {}
  return [];
}
