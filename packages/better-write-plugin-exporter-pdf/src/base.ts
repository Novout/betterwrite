import { On } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'

export const PluginPDFBase = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  On.externals().PluginPDFInit(emitter, [
    async () => {
      // not force google fonts request
      if (stores.PDF.normalize.length !== 0) return

      const { normalize, names } = await hooks.googleFonts.get()

      stores.PDF.loadFonts({ names, normalize })
    },
    () => {},
  ])
}
