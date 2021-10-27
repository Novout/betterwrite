import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vitePersist from 'vite-plugin-optimize-persist'
import vitePackageAccess from 'vite-plugin-package-config'
import vitePackageVersion from 'vite-plugin-package-version'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueI18n({
      include: resolve(__dirname, "./src/lang/**"),
      runtimeOnly: false
    }),
    Components({
      dts: true,
      resolvers: [HeadlessUiResolver()],
    }),
    vitePersist(),
    vitePackageAccess(),
    vitePackageVersion()
  ],
  build: {
    outDir: resolve(__dirname, 'dist/render'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000, // pdfmake
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
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
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
