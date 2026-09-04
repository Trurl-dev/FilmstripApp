# AGENTS.md — Working conventions for AI agents

This file gives AI coding agents the context and rules they need to work consistently on this repository. Human contributors should read it too.

## Project in one paragraph

FilmstripApp is a desktop application (Electron + TypeScript, Windows v1) for managing and reviewing a personal photo archive, with a lightweight Android companion app planned for v1.1. The photo library is an open, portable folder (local disk, NAS, or pCloud): the app never hides images in a proprietary catalog. User metadata lives in XMP sidecars next to the photos (one sidecar per RAW+JPG stack); EXIF is read-only; a local SQLite index is a rebuildable cache, not a source of truth. Planned stack: Electron + TypeScript (desktop), Android (mobile sidecar), SQLite + FTS5 (index), ExifTool (metadata), shared types/schema package for desktop and mobile.

See `README.md` for the public-facing overview.

## Two agent tiers

| Tier | Reads | Does |
|---|---|---|
| **High-tier model** | The full PLAN, PRD and DESIGN (internal documents) | Designs, decides architecture, writes governance documents, reviews the close of each phase |
| **Low-tier model** (day to day) | **This file + `docs/STATE.md` + one single task card** from `docs/tasks/PHASE-N.md` | Implements one task, verifies it, updates the state and opens a PR |

The low-tier model must never have to *deduce* anything. If a task requires product or design judgment, it is marked `[ALTO]` and is **not** low-tier work.

**Start-of-session rule:** every session — any tier — reads this file first, before any other repository or internal document, and re-reads it whenever it changes. If a rule here contradicts what you observe, stop and ask the maintainer; never act on a stale rule.

## Safety invariants (non-negotiable for the entire project)

