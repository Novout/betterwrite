import { PluginTypes } from 'better-write-types'

// visibilitychange → pagehide → beforeunload fire in a row on close
const EXIT_SAVE_THROTTLE = 1000

export const PluginAutosaveSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  emitter.on('call-editor-created', () => {
    const online = hooks.vueuse.core.useOnline()

    // in-app navigation: the page stays alive, async saves are fine
    const inForcedSave = async () => {
      if (stores.EDITOR.configuration.autosave) {
        await hooks.storage.normalize()
        await hooks.local.onSaveProject(false)
      }

      await cloudSave()
    }

    const cloudSave = async () => {
      if (!stores.EDITOR.configuration.cloudAutosave || !online.value) return

      if (stores.PROJECT?.externalProvider === 'dropbox') {
        await hooks.dropbox.save()

        return
      }

      await hooks.cloud.saveProject()
    }

    /**
     * Page closing / tab hidden. Browsers do NOT wait for promises here
     * (an async `beforeunload` handler never finished saving), so the local
     * save starts synchronously: a localStorage snapshot that always lands,
     * plus the regular IndexedDB save (see `local.saveOnExit`).
     */
    let lastExitSave = 0

    const onExit = () => {
      if (!stores.EDITOR.configuration.autosave) return

      const now = Date.now()
      if (now - lastExitSave < EXIT_SAVE_THROTTLE) return
      lastExitSave = now

      hooks.local.saveOnExit()

      // network is best effort: it only completes if the page stays alive
      void cloudSave().catch(() => {})
    }

    // fires before unload on close, and also on tab switch / minimize /
    // mobile app switch, where the page is still alive to finish the save
    hooks.vueuse.core.useEventListener(document, 'visibilitychange', () => {
      if (document.visibilityState === 'hidden') onExit()
    })

    // close/reload when the tab was still visible
    hooks.vueuse.core.useEventListener(window, 'pagehide', onExit)
    hooks.vueuse.core.useEventListener(window, 'beforeunload', onExit)

    hooks.vuerouter.onBeforeRouteLeave(async () => {
      await inForcedSave()
    })
  })
}
