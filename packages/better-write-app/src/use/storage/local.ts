import destr from 'destr'
import { ProjectObject } from 'better-write-types'
import { useToast } from 'vue-toastification'
import { useEnv } from '../env'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useStorage } from './storage'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { usePlugin } from 'better-write-plugin-core'

export const useLocalStorage = () => {
  const PROJECT = useProjectStore()

  const toast = useToast()
  const env = useEnv()
  const storage = useStorage()
  const plugin = usePlugin()
  const { isLoading } = useNProgress()
  const { t } = i18n.global

  const set = (obj: any, name: string) => {
    localStorage.setItem(name, JSON.stringify(obj))
  }

  const get = (name: string) => {
    return destr((localStorage as any).getItem(name))
  }

  const setProject = (obj: ProjectObject) => {
    set(obj, env.projectLocalStorage())
  }

  const getProject = (): ProjectObject => {
    return storage.support(get(env.projectLocalStorage()))
  }

  const onSaveProject = async (event: boolean = true) => {
    if (PROJECT.name === env.projectEmpty()) return

    const editor = document.querySelector('#edit')

    if (editor) PROJECT.scrollLoaded = Math.floor(editor.scrollTop)

    if (event) {
      isLoading.value = true
      storage
        .normalize()
        .then(async () => {
          await storage.purge()

          setProject(storage.getProjectObject())

          toast.success(t('toast.project.save'))
        })
        .finally(() => {
          isLoading.value = false
        })

      return
    }

    setProject(storage.getProjectObject())
  }

  const onAutoSave = (time: number | 'never') => {
    if (time === 'never') return null

    return setInterval(() => {
      onSaveProject(false)

      plugin.emit('plugin-auto-save')
    }, 1000 * 60 * (time as number))
  }

  return {
    set,
    get,
    setProject,
    getProject,
    onSaveProject,
    onAutoSave,
  }
}
