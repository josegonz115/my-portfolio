# my-portfolio

Portfolio site built with React, TypeScript, and Vite.

## Scripts

- `bun run dev` starts the Vite dev server.
- `bun run build` builds production assets.
- `bun run preview` previews the production build.
- `bun run lint` runs Biome checks (lint + formatting + import organization verification).
- `bun run lint:fix` applies Biome safe fixes and formatting.
- `bun run format` runs Biome formatter in write mode.
- `bun run format:check` checks formatting without writing.
- `bun run precommit:biome` runs the staged-file Biome pre-commit gate.

## Linting and Formatting

This project uses **Biome only** for linting and formatting.

- Configuration: `biome.json`
- CI enforcement: `.github/workflows/biome.yml`

## Git Hooks

Local commit enforcement is powered by Husky.

- Hooks install automatically during `bun install` via the `prepare` script.
- On `git commit`, the pre-commit hook runs Biome on staged files only.
- The hook auto-applies safe Biome fixes/formatting, re-stages touched files, and then verifies checks.

If a commit fails because Biome reports non-auto-fixable issues, run:

- `bun run lint:fix`
- `bun run lint`

Then re-stage your changes and commit again.

## Editor Setup (VS Code)

Install the **Biome** extension (`biomejs.biome`). Workspace settings in `.vscode/settings.json` configure:

- Biome as the default formatter for JS/TS/JSON/CSS files.
- Format on save.
- Biome safe fixes + organize imports on save.
- ESLint disabled to avoid dual-tool conflicts.
