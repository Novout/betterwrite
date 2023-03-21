import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useNetwork } from '@vueuse/core'
import { useAuthStore } from './store/auth'
import { getSupabaseUser } from './use/storage/supabase'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeResolve(async (to, from, next) => {
  const AUTH = useAuthStore()

  const user =  AUTH.account.user ?? await getSupabaseUser() ?? null
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
