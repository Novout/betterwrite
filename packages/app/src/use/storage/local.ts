import { get, set, exclude } from 'better-write-client-storage'
import { ClientStorageOptions, Maybe, ProjectObject } from 'better-write-types'
import { useToast } from 'vue-toastification'
import { useEnv } from '../env'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useStorage } from './storage'
import { usePlugin } from 'better-write-plugin-core'
import { useEditorStore } from '@/store/editor'

export const useLocalStorage = () => {
  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()

  const toast = useToast()
  const env = useEnv()
  const storage = useStorage()
  const plugin = usePlugin()
  const { t } = i18n.global

  const setProject = (obj: ProjectObject) => {
    try {
      set(env.projectLocalStorage(), obj, EDITOR.configuration.clientStorage as ClientStorageOptions)
    } catch (e) {
      const key = env.storageLimitSaver()

      if (sessionStorage.getItem(key)) return

      sessionStorage.setItem(key, key)

      toast.error(t('toast.storage.limitError'), { timeout: 15000 })
    }
  }

  const deleteProject = (): void => {
    exclude(env.projectLocalStorage())
  }

  const getProject = async (project?: Maybe<ProjectObject>): Promise<Maybe<ProjectObject>> => {
    if (!project) project = await get<ProjectObject>(env.projectLocalStorage(), EDITOR.configuration.clientStorage as ClientStorageOptions)

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
