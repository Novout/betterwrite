import { createApp } from 'vue'
import { installSchemaOrg } from '@vueuse/schema-org-vite/vite'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { createPluginCore } from 'better-write-plugin-core'
import { Events } from 'better-write-types'
import { PDFPlugin as pdf } from 'vue3-pdfmake'
import { ProviderPlugin as provider } from 'vue-directive-providers'
import { MotionPlugin as motion } from '@vueuse/motion'
import tooltip from 'floating-vue'
import toast, { POSITION } from 'vue-toastification'
import mitt from 'mitt'
import { useEnv } from './use/env'

import router from './router'
import i18n from './lang'

import App from './App.vue'

import 'virtual:windi.css'
import '@milkdown/prose/view/style/prosemirror.css'
import '@milkdown/prose/tables/style/tables.css'
import 'floating-vue/dist/style.css'
import 'vue-toastification/dist/index.css'
import 'better-write-plugin-theme/css/inject.css'

const env = useEnv()

const app = createApp(App)

export const head = createHead()
export const store = createPinia()
export const core = createPluginCore()
export const emitter = mitt<Events>()

app.config.globalProperties.emitter = emitter

app.use(pdf)
app.use(router)
app.use(store)
app.use(i18n)
app.use(motion)
app.use(head)
app.use(core)
app.use(provider)
app.use(tooltip, {
  themes: {
    'better-write': {
      $extend: 'tooltip',
      $resetCss: true,
    },
  },
})
app.use(toast, {
  position: POSITION.TOP_RIGHT,
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

// @ts-ignore
const { t } = i18n.global

if (!env.isDev()) {
  Sentry.init({
    app,
    dsn: env.getSentryDsn(),
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: [env.getProdUrl(), /^\//],
      }),
    ],
    beforeSend(event, _) {
      if (event.exception) {
        Sentry.showReportDialog({
          eventId: event.event_id,
          // @ts-ignore
          title: t('plugin.sentry.errorWidget.title'),
          // @ts-ignore
          subtitle: t('plugin.sentry.errorWidget.subtitle'),
          // @ts-ignore
          subtitle2: t('plugin.sentry.errorWidget.subtitle2'),
          // @ts-ignore
          labelName: t('plugin.sentry.errorWidget.labelName'),
          // @ts-ignore
          labelEmail: t('plugin.sentry.errorWidget.labelEmail'),
          // @ts-ignore
          labelComments: t('plugin.sentry.errorWidget.labelComments'),
          // @ts-ignore
          labelClose: t('plugin.sentry.errorWidget.labelClose'),
          // @ts-ignore
          labelSubmit: t('plugin.sentry.errorWidget.labelSubmit'),
          // @ts-ignore
          errorGeneric: t('plugin.sentry.errorWidget.errorGeneric'),
          // @ts-ignore
          errorFormEntry: t('plugin.sentry.errorWidget.errorFormEntry'),
          // @ts-ignore
          successMessage: t('plugin.sentry.errorWidget.successMessage'),
        })
      }

      return event
    },
    logErrors: true,
    tracesSampleRate: 0.5,
    trackComponents: true,
    hooks: ['activate', 'mount', 'update', 'destroy', 'create'],
  })
}

installSchemaOrg(
  { app, router },
  {
    canonicalHost: env.getProdUrl() as `https://${string}`,
    defaultLanguage: 'pt-BR',
  }
)

router.isReady().then(() => app.mount('#app'))
