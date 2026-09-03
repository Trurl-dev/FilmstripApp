# Contributing to FilmstripApp

Thanks for your interest in FilmstripApp. This is a personal, single-maintainer project, and external contributions are welcome as long as they respect the project's goals and standards.

By participating in this project you agree to abide by its [Code of Conduct](CODE_OF_CONDUCT.md).

## Project philosophy

- **Open, portable photo library** — the app never hides files inside a proprietary catalog; everything it writes is plain files and open metadata.
- **Excellent graphic design and lightweight use** are first-class requirements, not afterthoughts.
- **Single-user product** — this is not a multiuser or hosted service. Contributions must not assume server-side infrastructure, accounts, or third-party support.

## Getting started

1. Fork the repository (if you are not a member) or create a feature branch from `main`.
2. Make your changes in small, focused commits.
3. Open a pull request against `main`.

## Pull request guidelines

- **One logical change per PR.** If you have several unrelated changes, split them into separate PRs.
- **Write a clear description:** what the change does, why, and how you tested it.
- **Keep commits small and descriptive**, written in English (imperative mood, e.g. "Add thumbnail cache", not "fixed stuff").
- **Do not mix refactors with feature work** in the same PR.
- The maintainer may take time to review — this is a solo project with a deliberate pace. Please be patient and kind.
- Only the maintainer merges to `main`. The main branch is always kept in a working state.

## Code standards

- TypeScript everywhere on the desktop app and shared packages; follow the existing style of the file you touch.
- No secrets, personal data, or private photo-library content ever committed — check `.gitignore` and double-check your diffs.
- Third-party dependencies must carry licenses compatible with this project's MIT license.
- Keep platform-specific code isolated behind the abstraction layers described in the README (storage adapters, shared types/schema for desktop and mobile).

## Reporting issues

- Check existing issues first to avoid duplicates.
- For bugs, include: expected behavior, actual behavior, steps to reproduce, and your environment (OS, app version).
- For feature ideas, explain the workflow problem you are trying to solve, not just the widget you want.

## Reporting security issues

Do **not** open a public issue for security vulnerabilities. Follow the process in [SECURITY.md](SECURITY.md).

## Questions

If you have questions about the roadmap or design decisions, open a discussion instead of a PR so the maintainer can respond without blocking on code.
