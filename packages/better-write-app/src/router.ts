import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './store/auth'

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
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/generics/Generics404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const AUTH = useAuthStore()

  if (to.name === 'Dashboard' && !AUTH.account.user) next({ name: 'Main' })
  else next()
})

export default router
