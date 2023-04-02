import {
  PDFStateStyles,
  DOCXStateFlowItem,
  DOCXStateStyles,
} from 'better-write-types'
import { useDefines } from './defines'

export const usePopulate = () => {
  const cmd = () => {
    return ['entity purge']
  }

  const debug = () => {
    const names = () => {
      const paragraph = () => {
        return '- Vivamus ac facilisis nisl.'
      }

      const text = () => {
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vestibulum elit lacus, quis ultricies augue ullamcorper et. Duis in ante eget libero accumsan accumsan quis ac tortor.'
      }

      return { paragraph, text }
    }

    return { names }
  }

  const docx = () => {
    const flow = (): DOCXStateFlowItem[] => {
      return [{ type: 'content' }, { type: 'bw' }]
    }

    const styles = (): DOCXStateStyles => {
      return {
        base: {},
        paragraph: {
          indent: 3,
          bold: false,
          italics: false,
          color: '#000000',
          size: 14,
          margin: {
            top: 0,
            bottom: 0,
          },
          alignment: useDefines().docx().entityAlignment()[0] as any,
        },
        headingOne: {
          bold: true,
          italics: false,
          color: '#000000',
          size: 42,
          margin: {
            top: 35,
            bottom: 35,
          },
          alignment: useDefines().docx().entityAlignment()[2] as any,
        },
        headingTwo: {
          bold: true,
          italics: false,
          color: '#000000',
          size: 32,
          margin: {
            top: 16,
            bottom: 16,
          },
          alignment: useDefines().docx().entityAlignment()[2] as any,
        },
        headingThree: {
          bold: true,
          italics: false,
          color: '#000000',
          size: 26,
          margin: {
            top: 12,
            bottom: 12,
          },
          alignment: useDefines().docx().entityAlignment()[2] as any,
        },
        lineBreak: {},
      }
    }

    return { flow, styles }
  }

  const pdf = () => {
    const styles = (): PDFStateStyles => {
      return {
        base: {
          summary: {
            type: useDefines().pdf().base().summaryStyle()[0] as any,
            fontFamily: useDefines().pdf().fontFamily()[1],
            fontSize: 20,
          },
          note: {
            text: '',
            bw: false,
          },
          background: {
            color: '#FFFFFF' as string,
            data: '' as string,
            main: '' as string,
          },
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
          header: {
            start: 3,
            content: useDefines().pdf().base().header().content(),
            alignment: useDefines().pdf().base().alignment()[0] as any,
            textSize: 9,
            textType: useDefines().pdf().base().footerStyle()[0] as any,
            fontFamily: useDefines().pdf().fontFamily()[1],
          },
          footer: {
            start: 3,
            alignment: useDefines().pdf().base().alignment()[0] as any,
            textSize: 9,
            textType: useDefines().pdf().base().footerStyle()[0] as any,
            fontFamily: useDefines().pdf().fontFamily()[1],
          },
        },
        paragraph: {
          font: useDefines().pdf().fontFamily()[1] as string,
          fontSize: 12 as number,
          lineHeight: 1 as number,
          alignment: useDefines().pdf().alignment()[0] as
            | 'left'
            | 'center'
            | 'right'
            | 'justify',
          indent: 3 as number,
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
          margin: {
            top: 0 as number,
            bottom: 0 as number,
          },
        },
        headingOne: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 26 as number,
          lineHeight: 1 as number,
          bold: true as boolean,
          italics: false as boolean,
          alignment: useDefines().pdf().alignment()[2] as
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
            | 'wavy',
          decorationColor: '' as string,
          breakPage: true as boolean,
          margin: {
            top: 45 as number,
            bottom: 45 as number,
          },
        },
        headingTwo: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 22 as number,
          lineHeight: 1 as number,
          bold: true as boolean,
          italics: false as boolean,
          alignment: useDefines().pdf().alignment()[2] as
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
          margin: {
            top: 25 as number,
            bottom: 25 as number,
          },
        },
        headingThree: {
          font: useDefines().pdf().fontFamily()[0] as string,
          fontSize: 16 as number,
          lineHeight: 1 as number,
          bold: true as boolean,
          italics: false as boolean,
          alignment: useDefines().pdf().alignment()[2] as
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
          margin: {
            top: 15 as number,
            bottom: 15 as number,
          },
        },
        lineBreak: {
          spacing: 10,
          image: {
            data: '',
            active: false,
            width: 50,
            height: 50,
          },
        },
        switcher: {
          cover: true,
          main: false,
          footer: true,
          header: false,
          summary: false,
          encryption: false,
          theme: false,
        },
      }
    }

    return { styles }
  }

  return { cmd, docx, pdf, debug }
}
