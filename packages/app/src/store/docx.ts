import { DOCXState } from 'better-write-types'
import { usePopulate } from '@/use/populate'
import { defineStore } from 'pinia'

export const useDOCXStore = defineStore('docx', {
  state: (): DOCXState => {
    return {
      flow: usePopulate().docx().flow(),
      styles: usePopulate().docx().styles(),
    }
  },
  actions: {
    load({ flow, styles }: DOCXState) {
      this.flow = flow
      this.styles = styles
    },
  },
})
