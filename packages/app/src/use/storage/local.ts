import destr from 'destr'
import LZString from 'lz-string'
import { Maybe, ProjectObject } from 'better-write-types'
import { useToast } from 'vue-toastification'
import { useEnv } from '../env'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useStorage } from './storage'
import { usePlugin } from 'better-write-plugin-core'

export const useLocalStorage = () => {
  const PROJECT = useProjectStore()

  const toast = useToast()
  const env = useEnv()
  const storage = useStorage()
  const plugin = usePlugin()
  const { t } = i18n.global

  const set = (obj: any, name: string) => {
    localStorage.setItem(name, LZString.compress(JSON.stringify(obj)))
  }

  const get = (name: string): Maybe<any> => {
    const item = localStorage.getItem(name)

    return item ? destr(LZString.decompress(item)) : undefined
  }

  const setProject = (obj: ProjectObject) => {
    try {
      set(obj, env.projectLocalStorage())
    } catch (e) {
      const key = env.storageLimitSaver()

      if (sessionStorage.getItem(key)) return

      sessionStorage.setItem(key, key)

      toast.error(t('toast.storage.limitError'), { timeout: 15000 })
    }
  }

  const deleteProject = (): void => {
    localStorage.removeItem(env.projectLocalStorage())
  }

  const getProject = (project?: Maybe<ProjectObject>): Maybe<ProjectObject> => {
    if (!project) project = get(env.projectLocalStorage())

    return project ? storage.support(project) : undefined
  }

  const onSaveProject = async (event: boolean = true) => {
    if (PROJECT.name === env.projectEmpty()) return

    const editor = document.querySelector('#edit')

    if (editor) PROJECT.scrollLoaded = Math.floor(editor.scrollTop)

    if (event) {
      plugin.emit('plugin-progress-start')

      storage
        .normalize()
        .then(async () => {
          await storage.purge()

          setProject(storage.getProjectObject())

          toast.success(t('toast.project.save'))
        })
        .finally(() => {
          plugin.emit('plugin-progress-end')
        })

      return
    }

    setProject(storage.getProjectObject())
  }

  return {
    set,
    get,
    setProject,
    deleteProject,
    getProject,
    onSaveProject,
  }
}
