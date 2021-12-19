import { On } from 'better-write-plugin-core';
import { ID, LoggerContent, PluginTypes } from 'better-write-types';

export const PluginLoggerActions = (
	emitter: PluginTypes.PluginEmitter,
	stores: PluginTypes.PluginStores,
	hooks: PluginTypes.PluginHooks
) => {
	On.entity().PluginEntityCreate(emitter, [
		(obj: PluginTypes.PluginLoggerDefault) => {
			stores.LOGGER.add({
				type: 'editor',
				method: 'info',
				arguments: hooks.i18n.t('plugin.logger.on.entity.create', {
					data: hooks.entity.utils().getNamesByTheContent(obj.data),
					index: obj.index,
				}),
			} as LoggerContent);
		},
		() => {},
	]);

	On.entity().PluginEntityCreateEmpty(emitter, [
		(index: ID<number>) => {
			stores.LOGGER.add({
				type: 'editor',
				method: 'info',
				arguments: hooks.i18n.t('plugin.logger.on.entity.createEmpty', {
					index,
				}),
			} as LoggerContent);
		},
		() => {},
	]);

	On.entity().PluginEntityDelete(emitter, [
		(index: number) => {
			stores.LOGGER.add({
				type: 'editor',
				method: 'info',
				arguments: hooks.i18n.t('plugin.logger.on.entity.delete', {
					index,
				}),
			} as LoggerContent);
		},
		() => {},
	]);

	On.entity().PluginEntitySwapper(emitter, [
		(item: PluginTypes.PluginLoggerEntitySwapper) => {
			stores.LOGGER.add({
				type: 'editor',
				method: 'info',
				arguments: hooks.i18n.t('plugin.logger.on.entity.swap', {
					index: item.index,
					target: item.direction === 'up' ? --item.index : ++item.index,
				}),
			} as LoggerContent);
		},
		() => {},
	]);

	On.entity().PluginEntityPageBreak(emitter, [
		(obj: PluginTypes.PluginLoggerDefault) => {
			stores.LOGGER.add({
				type: 'editor',
				method: 'info',
				arguments: hooks.i18n.t('plugin.logger.on.entity.break', {
					data: obj.data,
					index: obj.index,
				}),
			} as LoggerContent);
		},
		() => {},
	]);

	On.entity().PluginAlterInPage(emitter, [
		(obj: PluginTypes.PluginLoggerDefault) => {
			stores.LOGGER.add({
				type: 'editor',
				method: 'info',
				arguments: hooks.i18n.t('plugin.logger.on.entity.alter', {
					data: obj.data,
					index: obj.index,
				}),
			} as LoggerContent);
		},
		() => {},
	]);

	On.entity().PluginPasteInPage(emitter, [
		(obj: PluginTypes.PluginLoggerPaste) => {
			stores.LOGGER.add({
				type: 'editor',
				method: 'info',
				arguments: hooks.i18n.t('plugin.logger.on.entity.paste', {
					quantity: obj.quantity,
					index: obj.index,
				}),
			} as LoggerContent);
		},
		() => {},
	]);
};
