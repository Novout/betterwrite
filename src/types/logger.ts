export interface LoggerState {
  content: Array<LoggerContent>
}

export interface LoggerContent {
  method: 'log' | 'warn' | 'error' | 'info'
  arguments: IArguments
  createdAt: string
}
