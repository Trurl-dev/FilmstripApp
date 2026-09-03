# AGENTS.md — Working conventions for AI agents

This file gives AI coding agents the context and rules they need to work consistently on this repository. Human contributors should read it too.

## Project in one paragraph

FilmstripApp is a desktop application (Electron + TypeScript, Windows v1) for managing and reviewing a personal photo archive, with a lightweight Android companion app. The photo library is an open, portable folder (local disk, NAS, or pCloud): the app never hides images in a proprietary catalog. User metadata lives in XMP sidecars next to the photos (one sidecar per RAW+JPG stack); EXIF is read-only; a local SQLite index is a rebuildable cache, not a source of truth. Planned stack: Electron + TypeScript (desktop), Android (mobile sidecar), SQLite + FTS5 (index), ExifTool (metadata), shared types/schema package for desktop and mobile.

See `README.md` for the public-facing overview.

## Repository state

Early planning stage. Only governance files exist (`README.md`, `LICENSE`, `.gitignore`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, this file). There is no code or `package.json` yet. When the first app scaffold lands, update this file with the real commands.

## Planned layout (monorepo)

```
desktop/            Electron + TypeScript desktop app (Windows first)
mobile/             Android app (later; shares types/schema)
packages/shared/    Shared types, DTOs, XMP/schema definitions
docs/               Public documentation (English only)
```

Internal planning documents in Spanish (PRD, design, API research) are intentionally **kept outside this public repository**.

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

1. Read `README.md` and this file first.
2. Check open issues/branches for existing work on the same topic.
3. Create a short-lived branch named after the task (e.g. `feat/thumbnail-cache`).
4. Implement in small commits; keep `main` always working.
5. Open a PR describing what changed, why, and how it was verified.

## Context the maintainer may ask for

If the task touches library organization, naming, metadata, or storage behavior, the authoritative decisions live in the private planning documents (`26.09 PRD - Filmstrip.md`, `26.09 DevLog - Filmstrip.md`, `26.09 API - pCloud.md` in the maintainer's project folder, outside this repo). Ask the maintainer for the relevant excerpt rather than guessing or inventing behavior.
