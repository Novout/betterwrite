import { saveAs } from 'file-saver'
import { Entity, PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { useNProgress } from '@vueuse/integrations'
import { ContextState } from 'better-write-types'

export const PluginTxtSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const { isLoading } = useNProgress()

  const purge = (texts: string[]): string => {
    return texts.reduce((conc, text) => conc + text + '\n', '')
  }

  const download = (texts: string[]) => {
    isLoading.value = true

    const data = new Blob([purge(texts)], { type: 'text/plain' })

    saveAs(data, hooks.project.utils().exportFullName('txt'))

    isLoading.value = false
  }

  On.externals().PluginTxtGenerate(emitter, [
    () => {
      download(hooks.project.utils().getOnlyRaw())
    },
    () => {},
  ])
}
