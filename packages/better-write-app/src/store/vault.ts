import { ProjectDocument } from 'better-write-types'
import { defineStore } from 'pinia'

export const useVaultStore = defineStore('vault', {
  state: (): { documents?: ProjectDocument[] } => {
    return {
      documents: undefined,
    }
  },
})
