# Phase 1 — Monorepo scaffolding and CI

A pnpm workspace with a green CI pipeline, without touching any photo data. All tasks target milestone **M1**.

### [x] T-1.1 — pnpm workspace
- **Milestone:** M1 · **Size:** S
- **Files:** pnpm-workspace.yaml, package.json (root), pnpm-lock.yaml (generated)
- **Goal:** a pnpm workspace covering desktop/, packages/* and tools/; a root package.json with the dev/build/lint/typecheck/test/check scripts.
- **Acceptance criteria:** `pnpm install` runs without errors (tested on 06/09: it works with the workspace folders empty — do NOT create filler package.json files in desktop/, packages/ or tools/).
- **DONE:** 2026-09-06

### [x] T-1.2 — TypeScript base
- **Milestone:** M1 · **Size:** S
- **Files:** tsconfig.base.json, tsconfig.json (root, extends base), package.json (root: only the typecheck script)
- **Goal:** strict: true, noUncheckedIndexedAccess, exactOptionalPropertyTypes. Note: each package's tsconfig arrives with its package in T-1.3.
- **Acceptance criteria:** `pnpm typecheck` is green.
- **DONE:** 2026-09-06

### [x] T-1.3 — packages/core (pure logic) and packages/shared (types/DTOs)
- **Milestone:** M1 · **Size:** S
- **Files:** packages/core/package.json + tsconfig.json + src/index.ts; packages/shared/ the same; package.json (root, references if needed)
- **Goal:** core has no Electron imports; both export a test symbol.
- **Acceptance criteria:** both compile and export the symbol.
- **DONE:** 2026-09-06

### [x] T-1.4 — Electron + Vite + React shell in desktop/
- **Milestone:** M1 · **Size:** M
- **Files:** desktop/package.json, desktop/electron/main.ts, desktop/electron/preload.ts, desktop/src/ (renderer), desktop/index.html, desktop/vite.config.ts, desktop tsconfig, package.json (root: only the dev/build scripts)
- **Goal:** main process, preload with contextIsolation: true, React renderer.
- **Acceptance criteria:** `pnpm dev` opens a window titled "Filmstrip".
- **DONE:** 2026-09-06

### [x] T-1.5 — Typed IPC bridge
- **Milestone:** M1 · **Size:** M
- **Files:** packages/shared/src/ipc.ts (contract), desktop/electron/main.ts, desktop/electron/preload.ts, desktop/src/
- **Goal:** a single channel with a TS contract in packages/shared.
- **Acceptance criteria:** the renderer calls app.getVersion() through the bridge and renders it. Rule: the renderer never touches fs directly.
- **DONE:** 2026-09-07

### [x] T-1.5b — App logger (PLAN §6.3)
- **Milestone:** M1 · **Size:** M
- **Files:** packages/core/src/log.ts, desktop/electron/main.ts (wiring), logger test
- **Goal:** JSONL, levels, 14-day / 50 MB rotation, in <root>\.filmstrip\logs\ with the root resolved by configuration at runtime, never hardcoded. RULE (invariant 1): the AC is demonstrated with the app pointing at $env:FILMSTRIP_SANDBOX_ROOT — logs go to Sandbox\.filmstrip\logs\, NEVER to the production library.
- **Acceptance criteria:** starting the app creates the day's file with ≥ 1 info event.
- **DONE:** 2026-09-07

### [x] T-1.6 — ESLint + Prettier
- **Milestone:** M1 · **Size:** S
- **Files:** eslint.config.mjs (flat config, strict TS, no-floating-promises), .prettierrc.json, .prettierignore, package.json (root: only the lint script)
- **Goal:** ESLint + Prettier configured.
- **Acceptance criteria:** `pnpm lint` is green over the whole repo.
- **DONE:** 2026-09-07

### [x] T-1.7 — Vitest + first real test
- **Milestone:** M1 · **Size:** S
- **Files:** vitest.config.ts (root), packages/core/test/<first test>.test.ts, package.json (root: only the test script)
- **Goal:** Vitest configured with a first real test.
- **Acceptance criteria:** `pnpm test` is green with ≥ 1 non-trivial test.
- **DONE:** 2026-09-07

### [x] T-1.8 — GitHub Actions CI
- **Milestone:** M1 · **Size:** M
- **Files:** .github/workflows/ci.yml
- **Goal:** on every PR, install → lint → typecheck → test on windows-latest.
- **Acceptance criteria:** a PR shows the check green (this same PR serves once the workflow exists on the branch). Note: if the workflow cannot run on this PR because it is added in it, declare it in the Handoff and leave the AC for T-1.8, which will demonstrate it with its own PR.
- **DONE:** 2026-09-07

### [x] T-1.9 — main protection + CODEOWNERS + real commands
- **Milestone:** M1 · **Size:** M
- **Files:** .github/CODEOWNERS, package.json if applicable, AGENTS.md, README.md; protection via gh api
- **Goal:** require PRs and green checks before merge; AGENTS.md and README with the real commands (AGENTS.md itself announces this update in T-1.9).
- **Acceptance criteria:** a direct push to main is rejected (demonstrate with the literal output of the attempt and leave local main restored, or with gh api showing the protection active).
- **DONE:** 2026-09-07

---

**Phase closed: 2026-09-08 — all 10 tasks done, milestone M1 met** (close checklist run by a
high-tier model; evidence in the PR that closed the phase). Next: Phase 2 — kickoff, which
generates `docs/tasks/PHASE-2.md` and starts T-2.1 (LibraryStorage contract).
