import { useEventListener } from '@vueuse/core'
import { usePlugin } from 'better-write-plugin-core'
import { read } from 'better-write-plugin-importer'
import { isImageExtension } from 'better-write-image-converter'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useProject } from './project'
import { readBW } from 'better-write-extension'
import { useCharacters } from './characters'
import useEmitter from './emitter'

export const useListener = () => {
  const project = useProject()

  const { t } = useI18n()
  const plugin = usePlugin()
  const toast = useToast()
  const emitter = useEmitter()
  const characters = useCharacters()

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
              const data = await readBW(file)

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

          if (!isImageExtension(file.name))
            toast.warning(t('toast.project.unsupportedExtension'))
        }
      }
    }

    return { start }
  }

  const editor = () => {
    const start = () => {
      // for set color in all entities with character exists
      characters.handler()

      emitter.on(
        'characters-handler',
        ({ index, inner }: { index: number; inner: string }) => {
          characters.handler(index, inner)
        }
      )
    }

    return { start }
  }

  return { window, editor }
}
