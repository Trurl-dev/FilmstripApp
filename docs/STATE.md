# Project state
_Last updated: 2026-09-07 by low-tier model in PR #19_

## Where we are
Phase: 1 — Monorepo scaffolding and CI (board complete; awaiting the Phase 1 close / milestone M1 review)
Milestone target: M1
Current task: none in flight — next step is the Phase 1 close review (milestone M1), by the maintainer / high-tier model
Blocked: none

`main` is protected since T-1.9: changes land only through pull requests with the `ci` check green and one approving review; administrators are included, force pushes are blocked.

## Last 3 completed
- T-1.9 main protection + CODEOWNERS + real commands — PR #19
- T-1.8 GitHub Actions CI — PR #18
- T-1.7 Vitest + first real test — PR #17

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
install: pnpm install · dev: pnpm dev (opens the Electron shell since T-1.4) · build: pnpm build (since T-1.4) · typecheck: pnpm typecheck (green since T-1.2; covers all workspace packages since T-1.3) · lint: pnpm lint (green since T-1.6; ESLint + Prettier) · test: pnpm test (green since T-1.7; Vitest) · check: pnpm lint && pnpm typecheck && pnpm test (green since T-1.7; CI runs it on every PR since T-1.8)

## Where to look
Product rules → ask the maintainer (private PRD, not in this repo)
Task cards → docs/tasks/PHASE-1.md
Decisions → docs/adr/ (ADR-0001 delete design, ADR-0002 library structure — both Accepted)
