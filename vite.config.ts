import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vitePersist from 'vite-plugin-optimize-persist'
import vitePackageConfig from 'vite-plugin-package-config'


export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, "./src/lang/**"),
      runtimeOnly: false
    }),
    Components({
      dts: true,
      resolvers: [HeadlessUiResolver()],
    }),
    vitePersist(),
    vitePackageConfig()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
