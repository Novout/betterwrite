import { defineStore } from 'pinia'
import { useLoggerStore } from './logger'
import { useEditorStore } from './editor'
import { usePDFStore } from './pdf'
import { useAbsoluteStore } from './absolute'
import { GlobalState } from 'better-write-types'
import { useProjectStore } from './project'
import { useContextStore } from './context'

export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => {
    return {}
  },
  actions: {
    reset() {
      const context = useContextStore()
      const logger = useLoggerStore()
      const editor = useEditorStore()
      const pdf = usePDFStore()
      const absolute = useAbsoluteStore()
      const project = useProjectStore()

      context.$reset()
      absolute.$reset()
      editor.$reset()
      pdf.resetStyles()
      logger.reset()
      project.$reset()
    },
  },
})
