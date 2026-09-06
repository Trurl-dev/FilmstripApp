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

**Phase 0 (foundations) complete — milestone M0, 2026-09-06.** Product requirements are frozen at
v0.4, the toolchain is installed, the governance and agent-memory files are in place, a sandbox
holds a full copy of a real session for testing, and a read-only audit of the whole archive has
been delivered (no write ever touches the real library).

**No application code yet.** Next up: Phase 1 — monorepo scaffolding, Electron shell and green CI.
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
├── AGENTS.md              Working conventions for AI agents
├── docs/
│   ├── STATE.md           Current phase, task and safety rules
│   ├── ROADMAP.md         Phases 0-10 and their milestones
│   ├── tasks/             Task board, one file per phase
│   └── adr/               Architecture decision records
├── .github/               Pull request template
└── (app code — Phase 1)
```

Internal planning documents (PRD, design notes, API research) are kept outside this public repository for now.

## License

[MIT](LICENSE)
