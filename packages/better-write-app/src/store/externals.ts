import { defineStore } from 'pinia'
import { ExternalsState } from 'better-write-types'

export const useExternalsStore = defineStore('externals', {
  state: (): ExternalsState => {
    return {
      finder: {
        value: '',
        entityFocus: 0
      }
    }
  }
})
