import { On } from 'better-write-plugin-core'
import { PluginTypes, ImporterParams } from 'better-write-types'
import { readBW } from 'better-write-extension'

export const BWSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  On.externals().PluginImporterBW(emitter, [
    async ({ data }: ImporterParams) => {
      const content = await readBW(data as any)

      hooks.project.onLoadProject(content)
    },
    () => {},
  ])
}
