# Roadmap

Public roadmap for FilmstripApp — see README for the product overview.

- Phase 0 — Foundations: environment, governance, sandbox, audit → M0 ✅ **complete (2026-09-06)**
- Phase 1 — Monorepo scaffolding + green CI → M1
- Phase 2 — Headless data core (index, EXIF, XMP, stacks, cache) → M2
- Phase 3 — Data safety & interoperability (companions, trash) → M3
- Phase 4 — DESIGN + UI shell → M4
- Phase 5 — MVP review / culling (first real use) → M5
- Phase 6 — Import & session creation → M6
- Phase 7 — Normalize existing archive → M7
- Phase 8 — Search, filters, tags, batches → M8
- Phase 9 — pCloud API + Android sidecar (v1.1) → M9
- Phase 10 — v2/v3 (checksum, audit UI, map, timeline, macOS/iOS) → M10

Current status: **Phase 0 complete — milestone M0 reached** (toolchain installed, governance and
agent-memory files in place, sandbox with a full copy of a real session, read-only audit of the
whole archive delivered, recycle-bin semantics of the library mount verified). No application
code yet.

Next: **Phase 1 — monorepo scaffolding + green CI**, starting with T-1.1. See docs/STATE.md.
