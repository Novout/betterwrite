import inject from '@rollup/plugin-inject'
import { createRequire } from 'node:module'
import type { Plugin } from 'vite'

const require = createRequire(import.meta.url)

const shim = require.resolve('node-stdlib-browser/helpers/esbuild/shim')

/**
 * Node globals (`global`, `process`, `Buffer`) required by some dependencies
 * (docx, pdfmake, epub-gen3...).
 *
 * Same map for both environments:
 *  - build: Rolldown's native `transform.inject` (faster, no plugin)
 *  - dev:   `@rollup/plugin-inject`, since Oxc (dev transform) has no inject
 */
export const stdlibInject: Record<string, [string, string]> = {
  global: [shim, 'global'],
  process: [shim, 'process'],
  Buffer: [shim, 'Buffer'],
}

export const viteStdlib = (): Plugin => {
  return {
    ...inject(stdlibInject),
    name: 'better-write:stdlib-inject',
    apply: 'serve',
    enforce: 'post',
  }
}

/**
 * WindiCSS preflight emits vendor pseudo-elements without the leading dash
 * (`::moz-focus-inner`, `::webkit-input-placeholder`). They are invalid CSS
 * (browsers ignore them) and LightningCSS (Vite 8 minifier) warns about them.
 * Fix the selectors so the reset actually applies.
 */
export const viteFixWindiPreflight = (): Plugin => {
  const invalid = /::(moz|webkit|ms)-([a-z-]+)/g

  return {
    name: 'better-write:fix-windi-preflight',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.css($|\?)/.test(id) || !invalid.test(code)) return

      invalid.lastIndex = 0

      return { code: code.replace(invalid, '::-$1-$2'), map: null }
    },
  }
}
