export interface LoggerState {
  content: Array<LoggerContent>
}

export interface LoggerContent {
  type: 'system' | 'internal' | 'editor'
  method: 'log' | 'warn' | 'error' | 'info'
  arguments: IArguments | string
  createdAt: string
}
