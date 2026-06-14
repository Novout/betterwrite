import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['**/src/**/*.test.ts'],
    setupFiles: ['packages/app/src/use/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./packages/app/src', import.meta.url)),
    },
  },
})
