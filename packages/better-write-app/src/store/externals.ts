import { defineStore } from 'pinia'
import { ExternalsState } from 'better-write-types'

export const useExternalsStore = defineStore('externals', {
  state: (): ExternalsState => {
    return {
      finder: {
        value: '',
        entity: 0,
        close: false,
      },
      switcher: {
        value: '',
        entity: 0,
        replace: '',
        close: false,
      },
    }
  },
})
