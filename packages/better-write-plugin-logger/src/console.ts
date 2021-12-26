import { PluginTypes } from 'better-write-types';

export const PluginLoggerConsole = (
	emitter: PluginTypes.PluginEmitter,
	stores: PluginTypes.PluginStores,
	hooks: PluginTypes.PluginHooks
) => {
	if (hooks.env.isDev()) return;

	let _log = console.log,
		_warn = console.warn,
		_error = console.error,
		_info = console.info;

	console.log = function () {
		stores.LOGGER.add({
			type: 'system',
			method: 'log',
			arguments,
			createdAt: hooks.format.actually(),
		});

		return _log.apply(console, arguments as any);
	};

	console.warn = function () {
		stores.LOGGER.add({
			type: 'system',
			method: 'warn',
			arguments,
			createdAt: hooks.format.actually(),
		});

		return _warn.apply(console, arguments as any);
	};

	console.error = function () {
		stores.LOGGER.add({
			type: 'system',
			method: 'error',
			arguments,
			createdAt: hooks.format.actually(),
		});

		return _error.apply(console, arguments as any);
	};

	console.info = function () {
		stores.LOGGER.add({
			type: 'system',
			method: 'info',
			arguments,
			createdAt: hooks.format.actually(),
		});

		return _info.apply(console, arguments as any);
	};
};
