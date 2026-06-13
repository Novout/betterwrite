import { On } from 'better-write-plugin-core'
import { PluginTypes, ImporterParams } from 'better-write-types'
import { readBW } from 'better-write-extension'

export const BWSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  On.externals().PluginImporterBW(emitter, [
    async ({ data }: ImporterParams) => {
      const getPassword = async () =>
        window.prompt(hooks.i18n.t('toast.project.bw.passwordGet'))

      try {
        const content = await readBW(data as any, getPassword)

        hooks.project.onLoadProject(content)
      } catch (e: any) {
        if (e?.message === 'wrong-password') {
          hooks.toast.error(hooks.i18n.t('toast.project.bw.passwordWrong'))
        } else if (e?.message !== 'cancelled') {
          hooks.toast.error(hooks.i18n.t('toast.generics.error'))
        }
      }
    },
    () => {},
  ])
}
