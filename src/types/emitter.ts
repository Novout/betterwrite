export type VueEmitterName =
  | 'entity-input-focus'
  | 'entity-open'
  | 'entity-close'
  | 'entity-input-raw'
  | 'entity-open-last'

export interface VueEmitter {
  on: (name: VueEmitterName, callback: (...c: any) => any) => void
  emit: (name: VueEmitterName, ...c: any) => void
}
