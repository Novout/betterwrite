import { ProjectObject } from '@/types/project'
import { useToast } from 'vue-toastification'
import { nextTick } from 'vue'
import { useEnv } from '../env'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import useEmitter from '@/use/emitter'
import usePlugin from '../plugin/core'
import { useStorage } from './storage'
export const useLocalStorage = () => {
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()

  const toast = useToast()
  const env = useEnv()
  const emitter = useEmitter()
  const storage = useStorage()
  const plugin = usePlugin()
  const { t } = i18n.global

  const set = (obj: ProjectObject, name: string) => {
    localStorage.setItem(env.projectLocalStorage(), JSON.stringify(obj))
  }

  const get = (name: string) => {
    return JSON.parse((localStorage as any).getItem(name))
  }

  const setProject = (obj: ProjectObject) => {
    set(obj, env.projectLocalStorage())
  }

  const getProject = (): ProjectObject => {
    return storage.support(get(env.projectLocalStorage()))
  }

  const onSaveProject = async () => {
    if (PROJECT.name === env.projectEmpty()) return

    emitter.emit('project-save')
    await nextTick

    setProject(storage.getProjectObject())

    toast.success(t('toast.project.save'))
  }

  const onAutoSave = (time: number | 'never') => {
    if (time === 'never') return null

    return setInterval(() => {
      if (PROJECT.name === env.projectEmpty()) return

      setProject(storage.getProjectObject())

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
