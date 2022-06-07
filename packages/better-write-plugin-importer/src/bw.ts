import { On } from 'better-write-plugin-core'
import { PluginTypes, ImporterParams } from 'better-write-types'
import destr from 'destr'

export const BWSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  On.externals().PluginImporterBW(emitter, [
    async ({ data }: ImporterParams) => {
      const content = destr(data as string)

      hooks.project.onLoadProject(content)
    },
    () => {},
  ])
}
