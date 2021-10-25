export type PluginCreated<T = void> = (...s: Array<any>) => T
export interface PluginContentOn extends Array<PluginCreated> {
  0: PluginCreated
}

export interface PluginLoggerDefault {
  data: string
  index: number
}

export interface PluginLoggerEntitySwapper {
  direction: 'up' | 'down'
  index: number
}
