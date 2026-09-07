import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  unlinkSync
} from "node:fs";
import { join } from "node:path";

export type LogLevel = "error" | "warn" | "info" | "debug";

export const LOG_LEVELS: readonly LogLevel[] = ["error", "warn", "info", "debug"];

export interface LogEntry {
  ts: string;
  level: LogLevel;
  scope: string;
  msg: string;
  data?: unknown;
}

export interface LoggerOptions {
  rootDir: string;
  scope: string;
  retentionDays?: number;
  maxBytes?: number;
}

export interface Logger {
  error(msg: string, data?: unknown): void;
  warn(msg: string, data?: unknown): void;
  info(msg: string, data?: unknown): void;
  debug(msg: string, data?: unknown): void;
}

export const DEFAULT_RETENTION_DAYS = 14;
export const DEFAULT_MAX_BYTES = 50 * 1024 * 1024;

export function logsDir(rootDir: string): string {
  return join(rootDir, ".filmstrip", "logs");
}

export function logFileName(scope: string, date: Date): string {
  const prefix = scope === "renderer" ? "renderer" : "app";
  const ymd = date.toISOString().slice(0, 10);
  return `${prefix}-${ymd}.log`;
}

export function logFilePath(rootDir: string, scope: string, date: Date): string {
  return join(logsDir(rootDir), logFileName(scope, date));
}

export function formatEntry(entry: LogEntry): string {
  const line: Record<string, unknown> = {
    ts: entry.ts,
    level: entry.level,
    scope: entry.scope,
    msg: entry.msg
  };
  if (entry.data !== undefined) {
    line.data = entry.data;
  }
  return JSON.stringify(line);
}

function isExpired(fileName: string, retentionDays: number, now: Date): boolean {
  const match = /^(?:app|renderer)-(\d{4}-\d{2}-\d{2})\.log$/.exec(fileName);
  if (!match) {
    return false;
  }
  const fileDate = new Date(`${match[1]}T00:00:00Z`);
  const cutoff = new Date(now);
  cutoff.setUTCDate(cutoff.getUTCDate() - retentionDays);
  return fileDate.getTime() < cutoff.getTime();
}

function rotate(rootDir: string, retentionDays: number, maxBytes: number, now: Date): void {
  const dir = logsDir(rootDir);
  if (!existsSync(dir)) {
    return;
  }
  const files: Array<{ name: string; full: string; mtime: number; size: number }> = readdirSync(dir)
    .filter((name) => /^(?:app|renderer)-.*\.log$/.test(name))
    .map((name) => {
      const full = join(dir, name);
      return { name, full, mtime: statSync(full).mtimeMs, size: statSync(full).size };
    })
    .sort((a, b) => a.mtime - b.mtime);

  const toDelete = files.filter((f) => isExpired(f.name, retentionDays, now));
  let totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  for (const f of files) {
    if (totalBytes <= maxBytes) {
      break;
    }
    if (!toDelete.includes(f)) {
      toDelete.push(f);
    }
    totalBytes -= f.size;
  }
  for (const f of toDelete) {
    try {
      unlinkSync(f.full);
    } catch {
      // best-effort cleanup; ignore concurrent/unlinkable files
    }
  }
}

export function createLogger(options: LoggerOptions): Logger {
  const { rootDir, scope } = options;
  const retentionDays = options.retentionDays ?? DEFAULT_RETENTION_DAYS;
  const maxBytes = options.maxBytes ?? DEFAULT_MAX_BYTES;

  const dir = logsDir(rootDir);
  mkdirSync(dir, { recursive: true });

  const now = new Date();
  rotate(rootDir, retentionDays, maxBytes, now);
  const file = logFilePath(rootDir, scope, now);

  function write(level: LogLevel, msg: string, data?: unknown): void {
    const entry: LogEntry = {
      ts: new Date().toISOString(),
      level,
      scope,
      msg
    };
    if (data !== undefined) {
      entry.data = data;
    }
    appendFileSync(file, `${formatEntry(entry)}\n`, "utf8");
  }

  return {
    error: (msg, data) => write("error", msg, data),
    warn: (msg, data) => write("warn", msg, data),
    info: (msg, data) => write("info", msg, data),
    debug: (msg, data) => write("debug", msg, data)
  };
}
