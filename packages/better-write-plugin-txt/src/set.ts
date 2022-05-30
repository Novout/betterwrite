import { saveAs } from 'file-saver'
import { PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { useNProgress } from '@vueuse/integrations'

export const PluginTxtSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const { isLoading } = useNProgress()

  const purge = (texts: string[]): string => {
    return texts.reduce(
      (conc, text) => hooks.substitution.purge(conc + text) + '\n',
      ''
    )
  }

  const download = (texts: string[]) => {
    isLoading.value = true

    const data = new Blob([purge(texts)], { type: 'text/plain' })

    saveAs(data, hooks.project.utils().exportFullName('txt'))

    isLoading.value = false

    hooks.toast.success(hooks.i18n.t('toast.project.txt.generate'))
  }

  On.externals().PluginTxtGenerate(emitter, [
    () => {
      download(hooks.project.utils().getOnlyRaw())
    },
    () => {},
  ])
}
