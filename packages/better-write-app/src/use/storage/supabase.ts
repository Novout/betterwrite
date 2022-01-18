import { useAbsoluteStore } from '@/store/absolute'
import { useAuthStore } from '@/store/auth'
import { createClient } from '@supabase/supabase-js'
import { useNProgress } from '@vueuse/integrations'
import { ProjectObject, Maybe } from 'better-write-types'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useEnv } from '../env'
import { useProject } from '../project'
import { useLocalStorage } from './local'
import { useStorage } from './storage'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const s = createClient(supabaseUrl, supabaseAnonKey)

export const useSupabase = () => {
  const ABSOLUTE = useAbsoluteStore()
  const AUTH = useAuthStore()

  const { isLoading } = useNProgress()
  const toast = useToast()
  const { t } = useI18n()
  const env = useEnv()
  const storage = useStorage()
  const project = useProject()
  const local = useLocalStorage()
  const router = useRouter()

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

  const getProjects = async (): Promise<Maybe<ProjectObject[]>> => {
    try {
      isLoading.value = true

      const {
        data: projects,
        error,
        status,
      } = await s
        .from('projects')
        .select(`id, logger, pdf, project, editor`)
        // @ts-ignore
        .eq('id_user', AUTH.account.user.id)

      if (error && status !== 406) throw error

      if (projects) {
        return projects
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      isLoading.value = false
    }
  }

  const saveProject = async () => {
    isLoading.value = true

    const { data, error } = await s.from('projects').upsert(
      {
        // @ts-ignore
        id_user: AUTH.account.user.id,
        ...storage.getProjectObject(),
      },
      { onConflict: 'id' }
    )

    isLoading.value = false

    if (error) {
      toast.error(error.message)

      return
    }

    toast.success(t('toast.project.save'))

    if (data) {
      AUTH.account.project_id_activity = data[0].id || null
    }
  }

  const loadProject = (context: ProjectObject) => {
    AUTH.account.project_id_activity = context.id || null

    storage.normalize().then(() => {
      project.onLoadProject(context, false).then(() => {
        local.onSaveProject(false).then(() => {
          router.push('/')
        })
      })
    })
  }

  return { login, out, getProjects, saveProject, loadProject }
}
