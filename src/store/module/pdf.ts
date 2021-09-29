import { PDFState } from '@/types/pdf'
import { useDefines } from '@/use/defines'

export default {
  namespaced: true,
  state: () =>
    ({
      styles: {
        paragraph: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 12 as number,
          lineHeight: 0 as number,
          aligment: useDefines().pdf().aligment()[0] as
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
        },
        headingOne: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 12 as number,
          lineHeight: 0 as number,
          bold: true as boolean,
          italics: false as boolean,
          aligment: useDefines().pdf().aligment()[0] as
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
          fontSize: 12 as number,
          lineHeight: 0 as number,
          bold: true as boolean,
          italics: false as boolean,
          aligment: useDefines().pdf().aligment()[0] as
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
          fontSize: 12 as number,
          lineHeight: 0 as number,
          bold: true as boolean,
          italics: false as boolean,
          aligment: useDefines().pdf().aligment()[0] as
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
    setStyles(state: any, payload: any) {
      state.styles = payload
    },
  },
  actions: {},
  getters: {},
}
