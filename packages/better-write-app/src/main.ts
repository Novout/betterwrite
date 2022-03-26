import { createApp } from 'vue'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { createPluginCore } from 'better-write-plugin-core'
import { MotionPlugin as motion } from '@vueuse/motion'
import tooltip from 'v-tooltip'
import toast, { POSITION } from 'vue-toastification'
import mitt from 'mitt'
import { VueEmitter } from 'better-write-types'
import { useEnv } from './use/env'

import router from './router'
import i18n from './lang'

import App from './App.vue'

import 'virtual:windi.css'
import 'better-write-plugin-theme/css/inject.css'
import 'v-tooltip/dist/v-tooltip.css'
import 'vue-toastification/dist/index.css'

const env = useEnv()

const app = createApp(App)

export const head = createHead()
export const store = createPinia()
export const core = createPluginCore()
export const emitter = mitt()

app.config.globalProperties.emitter = emitter as VueEmitter

app.use(router)
app.use(store as any)
app.use(i18n)
app.use(motion as any)
app.use(head)
app.use(core as any)
app.use(tooltip, {
  themes: {
    'better-write': {
      $extend: 'tooltip',
      $resetCss: true,
    },
  },
})
app.use(toast, {
  position: POSITION.TOP_CENTER,
  timeout: 4000,
  maxToasts: 3,
})

useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update()
      }, 60 * 30 * 1000)
  },
})

Sentry.init({
  app,
  dsn: env.getSentryDsn(),
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', env.getProdUrl(), /^\//],
    }),
  ],
  logErrors: true,
  tracesSampleRate: 1.0,
})

router.isReady().then(() => app.mount('#app'))
