import { createRouter, createWebHistory } from 'vue-router'
import { s } from './use/storage/supabase'

const routes = [
  {
    name: 'Landing',
    path: '/',
    component: () => import('@/pages/Landing.vue'),
  },
  {
    name: 'Main',
    path: '/editor',
    component: () => import('@/pages/Editor.vue'),
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
    name: 'Terms of Use',
    path: '/terms-of-use',
    component: () => import('@/pages/TermsOfUse.vue'),
  },
  {
    name: 'Support',
    path: '/support',
    component: () => import('@/pages/Support.vue'),
  },
  {
    name: 'Questions',
    path: '/questions',
    component: () => import('@/pages/Questions.vue'),
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
  if ((to.name === 'Dashboard' || to.name === 'Plans') && !s.auth.user()) {
    next({ name: 'Landing' })

    return
  }

  next()
})

export default router
