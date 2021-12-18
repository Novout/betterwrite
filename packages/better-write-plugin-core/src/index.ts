import { App, inject, InjectionKey, getCurrentInstance } from 'vue-demi';
import { PluginTypes } from 'better-write-types';
import mitt from 'mitt';

export const Key: InjectionKey<PluginTypes.CorePlugin> = Symbol();

export function useCore(): PluginTypes.CorePlugin {
	const plugin = inject(Key);
	if (!plugin) throw new Error('[BETTER-WRITE]: Fail in Entity Hook!');

	return plugin;
}

export function usePlugin(): PluginTypes.PluginEmitter {
	return getCurrentInstance()?.appContext.config.globalProperties.plugin;
}

export function createPluginCore(options?: PluginTypes.CoreOption): PluginTypes.CorePlugin {
	const start = (stores: PluginTypes.PluginStores, plugins: PluginTypes.Plugins) => {
		plugins?.forEach((plugin: PluginTypes.Plugin) => {
			plugin.init(getCurrentInstance()?.appContext.config.globalProperties.plugin, stores);
		});
	};

	const plugin: PluginTypes.CorePlugin = {
		options,
		start,
		install(app: App) {
			app.config.globalProperties.plugin = mitt() as PluginTypes.PluginEmitter;
			app.provide(Key, this);
		},
	};

	return plugin;
}

export * as Cycle from './cycle';
export * as On from './on';
