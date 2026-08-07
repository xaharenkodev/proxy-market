export interface EzzygateLogEntry {
  id: string;
  timestamp: string;
  type: "request" | "response" | "webhook" | "redirect";
  data: Record<string, unknown>;
}

const MAX_SAFE_VALUE_LENGTH = 120;
const BLOCKED_KEYS = /signature|hash|key|email|name|phone|url|curl|valuestring/i;

function sanitize(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== "object" || Array.isArray(data)) return { detail: "event recorded" };
  return Object.fromEntries(
    Object.entries(data as Record<string, unknown>)
      .filter(([key]) => !BLOCKED_KEYS.test(key))
      .map(([key, value]) => [key, typeof value === "string" ? value.slice(0, MAX_SAFE_VALUE_LENGTH) : value])
  );
}

export function logEzzygateEvent(type: EzzygateLogEntry["type"], data: unknown): EzzygateLogEntry {
  const entry: EzzygateLogEntry = {
    id: `payment-${Date.now()}`,
    timestamp: new Date().toISOString(),
    type,
    data: sanitize(data),
  };
  console.info("[ezzygate]", JSON.stringify(entry));
  return entry;
}

export function getEzzygateLogs(): EzzygateLogEntry[] {
  return [];
}