1. **The production library (`FILMSTRIP_LIBRARY_ROOT` env var) is irreplaceable production data.** No code writes, moves, renames or deletes anything there until the explicit Phase 7 sign-off. Resolve the path at runtime (`$env:FILMSTRIP_LIBRARY_ROOT`); if the variable is not defined in your shell, **stop and ask the maintainer** — never guess or hardcode it.
2. **pCloud syncs:** a deletion in the production library propagates to the cloud. All development and testing happens in the local sandbox (`FILMSTRIP_SANDBOX_ROOT` env var — a folder named `Sandbox` inside the project folder; its path contains spaces, so always quote the resolved value in commands). Resolve it at runtime; if the variable is not defined in your shell, **stop and ask the maintainer** — never guess or hardcode it. **This repository is public: never write the resolved values of these variables here** — refer to them by name only. The sandbox must never be committed to the internal repo (`.gitignore` entry `Sandbox/`).
3. **Every destructive operation has a mandatory dry-run** that produces a reviewable report before it is executed.
4. **Never write inside an image file.** EXIF is read-only.
5. **Never regenerate a sidecar from scratch.** Read-merge-write only.
6. **Privacy — nothing personally identifiable goes public.** Never commit real names, personal email addresses, or resolved local paths (e.g. the value of `FILMSTRIP_LIBRARY_ROOT` / `FILMSTRIP_SANDBOX_ROOT`, or any `C:\Users\...\` path) to this repository, its PRs, commit messages or comments — not even inside pasted command output. Refer to local resources by env-var name or generically (e.g. "the project `Sandbox` folder").

## Photo library rules (PRD v0.4)

- **Companion files — base-name rule:** when moving or renaming a photo (or a RAW+JPG stack), carry along **every file that shares the photo's base name** (e.g. `BaseName.xmp`, `BaseName.on1` — ON1 Photo RAW, `BaseName.dop` — DxO, `BaseName.acr` — Lightroom/ACR), so no application's work is lost. Companions that do not follow the base-name pattern (e.g. Capture One `.cos` catalogs) are only reported, never managed.
- **Support by detected extension, not by declared brand:**
  - **RAW:** `.RAF .ARW .RW2 .ORF .NEF .CR3 .DNG`
  - **Image:** `.JPG .JPEG .HEIC .PNG .TIF`
  - **The indexer never treats these as photos:** `.on1 .xmp .dop .acr .cos .eip .lrv .mp4 .tmp`
- XMP sidecars use the `BaseName.xmp` convention (lowercase `.xmp`, UTF-8, same directory, one per stack). Writes are read-merge-write: parse the whole sidecar, rewrite every namespace present, and update `xmp:MetadataDate` on each write.

## Agent memory system

Four layers. Cold-start budget: `AGENTS.md` + `docs/STATE.md` + one task card (~250 lines total).

| Layer | File | Read | Written |
|---|---|---|---|
| Permanent rules | `AGENTS.md` (this file) | Always, first | Rarely |
| Current state | `docs/STATE.md` | Always, second | **In every PR** — a PR without an updated `STATE.md` is not merged |
| Task cards | `docs/tasks/PHASE-N.md` | Only the assigned card | When marking the task `[x]` |
| Rationale & history | `docs/adr/` + internal DevLog | Only when asked | When a decision is made / at session close |

**There is no `MEMORY.md`, by design.** If something fits none of the four layers, it needs an ADR (`docs/adr/NNNN-*.md`), not a new memory file. ADRs are never deleted; superseded ones are marked `Superseded by ADR-NNNN`.

## Hard rules about the internal documents

The PRD, DESIGN, PLAN and DevLog are internal documents in Spanish, kept **outside this repository**.

- **Never edit, rewrite or "improve" the PRD, the DESIGN or the PLAN.**
- **Never invent unspecified behavior.** If a criterion is missing to decide, **stop and ask**: mark the task as `blocked` in `docs/STATE.md` and wait for the maintainer.
- If you detect a discrepancy with an internal document, do not fix the document: add a line to the "Deltas de PRD pendientes" section of the internal DevLog (append-only; ask the maintainer for access), mention the delta in the PR that originated it, and carry on.
- When a task touches library organization, naming, metadata or storage behavior, ask the maintainer for the relevant excerpt of the internal documents rather than guessing.

## Repository state

Early planning stage. Only governance files exist (`README.md`, `LICENSE`, `.gitignore`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, this file). There is no code or `package.json` yet; the memory files (`docs/STATE.md`, `docs/tasks/`, `docs/adr/`) are created in Phase 0. When the first app scaffold lands, update this file with the real commands.

## Planned layout (monorepo)

```
desktop/            Electron + TypeScript desktop app (Windows first)
mobile/             Android app (v1.1; shares types/schema)
packages/core/      Pure logic, no Electron imports
packages/shared/    Shared types, DTOs, XMP/schema definitions
tools/              Scripts (audits, fixtures)
docs/               Public documentation (English only)
```

Internal planning documents in Spanish (PRD, DESIGN, PLAN, DevLog, API research) are intentionally **kept outside this public repository**.

## Rules for AI agents (non-negotiable)

1. **Never push to `main` directly.** Work on a feature branch and open a pull request. The human maintainer reviews and merges every change.
2. **Everything public in English.** Code identifiers, commit messages, PR titles/descriptions, comments, and repository documentation in English. Private notes for the maintainer may be in Spanish.
3. **No secrets.** Never commit API keys, tokens, passwords, `.env` files, personal photo-library content, or sample data from the maintainer's private files.
4. **No unrelated churn.** Do not reformat, rename, or refactor code you are not changing for the task at hand. Match the existing style of the file.
5. **Small, focused commits** with descriptive messages in the imperative mood ("Add X", "Fix Y").
6. **Verify before claiming.** Run the relevant checks/tests and state exactly what was confirmed (compiles, tests pass, runs locally) — never claim something is done without evidence.
7. **Dependencies must be MIT-compatible.** Before adding a third-party dependency, confirm its license is compatible with this project's MIT license.
8. **Platform boundaries.** Keep desktop/mobile-specific code behind the planned abstraction layers (storage adapters, shared schema). Do not leak Electron APIs into shared code or vice versa.

## Workflow when starting a task

1. Read this file first, then `docs/STATE.md`, then only your assigned task card from `docs/tasks/PHASE-N.md`. (Until those files exist, read `README.md` and ask the maintainer.)
2. Check open issues/branches for existing work on the same topic.
3. Create a short-lived branch named after the task (e.g. `feat/thumbnail-cache`).
4. Implement in small commits; keep `main` always working.
5. Open a PR describing what changed, why, and how it was verified. Include a `Handoff` section (done / not done / gotchas / next task) and the updated `docs/STATE.md` in the same PR.
