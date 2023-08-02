import { PluginTypes } from 'better-write-types'

export const PluginAutosaveSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  emitter.on('call-editor-created', () => {
    const online = hooks.vueuse.core.useOnline()

    const inForcedSave = async () => {
      if (stores.EDITOR.configuration.autosave) {
        await hooks.storage.normalize()
        await hooks.local.onSaveProject(false)
      }

      if (stores.EDITOR.configuration.cloudAutosave && online.value) {
        if (stores.PROJECT?.externalProvider === 'dropbox') {
          await hooks.dropbox.save()

          return
        }

        await hooks.cloud.saveProject()
      }
    }

    hooks.vueuse.core.useEventListener('beforeunload', async () => {
      await inForcedSave()
    })

    hooks.vuerouter.onBeforeRouteLeave(async () => {
      await inForcedSave()
    })
  })
}
