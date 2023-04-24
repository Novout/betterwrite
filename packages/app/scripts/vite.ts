import inject from '@rollup/plugin-inject'
import { Plugin } from 'vite'

export const viteStdlib = (): Plugin => {
  return {...inject({
    global: [
      require.resolve(
        'node-stdlib-browser/helpers/esbuild/shim'
      ),
      'global'
    ],
    process: [
      require.resolve(
        'node-stdlib-browser/helpers/esbuild/shim'
      ),
      'process'
    ],
    Buffer: [
      require.resolve(
        'node-stdlib-browser/helpers/esbuild/shim'
      ),
      'Buffer'
    ]
  }),
  enforce: 'post'
}}