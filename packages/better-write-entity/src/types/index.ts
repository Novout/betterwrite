import { App } from 'vue-demi';

export interface EditorOptions {}

export interface EditorPlugin {
	options?: EditorOptions;
	install(app: App): void;
}
