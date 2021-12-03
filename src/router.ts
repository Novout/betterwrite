import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import Loading from '@/pages/generics/GenericsLoading.vue'

const routes = [
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
  history: createWebHistory(),
  routes: routes,
})
