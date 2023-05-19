import { AbsoluteState } from 'better-write-types'
import { defineStore } from 'pinia'

export const useAbsoluteStore = defineStore('absolute', {
  state: (): AbsoluteState => {
    return {
      cmd: false,
      project: {
        new: false,
        configuration: false,
        insertions: false,
        characters: false,
        preferences: false,
        statistics: false,
        corrector: false,
        tutorial: false,
      },
      modal: {
        newProject: false,
        presence: {
          createOrJoin: false,
          info: false,
        },
      },
      aside: false,
      shortcuts: {
        switcher: false,
        finder: false,
      },
      pdf: {
        configuration: false,
        generate: false,
      },
      docx: {
        configuration: false,
      },
      auth: {
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
      generator: {
        substitutions: false,
      },
      spinner: false,
      schemas: {
        create: false,
        template: false,
      },
    }
  },
})
