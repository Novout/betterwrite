import { LoggerContent, ContextState, PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'

export const PluginLoggerProject = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  On.project().PluginProjectPageNew(emitter, [
    (index: number) => {
      stores.LOGGER.add({
        type: 'project',
        method: 'log',
        arguments: hooks.i18n.t('plugin.logger.on.project.new', {
          index,
        }),
      } as LoggerContent)
    },
    () => {},
  ])

  On.project().PluginProjectPageDelete(emitter, [
    (index: number) => {
      stores.LOGGER.add({
        type: 'project',
        method: 'log',
        arguments: hooks.i18n.t('plugin.logger.on.project.delete', {
          index,
        }),
      } as LoggerContent)
    },
    () => {},
  ])

  On.project().PluginProjectPageSwap(emitter, [
    (item: PluginTypes.PluginLoggerEntitySwapper) => {
      if (
        (item.direction === 'up' && item.index <= 0) ||
        (item.direction === 'down' && item.index >= stores.PROJECT.pages.length)
      )
        return

      stores.LOGGER.add({
        type: 'project',
        method: 'log',
        arguments: hooks.i18n.t('plugin.logger.on.project.swap', {
          index: item.index,
          target: item.direction === 'up' ? --item.index : ++item.index,
        }),
      } as LoggerContent)
    },
    () => {},
  ])

  On.save().PluginAutoSave(emitter, [
    () => {
      stores.LOGGER.add({
        type: 'project',
        method: 'log',
        arguments: hooks.i18n.t('plugin.logger.on.project.autosave'),
      } as LoggerContent)
    },
    () => {},
  ])

  On.save().PluginDropboxSave(emitter, [
    () => {
      stores.LOGGER.add({
        type: 'project',
        method: 'log',
        arguments: hooks.i18n.t('plugin.logger.on.dropbox.save.success'),
      } as LoggerContent)
    },
    () => {
      stores.LOGGER.add({
        type: 'project',
        method: 'error',
        arguments: hooks.i18n.t('plugin.logger.on.dropbox.save.error'),
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
          arguments: hooks.i18n.t('plugin.logger.on.creative.drafts.set', {
            name: page.title,
          }),
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
          arguments: hooks.i18n.t('plugin.logger.on.creative.drafts.create', {
            name: page.title,
          }),
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
          arguments: hooks.i18n.t('plugin.logger.on.creative.drafts.delete', {
            name: page.title,
          }),
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
          arguments: hooks.i18n.t('plugin.logger.on.creative.drafts.update', {
            name: page.title,
          }),
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
          arguments: hooks.i18n.t('plugin.logger.on.creative.drafts.reset', {
            name: page.title,
          }),
        } as LoggerContent)
      },
      () => {},
    ])
}
