# Phase 0 — Foundations

Environment, governance, sandbox, audit. All tasks target milestone **M0**.

### [x] T-0.1 — Install ExifTool
- **Goal:** Install ExifTool.
- **Acceptance criteria:** `exiftool -ver` prints a version ≥ 12, and it reads .RAF/.ARW/.RW2 metadata.
- **DONE:** 2026-09-04

### [x] T-0.2 — Enable pnpm via corepack
- **Goal:** Enable pnpm via corepack.
- **Acceptance criteria:** `pnpm -v` responds.
- **DONE:** 2026-09-04

### [x] T-0.3 — Create the private internal repo (filmstrip-internal) with the internal documents
- **Goal:** Create the private internal repo (filmstrip-internal) with the internal documents.
- **Acceptance criteria:** git log shows the commit; gh repo view lists it as private.
- **DONE:** 2026-09-05

### [ ] T-0.4 — Governance & memory scaffolding
- **Milestone:** M0 · **Size:** M · **Model:** low
- **Files:** docs/STATE.md, docs/ROADMAP.md, docs/tasks/PHASE-0.md,
            docs/adr/0000-template.md, .github/PULL_REQUEST_TEMPLATE.md
- **Goal:** create the memory & governance scaffolding files.
- **Acceptance criteria:** the files exist on a branch; a PR is open.
- **Verify with:** git status shows the new files; gh pr view shows the PR open.

### [x] T-0.5 — Update AGENTS.md with the safety invariants, memory system, and "never edit the PRD" policy
- **Goal:** Update AGENTS.md with the safety invariants, memory system, and "never edit the PRD" policy.
- **Acceptance criteria:** AGENTS.md ≤ 150 lines.
- **DONE:** 2026-09-04

### [x] T-0.6 — Create the sandbox
- **Goal:** Create the sandbox: copy session 26.08 Guatemala into $env:FILMSTRIP_SANDBOX_ROOT\library\ plus ~30 varied fixtures in $env:FILMSTRIP_SANDBOX_ROOT\fixtures\ with a README.
- **Acceptance criteria:** file count matches the source; fixtures\README.md exists.
- **DONE:** 2026-09-05

### [ ] T-0.7 — Empirically verify the recycle-bin semantics on the production library mount (PRD-8)
- **Goal:** Empirically verify the recycle-bin semantics on the production library mount (PRD-8).
- **Acceptance criteria:** one-page report in audits/ with the result and recommendation. This decides the delete design.

### [ ] T-0.8 — Full library audit (read-only script)
- **Goal:** Full library audit (read-only script).
- **Acceptance criteria:** report answers how many photos, from which cameras, how many need renaming, how many edge cases.

### [x] T-0.9 — Apply approved PRD deltas → PRD v0.4
- **Goal:** Apply approved PRD deltas → PRD v0.4.
- **DONE:** 2026-09-04
