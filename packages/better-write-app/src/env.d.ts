/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_PROJECT_EMPTY: string
  readonly VITE_LOCAL_STORAGE: string
  readonly VITE_EMPTY_LINE: string
  readonly VITE_LINE_BREAK: string
  readonly VITE_PAGE_BREAK: string
  readonly VITE_INITIAL_LOAD: string
  readonly VITE_BASE_URL: string

  readonly VITE_GOOGLE_FONTS_KEY: string
  readonly VITE_GOOGLE_FONTS_MAX_FONTS: number

  readonly VITE_DROPBOX_APP_KEY: string

  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string

  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SENTRY_DSN: string

  readonly VITE_BEGINEER_LIMIT: number
  readonly VITE_INTERMEDIATE_LIMIT: number
  readonly VITE_ADVANCED_LIMIT: number
  readonly VITE_CUSTOM_LIMIT: number
  readonly VITE_UNLIMITED_LIMIT: number

  readonly VITE_LIVEBLOCKS_PUBLIC: string
  readonly VITE_LIVEBLOCKS_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'virtual:pwa-register/vue' {
  // @ts-ignore ignore when vue is not installed
  import type { Ref } from 'vue'

  export type RegisterSWOptions = {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
    onRegisterError?: (error: any) => void
  }

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: Ref<boolean>
    offlineReady: Ref<boolean>
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>
  }
}

declare module '@heroicons/vue'
declare module 'keyboardjs'
declare module 'pdfmake/build/pdfmake.js'
declare module 'node-fetch'
declare module 'v-tooltip'
declare module 'file-saver'
