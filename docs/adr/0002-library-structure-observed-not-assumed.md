# ADR-0002 — The indexer follows the observed library structure, not an assumed year/session tree
Date: 2026-09-06 · Status: Proposed

## Context

The read-only audit of the whole archive in T-0.8 measured what is actually on disk
(3,894 photos in 5,671 files, ~107 GB) and contradicted the "one root, `<Year>/<Session>`
everywhere" model the planning documents started from:

- The archive has **three photo roots** with different shapes: two of them nest sessions under a
  year folder, and the third — the working area, which holds the bulk of the unculled material —
  has **no year level at all**: its five second-level folders are sessions.
- Sessions do not always sit at the same depth: some photos live loose directly inside a year
  folder, and one sits loose at the very root.
- **12 session folders** break the `AA.MM <Name>` naming convention, and **74 photos (1.9 %)**
  have non-canonical file names.
- Names collide across folders: 293 base names appear twice (as JPG+RAW pairs) in two different
  sessions with the same size and the same `DateTimeOriginal`.

If the indexer assumed a fixed depth, it would silently miss the largest root; if it derived
identity from the file name, it would merge distinct photos.

## Options considered

1. **Assume `<root>/<Year>/<Session>` and normalize the archive first.** Rejected: the archive
   cannot be touched before the Phase 7 sign-off, and the app must be usable long before that.
2. **Ask the user to register each session folder manually.** Rejected: 12+ sessions today and
   growing; it moves a data problem onto the user.
3. **Depth-agnostic scan, structure inferred and reported.** The indexer walks the registered
   root to any depth, treats the deepest folder containing photos as the session, records the
   relative path as the identity, and reports anything that does not fit instead of failing.

## Decision

Option 3. The index is built from **observed** structure: relative path is the identity key
(never the bare file name), session = the containing folder, year = derived from capture date
when the folder tree does not provide one, and non-conforming folders/names are surfaced as
findings, not errors. Adding a photo to the index never depends on it being well named or well
placed.

Consequently, Phase 6 (import) writes the canonical layout for *new* material only, and Phase 7
(normalization) is the only place where existing folders and names are changed — always with a
dry-run plan and a reversible, audited execution, session by session, using the T-0.8 output as
its input inventory.

## Consequences
### Positive
- The app works on the archive as it is today, including the largest, least tidy root.
- Duplicate base names across sessions cannot collide in the index.
- The mess is measured and visible (a report), which is what makes Phase 7 planable.

### Negative / what we accept
- The index stores and depends on relative paths, so a move made outside the app looks like a
  delete plus an add until a rescan reconciles it.
- "Session" is a heuristic (deepest folder with photos); odd trees will need manual overrides.
- Year is not always structural, so year-based views must fall back to capture date.
- Phase 7 becomes bigger than a rename pass: it must handle mixed depths and loose photos.
