import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  base: '/better-write/',

  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [HeadlessUiResolver()],
    }),
    vueI18n({
      include: path.resolve(__dirname, "./src/lang/**"),
      runtimeOnly: false
    }),
    eslintPlugin(),
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

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'vuex',
      'vue-i18n',
      'vue-final-modal',
      'vue-toastification',
      '@headlessui/vue',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
});
