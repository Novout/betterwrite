import { LoggerContent } from '@/types/logger'
import { Plugin, PluginEmitter, PluginStores } from '@/types/plugin/core'
import { useFormat } from '@/use/format'
import { useI18n } from 'vue-i18n'
import { PluginEntityInputInitial } from '../core/on'

export const LoggerPlugin = (): Plugin => {
  const format = useFormat()
  const { t } = useI18n()

  const init = (emitter: PluginEmitter, stores: PluginStores) => {
    PluginEntityInputInitial(emitter, [
      (input: string) => {
        stores.LOGGER.add({
          type: 'actions',
          method: 'log',
          arguments: t('plugin.logger.on.entity.inputFirst', {
            arguments: input,
          }),
          createdAt: format.actually(),
        } as LoggerContent)
      },
    ])
  }

  return { init }
}
