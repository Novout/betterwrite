# Better Write — Discord Presence (PreMiD)

Shows what you are writing on your Discord profile:

| Project type | Discord shows |
|---|---|
| Creative | `✍️ <chapter title>` · `<project> · Chapter 2/12 · 3,450 words` |
| Blank | `✍️ <nearest heading above the caret>` · `<project> · 820 words` |
| Annotations | `Editing annotations` · `<project>` |

## How it works

Browsers cannot talk to the Discord client directly, so the integration is
split in two:

1. **App** (`packages/app/src/use/presence.ts`): while a project is open, the
   editor writes its state as JSON into
   `<meta name="betterwrite:presence">` (debounced, 1s). Disabling
   *Preferences → Configuration → Discord Presence* removes the tag.
2. **PreMiD activity** (`Better Write/`): read by the
   [PreMiD](https://premid.app) browser extension + desktop app, which
   forwards it to Discord.

The payload is versioned (`v: 1`). Keep `presence.ts` in sync with
`PresencePayload` if the shape changes.

## Publishing

1. Create a Discord application at
   <https://discord.com/developers/applications> and put its ID in
   `clientId` (`presence.ts`).
2. Fill `author.id` / `author.name` in `metadata.json`.
3. Copy `Better Write/` to `websites/B/Better Write/` in a fork of
   [PreMiD/Activities](https://github.com/PreMiD/Activities) and open a PR.

To test locally before publishing, use the PreMiD CLI (`npx pmd`) from the
Activities repo and load the activity in developer mode.
