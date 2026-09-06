# Project state
_Last updated: 2026-09-06 by low-tier model in PR #10_

## Where we are
Phase: 1 — Monorepo scaffolding and CI (in progress)
Milestone target: M1
Current task: T-1.2 — TypeScript base
Blocked: none

## Last 3 completed
- T-1.1 Phase 1 kickoff + pnpm workspace — PR #10
- Phase 0 close — checklist §5.2.e, milestone M0 — PR #8
- T-0.8 Full library audit (read-only) — PR #7

## Never break these
1. Never write to the production library (`FILMSTRIP_LIBRARY_ROOT` env var) —
   production data. All dev/testing happens in the sandbox
   (`FILMSTRIP_SANDBOX_ROOT` env var). If an env var is not defined in your
   shell, STOP and ask the maintainer — never guess, never hardcode.
2. Never write inside an image file. EXIF is read-only.
3. Never regenerate an XMP sidecar from scratch — read, merge, write.
4. Companion files (.xmp .on1 .dop .acr) always travel with their photo.
5. Never publish absolute local paths or personal identifiers (names, emails)
   — AGENTS.md invariant 6.
6. Every destructive op needs a dry-run report first.

## Commands
install: pnpm install · dev: pnpm dev · check: pnpm lint && pnpm typecheck && pnpm test
(target for Phase 1 — the real commands land with T-1.9)

## Where to look
Product rules → ask the maintainer (private PRD, not in this repo)
Task cards → docs/tasks/PHASE-1.md
Decisions → docs/adr/ (ADR-0001 delete design, ADR-0002 library structure — both Accepted)
