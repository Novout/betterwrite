import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
  external: [
    '@milkdown/core', 
    '@milkdown/design-system', 
    '@milkdown/plugin-block', 
    '@milkdown/plugin-clipboard', 
    '@milkdown/plugin-cursor', 
    '@milkdown/plugin-emoji',
    '@milkdown/plugin-history', 
    '@milkdown/plugin-indent', 
    '@milkdown/plugin-listener',
    '@milkdown/plugin-math', 
    '@milkdown/plugin-menu', 
    '@milkdown/plugin-slash',
    '@milkdown/plugin-tooltip', 
    '@milkdown/plugin-trailing', 
    '@milkdown/plugin-upload',
    '@milkdown/preset-commonmark', 
    '@milkdown/prose', 
    '@milkdown/theme-pack-helper'
  ]
})
