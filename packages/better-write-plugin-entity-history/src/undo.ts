import { On } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'

export const UndoSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  On.externals().PluginEntityUndo(emitter, [
    async () => {
      await hooks.storage.normalize()

      const target = stores.HISTORY.stack.pop()

      target?.items?.forEach(({ entity, index, type }) => {
        if (type === 'delete') {
          stores.CONTEXT.insert(entity, index)
        } else if (type === 'insert') {
          stores.CONTEXT.delete(entity, index)
        }
      })
    },
    () => {},
  ])
}
