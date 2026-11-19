import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
  // Milkdown must be a single instance shared with the app (ctx slices are
  // identity-based), so never bundle it into the plugin.
  external: [/^@milkdown\//],
})
