import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import { useLocalStorage } from './storage/local'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import { useAbsoluteStore } from '@/store/absolute'
import { ProjectObject } from '@/types/project'
import { ContextState } from '@/types/context'
import { useStorage } from './storage/storage'
import { setThemeInvokate } from '@/plugin/theme/external'
import { ProjectState } from '../types/project'
import { useNProgress } from '@vueuse/integrations'

export const useProject = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()
  const ABSOLUTE = useAbsoluteStore()

  const toast = useToast()
  const storage = useStorage()
  const local = useLocalStorage()
  const { isLoading } = useNProgress()
  const { t } = i18n.global

  let timer: NodeJS.Timer | null

  const init = () => {
    timer = local.onAutoSave(EDITOR.configuration.auto)
  }

  const destroy = () => {
    clearInterval(timer as NodeJS.Timer)
  }

  const create = (project: ProjectState) => {
    storage.normalize().then(async () => {
      PROJECT.create(project)

      await nextTick

      CONTEXT.load(PROJECT.pages[0])

      await nextTick

      destroy()
      init()

      await nextTick

      setThemeInvokate()

      await nextTick

      toast.success(t('toast.project.create'))
    })
  }

  const onLoadProject = async (context?: ProjectObject) => {
    if (!context) context = local.getProject()

    if (!context) return

    isLoading.value = true

    PROJECT.load(context.project)

    await nextTick

    CONTEXT.load(
      PROJECT.pages.filter(
        (page: ContextState) => page.id === context?.project.pageLoaded
      )[0]
    )

    await nextTick

    LOGGER.load(context.logger)

    await nextTick

    EDITOR.load(context.editor)

    PDF.load(context.pdf)

    await nextTick

    init()

    await nextTick

    setThemeInvokate()

    await nextTick

    ABSOLUTE.aside = true

    toast.success(t('toast.project.load'))

    isLoading.value = false
  }

  const isBlankProject = () => {
    return PROJECT.type === 'blank'
  }

  const isCreativeProject = () => {
    return PROJECT.type === 'creative'
  }

  return {
    init,
    destroy,
    create,
    onLoadProject,
    isBlankProject,
    isCreativeProject,
  }
}
