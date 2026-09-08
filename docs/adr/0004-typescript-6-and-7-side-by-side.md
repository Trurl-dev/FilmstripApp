# ADR-0004 — TypeScript 6 and 7 side by side: type-aware linting on 6, CLI typecheck on 7
Date: 2026-09-08 · Status: Proposed

## Context

The project typechecks with **TypeScript 7** (the native compiler, 7.0.2 — `pnpm typecheck`
runs `tsc --noEmit`, `tsc --version` → `Version 7.0.2`), adopted in T-1.2 for its speed on a
codebase that a hundred tasks will grow. But **typescript-eslint (8.69) cannot run on TS 7.0**:
the native compiler does not yet expose the stable programmatic API the linter needs; support
is expected with TS 7.1. T-1.6 required type-aware rules (`no-floating-promises`,
`consistent-type-imports`, …) — the point of the Phase 1 safety belt is that lint **and**
typecheck run on every pull request.

## Options considered

1. **TypeScript 6 only** (one compiler for lint and typecheck). Simplest, but gives up the
   TS 7 native speedup for every future session.
2. **TypeScript 7 only.** Fast typecheck, but no type-aware linting until 7.1 ships and
   typescript-eslint supports it — an unbounded wait.
3. **Side by side:** the `typescript` package is aliased to `@typescript/typescript6` (a TS 6
   build with the stable programmatic API; `tsc6 --version` → 6.0.3), so typescript-eslint
   resolves TS 6, while the `typescript7` alias resolves `typescript@7.0.2` and its `tsc` bin
   drives `pnpm typecheck`.

## Decision

Option 3, approved by the maintainer during T-1.6. Both gates stay green and are enforced in
CI: `pnpm lint` (ESLint, type-aware, on TS 6) and `pnpm typecheck` (TS 7 native, every
workspace package).

## Consequences
### Positive
- Type-aware linting today and native-compiler typecheck today; nothing waits on upstream.
- CI proves on every pull request that both compilers accept the same source.

### Negative / what we accept
- Two compiler versions must accept the same codebase until they converge; a lint rule and a
  compiler diagnostic may occasionally disagree.
- `tsc` means TS 7 and `tsc6` means TS 6 — agents and contributors must not mix them up.
- This is a temporary bridge: collapse it back to a single compiler once typescript-eslint
  supports TS 7.1+.
