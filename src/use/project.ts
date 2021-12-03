import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { saveAs } from 'file-saver'
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

  const onExportProject = () => {
    storage.normalize().then(() => {
      saveAs(
        new Blob([JSON.stringify(storage.getProjectObject())], {
          type: 'application/json',
        }),
        PROJECT.nameRaw + '.bw'
      )
    })
  }

  const onImportProject = () => {
    const _ = document.createElement('input')
    _.type = 'file'
    _.addEventListener('change', function () {
      const file = (this.files as any)[0]

      if (!file) return

      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = function () {
        if (!file.name.includes('.bw')) {
          toast.error(t('toast.generics.error'))
          return
        }

        const content = JSON.parse(reader.result as string)

        onLoadProject(content)
      }
      reader.onerror = function (err) {}
    })
    _.click()
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
    onImportProject,
    onExportProject,
    isBlankProject,
    isCreativeProject,
  }
}
