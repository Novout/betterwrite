import { useAuthStore } from '@/store/auth'
import { Session } from '@supabase/supabase-js'
import { s } from '../storage/supabase'

export const useDBInitializer = () => {
  const AUTH = useAuthStore()

  const init = () => {
    AUTH.account.user = s.auth.user()

    s.auth.onAuthStateChange((_, session) => {
      AUTH.account.user = (session as Session)?.user || null
    })
  }

  return { init }
}
