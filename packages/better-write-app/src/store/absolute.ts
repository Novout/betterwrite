import { AbsoluteState } from 'better-write-types'
import { defineStore } from 'pinia'

export const useAbsoluteStore = defineStore('absolute', {
  state: (): AbsoluteState => {
    return {
      project: {
        new: false,
        configuration: false,
        preferences: false,
        statistics: false,
        corrector: false,
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
        generate: false,
      },
      auth: {
        dropbox: false,
        supabase: false,
      },
      commands: false,
      load: false,
      entity: {
        comment: false,
        menu: false,
        customize: false,
      },
      pages: {
        drafts: false,
      },
      tools: {
        speechRecognition: false,
      },
    }
  },
})
