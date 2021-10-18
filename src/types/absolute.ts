export interface AbsoluteState {
  commands: boolean
  project: Record<string, boolean>
  load: boolean
  aside: boolean
  modal: Record<string, boolean>
  shortcuts: Record<string, boolean>
  logger: boolean
  pdf: Record<string, boolean>
  auth: Record<string, boolean>
}
