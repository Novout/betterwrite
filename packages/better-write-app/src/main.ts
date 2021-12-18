import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { createEditor } from 'better-write-entity'
import { createPluginCore } from 'better-write-plugin-core'
import { MotionPlugin as motion } from '@vueuse/motion'
import tooltip from 'v-tooltip'
import toast, { POSITION } from 'vue-toastification'
import mitt from 'mitt'
import { VueEmitter } from 'better-write-types'

import router from './router'
import i18n from './lang'

import App from './App.vue'

import './preset.css'
import './tailwind.css'
import 'v-tooltip/dist/v-tooltip.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const head = createHead()
const store = createPinia()
const editor = createEditor()
const core = createPluginCore()
const emitter = mitt()

app.config.globalProperties.emitter = emitter as VueEmitter

app.use(router)
app.use(store)
app.use(i18n)
app.use(motion)
app.use(head)
app.use(editor)
app.use(core)
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

router.isReady().then(() => app.mount('#app'))
