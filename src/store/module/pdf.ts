import { PDFState } from '@/types/pdf'

export default {
  namespaced: true,
  state: () =>
    ({
      styles: [],
    } as PDFState),
  mutations: {
    setStyles(state: any, payload: any) {
      state.styles = payload
    },
  },
  actions: {},
  getters: {},
}
