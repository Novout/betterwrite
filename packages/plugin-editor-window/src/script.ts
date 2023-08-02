import { PluginTypes } from 'better-write-types'

export const PluginScriptSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  emitter.on('call-editor-mounted', () => {
    // google ads
    hooks.vueuse.core.useScriptTag(
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4396078299029155',
      () => {},
      {
        async: true,
        crossOrigin: 'anonymous',
      },
    )
  })
}
