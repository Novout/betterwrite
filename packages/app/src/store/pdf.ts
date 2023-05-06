import { PDFState } from 'better-write-types'
import { usePopulate } from '@/use/populate'
import { defineStore } from 'pinia'

export const usePDFStore = defineStore('pdf', {
  state: (): PDFState => {
    return {
      styles: usePopulate().pdf().styles(),
      fonts: [],
      normalize: [],
    }
  },
  actions: {
    resetStyles() {
      this.styles = usePopulate().pdf().styles()
    },
    load(payload: any) {
      this.styles = payload.styles
    },
    loadFonts(payload: any) {
      this.fonts = payload.names
      this.normalize = payload.normalize
    },
    setStyles(payload: any) {
      this.styles = payload
    },
    setMainBackground(payload: any) {
      this.styles.base.background.main = payload
    },
    setCoverBackground(payload: any) {
      this.styles.base.background.data = payload
    },
    deleteMainBackground() {
      this.styles.base.background.main = ''
    },
    deleteCoverBackground() {
      this.styles.base.background.data = ''
    },
  },
})
