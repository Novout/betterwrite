import { createRouter, createWebHistory } from 'vue-router'
import { s } from './use/storage/supabase'
import { routes } from './routes'
import { useNetwork } from '@vueuse/core'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeResolve((to, from, next) => {
  const user = s.auth.user()
  const url = window.location.href
  const token = url.includes('access_token')
  const isOnline = useNetwork().isOnline.value

  if (to.name === 'Landing' && token) {
    next({ name: 'Main' })

    return
  }

  if (to.name === 'Main' && !user && !token && isOnline) {
    next({ name: 'Landing' })

    return
  }

  if ((to.name === 'Dashboard' || to.name === 'Plans') && !user) {
    next({ name: 'Landing' })

    return
  }

  if (to.name === 'Landing' && user) {
    next({ name: 'Main' })

    return
  }

  next()
})

export default router
