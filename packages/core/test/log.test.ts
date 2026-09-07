import { describe, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync, existsSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createLogger, formatEntry, logFilePath, logsDir, type LogEntry } from "../src/log";

function tempRoot(): string {
  return mkdtempSync(join(tmpdir(), "filmstrip-log-test-"));
}

describe("app logger", () => {
  it("writes a JSONL info entry to the day's file under <root>/.filmstrip/logs", () => {
    const root = tempRoot();
    try {
      const logger = createLogger({ rootDir: root, scope: "main" });
      logger.info("hello", { n: 1 });

      const file = logFilePath(root, "main", new Date());
      expect(existsSync(file)).toBe(true);
      const lines = readFileSync(file, "utf8").trim().split("\n");
      expect(lines.length).toBe(1);
      const entry = JSON.parse(lines[0] ?? "") as LogEntry;
      expect(entry.level).toBe("info");
      expect(entry.scope).toBe("main");
      expect(entry.msg).toBe("hello");
      expect(entry.data).toEqual({ n: 1 });
      expect(entry.ts).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("formats an entry as a single JSON line with the documented fields", () => {
    const line = formatEntry({
      ts: "2026-09-07T00:00:00.000Z",
      level: "warn",
      scope: "main",
      msg: "something",
    });
    const parsed = JSON.parse(line) as Record<string, unknown>;
    expect(parsed).toEqual({
      ts: "2026-09-07T00:00:00.000Z",
      level: "warn",
      scope: "main",
      msg: "something",
    });
    expect(line.endsWith("\n")).toBe(false);
  });

  it("creates the logs directory and names the file app-YYYY-MM-DD.log for the main scope", () => {
    const root = tempRoot();
    try {
      createLogger({ rootDir: root, scope: "main" }).info("x");
      const dir = logsDir(root);
      expect(existsSync(dir)).toBe(true);
      const names = readdirSync(dir);
      expect(names.some((n) => /^app-\d{4}-\d{2}-\d{2}\.log$/.test(n))).toBe(true);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
