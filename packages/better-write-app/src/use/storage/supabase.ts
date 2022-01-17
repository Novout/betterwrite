import { useAbsoluteStore } from '@/store/absolute'
import { useAuthStore } from '@/store/auth'
import { createClient } from '@supabase/supabase-js'
import { useNProgress } from '@vueuse/integrations'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useEnv } from '../env'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const s = createClient(supabaseUrl, supabaseAnonKey)

export const useSupabase = () => {
  const ABSOLUTE = useAbsoluteStore()
  const AUTH = useAuthStore()

  const { isLoading } = useNProgress()
  const toast = useToast()
  const { t } = useI18n()
  const env = useEnv()

  const login = (
    provider: 'google' | 'github',
    notification: boolean = true
  ) => {
    isLoading.value = true

    s.auth
      .signIn({ provider }, { redirectTo: env.getCorrectLocalUrl() })
      .then(({ error }) => {
        if (error) throw error

        if (notification) toast(t('editor.auth.login.success'))
      })
      .catch(() => {
        if (notification) toast(t('editor.auth.login.error'))
      })
      .finally(() => {
        isLoading.value = false
        ABSOLUTE.auth.supabase = false
      })
  }

  const out = () => {
    isLoading.value = true

    s.auth
      .signOut()
      .then(() => {
        AUTH.account.user = null
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  return { login, out }
}
