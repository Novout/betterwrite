import { useAbsoluteStore } from '@/store/absolute'
import { useEventListener } from '@vueuse/core'
import { ProjectObject } from 'better-write-types'
import { useI18n } from 'vue-i18n'
import { useProject } from './project'
import { useUtils } from './utils'

export const useListener = () => {
  const ABSOLUTE = useAbsoluteStore()

  const project = useProject()

  const utils = useUtils()
  const { t } = useI18n()

  const keyboard = () => {
    const start = () => {
      useEventListener('keydown', cb)
    }

    const cb = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault()
        e.stopPropagation()

        ABSOLUTE.shortcuts.finder = !ABSOLUTE.shortcuts.finder
      }

      if (e.ctrlKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault()
        e.stopPropagation()

        ABSOLUTE.shortcuts.switcher = !ABSOLUTE.shortcuts.switcher
      }
    }

    return { start }
  }

  const window = () => {
    const start = () => {
      useEventListener('dragover', (e) => {
        e.preventDefault()
        e.stopPropagation()
      })

      useEventListener('drop', readBWFile)
    }

    const readBWFile = async (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (e.dataTransfer?.items) {
        // load .bw
        if (e.dataTransfer.items[0].kind === 'file') {
          const file = e.dataTransfer.items[0].getAsFile()

          if (!file || !file.name.endsWith('.bw')) return

          if (
            confirm(t('toast.project.importExternalBW', { name: file.name }))
          ) {
            const data = (await utils.convert().read(file)) as ProjectObject

            project.onLoadProject(data)
          }
        }
      }
    }

    return { start }
  }

  return { keyboard, window }
}
