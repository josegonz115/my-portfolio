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

## Linting and Formatting

This project uses **Biome only** for linting and formatting.

- Configuration: `biome.json`
- CI enforcement: `.github/workflows/biome.yml`

## Editor Setup (VS Code)

Install the **Biome** extension (`biomejs.biome`). Workspace settings in `.vscode/settings.json` configure:

- Biome as the default formatter for JS/TS/JSON/CSS files.
- Format on save.
- Biome safe fixes + organize imports on save.
- ESLint disabled to avoid dual-tool conflicts.
