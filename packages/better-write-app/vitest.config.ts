/// <reference types="vitest" />

import { resolve } from "path"
import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue"
import vueGlobalComponent  from "unplugin-vue-components/vite"
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers"
import vueI18n from "@intlify/vite-plugin-vue-i18n"
import { VitePWA as vitePWA } from 'vite-plugin-pwa'
import vitePersist from 'vite-plugin-optimize-persist'
import vitePackageAccess from 'vite-plugin-package-config'
import vitePackageVersion from 'vite-plugin-package-version'

export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: resolve(__dirname, "./src/lang/**"),
      runtimeOnly: false
    }),
    vueGlobalComponent({
      dts: true,
      resolvers: [HeadlessUiResolver()],
    }),
    vitePersist(),
    vitePackageAccess(),
    vitePackageVersion(),
    vitePWA({
      base: '/',
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  
      manifest: {
        name: 'Better Write',
        short_name: 'Better Write',
        description: 'A editor for creative writers.',
        theme_color: '#1F2937',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      },
      workbox: {
        sourcemap: false  
      } 
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: [
      './test/setup.ts',
    ],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})