export interface StorageNormalizeOptions {
  soft?: boolean
}

export type ClientStorageSchema =
  | 'local-storage'
  | 'session-storage'
  | 'indexeddb'

export interface ClientStorageOptions {
  schema: ClientStorageSchema
  compress?: boolean
}
