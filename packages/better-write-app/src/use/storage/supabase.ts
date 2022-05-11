import { useAbsoluteStore } from '@/store/absolute'
import { useAuthStore } from '@/store/auth'
import { createClient } from '@supabase/supabase-js'
import {
  ProjectObject,
  Maybe,
  AccountPlan,
  SupabaseIntegrations,
} from 'better-write-types'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useEnv } from '../env'
import { useFormat } from '../format'
import { useProject } from '../project'
import { useUtils } from '../utils'
import { useLocalStorage } from './local'
import { useStorage } from './storage'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const s = createClient(supabaseUrl, supabaseAnonKey)

export const useSupabase = () => {
  const ABSOLUTE = useAbsoluteStore()
  const AUTH = useAuthStore()

  const toast = useToast()
  const { t } = useI18n()
  const env = useEnv()
  const storage = useStorage()
  const project = useProject()
  const local = useLocalStorage()
  const router = useRouter()
  const format = useFormat()
  const utils = useUtils()

  const loginWithEmailAndPassword = (
    { email, password }: { email: string; password: string },
    notification: boolean = true
  ) => {
    return new Promise((res) => {
      s.auth
        .signIn(
          {
            email,
            password,
          },
          { redirectTo: env.getCorrectLocalUrl() }
        )
        .then(async ({ error }) => {
          if (error) {
            if (notification) toast(t('editor.auth.login.error'))

            return
          }

          res(200)
        })
        .catch(() => {
          res(404)
        })
        .finally(() => {})
    })
  }

  const login = (
    provider: SupabaseIntegrations,
    notification: boolean = true
  ) => {
    s.auth
      .signIn({ provider }, { redirectTo: env.getCorrectLocalUrl() })
      .then(async ({ error }) => {
        if (error) throw error

        // if (notification) toast(t('editor.auth.login.success'))
      })
      .catch(() => {
        if (notification) toast(t('editor.auth.login.error'))
      })
      .finally(() => {
        ABSOLUTE.auth.supabase = false
      })
  }

  const out = () => {
    s.auth
      .signOut()
      .then(() => {
        AUTH.account.user = null

        router.push('/')
      })
      .finally(() => {})
  }

  const getProjects = async (): Promise<Maybe<ProjectObject[]>> => {
    try {
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
    }
  }

  const saveProject = async () => {
    const { data, error } = await s.from('projects').upsert(
      {
        // @ts-ignore
        id_user: AUTH.account.user.id,
        ...storage.getProjectObject(),
      },
      { onConflict: 'id' }
    )

    if (error) {
      toast.error(error.message)

      return
    }

    toast.success(t('toast.project.save'))

    if (data) {
      AUTH.account.project_id_activity = data[0].id || null

      await storage.normalize()

      await storage.purge()

      const { error: err } = await s.from('projects').upsert(
        {
          // @ts-ignore
          id_user: AUTH.account.user.id,
          ...storage.getProjectObject(),
        },
        { onConflict: 'id' }
      )

      if (err) {
        toast.error(err.message)
      }
    }
  }

  const deleteProject = async (context: ProjectObject) => {
    if (!confirm(t('toast.project.deleteAlert'))) return

    const { error } = await s
      .from('projects')
      .delete({ returning: 'minimal' })
      .match({ id: context.id })

    if (error) {
      toast.error(error.message)

      return
    }

    toast.success(t('toast.project.save'))
  }

  const loadProject = async (context: ProjectObject) => {
    AUTH.account.project_id_activity = context.id || null

    storage.normalize().then(() => {
      project.onLoadProject(context, false).then(() => {
        local.onSaveProject(false).then(() => {
          router.push('/').finally(() => {})
        })
      })
    })
  }

  const getProfile = async () => {
    const { data: exists } = await s
      .from('profiles')
      .select()
      .eq('id', AUTH.account.user!.id)

    // @ts-ignore
    const profile = exists[0]

    if (!profile) {
      const { data: d, error } = await s.from('profiles').upsert(
        {
          id: AUTH.account.user!.id,
          created_at_day: format.actually(),
        },
        { onConflict: 'id' }
      )
      if (!d) return

      if (error) {
        toast.error(error)
      }

      const [profile] = d

      return profile
    }

    return profile
  }

  const getProjectSize = (context: ProjectObject) => {
    return (
      utils.object().getMemorySizeOfObject(context)[0] +
      ' ' +
      utils.object().getMemorySizeOfObject(context)[1]
    )
  }

  const getAllProjectSize = async () => {
    const projects = await getProjects()

    return projects?.reduce((_, val) => {
      return Number(utils.object().getMemorySizeOfObject(val)[0])
    }, 0)
  }

  const getPlanBar = async (plan: AccountPlan) => {
    //const a1 = await getAllProjectSize()

    const a1 = env.getAccountPlanLimit('beginner') as number

    const a2 = 100

    const b1 = await getAllProjectSize()

    const x1 = a2 * (b1 || 0)

    const b2 = x1 / a1

    console.log(x1)

    return b2
  }

  const getCorrectPlan = (plan: AccountPlan) => {
    switch (plan) {
      case 'beginner':
        return t('dashboard.account.plans.beginner')
      case 'intermediate':
        return t('dashboard.account.plans.intermediate')
      case 'advanced':
        return t('dashboard.account.plans.advanced')
      case 'unlimited':
        return t('dashboard.account.plans.unlimited')
      default:
        return '__NOT_DEFINED__'
    }
  }

  return {
    loginWithEmailAndPassword,
    login,
    out,
    getProjects,
    saveProject,
    loadProject,
    deleteProject,
    getProfile,
    getProjectSize,
    getAllProjectSize,
    getPlanBar,
    getCorrectPlan,
  }
}
