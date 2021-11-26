import { PluginEmitter, PluginStores } from '@/types/plugin/core'
import { entity, project, save } from '../core/on'
import { LoggerContent } from '@/types/logger'
import { useFormat } from '@/use/format'
import { useI18n } from 'vue-i18n'
import {
  PluginLoggerDefault,
  PluginLoggerEntitySwapper,
  PluginLoggerPaste,
} from '@/types/plugin/on'
import { useEntity } from '@/use/entity'
import { ID } from '@/types/utils'

export const PluginLoggerActions = (
  emitter: PluginEmitter,
  stores: PluginStores
) => {
  const format = useFormat()
  const ent = useEntity()
  const { t } = useI18n()

  entity().PluginEntityCreate(emitter, [
    (obj: PluginLoggerDefault) => {
      stores.LOGGER.add({
        type: 'editor',
        method: 'info',
        arguments: t('plugin.logger.on.entity.create', {
          data: ent.utils().getNamesByTheContent(obj.data),
          index: obj.index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])

  entity().PluginEntityCreateEmpty(emitter, [
    (index: ID<number>) => {
      stores.LOGGER.add({
        type: 'editor',
        method: 'info',
        arguments: t('plugin.logger.on.entity.createEmpty', {
          index,
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

  entity().PluginAlterInPage(emitter, [
    (obj: PluginLoggerDefault) => {
      stores.LOGGER.add({
        type: 'editor',
        method: 'info',
        arguments: t('plugin.logger.on.entity.alter', {
          data: obj.data,
          index: obj.index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])

  entity().PluginPasteInPage(emitter, [
    (obj: PluginLoggerPaste) => {
      stores.LOGGER.add({
        type: 'editor',
        method: 'info',
        arguments: t('plugin.logger.on.entity.paste', {
          quantity: obj.quantity,
          index: obj.index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])
}
