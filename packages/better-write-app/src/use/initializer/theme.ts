import { usePlugin } from 'better-write-plugin-core'

export const usePDFInitializer = () => {
  const plugin = usePlugin()

  const init = () => {
    plugin.emit('plugin-pdf-init')
  }

  return { init }
}
