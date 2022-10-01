import { createRouter, createWebHistory } from 'vue-router'
import { s } from './use/storage/supabase'
import { routes } from './routes'

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
