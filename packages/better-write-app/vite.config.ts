import { defineConfig, loadEnv } from "vite"
import { resolve, dirname } from 'pathe'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import vue from "@vitejs/plugin-vue"
import vueGlobalComponent  from "unplugin-vue-components/vite"
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers"
import vueI18n from "@intlify/vite-plugin-vue-i18n"
import vuePages from 'vite-plugin-pages'
import { VitePWA as vitePWA } from 'vite-plugin-pwa'
import viteAutoImport from 'unplugin-auto-import/vite'
import { SchemaOrg as viteSchemaOrg } from '@vueuse/schema-org-vite'
import vitePersist from 'vite-plugin-optimize-persist'
import vitePackageAccess from 'vite-plugin-package-config'
import vitePackageVersion from 'vite-plugin-package-version'
import viteSitemap from 'vite-plugin-pages-sitemap'
import viteChecker from 'vite-plugin-checker'
import { viteStdlib } from "./scripts/vite"
import windiCSS from 'vite-plugin-windicss'
import stdLibBrowser from 'node-stdlib-browser'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    base: './',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        ...stdLibBrowser
      },
    },
    optimizeDeps: {
      include: ['buffer', 'process']
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_PROD_DEVTOOLS__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    plugins: [
      vue(),
      vuePages({
        dirs: 'src/pages',
        onRoutesGenerated: routes => (viteSitemap({ 
          hostname: process.env.VITE_BASE_URL as string, 
          filename: 'sitemap',
          routes 
        })),
      }),
      vueI18n({
        include: resolve(dirname(fileURLToPath(import.meta.url)), "./src/lang/**"),
        runtimeOnly: false,
        compositionOnly: false
      }),
      vueGlobalComponent({
        dts: true,
        resolvers: [HeadlessUiResolver()]
      }),
      windiCSS(),
      viteSchemaOrg({
        full: false,
        dts: true,
      }),
      vitePersist(),
      vitePackageAccess(),
      vitePackageVersion(),
      viteStdlib(),
      // @ts-ignore
      viteChecker({ typescript: process.env.DEV, vueTsc: process.env.DEV }),
      viteAutoImport({
        dts: './imports.d.ts',
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'vue-router',
        ]
      }),
      vitePWA({
        base: '/',
        registerType: 'prompt',
        includeAssets: fg.sync('**/*.{png,svg,json,ico,txt,xml,ttf}', { cwd: resolve(__dirname, 'public') }), 
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
              purpose: "any maskable"
            },
            {
              src: 'icon_x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: "any maskable"
            }
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
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                },
              }
            }
          ]
        } 
      })
    ],
    build: {
      outDir: resolve(__dirname, 'dist/render'),
      emptyOutDir: true,
      chunkSizeWarningLimit: 3000, // pdfmake
      minify: 'esbuild',
      rollupOptions: {
        output:{
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    server: {
      fs: {
        strict: false,
      },
      hmr: {
        overlay: false
      }
    },
  });  
}