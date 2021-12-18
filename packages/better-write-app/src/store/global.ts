import { defineStore } from 'pinia'
import { useLoggerStore } from './logger'
import { useEditorStore } from './editor'
import { usePDFStore } from './pdf'
import { useAbsoluteStore } from './absolute'
import { useShortcutsStore } from './shortcuts'

import { GlobalState } from 'better-write-types'
import { useProjectStore } from './project'

export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => {
    return {}
  },
  actions: {
    reset() {
      const logger = useLoggerStore()
      const editor = useEditorStore()
      const pdf = usePDFStore()
      const absolute = useAbsoluteStore()
      const shortcuts = useShortcutsStore()
      const project = useProjectStore()

      absolute.$reset()
      shortcuts.$reset()
      editor.$reset()
      pdf.resetStyles()
      logger.reset()
      project.$reset()
    },
  },
})
