import { Callback } from '@/types/utils'
import { Store } from 'vuex'
import { useToast } from 'vue-toastification'
import * as pdfMake from 'pdfmake/build/pdfmake'
import fonts from '@/makepdf/local-fonts'

import { GenerateParagraphOptions } from '@/types/pdf'
import { ContextState, ContextStatePageContent } from '@/types/context'
import { useRaw } from './raw'
import { nextTick } from 'vue'

export const usePDF: Callback<any> = () => {
  const toast = useToast()

  const init: Callback<any> = () => {
    // @ts-ignore
    ;(<any>pdfMake).vfs = fonts

    // @ts-ignore
    pdfMake.fonts = {
      Roboto: {
        normal:
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics:
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics:
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
      },
      Raleway: {
        normal: 'Raleway-Regular.ttf',
        bold: 'Raleway-Medium.ttf',
        italics: 'Raleway-Italic.ttf',
        bolditalics: 'Raleway-MediumItalic.ttf',
      },
      Poppins: {
        normal: 'Poppins-Regular.ttf',
        bold: 'Poppins-Medium.ttf',
        italics: 'Poppins-Italic.ttf',
        bolditalics: 'Poppins-MediumItalic.ttf',
      },
    }
  }

  const generate: Callback<any> = () => {
    const headingOne = (raw: string) => {
      return {
        text: raw,
        margin: [0, 45],
        pageBreak: 'before',
        style: 'heading-one',
      }
    }

    const headingTwo = (raw: string) => {
      return {
        text: raw,
        margin: [0, 25],
        style: 'heading-two',
      }
    }

    const headingThree = (raw: string) => {
      return {
        text: raw,
        margin: [0, 15],
        style: 'heading-three',
      }
    }

    const paragraph = (raw: string, options: GenerateParagraphOptions) => {
      let text
      let arr

      if (options.stack) {
        text = []
        let _text = ''

        for (let i = 0; i < options.indent; i++) {
          _text += '   '
        }

        _text += raw

        const arr = useRaw().pdfConvert(_text)

        text.push(arr)
      } else {
        text = ''

        for (let i = 0; i < options.indent; i++) {
          text += '   '
        }

        text += raw

        arr = useRaw().pdfConvert(text)
      }

      return {
        text: arr,
        style: 'paragraph',
        preserveLeadingSpaces: true,
      }
    }

    const content = (store: Store<any>): Array<any> => {
      const pages: Array<ContextState> = store.state.project.pages
      const arr: Array<any> = []

      pages.forEach((page: ContextState) => {
        page.entity.forEach((entity: ContextStatePageContent) => {
          let _raw = {}

          if ((entity as any).type === 'paragraph') {
            _raw = paragraph((entity as any).raw, { stack: false, indent: 4 })
          } else if ((entity as any).type === 'heading-one') {
            _raw = headingOne((entity as any).raw)
          } else if ((entity as any).type === 'heading-two') {
            _raw = headingTwo((entity as any).raw)
          } else if ((entity as any).type === 'heading-three') {
            _raw = headingThree((entity as any).raw)
          }

          arr.push(_raw)
        })
      })

      return arr
    }

    return { content }
  }

  const create: Callback<any> = (store: Store<any>): Promise<void> => {
    return new Promise((resolve) => {
      resolve(
        pdfMake
          .createPdf({
            pageSize: 'A5',
            pageMargins: [60, 20, 60, 5],
            info: {
              title: store.state.project.name,
              author: 'TODO',
              subject: store.state.project.version,
              keywords: '',
            },
            content: generate().content(store),
            styles: {
              'heading-three': {
                fontSize: 20,
                alignment: 'left',
              },
              'heading-two': {
                fontSize: 24,
                alignment: 'center',
              },
              'heading-one': {
                fontSize: 30,
                alignment: 'center',
                bold: true,
              },
              paragraph: {
                fontSize: 10,
                alignment: 'justify',
              },
            },
            defaultStyle: {
              fontSize: 12,
              font: 'Poppins',
            },
            pageBreakBefore: function (
              currentNode: any,
              followingNodesOnPage: any,
              nodesOnNextPage: any,
              previousNodesOnPage: any
            ) {
              //check if signature part is completely on the last page, add pagebreak if not
              if (
                currentNode.id === 'signature' &&
                (currentNode.pageNumbers.length != 1 ||
                  currentNode.pageNumbers[0] != currentNode.pages)
              ) {
                return true
              }
              //check if last paragraph is entirely on a single page, add pagebreak if not
              else if (
                currentNode.id === 'closingParagraph' &&
                currentNode.pageNumbers.length != 1
              ) {
                return true
              }
              return false
            },
          })
          .download(`${store.state.project.nameRaw}.pdf`)
      )
    })
  }

  const external = (store: Store<any>) => {
    const onGeneratePDF = async () => {
      store.commit('absolute/load', true)

      await nextTick
      usePDF()
        .create(store)
        .then(() => {
          store.commit('absolute/load', false)
        })
    }

    return { onGeneratePDF }
  }

  return { init, create, external }
}
