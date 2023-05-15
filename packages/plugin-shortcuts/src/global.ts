import { PluginTypes } from 'better-write-types'
import { computed } from 'vue-demi'

export const GlobalSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  emitter.on('call-editor-mounted', () => {
    const isThirdPartyShortcut = computed(
      () => stores.PROJECT.base === 'annotations'
    )
    const validKeys = ['a', 'c', 'v', 'b', 'i', 'z']

    const keys = hooks.vueuse.core.useMagicKeys({
      passive: false,
      onEventFired(e: KeyboardEvent) {
        if (
          (e.ctrlKey || e.altKey) &&
          !validKeys.some((key) => e.key.toLowerCase() === key.toLowerCase()) &&
          !isThirdPartyShortcut
        ) {
          e?.preventDefault()
          e?.stopImmediatePropagation()
        }
      },
    })
    const whenever = hooks.vueuse.core.whenever

    if (!keys || !whenever) return

    whenever(keys.ctrl_shift_p, () => {
      emitter.emit('plugin-pdf-generate', {
        chapters: hooks.project.utils().getChaptersSelection(),
        color: 'RGB',
      })
    })

    whenever(keys.ctrl_shift_e, () => {
      emitter.emit('plugin-epub-generate')
    })

    whenever(keys.ctrl_shift_h, () => {
      emitter.emit('plugin-html-generate')
    })

    whenever(keys.ctrl_shift_t, () => {
      emitter.emit('plugin-txt-generate')
    })

    whenever(keys.ctrl_s, async () => {
      await hooks.local.onSaveProject()
    })

    whenever(keys.ctrl_shift_s, async () => {
      await hooks.cloud.saveProject(undefined)
    })

    whenever(keys.ctrl_f, () => {
      if (isThirdPartyShortcut) return

      stores.ABSOLUTE.shortcuts.finder = !stores.ABSOLUTE.shortcuts.finder
    })

    whenever(keys.ctrl_h, () => {
      if (isThirdPartyShortcut) return

      stores.ABSOLUTE.shortcuts.switcher = !stores.ABSOLUTE.shortcuts.switcher
    })

    whenever(keys.F11, () => {
      hooks.utils.context().fullscreen()
    })

    if (hooks.env.isDev()) {
      whenever(keys.ctrl_d, () => {
        stores.ABSOLUTE.cmd = !stores.ABSOLUTE.cmd
      })
    }
  })
}
