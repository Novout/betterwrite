# For Developers

Here you will find a detailed guide for the handling and automation of projects by the extension (.bw). If you want to contribute the tool itself, [consult this documentation](./CONTRIBUTING.md).

Before continuing, read about [the application flow](./docs/PROJECT_FLOW.md) to understand a little better how *betterwrite* handles the extension, among other correlations.

## .bw

To access the extension data is very simple:

1. Unzip;
2. Read *data.json*;
3. Parse;
4. Access your target data.

> If you want to use any json or tracing viewers, make sure to remove images (because they are base64 data) for a better experience.

> Mimetype is `application/bw+zip`

## Types

All types are centered in `packages/better-write-types`. If you want to access or change something specific, check the package.

### Configurations

Reactive settings will always be in `editor.*`, and [its reference is here](https://github.com/Novout/betterwrite/blob/main/packages/better-write-types/src/editor.ts).

### Creative

Primary content is available at `project.chapters[].entities[]` where each entity has the values ​​in **raw** and other extra information. Every block of information is treated as **entity** and handled by the index of its position in the list:

#### Structure ContextState (Chapter)

```ts
export type ContextState = {
  id: string
  title: string
  entities: Array<Entity>
  createdAt: string
  updatedAt: string
}
```

#### [Structure Entity](https://github.com/Novout/betterwrite/blob/main/packages/better-write-types/src/context.ts#L110)

```ts
export type Entity = {
  type: EntityType // paragraph | image | line-break | checkbox | ...
  raw: string
  createdAt?: string
  updatedAt?: string
  visual: EntityVisual // css background override (characters system, select...)
  external?: EntityExternal // for custom data (checkbox value, image size...)
}
```

### Annotations

All content can be accessed from `project.annotations[]`. Because the annotations use a tertiary editor ([Milkdown](https://milkdown.dev)), the way to access the specific contents are in the documentation of the editor itself.

### Void

Until this moment, it is not possible to access the void.