export interface AbsoluteState {
  commands: boolean
  load: boolean
  modal: Record<string, boolean>
  shortcuts: Record<string, boolean>
  logger: boolean
  pdf: Record<string, boolean>
}
