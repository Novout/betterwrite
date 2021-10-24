export type PluginCreated<T = void> = (...s: Array<any>) => T
export interface PluginContentOn extends Array<PluginCreated> {
  0: PluginCreated
}
