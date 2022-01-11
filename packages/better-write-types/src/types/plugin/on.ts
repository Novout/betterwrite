export type PluginCreated<T = void> = (...s: Array<any>) => T
export type PluginError<T = void> = (...s: Array<any>) => T
export type PluginCode = 'success' | 'warning' | 'error'
export interface PluginContentOn extends Array<PluginCreated> {
  0: PluginCreated
  1: PluginError
}

export interface PluginLoggerDefault {
  data: string
  index: number
}

export interface PluginLoggerPaste {
  quantity: number
  index: number
}

export interface PluginLoggerEntitySwapper {
  direction: 'up' | 'down'
  index: number
}
