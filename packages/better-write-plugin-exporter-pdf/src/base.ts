import { On } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'
import { get } from 'better-write-google-fonts-api'

export const PluginPDFBase = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  On.externals().PluginPDFInit(emitter, [
    async () => {
      // not force google fonts request
      if (stores.PDF.normalize.length !== 0) return

      const { normalize, names } = await get({
        key: hooks.env.googleFontsKey(),
        maxFonts: hooks.env.googleMaxFonts(),
        requiredFonts: ['EB Garamond', 'Cormorant Garamond'],
        globalStyle: true,
      })

      stores.PDF.loadFonts({ names, normalize })
    },
    () => {},
  ])
}
