import { VaultState } from 'better-write-types'
import { defineStore } from 'pinia'

export const useVaultStore = defineStore('vault', {
  state: (): VaultState => {
    return {
      dropboxFiles: [],
      documents: undefined,
    }
  },
})
