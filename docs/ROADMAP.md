# Roadmap

Public roadmap for FilmstripApp — see README for the product overview.

- Phase 0 — Foundations: environment, governance, sandbox, audit → M0 ✅ **complete (2026-09-06)**
- Phase 1 — Monorepo scaffolding + green CI → M1 ✅ **complete (2026-09-08)**
- Phase 2 — Headless data core (index, EXIF, XMP, stacks, cache) → M2
- Phase 3 — Data safety & interoperability (companions, trash) → M3
- Phase 4 — DESIGN + UI shell → M4
- Phase 5 — MVP review / culling (first real use) → M5
- Phase 6 — Import & session creation → M6
- Phase 7 — Normalize existing archive → M7
- Phase 8 — Search, filters, tags, batches → M8
- Phase 9 — pCloud API + Android sidecar (v1.1) → M9
- Phase 10 — v2/v3 (checksum, audit UI, map, timeline, macOS/iOS) → M10

Current status: **Phase 1 complete — milestone M1 reached (2026-09-08)**. The repository is a
pnpm monorepo: an Electron + Vite + React desktop shell (`desktop/`) with a typed IPC bridge
and a JSONL app logger, plus `packages/core` (pure logic) and `packages/shared` (shared types).
`pnpm check` is green (ESLint + Prettier, TypeScript typecheck, Vitest) and GitHub Actions runs
it on every pull request; `main` is protected (PR-only changes, one review, green `ci` check,
admins included). `pnpm dev` opens the Electron window. No photo data is touched yet:
development happens in the project `Sandbox`; the production library stays off-limits until the
explicit Phase 7 sign-off.

Next: **Phase 2 — headless data core**, starting with the Phase 2 kickoff (generates
docs/tasks/PHASE-2.md) and T-2.1, the LibraryStorage contract. See docs/STATE.md.
