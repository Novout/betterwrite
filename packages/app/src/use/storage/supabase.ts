import { useAbsoluteStore } from '@/store/absolute'
import { useAuthStore } from '@/store/auth'
import { createClient } from '@supabase/supabase-js'
import { useOnline } from '@vueuse/core'
import {
  ProjectObject,
  Maybe,
  AccountPlan,
  SupabaseIntegrations,
  ID,
  ProjectDocument,
} from 'better-write-types'
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useEnv } from '../env'
import { useFormat } from '../format'
import { useProject } from '../project'
import { useUtils } from '../utils'
import { useStorage } from './storage'
import { usePlugin } from 'better-write-plugin-core'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const s = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { storageKey: '__BW__' },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

export const getSupabaseUser = async () => {
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
  const plugin = usePlugin()

  const toDashboard = () => {
    if (!online.value) {
      toast.error(t('toast.generics.onlyOnline'))

      return
    }

    router.push('/dashboard')
  }

  const login = (
    provider: SupabaseIntegrations,
    notification: boolean = true
  ) => {
    toast.info(t('toast.generics.load'))

    s.auth
      .signInWithOAuth({
        provider,
        options: { redirectTo: env.getCorrectLocalUrl() },
      })
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
      .then(async () => {
        AUTH.account.user = null

        await nextTick

        router.push('/')
      })
      .finally(() => {})
  }

  const getDocuments = async (): Promise<Maybe<ProjectDocument[]>> => {
    if(!AUTH.account?.user) {
      return
    }

    try {
      const {
        data: projects,
        error,
        status,
      } = await s
        .from('projects')
        .select(`document`)
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

    if(project) project.project.externalProvider = undefined

    await storage.normalize()

    await storage.purge()

    const target = project ?? storage.getProjectObject()

    if(!target) {
      return
    }

    plugin.emit('plugin-progress-start')

    const [targetSize, targetNamed] = utils.object().getMemorySizeOfObject(target)

    if((Number(targetSize) >= 5.0 && targetNamed === 'MB')  || targetNamed === 'GB') {
      toast.error(t('editor.cloud.limitProjectSize', { limit: 5 }), { timeout: 10000 })
      
      return
    }

    const { data, error } = await s
      .from('projects')
      .upsert({
              // @ts-ignore
              id_user: AUTH.account.user.id,
              ...target,
              document: {
                id: target.id,
                name: target.project.nameRaw,
                type: target.project.type,
              },
            },
        { onConflict: 'id' }
      )
      .select()

    if (error) {
      toast.error(error.message)

      return
    }

    if (data[0]?.id) {
      AUTH.account.project_id_activity = data[0].id

      await storage.normalize()

      await storage.purge()

      const set = project ?? storage.getProjectObject()

      if(!set) return

      const [setSize, setNamed] = utils.object().getMemorySizeOfObject(set)

      if((Number(setSize) >= 5.0 && setNamed === 'MB')  || setNamed === 'GB') {
        toast.error(t('editor.cloud.limitProjectSize', { limit: 5 }), { timeout: 10000 })
        
        return
      }

      plugin.emit('plugin-progress-start')

      const { error: err } = await s.from('projects').upsert({
              // @ts-ignore
              id_user: AUTH.account.user.id,
              ...set,
              document: {
                id: set.id,
                name: set.project.nameRaw,
                type: set.project.type,
              },
            },
        { onConflict: 'id' }
      )

      plugin.emit('plugin-progress-end')

      if (err) {
        toast.error(err.message)

        return
      }
    } else {
      plugin.emit('plugin-progress-end')
    }

    toast.success(t('toast.project.save'))
  }

  const deleteProject = async (id: ID<number>) => {
    if (!confirm(t('toast.project.deleteAlert'))) return

    const { error } = await s.from('projects').delete().match({ id })

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

  const loadProjectById = async (id: ID<number>) => {
    if (!confirm(t('toast.project.deleteProject'))) return

    AUTH.account.project_id_activity = id || null

    try {
      const {
        data: context,
        error,
        status,
      } = await s
        .from('projects')
        .select(`id, pdf, docx, project, editor`)
        // @ts-ignore
        .eq('id_user', AUTH.account.user.id)
        .eq('id', id)
        .limit(1)
        .single()

      if (error && status !== 406) throw error

      if (context) {
        project.onLoadProject(context, false, true).then(() => {
          toast.success(t('toast.project.load'))
        })
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const getProfile = async () => {
    const { data: exists } = await s
      .from('profiles')
      .select()
      .eq('id', AUTH.account.user!.id)

    // @ts-ignore
    const profile = exists[0]

    if (!profile) {
      const { data: d, error } = await s
        .from('profiles')
        .upsert(
          {
            id: AUTH.account.user!.id,
            created_at_day: format.actually(),
          },
          { onConflict: 'id' }
        )
        .select()
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
    login,
    out,
    getDocuments,
    getProjects,
    saveProject,
    loadProjectById,
    loadProject,
    deleteProject,
    getProfile,
    getProjectSize,
    getAllProjectSize,
    getPlanBar,
    getCorrectPlan,
  }
}
