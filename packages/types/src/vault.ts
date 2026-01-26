export interface VaultState {
  libraries: VaultLibrary[]
}

export interface VaultLibrary {
  id: number
  title: string
  user_id: number
}