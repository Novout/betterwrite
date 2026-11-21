import {
  get,
  set,
  createProjectsStorage,
  StoredProjectMeta,
} from 'better-write-client-storage'
import { ClientStorageOptions, Maybe, ProjectObject } from 'better-write-types'
import { useToast } from 'vue-toastification'
import { useEnv } from '../env'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useStorage } from './storage'
import { usePlugin } from 'better-write-plugin-core'
import { useEditorStore } from '@/store/editor'
import { useUtils } from '../utils'
import { useContextStore } from '@/store/context'
import { getEditorScroll } from '../chapter-scroll'
import { ref } from 'vue'

export type { StoredProjectMeta }

/**
 * Bumped after every save/delete in the local registry, so lists that are
 * already open (e.g. the header menu) refresh when a write finishes.
 */
export const localProjectsVersion = ref(0)

export const useLocalStorage = () => {
  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const toast = useToast()
  const env = useEnv()
  const storage = useStorage()
  const plugin = usePlugin()
  const utils = useUtils()
  const { t } = i18n.global

  const projects = createProjectsStorage({
    prefix: `${env.projectLocalStorage()}:projects`,
    options: () => EDITOR.configuration.clientStorage as ClientStorageOptions,
    // projects saved before multi-project support live in a single key
    legacyKey: env.projectLocalStorage(),
    legacyMeta: (data: ProjectObject) => ({
      name: data?.project?.nameRaw || 'Project',
      type: data?.project?.type,
    }),
    createId: () => utils.id().uuidv4(),
  })

  const onStorageError = () => {
    const key = env.storageLimitSaver()

    if (sessionStorage.getItem(key)) return

    sessionStorage.setItem(key, key)

    toast.error(t('toast.storage.limitError'), { timeout: 15000 })
  }

  const setProject = async (obj: ProjectObject) => {
    try {
      // projects created before this version have no local id yet
      if (!obj.project.localId) {
        PROJECT.localId = utils.id().uuidv4()
        obj.project.localId = PROJECT.localId
      }

      await projects.save(obj.project.localId, obj, {
        name: obj.project.nameRaw,
        type: obj.project.type,
      })

      localProjectsVersion.value++
    } catch (e) {
      onStorageError()
    }
  }

  /**
   * Save for page close / tab hidden. Everything until the snapshot runs
   * synchronously, because browsers don't wait for promises while unloading:
   *  1. synchronous emergency copy in localStorage (always lands)
   *  2. regular registry save (IndexedDB), which usually completes when the
   *     tab is only hidden; if it does, the snapshot is discarded on next start
   */
  const saveOnExit = () => {
    if (PROJECT.name === env.projectEmpty()) return

    storage.normalizeSync()

    if (!PROJECT.localId) PROJECT.localId = utils.id().uuidv4()

    const obj = storage.getProjectObject()

    projects.saveSnapshot(PROJECT.localId, obj, {
      name: obj.project.nameRaw,
      type: obj.project.type,
    })

    void setProject(obj)
  }

  /** removes a saved project (defaults to the current one) */
  const deleteProject = async (id?: string): Promise<void> => {
    const target = id ?? PROJECT.localId

    if (!target) return

    await projects.remove(target)

    localProjectsVersion.value++
  }

  /**
   * Normalizes a project object, or loads the active saved project
   * (the last one opened/saved) when none is given.
   */
  const getProject = async (
    project?: Maybe<ProjectObject>,
  ): Promise<Maybe<ProjectObject>> => {
    if (!project) {
      const id = await projects.getActive()

      if (id) project = await projects.load<ProjectObject>(id)
    }

    return project ? storage.support(project) : undefined
  }

  /** loads a specific saved project by id */
  const getProjectById = async (id: string): Promise<Maybe<ProjectObject>> => {
    const project = await projects.load<ProjectObject>(id)

    if (!project) return undefined

    // the registry id is the source of truth for the local slot
    project.project.localId = id

    await projects.setActive(id)

    return storage.support(project)
  }

  const listProjects = () => projects.list()

  const onSaveProject = async (event: boolean = true) => {
    if (PROJECT.name === env.projectEmpty()) return

    // per-chapter scroll, persisted with the project (also on autosave)
    CONTEXT.rememberScroll()

    const top = getEditorScroll()
    if (top !== undefined && PROJECT.base === 'chapter')
      PROJECT.scrollLoaded = top

    if (event) {
      plugin.emit('plugin-progress-start')

      await storage
        .normalize()
        .then(async () => {
          await storage.purge()

          await setProject(storage.getProjectObject())

          toast.success(t('toast.project.save'))
        })
        .finally(() => {
          plugin.emit('plugin-progress-end')
        })

      return
    }

    await setProject(storage.getProjectObject())
  }

  return {
    set,
    get,
    setProject,
    deleteProject,
    getProject,
    getProjectById,
    listProjects,
    onSaveProject,
    saveOnExit,
  }
}
