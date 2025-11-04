import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'pathe'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import vue from '@vitejs/plugin-vue'
import vueGlobalComponent from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA as vitePWA } from 'vite-plugin-pwa'
import viteAutoImport from 'unplugin-auto-import/vite'
import vitePersist from 'vite-plugin-optimize-persist'
import vitePackageAccess from 'vite-plugin-package-config'
import vitePackageVersion from 'vite-plugin-package-version'
import viteSitemap from 'vite-plugin-sitemap'
import viteChecker from 'vite-plugin-checker'
import { viteStdlib } from './scripts/vite'
import { FontaineTransform as CSSFontaine } from 'fontaine'
import windiCSS from 'vite-plugin-windicss'
import stdLibBrowser from 'node-stdlib-browser'
import { routes } from './src/routes'

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    base: './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        ...stdLibBrowser,
      },
    },
    optimizeDeps: {
      include: ['buffer', 'process'],
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_PROD_DEVTOOLS__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
    plugins: [
      vue(),
      vueGlobalComponent({
        dts: true,
        resolvers: [HeadlessUiResolver()],
      }),
      windiCSS(),
      CSSFontaine.vite({
        fallbacks: [
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
        ],
        resolvePath: (id) => new URL('.' + id, import.meta.url),
      }),
      viteSitemap({
        hostname: process.env.VITE_BASE_URL,
        outDir: 'dist/render',
        dynamicRoutes: routes
          .filter(
            (m) =>
              !m.redirect && m.path !== '/:pathMatch(.*)*' && m.path !== '/',
          )
          .map(({ path }) => path),
        robots: [{ userAgent: '*', allow: '/' }],
      }),
      vitePersist(),
      vitePackageAccess(),
      vitePackageVersion(),
      viteStdlib(),
      // @ts-ignore
      viteChecker({ typescript: process.env.DEV, vueTsc: process.env.DEV }),
      viteAutoImport({
        dts: './imports.d.ts',
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'vue-router'],
      }),
      vitePWA({
        base: '/',
        registerType: 'prompt',
        includeAssets: fg.sync('**/*.{png,svg,json,mp3,ico,txt,xml,ttf}', {
          cwd: resolve(__dirname, 'public'),
        }),
        manifest: {
          name: 'Better Write',
          short_name: 'Better Write',
          description: 'A editor for creative writers.',
          theme_color: '#1F2937',
          categories: ['editor', 'text', 'creative write', 'word processor'],
          icons: [
            {
              src: 'icon_x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable',
            },
            {
              src: 'icon_x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 3145728000,
          sourcemap: false,
          globPatterns: ['**/*.{css,js,html,ico,txt,woff2,ttf,png,svg,json}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
    build: {
      outDir: resolve(__dirname, 'dist/render'),
      emptyOutDir: true,
      chunkSizeWarningLimit: 4000, // pdfmake
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            const splitted = 'node_modules/.pnpm/'

            if (id.includes(splitted)) {
              return id.toString().split(splitted)[1].split('/')[0].toString()
            }
          },
        },
      },
    },
    server: {
      fs: {
        strict: false,
      },
      hmr: {
        overlay: false,
      },
    },
  })
}
