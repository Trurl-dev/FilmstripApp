# FilmstripApp

FilmstripApp is a desktop application for **managing and viewing a personal photo archive**, with a lightweight mobile companion for remote work.

- **v1 platforms:** Windows (desktop app) + Android (mobile sidecar)
- **Later phases:** macOS and iOS, reusing the shared code base

## Concept

- **Open, portable library.** Photos live in a plain, readable folder (pCloud, local disk, NAS, ...) organized by year/session. The app does not hide images inside a proprietary catalog — it works directly on files and open metadata, so the library stays understandable and portable even without the app.
- **Fast, comfortable review (culling).** Filmstrip per session, photo-by-photo keyboard shortcuts (Lightroom-style), star ratings, picks/rejects, favorites, side-by-side comparison.
- **Excellence in graphic design.** A polished, professional dark UI in the style of Lightroom / Capture One / DXO, with 16-bit pixel-art accents and a pixel-art camera logo.
- **Lightweight.** Quick startup and navigation, on-demand thumbnails, local LRU thumbnail/preview cache — tuned for ~100 GB archives with thousands of photos.

## Status

**Phase 1 complete — monorepo scaffold, Electron shell and green CI (2026-09-07).** The repository
is now a pnpm workspace with an Electron + Vite + React desktop shell (`desktop/`), a pure-logic
package (`packages/core`) and a shared types package (`packages/shared`), a typed IPC bridge,
ESLint + Prettier, Vitest, and GitHub Actions CI that runs lint + typecheck + test on every pull
request. Phase 0 (foundations, milestone M0) had been completed on 2026-09-06; milestone M1
(Phase 1) is pending its close review.

**No photo data is touched yet.** Development happens in the project `Sandbox` folder; the
production library is off-limits until the explicit Phase 7 sign-off.

See [docs/ROADMAP.md](docs/ROADMAP.md) and [docs/STATE.md](docs/STATE.md).

## Planned stack

| Area | Choice |
|---|---|
| Desktop | Electron + TypeScript (Windows v1; macOS later) |
| Local index | SQLite + FTS5 |
| Metadata | ExifTool + XMP sidecars (one per RAW+JPG stack; EXIF is read-only) |
| Mobile | Android v1, sharing types/schema with the desktop app |
| Storage | Adapter layer over local disk / NAS / pCloud |

## Repository layout

```
FilmstripApp/
├── README.md
├── LICENSE
├── package.json           pnpm workspace root
├── AGENTS.md              Working conventions for AI agents
├── docs/
│   ├── STATE.md           Current phase, task and safety rules
│   ├── ROADMAP.md         Phases 0-10 and their milestones
│   ├── tasks/             Task board, one file per phase
│   └── adr/               Architecture decision records
├── desktop/               Electron + Vite + React desktop app shell
├── packages/
│   ├── core/              Pure logic (no Electron imports)
│   └── shared/            Shared types and DTOs
└── .github/
    ├── workflows/         CI: lint + typecheck + test on every PR
    └── PULL_REQUEST_TEMPLATE.md
```

## Development

From the repository root:

| Command | What it does |
|---|---|
| `pnpm install` | Install the whole workspace |
| `pnpm dev` | Launch the desktop app (opens the Electron shell) |
| `pnpm build` | Build the desktop app |
| `pnpm lint` | Run ESLint + Prettier checks |
| `pnpm typecheck` | Typecheck every workspace package |
| `pnpm test` | Run the Vitest suite |
| `pnpm check` | lint + typecheck + test — the exact gate CI enforces on every pull request |

`main` is protected: changes land only through pull requests with the `ci` check green and one
approving review.

Internal planning documents (PRD, design notes, API research) are kept outside this public repository for now.

## License

[MIT](LICENSE)
