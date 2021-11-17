import { AbsoluteState } from '@/types/absolute'
import { defineStore } from 'pinia'

export const useAbsoluteStore = defineStore('absolute', {
  state: (): AbsoluteState => {
    return {
      project: {
        new: false,
        configuration: false,
        preferences: false,
      },
      modal: {
        newProject: false,
      },
      aside: false,
      shortcuts: {
        switcher: false,
        finder: false,
      },
      logger: false,
      pdf: {
        configuration: false,
        preview: false,
      },
      auth: {
        dropbox: false,
      },
      commands: false,
      load: false,
      entity: {
        comment: false,
      },
    }
  },
})
