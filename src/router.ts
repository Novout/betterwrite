import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import isElectron from 'is-electron'
import Editor from '@/pages/Editor.vue'
import { defineAsyncComponent } from 'vue'

const electronRoutes = [
  { path: '/', component: Editor },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const webRoutes = [
  {
    path: '/',
    component: defineAsyncComponent(() => import('@/pages/Editor.vue')),
  },
  {
    path: '/landing',
    component: defineAsyncComponent(() => import('@/pages/Landing.vue')),
  },
  {
    path: '/:pathMatch(.*)*',
    component: defineAsyncComponent(() => import('@/pages/404.vue')),
  },
]

export default createRouter({
  history: isElectron() ? createWebHashHistory() : createWebHistory(),
  routes: isElectron() ? electronRoutes : webRoutes,
})
