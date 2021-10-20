import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import isElectron from 'is-electron'
import Landing from '@/pages/Landing.vue'
import Editor from '@/pages/Editor.vue'
import ErrorPage from '@/pages/404.vue'

const electronRoutes = [
  { path: '/', component: Editor },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const webRoutes = [
  { path: '/', component: Editor },
  { path: '/landing', component: Landing },
  { path: '/:pathMatch(.*)*', component: ErrorPage },
]

export default createRouter({
  history: isElectron() ? createWebHashHistory() : createWebHistory(),
  routes: isElectron() ? electronRoutes : webRoutes,
})
