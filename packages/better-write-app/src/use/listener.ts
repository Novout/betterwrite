import { useAbsoluteStore } from '@/store/absolute'
import { useContextStore } from '@/store/context'
import { useEditorStore } from '@/store/editor'
import { useEventListener } from '@vueuse/core'
import { usePlugin } from 'better-write-plugin-core'
import { read } from 'better-write-plugin-importer'
import { EntityType, ProjectObject } from 'better-write-types'
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import useEmitter from './emitter'
import { useFactory } from './factory'
import { useProject } from './project'
import { useUtils } from './utils'

export const useListener = () => {
  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()

  const project = useProject()
  const factory = useFactory()

  const utils = useUtils()
  const { t } = useI18n()
  const plugin = usePlugin()
  const emitter = useEmitter()
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

      // commands
      if (e.ctrlKey) {
        const index = EDITOR.actives.entity.index

        // text attached
        if (
          e.key === '1' ||
          e.key === '2' ||
          e.key === '3' ||
          e.key === '6' ||
          e.key === '7'
        ) {
          e.preventDefault()
          e.stopPropagation()

          emitter.emit('entity-text-force-save')

          await nextTick

          const value = index + 1

          let type: EntityType = 'paragraph'

          switch (e.key) {
            case '1':
              type = 'paragraph'
              break
            case '2':
              type = 'heading-two'
              break
            case '3':
              type = 'heading-three'
              break
            case '6':
              type = 'checkbox'
              break
            case '7':
              type = 'list'
              break
          }

          CONTEXT.insert(factory.entity().create(type), value)

          await nextTick

          emitter.emit('entity-text-focus', {
            target: value,
            position: 'auto',
          })
        }

        // fixeds
        if (e.key === '4' || e.key === '5' || e.key === '9') {
          e.preventDefault()
          e.stopPropagation()

          emitter.emit('entity-text-force-save')

          await nextTick

          const value = index + 1

          let type: EntityType = 'line-break'

          switch (e.key) {
            case '4':
              type = 'page-break'
              break
            case '5':
              type = 'line-break'
              break
            case '9':
              type = 'drau'
              break
          }

          CONTEXT.insert(factory.entity().create(type), value)

          await nextTick

          CONTEXT.insert(factory.entity().create('paragraph'), value + 1)

          await nextTick

          emitter.emit('entity-text-focus', {
            target: value + 1,
            position: 'auto',
          })
        }

        // image
        if (e.key === '8') {
          e.preventDefault()
          e.stopPropagation()

          emitter.emit('entity-text-force-save')

          await nextTick

          const value = index + 1

          factory.simulate().file(async (entity) => {
            CONTEXT.insert(entity, value)

            await nextTick

            CONTEXT.insert(factory.entity().create('paragraph'), value + 1)

            await nextTick

            emitter.emit('entity-text-focus', {
              target: value + 1,
              position: 'auto',
            })
          })
        }
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
