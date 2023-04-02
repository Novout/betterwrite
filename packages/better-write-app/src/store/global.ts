import { defineStore } from 'pinia'
import { useEditorStore } from './editor'
import { usePDFStore } from './pdf'
import { useAbsoluteStore } from './absolute'
import { GlobalState } from 'better-write-types'
import { useProjectStore } from './project'
import { useContextStore } from './context'
import { useDOCXStore } from './docx'
import { useHistoryStore } from './history'
import { useVaultStore } from './vault'

export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => {
    return {}
  },
  actions: {
    reset() {
      const context = useContextStore()
      const editor = useEditorStore()
      const pdf = usePDFStore()
      const docx = useDOCXStore()
      const absolute = useAbsoluteStore()
      const project = useProjectStore()
      const history = useHistoryStore()
      const vault = useVaultStore()

      context.$reset()
      absolute.$reset()
      editor.$reset()
      pdf.resetStyles()
      docx.$reset()
      project.$reset()
      history.$reset()
      vault.$reset()
    },
  },
})
