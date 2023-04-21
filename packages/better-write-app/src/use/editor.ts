import { useFullscreen } from '@vueuse/core'
import { Calls, usePlugin } from 'better-write-plugin-core'
import { onBeforeUnmount, onMounted } from 'vue'

export const useEditor = () => {
  const plugin = usePlugin()
  const { toggle } = useFullscreen()

  const init = () => {
    Calls.EditorCreated(plugin)

    onMounted(() => {
      Calls.EditorMounted(plugin)
    })

    onBeforeUnmount(() => {
      Calls.EditorUnmounted(plugin)
    })
  }

  const fullScreen = (): void => {
    toggle()
  }

  return { init, fullScreen }
}
