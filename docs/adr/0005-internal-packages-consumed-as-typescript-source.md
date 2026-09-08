# ADR-0005 — Internal workspace packages are consumed as TypeScript source
Date: 2026-09-08 · Status: Proposed

## Context

The repository is a pnpm workspace (root + `desktop/` + `packages/*` + the planned `tools/`).
`packages/core` (pure logic, no Electron imports) and `packages/shared` (types and DTOs that a
future Android app will share) must be consumable from the desktop app, from tests and from a
future CLI **without a publish or build ceremony**, because a hundred tasks will edit them
session after session. Three pnpm / electron-vite specifics found in T-1.3–T-1.5 shape the
decision:

- pnpm v11 ignores the `pnpm` field in `package.json`, so build-script permissions
  (`allowBuilds`: esbuild, electron, @swc/core) live in `pnpm-workspace.yaml`.
- electron-vite's `externalizeDepsPlugin` externalizes the main process's dependencies by
  default; workspace packages must be excluded from it, or the bundled main process cannot
  resolve them at runtime.
- With no build step there are no `dist/` artifacts and no composite project references.

## Options considered

1. **Built packages** (`tsc --build`, composite references, emitted `dist/` + type
   declarations). Conventional for published libraries, but it adds build orchestration and
   stale-`dist/` traps to every session, for zero benefit inside a private monorepo.
2. **Internal publishing / packed tarballs.** Versioning ceremony for code that never leaves
   the workspace.
3. **Source exports:** `exports: { ".": "./src/index.ts" }`, `workspace:*` dependencies, and
   consumers that typecheck or bundle the source directly.

## Decision

Option 3. Internal `@filmstrip/*` packages export TypeScript source; every consumer compiles or
bundles it — `desktop/` via electron-vite (with `@filmstrip/*` excluded from
`externalizeDepsPlugin`), tests via Vitest, and each package typechecks itself. New internal
packages follow the same pattern.

## Consequences
### Positive
- One source of truth per package; edits are visible to every consumer immediately.
- No build order to respect, no stale artifacts, no composite tsconfig web.
- Ready for the consumers that matter later: the CLI (Phase 2) and the Android sidecar that
  shares the DTOs (v1.1).

### Negative / what we accept
- Every consumer must handle TypeScript source (fine here: the bundler and the typecheck
  script already do).
- Source exports are unconventional for *published* packages: if any `@filmstrip/*` package is
  ever published, it needs a real build step first.
- Each new bundling surface must again exclude workspace packages from externalization.
