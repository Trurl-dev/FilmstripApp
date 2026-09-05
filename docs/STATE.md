# Project state
_Last updated: 2026-09-05 by low-tier model in PR #4_

## Where we are
Phase: 0 — Foundations (environment, governance, sandbox, audit)
Milestone target: M0
Current task: T-0.4 (governance & memory scaffolding)
Blocked: none

## Last 3 completed
- T-0.3 Internal private repo — (internal repo, no PR)
- T-0.2 Enable pnpm — verified
- T-0.1 Install ExifTool — verified

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
