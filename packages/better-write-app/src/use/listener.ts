import { useEventListener } from '@vueuse/core'
import { usePlugin } from 'better-write-plugin-core'
import { useCharacters } from './characters'
import useEmitter from './emitter'

export const useListener = () => {
  const plugin = usePlugin()
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

    const readBWFile = async (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()

      plugin.emit('plugin-window-drop', event)
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
