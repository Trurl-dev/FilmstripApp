# ADR-0006 — main is protected: every change via PR, one review, strict ci, admins included
Date: 2026-09-08 · Status: Proposed

## Context

T-1.9 protected `main` on the public repository. The whole Phase 1 quality gate — CI running
install → lint → typecheck → test on windows-latest — only executes on pull requests; a direct
push skips it entirely. The project's workflow is agent-driven: an agent pushes a branch and
opens a PR, and the human maintainer reviews and merges. For a single-maintainer repository the
interesting question is whether the maintainer's own admin powers bypass the rules.

## Options considered

1. **No branch protection (trust + convention).** Fastest, but CI never runs on direct pushes
   and history can be force-rewritten; the governance rules in AGENTS.md would be unenforced
   words.
2. **Protection without `enforce_admins`.** Rejects direct pushes from non-admins, but the only
   maintainer is an admin — in practice it would protect nothing.
3. **Protection with `enforce_admins`:** required status check `ci` (strict — the branch must
   be up to date with `main`), one approving review, force pushes disabled, changes land only
   via pull requests.

## Decision

Option 3, applied via the GitHub branches API in T-1.9 and verified active:
`required_status_checks` strict with context `ci`, `required_approving_review_count` 1,
`enforce_admins` enabled, `allow_force_pushes` disabled. `.github/CODEOWNERS` names the
maintainer as the default owner.

## Consequences
### Positive
- Every change that lands on `main` was CI-checked and reviewed — including the maintainer's
  own.
- No force-push history rewrites; `main` is a trustworthy base for phase tags.
- The agent workflow (branch → PR → human merge) is enforced by the platform, not by
  convention.

### Negative / what we accept
- The maintainer **cannot self-approve**: GitHub blocks approvals by the PR author, so every PR
  — including agent PRs — needs one approval from a second account, or the review requirement
  must be temporarily relaxed for that merge.
- Strict checks mean a PR must be refreshed whenever `main` moves before it can merge.
- Trivial documentation fixes pay the same toll as code changes.
