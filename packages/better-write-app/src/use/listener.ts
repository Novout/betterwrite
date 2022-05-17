import { useAbsoluteStore } from '@/store/absolute'
import { useContextStore } from '@/store/context'
import { useEditorStore } from '@/store/editor'
import { useEventListener } from '@vueuse/core'
import { Entity, EntityType, ProjectObject } from 'better-write-types'
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import useEmitter from './emitter'
import { useFactory } from './factory'
import { useProject } from './project'
import { useStorage } from './storage/storage'
import { useUtils } from './utils'

export const useListener = () => {
  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()

  const project = useProject()
  const factory = useFactory()

  const utils = useUtils()
  const { t } = useI18n()
  const storage = useStorage()
  const emitter = useEmitter()

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
