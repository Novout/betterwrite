import { PluginEmitter, PluginStores } from '@/types/plugin/core'
import { PluginEntityInputInitial } from '../core/on'
import { LoggerContent } from '@/types/logger'
import { useFormat } from '@/use/format'
import { useI18n } from 'vue-i18n'
import { PluginContentOnEntityInputLastOptions } from '@/types/plugin/on'

export const PluginLoggerActions = (
  emitter: PluginEmitter,
  stores: PluginStores
) => {
  const format = useFormat()
  const { t } = useI18n()

  PluginEntityInputInitial(emitter, [
    (item: PluginContentOnEntityInputLastOptions) => {
      stores.LOGGER.add({
        type: 'actions',
        method: 'log',
        arguments: t('plugin.logger.on.entity.inputFirst', {
          arguments: item.data,
          index: item.index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
  ])
}
