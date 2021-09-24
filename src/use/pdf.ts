import { Callback } from '@/types/utils'
import { Store } from 'vuex'
import { useToast } from 'vue-toastification'
import * as pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from '@/pdfmake/plugin/pdfmake-unicode'

import { GenerateParagraphOptions } from '@/types/pdf'
import { ContextState, ContextStatePageContent } from '@/types/context'

export const usePDF: Callback<any> = () => {
  const toast = useToast()

  const init: Callback<any> = () => {
    ;(<any>pdfMake).vfs = pdfFonts
  }

  const generate: Callback<any> = () => {
    const headingOne = (raw: string) => {
      return {
        text: raw,
        style: 'heading-one',
      }
    }

    const headingTwo = (raw: string) => {
      return {
        text: raw,
        style: 'heading-two',
      }
    }

    const headingThree = (raw: string) => {
      return {
        text: raw,
        style: 'heading-three',
      }
    }

    const paragraph = (raw: string, options: GenerateParagraphOptions) => {
      let text

      if (options.stack) {
        text = []
        let _text = ''

        for (let i = 0; i < options.indent; i++) {
          _text += '\u200B\t'
        }

        _text += raw

        text.push(_text)
      } else {
        text = ''

        for (let i = 0; i < options.indent; i++) {
          text += '\u200B\t'
        }

        text += raw
      }

      return {
        text,
        style: 'paragraph',
      }
    }

    const content = (store: Store<any>): Array<any> => {
      const pages: Array<ContextState> = store.state.project.pages
      console.log(pages)
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

      console.log(arr)

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
                fontSize: 15,
              },
              'heading-two': {
                fontSize: 16,
              },
              'heading-one': {
                fontSize: 18,
              },
              paragraph: {
                fontSize: 10,
                alignment: 'justify',
              },
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

  return { init, create }
}
