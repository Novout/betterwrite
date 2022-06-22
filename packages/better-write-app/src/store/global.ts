import { defineStore } from 'pinia'
import { useLoggerStore } from './logger'
import { useEditorStore } from './editor'
import { usePDFStore } from './pdf'
import { useAbsoluteStore } from './absolute'
import { GlobalState } from 'better-write-types'
import { useProjectStore } from './project'
import { useContextStore } from './context'
import { useDOCXStore } from './docx'

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
      const docx = useDOCXStore()
      const absolute = useAbsoluteStore()
      const project = useProjectStore()

      context.$reset()
      absolute.$reset()
      editor.$reset()
      pdf.resetStyles()
      docx.$reset()
      logger.reset()
      project.$reset()
    },
  },
})
