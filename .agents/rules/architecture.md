# Project Architecture

## Purpose
Simple rules for building a personal portfolio website with React + TypeScript.

## Project Structure (Required)
The project is a monorepo with the application located in the `site/` directory.

```
site/
├── src/
│   ├── components/     # All React components (UI)
│   ├── data/           # Shared data files (content management)
│   ├── styles/         # CSS variables + globals.css
│   ├── types/          # TypeScript interfaces (types/index.ts)
│   └── utils/          # Shared utilities (navigation, scroll, etc.)
└── package.json        # Vite + Tailwind 4.0 configuration
```

## Build Tool
- **Vite**: Primary build tool. The root delegates scripts to the `site` package using `pnpm --filter`.
- **pnpm**: Exclusive package manager. Use workspace-aware commands (e.g., `pnpm dev` from root).
