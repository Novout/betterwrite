import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'

const pkg = (path: string) =>
  fileURLToPath(new URL(`./packages/${path}`, import.meta.url))

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['**/src/**/*.test.ts'],
    setupFiles: ['packages/app/src/use/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      '@': pkg('app/src'),
      'better-write-types': pkg('types/src/index.ts'),
      'better-write-languages': pkg('languages/src/index.ts'),
      'better-write-plugin-core': pkg('plugin-core/src/index.ts'),
      'better-write-plugin-theme': pkg('plugin-theme/src/index.ts'),
      'better-write-client-storage': pkg('client-storage/src/index.ts'),
      'better-write-contenteditable-ast': pkg('contenteditable-ast/src/index.ts'),
      'better-write-extension': pkg('extension/src/index.ts'),
      'better-write-image-converter': pkg('image-converter/src/index.ts'),
      'better-write-plugin-importer': pkg('plugin-importer/src/index.ts'),
    },
  },
})
