import { useAbsoluteStore } from '@/store/absolute'
import { useAuthStore } from '@/store/auth'
import { createClient } from '@supabase/supabase-js'
import { useOnline } from '@vueuse/core'
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
import { useStorage } from './storage'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const s = createClient(supabaseUrl, supabaseAnonKey)

export const getUser = async () => {
  const { data } = await s.auth.getSession()

  return data.session?.user ?? null
}

export const useSupabase = () => {
  const AUTH = useAuthStore()
  const ABSOLUTE = useAbsoluteStore()

  const online = useOnline()
  const toast = useToast()
  const { t } = useI18n()
  const env = useEnv()
  const storage = useStorage()
  const project = useProject()
  const router = useRouter()
  const format = useFormat()
  const utils = useUtils()

  const toDashboard = () => {
    if (!online.value) {
      toast.error(t('toast.generics.onlyOnline'))

      return
    }

    router.push('/dashboard')
  }

  const loginWithEmailAndPassword = (
    { email, password }: { email: string; password: string },
    notification: boolean = true
  ) => {
    return new Promise((res) => {
      s.auth
        .signInWithPassword(
          {
            email,
            password,
          },
        )
        .then(async ({ error }) => {
          if (error) {
            if (notification) toast.error(t('editor.auth.login.error'))

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
    toast.info(t('toast.generics.load'))

    s.auth
      .signInWithOAuth({ provider, options: { redirectTo: env.getCorrectLocalUrl() } })
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
        .select(`id, pdf, docx, project, editor`)
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

  const saveProject = async (project?: ProjectObject) => {
    toast.info(t('toast.generics.load'))

    await storage.normalize()

    await storage.purge()

    const { data, error } = await s.from('projects').upsert(
      project
        ? {
            // @ts-ignore
            id_user: AUTH.account.user.id,
            ...project,
          }
        : {
            // @ts-ignore
            id_user: AUTH.account.user.id,
            ...storage.getProjectObject(),
          },
      { onConflict: 'id' }
    ).select()

    if (error) {
      toast.error(error.message)

      return
    }

    if (data[0]?.id) {
      AUTH.account.project_id_activity = data[0].id

      await storage.normalize()

      await storage.purge()

      const { error: err } = await s.from('projects').upsert(
        project
          ? {
              // @ts-ignore
              id_user: AUTH.account.user.id,
              ...project,
            }
          : {
              // @ts-ignore
              id_user: AUTH.account.user.id,
              ...storage.getProjectObject(),
            },
        { onConflict: 'id' }
      )

      if (err) {
        toast.error(err.message)

        return
      }
    }

    toast.success(t('toast.project.save'))
  }

  const deleteProject = async (context: ProjectObject) => {
    if (!confirm(t('toast.project.deleteAlert'))) return

    const { error } = await s
      .from('projects')
      .delete()
      .match({ id: context.id })

    if (error) {
      toast.error(error.message)

      return
    }

    toast.success(t('toast.project.delete'))
  }

  const loadProject = (context: ProjectObject) => {
    if (!confirm(t('toast.project.deleteProject'))) return

    AUTH.account.project_id_activity = context.id || null

    project.onLoadProject(context, false, true).then(() => {
      router.push('/?context=force&theme=custom').finally(() => {
        toast.success(t('toast.project.load'))
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
      ).select()
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
    toDashboard,
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
