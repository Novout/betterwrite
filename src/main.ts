import { createApp } from 'vue'
import vfmPlugin from 'vue-final-modal'
import Toast, { POSITION } from 'vue-toastification'

import router from './router'
import store from './store'
import i18n from './lang'

import App from './App.vue'

import './preset.css'
import './tailwind.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)
app.use(vfmPlugin)
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 2000,
  maxToasts: 3,
})

router.isReady().then(() => app.mount('#app'))
