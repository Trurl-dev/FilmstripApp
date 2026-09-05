# Project state
_Last updated: 2026-09-05 by low-tier model in PR #6_

## Where we are
Phase: 0 — Foundations (environment, governance, sandbox, audit)
Milestone target: M0
Current task: T-0.8 (full library audit)
Blocked: none

## Last 3 completed
- T-0.7 Recycle-bin semantics on the production library mount — PR #6
- T-0.6 Create the sandbox — verified
- T-0.4 Governance & memory scaffolding — PR #4

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

## Where to look
Product rules → ask the maintainer (private PRD, not in this repo)
Task cards → docs/tasks/PHASE-0.md
Decisions → docs/adr/
