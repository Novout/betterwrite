export type PluginCreated<T = void> = (...s: Array<any>) => T
export type PluginContentOn = Array<PluginCreated>
