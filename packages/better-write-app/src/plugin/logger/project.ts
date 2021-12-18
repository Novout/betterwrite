import { PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { LoggerContent, ContextState } from 'better-write-types'
import { useFormat } from '@/use/format'
import { useI18n } from 'vue-i18n'
import { useProjectStore } from '@/store/project'

export const PluginLoggerProject = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores
) => {
  const PROJECT = useProjectStore()

  const format = useFormat()
  const { t } = useI18n()

  On.project().PluginProjectPageNew(emitter, [
    (index: number) => {
      stores.LOGGER.add({
        type: 'project',
        method: 'log',
        arguments: t('plugin.logger.on.project.new', {
          index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])

  On.project().PluginProjectPageDelete(emitter, [
    (index: number) => {
      stores.LOGGER.add({
        type: 'project',
        method: 'log',
        arguments: t('plugin.logger.on.project.delete', {
          index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])

  On.project().PluginProjectPageSwap(emitter, [
    (item: PluginTypes.PluginLoggerEntitySwapper) => {
      if (
        (item.direction === 'up' && item.index <= 0) ||
        (item.direction === 'down' && item.index >= PROJECT.pages.length)
      )
        return

      stores.LOGGER.add({
        type: 'project',
        method: 'log',
        arguments: t('plugin.logger.on.project.swap', {
          index: item.index,
          target: item.direction === 'up' ? --item.index : ++item.index,
        }),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])

  On.save().PluginAutoSave(emitter, [
    () => {
      stores.LOGGER.add({
        type: 'project',
        method: 'log',
        arguments: t('plugin.logger.on.project.autosave'),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {},
  ])

  On.save().PluginDropboxSave(emitter, [
    () => {
      stores.LOGGER.add({
        type: 'project',
        method: 'log',
        arguments: t('plugin.logger.on.dropbox.save.success'),
        createdAt: format.actually(),
      } as LoggerContent)
    },
    () => {
      stores.LOGGER.add({
        type: 'project',
        method: 'error',
        arguments: t('plugin.logger.on.dropbox.save.error'),
        createdAt: format.actually(),
      } as LoggerContent)
    },
  ])

  On.creative()
    .drafts()
    .PluginCreativeDraftsSet(emitter, [
      (page: ContextState) => {
        stores.LOGGER.add({
          type: 'project',
          method: 'info',
          arguments: t('plugin.logger.on.creative.drafts.set', {
            name: page.title,
          }),
          createdAt: format.actually(),
        } as LoggerContent)
      },
      () => {},
    ])

  On.creative()
    .drafts()
    .PluginCreativeDraftsCreate(emitter, [
      (page: ContextState) => {
        stores.LOGGER.add({
          type: 'project',
          method: 'info',
          arguments: t('plugin.logger.on.creative.drafts.create', {
            name: page.title,
          }),
          createdAt: format.actually(),
        } as LoggerContent)
      },
      () => {},
    ])

  On.creative()
    .drafts()
    .PluginCreativeDraftsDelete(emitter, [
      (page: ContextState) => {
        stores.LOGGER.add({
          type: 'project',
          method: 'info',
          arguments: t('plugin.logger.on.creative.drafts.delete', {
            name: page.title,
          }),
          createdAt: format.actually(),
        } as LoggerContent)
      },
      () => {},
    ])

  On.creative()
    .drafts()
    .PluginCreativeDraftsUpdate(emitter, [
      (page: ContextState) => {
        stores.LOGGER.add({
          type: 'project',
          method: 'info',
          arguments: t('plugin.logger.on.creative.drafts.update', {
            name: page.title,
          }),
          createdAt: format.actually(),
        } as LoggerContent)
      },
      () => {},
    ])

  On.creative()
    .drafts()
    .PluginCreativeDraftsReset(emitter, [
      (page: ContextState) => {
        stores.LOGGER.add({
          type: 'project',
          method: 'info',
          arguments: t('plugin.logger.on.creative.drafts.reset', {
            name: page.title,
          }),
          createdAt: format.actually(),
        } as LoggerContent)
      },
      () => {},
    ])
}
