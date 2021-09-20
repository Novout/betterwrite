import { createApp } from 'vue'

import router from './router'
import store from './store'
import i18n from './lang'

import App from './App.vue'

import './tailwind.css'
import './preset.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)

app.mount('#app')
