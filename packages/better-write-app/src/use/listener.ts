import { useAbsoluteStore } from '@/store/absolute'
import { useEventListener } from '@vueuse/core'
import { usePlugin } from 'better-write-plugin-core'
import { read } from 'better-write-plugin-importer'
import { ProjectObject } from 'better-write-types'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useProject } from './project'
import { useUtils } from './utils'

export const useListener = () => {
  const ABSOLUTE = useAbsoluteStore()

  const project = useProject()

  const utils = useUtils()
  const { t } = useI18n()
  const plugin = usePlugin()
  const toast = useToast()

  const keyboard = () => {
    const start = () => {
      useEventListener('keydown', cb)
    }

    const cb = async (e: KeyboardEvent) => {
      // finder
      if (e.ctrlKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault()
        e.stopPropagation()

        ABSOLUTE.shortcuts.finder = !ABSOLUTE.shortcuts.finder

        return
      }

      // switcher
      if (e.ctrlKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault()
        e.stopPropagation()

        ABSOLUTE.shortcuts.switcher = !ABSOLUTE.shortcuts.switcher

        return
      }

      // handle default fullscreen method
      if (e.key === 'F11') {
        e.preventDefault()
        e.stopPropagation()

        utils.context().fullscreen()
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

          if (!file) return

          const filename = file.name
            .replace('.bw', '')
            .replace('.docx', '')
            .replace('.doc', '')
            .replace('.txt', '')

          if (file.name.endsWith('.bw')) {
            if (confirm(t('toast.project.import', { name: file.name }))) {
              const data = (await utils.convert().read(file)) as ProjectObject

              project.onLoadProject(data, false)
            }

            return
          }

          if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
            if (confirm(t('toast.project.import', { name: file.name }))) {
              const data = await read(file, 'data')

              plugin.emit('plugin-importer-docx', {
                data,
                fileName: filename,
              })
            }

            return
          }

          if (file.name.endsWith('.txt')) {
            if (confirm(t('toast.project.import', { name: file.name }))) {
              const data = await read(file, 'text')

              plugin.emit('plugin-importer-txt', {
                data,
                fileName: filename,
              })
            }

            return
          }

          toast.warning(t('toast.project.unsupportedExtension'))
        }
      }
    }

    return { start }
  }

  return { keyboard, window }
}
