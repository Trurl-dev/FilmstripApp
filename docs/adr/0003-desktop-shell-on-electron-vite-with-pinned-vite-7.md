# ADR-0003 — The desktop shell builds on electron-vite with a pinned vite 7 / plugin-react 5 matrix
Date: 2026-09-08 · Status: Proposed

## Context

T-1.4 had to stand up the desktop shell: an Electron main process, a preload script
(`contextIsolation: true`) and a React renderer, with a dev loop (`pnpm dev`) and a build
(`pnpm build`). The toolchain versions are not independent choices — this is the compatibility
matrix found in T-1.4:

- **electron-vite 5 works with vite 7, but breaks with vite 8.**
- **@vitejs/plugin-react 6 requires vite 8**, so the renderer plugin stays on
  **@vitejs/plugin-react 5** (vite 7 compatible).
- The rest of the matrix: Electron 44, Node 24 (CI), React 19.

Every UI phase (4 and 5) grows on this shell, and the entry-point conventions, the ESM preload
output and the CI workflow all encode this choice. Changing the build layer later means
redoing all of that at once — an expensive decision to reverse.

## Options considered

1. **Plain Electron with hand-rolled Vite configs** (one config per process). Maximum control,
   but it re-implements what electron-vite already provides (entry conventions, dev wiring,
   `out/` layout) and leaves the security flags (`contextIsolation`) as manual boilerplate —
   the most likely place for an agent to get them wrong.
2. **electron-forge with the Vite plugin.** A heavier framework aimed at packaging and
   publishing; premature for a shell that does not ship yet.
3. **Wait for vite 8 / plugin-react 6 support in electron-vite.** Blocks the phase on upstream
   releases with no date.
4. **electron-vite 5 + vite 7 + @vitejs/plugin-react 5, pinned as one matrix.**

## Decision

Option 4. The desktop shell builds on `electron-vite@5` with `vite@7` and
`@vitejs/plugin-react@5`, on Electron 44 / Node 24. The three packages are treated as **one
unit**: none of them is bumped individually; the matrix is bumped together, after checking the
compatibility notes of each member.

## Consequences
### Positive
- One config file covers main, preload and renderer; the dev loop and the build work from a
  single command each.
- Entry conventions and security defaults come from the tool instead of hand-rolled config.
- The matrix is verified end to end: the Electron window opens (`pnpm dev`) and CI is green.

### Negative / what we accept
- We stay behind the latest vite until electron-vite supports vite 8.
- Every bump is a coordinated change (electron-vite + vite + plugin-react) with a compatibility
  check, not a routine update.
- Known environment gotchas: if `ELECTRON_RUN_AS_NODE` is set (even empty) in the shell,
  Electron starts as plain Node and no window opens — unset it before `pnpm dev`. Observed once
  (2026-09-08): after a clean reinstall of `node_modules`, pnpm did not re-run electron's
  postinstall and `pnpm dev` failed with `Error: Electron uninstall` — the remedy is to run the
  electron package's `install.js` (it uses the local download cache).
