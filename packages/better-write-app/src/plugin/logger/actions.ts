import { On } from 'better-write-plugin-core'
import { LoggerContent } from '@/types/logger'
import { useFormat } from '@/use/format'
import { useI18n } from 'vue-i18n'
import { PluginTypes } from 'better-write-types'
import { useEntity } from '@/use/entity'
import { ID } from '@/types/utils'

export const PluginLoggerActions = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores
) => {
  const format = useFormat()
  const ent = useEntity()
  const { t } = useI18n()

  On.entity().PluginEntityCreate(emitter, [
    (obj: PluginTypes.PluginLoggerDefault) => {
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

  On.entity().PluginEntityCreateEmpty(emitter, [
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

  On.entity().PluginEntityDelete(emitter, [
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

  On.entity().PluginEntitySwapper(emitter, [
    (item: PluginTypes.PluginLoggerEntitySwapper) => {
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

  On.entity().PluginEntityPageBreak(emitter, [
    (obj: PluginTypes.PluginLoggerDefault) => {
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

  On.entity().PluginAlterInPage(emitter, [
    (obj: PluginTypes.PluginLoggerDefault) => {
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

  On.entity().PluginPasteInPage(emitter, [
    (obj: PluginTypes.PluginLoggerPaste) => {
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
