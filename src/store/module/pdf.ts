import { PDFState } from '@/types/pdf'
import { useDefines } from '@/use/defines'

export default {
  namespaced: true,
  state: () =>
    ({
      styles: {
        base: {
          pageSize: useDefines().pdf().base().pageSize()[0] as string,
          pageOrientation: useDefines()
            .pdf()
            .base()
            .pageOrientation()[0] as string,
          pageMargins: {
            left: useDefines().pdf().base().pageMargins()[0] as number,
            top: useDefines().pdf().base().pageMargins()[1] as number,
            right: useDefines().pdf().base().pageMargins()[2] as number,
            bottom: useDefines().pdf().base().pageMargins()[3] as number,
          },
        },
        paragraph: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 11 as number,
          lineHeight: 1 as number,
          alignment: useDefines().pdf().alignment()[3] as
            | 'left'
            | 'center'
            | 'right'
            | 'justify',
          characterSpacing: 0 as number,
          color: '#000000' as string,
          background: '#ffffff' as string,
          markerColor: '' as string,
          decoration: useDefines().pdf().decoration()[0] as
            | 'underline'
            | 'lineThrough'
            | 'overline'
            | undefined,
          decorationStyle: useDefines().pdf().decorationStyle()[0] as
            | 'dashed'
            | 'dotted'
            | 'double'
            | undefined,
          decorationColor: '' as string,
        },
        headingOne: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 26 as number,
          lineHeight: 1 as number,
          bold: true as boolean,
          italics: false as boolean,
          alignment: useDefines().pdf().alignment()[1] as
            | 'left'
            | 'center'
            | 'right'
            | 'justify',
          characterSpacing: 0 as number,
          color: '#000000' as string,
          background: '#ffffff' as string,
          markerColor: '' as string,
          decoration: useDefines().pdf().decoration()[0] as
            | 'underline'
            | 'lineThrough'
            | 'overline',
          decorationStyle: useDefines().pdf().decorationStyle()[0] as
            | 'dashed'
            | 'dotted'
            | 'double'
            | 'wavy',
          decorationColor: '' as string,
          breakPage: true as boolean,
        },
        headingTwo: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 22 as number,
          lineHeight: 1 as number,
          bold: true as boolean,
          italics: false as boolean,
          alignment: useDefines().pdf().alignment()[1] as
            | 'left'
            | 'center'
            | 'right'
            | 'justify',
          characterSpacing: 0 as number,
          color: '#000000' as string,
          background: '#ffffff' as string,
          markerColor: '' as string,
          decoration: useDefines().pdf().decoration()[0] as
            | 'underline'
            | 'lineThrough'
            | 'overline',
          decorationStyle: useDefines().pdf().decorationStyle()[0] as
            | 'dashed'
            | 'dotted'
            | 'double'
            | 'wavy',
          decorationColor: '' as string,
          breakPage: false as boolean,
        },
        headingThree: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 16 as number,
          lineHeight: 1 as number,
          bold: true as boolean,
          italics: false as boolean,
          alignment: useDefines().pdf().alignment()[1] as
            | 'left'
            | 'center'
            | 'right'
            | 'justify',
          characterSpacing: 0 as number,
          color: '#000000' as string,
          background: '#ffffff' as string,
          markerColor: '' as string,
          decoration: useDefines().pdf().decoration()[0] as
            | 'underline'
            | 'lineThrough'
            | 'overline',
          decorationStyle: useDefines().pdf().decorationStyle()[0] as
            | 'dashed'
            | 'dotted'
            | 'double'
            | 'wavy',
          decorationColor: '' as string,
          breakPage: false as boolean,
        },
      },
    } as PDFState),
  mutations: {
    load(state: any, payload: any) {
      state.styles = payload.styles
    },
    setStyles(state: any, payload: any) {
      state.styles = payload
    },
  },
  actions: {},
  getters: {},
}
