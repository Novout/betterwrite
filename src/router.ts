import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import isElectron from 'is-electron'
import Editor from '@/pages/Editor.vue'
import Loading from '@/pages/generics/GenericsLoading.vue'
import { defineAsyncComponent } from 'vue'

const electronRoutes = [
  { path: '/', component: Editor },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const webRoutes = [
  {
    path: '/',
    component: defineAsyncComponent({
      loader: () => import('@/pages/Editor.vue'),
      loadingComponent: Loading,
    }),
  },
  {
    path: '/landing',
    component: defineAsyncComponent({
      loader: () => import('@/pages/Landing.vue'),
      loadingComponent: Loading,
    }),
  },
  {
    path: '/:pathMatch(.*)*',
    component: defineAsyncComponent(
      () => import('@/pages/generics/Generics404.vue')
    ),
  },
]

export default createRouter({
  history: isElectron() ? createWebHashHistory() : createWebHistory(),
  routes: isElectron() ? electronRoutes : webRoutes,
})
