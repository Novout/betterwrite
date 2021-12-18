import { App, inject, InjectionKey } from 'vue-demi';
import { EditorRow } from './components/EditorRow';
import { EditorOptions, EditorPlugin } from './types/index';

export const Key: InjectionKey<EditorPlugin> = Symbol();

export function useEditor(): EditorPlugin {
	const plugin = inject(Key);
	if (!plugin) throw new Error('[BETTER-WRITE]: Fail in Entity Hook!');

	return plugin;
}

export function createEditor(options?: EditorOptions): EditorPlugin {
	const plugin: EditorPlugin = {
		options,
		install(app: App) {
			app.component('editor-row', EditorRow);
			app.provide(Key, this);
		},
	};

	return plugin;
}
