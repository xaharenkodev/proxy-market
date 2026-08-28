import fs from "fs";
import path from "path";
import { EzzygateLogEntry } from "./types";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "ezzygate_history.json");

export function logEzzygateEvent(type: EzzygateLogEntry["type"], data: unknown): EzzygateLogEntry {
  const entry: EzzygateLogEntry = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    type,
    data,
  };

  // Structured console log for serverless/Vercel log stream
  console.log(`[ezzygate:${type}]`, JSON.stringify(data));

  // Skip local disk write on Vercel / serverless environment
  if (process.env.VERCEL || process.env.NOW_BUILDER) {
    return entry;
  }

  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }

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
    console.warn("Local log file write skipped:", err instanceof Error ? err.message : err);
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
