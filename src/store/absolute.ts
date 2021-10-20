import { AbsoluteState } from '@/types/absolute'
import { defineStore } from 'pinia'

export const useAbsoluteStore = defineStore('absolute', {
  state: (): AbsoluteState => {
    return {
      project: {
        new: false,
      },
      modal: {
        newProject: false,
      },
      aside: true,
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
    }
  },
  actions: {
    switchProjectCreate(b: boolean) {
      this.project.new = b
    },
    switchProjectModal(b: boolean) {
      this.modal.newProject = b
    },
    switchAside(b: boolean) {
      this.aside = b
    },
    switchShortcutSwitcher(b: boolean) {
      this.shortcuts.switcher = b
    },
    switchShortcutFinder(b: boolean) {
      this.shortcuts.finder = b
    },
    switchLogger(b: boolean) {
      this.logger = b
    },
    switchPdfConfiguration(b: boolean) {
      this.pdf.configuration = b
    },
    switchPdfPreview(b: boolean) {
      this.pdf.preview = b
    },
    switchAuthDropbox(b: boolean) {
      this.auth.dropbox = b
    },
  },
})
