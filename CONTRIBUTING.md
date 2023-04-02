# Getting Started

To contribute to the project, install the following dependencies:

- [Git](https://git-scm.com/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Node 16](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

## Fork Repository

- Fork the repo.
- Clone your repository:

```bash
git clone https://github.com/<username>/betterwrite
```

- Go to **better-write-app**.

- Copy and Paste `.env.local.example` to `.env.local` and set keys.

> Development API keys are not available. If you want to use the API's, create a key for each item.

- Run:

```bash
yarn

yarn bootstrap

yarn dev
```

> Check **package.json** to other commands.

> For production build run, instead `yarn dev` uses `yarn preview`.

## Conventions

- Read [Code of Conduct](./CODE_OF_CONDUCT.md)

- Strictly follow the commit pattern provided by [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

- Every branch must initialize with `<conventional-commits-prefix>/*` and its PR must be directed to the `develop` branch

- Sync our branch.

# Contributing to Translation

All translation files are available in `packages/better-write-languages`. To contribute, just follow the same structure as the other translations.

# Contributing to Plugin Monorepos

Each plugin is a monorepo and called in `packages/better-write-app/src/App.vue`. Register [the events in PluginEmitterName](https://github.com/Novout/betterwrite/blob/main/packages/better-write-types/src/plugin/core.ts), [editor funcions here](https://github.com/Novout/betterwrite/blob/main/packages/better-write-plugin-core/src/on.ts) and insert functions with the following callback:

```ts
export const PluginExampleSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  // ...
}
```

Initialize plugins with:

```ts
export const ExamplePlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'example' }, [PluginExampleSet])
```

- `better-write-plugin-` as necessary prefix in folder and named in *package.json*

> **ATTENTION! The plugin system is not finished yet and may undergo drastic changes in its structure.**

> Until this moment, it is not possible to register plugins outside the monorepo.

# Contributing to Custom Themes

- All styles must be inserted into `better-write-plugin-theme`

- Theme registration must be done by hand in the files in `better-write-plugin-theme/src`

- If you register a copyrighted theme, give due credit.