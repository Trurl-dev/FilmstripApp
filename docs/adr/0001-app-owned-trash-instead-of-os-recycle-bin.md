# ADR-0001 — Deletes go to an app-owned trash folder, never to the OS recycle bin
Date: 2026-09-06 · Status: Accepted (2026-09-06, maintainer approval)

## Context

Phase 0 task T-0.7 tested the Windows recycle-bin API
(`Microsoft.VisualBasic.FileIO.FileSystem::DeleteFile` with `SendToRecycleBin`) on the two
volumes the app will actually run on:

- **Local NTFS disk (sandbox, `FILMSTRIP_SANDBOX_ROOT`)** — the file lands in the recycle bin
  with its original location and can be restored with an identical SHA256.
- **The production library mount (`FILMSTRIP_LIBRARY_ROOT`, a cloud-synced volume reported as
  exFAT / removable)** — the very same call raises **no exception**, the file disappears from
  its origin and **never reaches the recycle bin**: a silent permanent delete.

So the OS recycle bin is not a safety net on the volume that holds the archive; it is a
data-loss trap that reports success. A second finding: restoring a recycle-bin item through the
shell COM verb (`InvokeVerb('restore')`) silently no-ops in headless/automation contexts, so no
restore flow can depend on it.

Deleting photos is the single most destructive thing this app does (safety invariants 1 and 3),
and the mechanism is expensive to change later: it defines the on-disk layout of deleted items,
the restore flow, and the audit log format for every phase from 3 onwards.

## Options considered

1. **OS recycle bin everywhere.** Rejected: verified to delete permanently and silently on the
   production mount, and its restore path is not automatable.
2. **Per-volume strategy** (recycle bin on local NTFS, app trash elsewhere). Rejected as the
   primary design: two code paths, two restore semantics and two audit formats to test, for no
   user-visible gain.
3. **Rely on the cloud provider's own trash.** Rejected as the primary mechanism: it is remote,
   provider-specific, not verifiable offline, and its API validation is Phase 9 work.
4. **App-owned trash folder inside the library.** A delete is a *move* into
   `<library>/.filmstrip/trash/YYYY-MM-DD/` plus a restore manifest.

## Decision

Option 4. Deleting in Filmstrip **always** means moving the whole stack — the photo and every
companion that shares its base name — into `<library>/.filmstrip/trash/YYYY-MM-DD/`, together
with a manifest recording the original relative path of each item, so a restore is a pure
filesystem move driven by data, not by an OS API.

The OS recycle bin is never the app's delete mechanism. It may only ever be offered as an
opt-in extra on volumes verified as fixed local NTFS, and never as the only mechanism.
Emptying the app trash (a real permanent delete) stays an explicit, separate, confirmed action
with a dry-run report, per safety invariant 3.

## Consequences
### Positive
- Deletes are restorable on every volume type, with identical semantics and one code path.
- Restore needs no OS API and works headless; it is testable in the sandbox.
- Trash lives inside the library, so it travels with it and syncs with it.
- Deletes become auditable: the manifest is the audit record.

### Negative / what we accept
- Deleted items keep occupying space in the library (and in the cloud quota) until the trash is
  emptied; retention/emptying needs a UI and a policy.
- `.filmstrip/` becomes part of the library contract: other tools may see it, and it must be
  excluded from indexing.
- Cross-volume libraries would turn a move into a copy+delete; out of scope for v1 (one root).
- A trashed file is no longer where other editors left it, so their own catalogs may show it as
  missing until it is restored.
