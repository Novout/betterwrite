import { PluginEmitter, PluginStores } from '@/types/plugin/core'
import { PluginEntityInputInitial } from '../core/on'
import { LoggerContent } from '@/types/logger'
import { useFormat } from '@/use/format'
import { useI18n } from 'vue-i18n'

export const PluginLoggerActions = (
  emitter: PluginEmitter,
  stores: PluginStores
) => {
  const format = useFormat()
  const { t } = useI18n()

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
