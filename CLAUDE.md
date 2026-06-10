# betterwrite — CLAUDE.md

## Project Overview

**Better Write** is a 100% client-side creative word processor built as a Vue 3 + TypeScript monorepo. There is no backend — all data lives in the browser (IndexedDB). Exports (PDF, DOCX, HTML, TXT, EPUB) are generated entirely in the browser. The project is deployed as a PWA at betterwrite.io.

## Monorepo Structure

Managed with **pnpm workspaces** + **Lerna** + **Nx** (task caching).

```
packages/
  app/                    # Main Vue 3 SPA — the entry point for everything
  better-write-types/     # Shared TypeScript types — check here first before defining new types
  contenteditable-ast/    # Custom AST for the entity-model text editor
  client-storage/         # IndexedDB abstraction layer
  extension/              # .bw file format (ZIP + data.json)
  plugin-*/               # Feature plugins (characters, theme, shortcuts, voice, etc.)
  plugin-exporter-*/      # Export generators (pdf, docx, html, txt, epub)
  plugin-importer/        # File import handling
  google-fonts-api/       # Google Fonts integration
  color-converter/        # Color utility
  image-converter/        # Image processing
  languages/              # i18n translation files
```

## Key Architecture Concepts

### Entity Model
The document is not stored as raw HTML. Content is a tree of **entities** (paragraphs, headings, images, page breaks, etc.), each with a `type`, `raw` text, and optional visual overrides. See `packages/better-write-types` and `docs/ENTITY_MODEL.md`.

### Plugin System
Plugins receive three injection points: `emitter` (mitt event bus), `stores` (Pinia), and `hooks` (lifecycle). All plugins initialize in `packages/app/src/App.vue`. When adding a feature, check whether it belongs in an existing plugin or as a new `plugin-*` package. See `docs/PLUGIN_SYSTEM.md`.

### State Management
Pinia stores live in `packages/app/src/store/`. There are ~14 stores. Prefer composables in `packages/app/src/use/` over direct store access in components.

### Export Pipeline
Each export format is a separate `plugin-exporter-*` package. Generators receive the entity tree and produce browser-downloadable output. See `docs/GENERATOR_FLOW.md`.

### .bw Extension Format
Project files saved as `.bw` are a ZIP archive containing `data.json`. Handled by `packages/extension/`. See `docs/PROJECT_FLOW.md`.

## Development Setup

```bash
# Install dependencies
pnpm install

# Start dev server (port 3000)
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Format code
pnpm lint
```

Requires a `.env.local` file in `packages/app/` — copy from `.env.example`.

Node 16+ and pnpm 8+ required.

## Coding Conventions

- **TypeScript strict mode** — no `any` without justification.
- **No semicolons**, **single quotes**, **2-space indent** (Prettier enforced).
- **Conventional Commits** required: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `ci:`.
- **Vue 3 Composition API** — use `<script setup>` syntax exclusively, no Options API.
- **Windi CSS** for styling — utility-first, custom `wb-*` shortcuts defined in `packages/app/windi.config.ts`. Do not add raw inline styles.
- CSS custom properties drive theming; never hardcode colors directly.
- i18n keys for all user-facing strings — translations live in `packages/languages/`.

## Versioning

Versioning uses `generi` via conventional commits:

```bash
pnpm patch   # patch bump
pnpm minor   # minor bump
pnpm major   # major bump
```

Do not manually edit version fields in `package.json` or `lerna.json`.

## Testing

Tests use **Vitest** with `happy-dom`. Run with `pnpm test`. Tests live alongside source files or in `__tests__/` subdirectories within packages. Keep tests focused on pure logic (generators, AST transforms, utilities) — do not test Vue component internals directly.

## Important Constraints

- **No server-side code.** Everything must run in the browser. Avoid Node-only APIs.
- **No new direct `localStorage` usage.** Use the `client-storage` package (IndexedDB-backed) to avoid the 10 MB limit.
- **Nx caches build outputs** in `dist/**`. If builds seem stale, run `pnpm build` from root to let Nx decide what to rebuild.
- **Shameful hoisting is enabled** in pnpm — shared deps may hoist unexpectedly; prefer explicit imports from the package that owns the type.
- The app targets **ESNext** — no need for legacy polyfills except where explicitly noted in `vite.config.ts`.

## Where to Look First

| Question | Where to look |
|---|---|
| Shared types | `packages/better-write-types/src/` |
| App routing | `packages/app/src/routes.ts` |
| Global events | `packages/better-write-types/src/` → `Events` interface |
| Pinia stores | `packages/app/src/store/` |
| Composables | `packages/app/src/use/` |
| Theme tokens | `packages/plugin-theme/` + `packages/app/windi.config.ts` |
| Export logic | `packages/plugin-exporter-*/` |
| i18n strings | `packages/languages/` |
| Plugin init | `packages/app/src/App.vue` |
