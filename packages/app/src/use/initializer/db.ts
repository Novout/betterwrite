import { useAuthStore } from '@/store/auth'
import { s } from '../storage/supabase'

export const useDBInitializer = () => {
  const AUTH = useAuthStore()

  const init = async () => {
    const { data } = await s.auth.getSession()
    
    AUTH.account.user = data.session?.user ?? null

    s.auth.onAuthStateChange((_, session) => {
      if (!session) return

      AUTH.account.user = session.user || null
    })
  }

  return { init }
}
