import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Editor.vue'),
  },
  {
    path: '/landing',
    component: () => import('@/pages/Landing.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/generics/Generics404.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
