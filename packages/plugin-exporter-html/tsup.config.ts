import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
  external: ['file-saver', 'better-write-types', 'better-write-plugin-core', 'better-write-contenteditable-ast']
})