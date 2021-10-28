import { PluginEmitter, PluginStores } from '@/types/plugin/core'
import { entity, project, save } from '../core/on'
import { LoggerContent } from '@/types/logger'
import { useFormat } from '@/use/format'
import { useI18n } from 'vue-i18n'
import {
  PluginLoggerDefault,
  PluginLoggerEntitySwapper,
} from '@/types/plugin/on'

export const PluginLoggerActions = (
  emitter: PluginEmitter,
  stores: PluginStores
) => {
  const format = useFormat()
  const { t } = useI18n()

  entity().PluginEntityCreate(emitter, [
    (obj: PluginLoggerDefault) => {
      stores.LOGGER.add({
        type: 'editor',
        method: 'info',
        arguments: t('plugin.logger.on.entity.create', {
          data: obj.data,
          index: obj.index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])

  entity().PluginEntityDelete(emitter, [
    (index: number) => {
      stores.LOGGER.add({
        type: 'editor',
        method: 'info',
        arguments: t('plugin.logger.on.entity.delete', {
          index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])

  entity().PluginEntitySwapper(emitter, [
    (item: PluginLoggerEntitySwapper) => {
      stores.LOGGER.add({
        type: 'editor',
        method: 'info',
        arguments: t('plugin.logger.on.entity.swap', {
          index: item.index,
          target: item.direction === 'up' ? --item.index : ++item.index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])

  entity().PluginEntityPageBreak(emitter, [
    (obj: PluginLoggerDefault) => {
      stores.LOGGER.add({
        type: 'editor',
        method: 'info',
        arguments: t('plugin.logger.on.entity.break', {
          data: obj.data,
          index: obj.index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])
}
