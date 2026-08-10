const SENSITIVE_KEYS = [
  "api-token",
  "authorization",
  "bearer",
  "cookie",
  "password",
  "secret",
  "token",
  "apikey",
  "api_key",
  "x-api-key",
];

function maskValue(value) {
  if (typeof value !== "string") return value;
  if (!value) return value;
  const trimmed = value.trim();
  if (trimmed.length <= 8) return "****";
  return trimmed.slice(0, 4) + "****" + trimmed.slice(-4);
}

function maskObject(obj, depth = 0) {
  if (depth > 10) return "[max depth]";
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => maskObject(item, depth + 1));
  }
  const masked = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    const isSensitive =
      SENSITIVE_KEYS.some((sensitive) => lowerKey.includes(sensitive)) ||
      lowerKey === "authorization" ||
      lowerKey.startsWith("x-api-");
    masked[key] = isSensitive ? maskValue(value) : maskObject(value, depth + 1);
  }
  return masked;
}

function safeStringify(obj, space) {
  if (obj === null || obj === undefined) return String(obj);
  if (typeof obj !== "object") return String(obj);
  try {
    return JSON.stringify(obj, null, space);
  } catch {
    try {
      const seen = new WeakSet();
      return JSON.stringify(
        obj,
        (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) return "[circular]";
            seen.add(value);
          }
          return value;
        },
        space
      );
    } catch {
      return "[unserializable]";
    }
  }
}

let correlationId = null;
const isDebug = process.env.DEBUG === "true";

export function generateCorrelationId() {
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function setCorrelationId(id) {
  correlationId = id;
}

export function getCorrelationId() {
  return correlationId;
}

function log(level, message, meta = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    correlationId: correlationId || "unknown",
    message,
    ...maskObject(meta),
  };

  const output = safeStringify(entry, 2);

  if (level === "error") {
    console.error(output);
  } else if (level === "warn") {
    console.warn(output);
  } else {
    console.error(output);
  }
}

export function info(message, meta) {
  log("info", message, meta);
}

export function warn(message, meta) {
  log("warn", message, meta);
}

export function error(message, meta) {
  log("error", message, meta);
}

export function debug(message, meta) {
  if (!isDebug) return;
  log("debug", message, meta);
}
