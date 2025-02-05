import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useNetwork } from '@vueuse/core'
import { useAuthStore } from './store/auth'
import { useEnv } from './use/env'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeResolve(async (to, from, next) => {
  const AUTH = useAuthStore()

  const env = useEnv()
  const user = localStorage?.getItem('visited') || false
  const url = window.location.href
  const token = url.includes('access_token')
  const isOnline = useNetwork().isOnline.value

  if (to.name === 'Landing' && token && !env.isDev()) {
    next({ name: 'Main' })

    return
  }

  if (to.name === 'Main' && !user && isOnline) {
    next({ name: 'Landing' })

    return
  }

  if (to.name === 'Plans' && !user) {
    next({ name: 'Landing' })

    return
  }

  if (to.name === 'Landing' && user && !env.isDev()) {
    next({ name: 'Main' })

    return
  }

  next()
})

export default router
