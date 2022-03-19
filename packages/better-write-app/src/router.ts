import { createRouter, createWebHistory } from 'vue-router'
import { s } from './use/storage/supabase'

const routes = [
  {
    name: 'Main',
    path: '/',
    component: () => import('@/pages/Editor.vue'),
  },
  {
    name: 'Landing',
    path: '/landing',
    component: () => import('@/pages/Landing.vue'),
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    name: 'Plans',
    path: '/plans',
    component: () => import('@/pages/Plans.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/generics/Generics404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if ((to.name === 'Dashboard' || to.name === 'Plans') && !s.auth.user())
    next({ name: 'Main' })

  next()
})

export default router
