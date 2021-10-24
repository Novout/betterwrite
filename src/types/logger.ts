export interface LoggerState {
  content: Array<LoggerContent>
}

export interface LoggerContent {
  type: 'system' | 'internal' | 'actions'
  method: 'log' | 'warn' | 'error' | 'info'
  arguments: IArguments | string
  createdAt: string
}
