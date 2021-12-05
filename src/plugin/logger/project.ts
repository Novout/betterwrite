import { PluginEmitter, PluginStores } from '@/types/plugin/core'
import { creative, project, save } from '../core/on'
import { LoggerContent } from '@/types/logger'
import { useFormat } from '@/use/format'
import { useI18n } from 'vue-i18n'
import { PluginLoggerEntitySwapper } from '@/types/plugin/on'
import { useProjectStore } from '@/store/project'
import { ContextState } from '@/types/context'
export const PluginLoggerProject = (
  emitter: PluginEmitter,
  stores: PluginStores
) => {
  const PROJECT = useProjectStore()

  const format = useFormat()
  const { t } = useI18n()

  project().PluginProjectPageNew(emitter, [
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

  project().PluginProjectPageDelete(emitter, [
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

  project().PluginProjectPageSwap(emitter, [
    (item: PluginLoggerEntitySwapper) => {
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

  save().PluginAutoSave(emitter, [
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

  save().PluginDropboxSave(emitter, [
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

  creative()
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

  creative()
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

  creative()
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

  creative()
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

  creative()
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
