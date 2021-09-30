import { Callback } from '@/types/utils'
import { Store } from 'vuex'
import { useToast } from 'vue-toastification'
import * as pdfMake from 'pdfmake/build/pdfmake'
import fonts from '@/makepdf/local-fonts'

import { GenerateParagraphOptions } from '@/types/pdf'
import { ContextState, ContextStatePageContent } from '@/types/context'
import { useRaw } from './raw'
import { nextTick } from 'vue'
import { useEnv } from './env'

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
    const headingOne = (raw: string, store: Store<any>) => {
      return {
        text: raw,
        margin: [0, 45],
        pageBreak: store.state.pdf.styles.headingOne.breakPage
          ? 'before'
          : undefined,
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
            _raw = paragraph((entity as any).raw, { stack: false, indent: 2 })
          } else if ((entity as any).type === 'heading-one') {
            _raw = headingOne((entity as any).raw, store)
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

    const base = (store: Store<any>): Record<string, any> => {
      return {
        pageSize: store.state.pdf.styles.base.pageSize,
        pageOrientation: store.state.pdf.styles.base.pageOrientation,
        pageMargins: [
          store.state.pdf.styles.base.pageMargins.left,
          store.state.pdf.styles.base.pageMargins.top,
          store.state.pdf.styles.base.pageMargins.right,
          store.state.pdf.styles.base.pageMargins.bottom,
        ],
      }
    }

    const styles = (store: Store<any>): Record<string, any> => {
      const paragraph = () => {
        let decorationStyle
        let decoration

        if (store.state.pdf.styles.paragraph.decorationStyle === 'none') {
          decorationStyle = undefined
        } else {
          decorationStyle = store.state.pdf.styles.paragraph.decorationStyle
        }

        if (store.state.pdf.styles.paragraph.decoration === 'none') {
          decoration = undefined
        } else {
          decoration = store.state.pdf.styles.paragraph.decoration
        }

        return {
          font: store.state.pdf.styles.paragraph.font,
          fontSize: store.state.pdf.styles.paragraph.fontSize,
          lineHeight: store.state.pdf.styles.paragraph.lineHeight,
          alignment: store.state.pdf.styles.paragraph.alignment,
          characterSpacing: store.state.pdf.styles.paragraph.characterSpacing,
          color: store.state.pdf.styles.paragraph.color,
          background: store.state.pdf.styles.paragraph.background,
          decoration: decoration,
          decorationStyle: decorationStyle,
          decorationColor: store.state.pdf.styles.paragraph.decorationColor,
        }
      }

      const headingOne = () => {
        let decorationStyle
        let decoration

        if (store.state.pdf.styles.paragraph.decorationStyle === 'none') {
          decorationStyle = undefined
        } else {
          decorationStyle = store.state.pdf.styles.paragraph.decorationStyle
        }

        if (store.state.pdf.styles.paragraph.decoration === 'none') {
          decoration = undefined
        } else {
          decoration = store.state.pdf.styles.paragraph.decoration
        }

        return {
          font: store.state.pdf.styles.headingOne.font,
          fontSize: store.state.pdf.styles.headingOne.fontSize,
          lineHeight: store.state.pdf.styles.headingOne.lineHeight,
          bold: store.state.pdf.styles.headingOne.bold,
          italics: store.state.pdf.styles.headingOne.italics,
          alignment: store.state.pdf.styles.headingOne.alignment,
          characterSpacing: store.state.pdf.styles.headingOne.characterSpacing,
          color: store.state.pdf.styles.headingOne.color,
          background: store.state.pdf.styles.headingOne.background,
          decoration: decoration,
          decorationStyle: decorationStyle,
          decorationColor: store.state.pdf.styles.headingOne.decorationColor,
        }
      }

      const headingTwo = () => {
        let decorationStyle
        let decoration

        if (store.state.pdf.styles.paragraph.decorationStyle === 'none') {
          decorationStyle = undefined
        } else {
          decorationStyle = store.state.pdf.styles.paragraph.decorationStyle
        }

        if (store.state.pdf.styles.paragraph.decoration === 'none') {
          decoration = undefined
        } else {
          decoration = store.state.pdf.styles.paragraph.decoration
        }

        return {
          font: store.state.pdf.styles.headingTwo.font,
          fontSize: store.state.pdf.styles.headingTwo.fontSize,
          lineHeight: store.state.pdf.styles.headingTwo.lineHeight,
          bold: store.state.pdf.styles.headingTwo.bold,
          italics: store.state.pdf.styles.headingTwo.italics,
          alignment: store.state.pdf.styles.headingTwo.alignment,
          characterSpacing: store.state.pdf.styles.headingTwo.characterSpacing,
          color: store.state.pdf.styles.headingTwo.color,
          background: store.state.pdf.styles.headingTwo.background,
          decoration: decoration,
          decorationStyle: decorationStyle,
          decorationColor: store.state.pdf.styles.headingTwo.decorationColor,
        }
      }

      const headingThree = () => {
        let decorationStyle
        let decoration

        if (store.state.pdf.styles.paragraph.decorationStyle === 'none') {
          decorationStyle = undefined
        } else {
          decorationStyle = store.state.pdf.styles.paragraph.decorationStyle
        }

        if (store.state.pdf.styles.paragraph.decoration === 'none') {
          decoration = undefined
        } else {
          decoration = store.state.pdf.styles.paragraph.decoration
        }

        return {
          font: store.state.pdf.styles.headingThree.font,
          fontSize: store.state.pdf.styles.headingThree.fontSize,
          lineHeight: store.state.pdf.styles.headingThree.lineHeight,
          bold: store.state.pdf.styles.headingThree.bold,
          italics: store.state.pdf.styles.headingThree.italics,
          alignment: store.state.pdf.styles.headingThree.alignment,
          characterSpacing:
            store.state.pdf.styles.headingThree.characterSpacing,
          color: store.state.pdf.styles.headingThree.color,
          background: store.state.pdf.styles.headingThree.background,
          decoration: decoration,
          decorationStyle: decorationStyle,
          decorationColor: store.state.pdf.styles.headingThree.decorationColor,
        }
      }

      return {
        paragraph,
        headingOne,
        headingTwo,
        headingThree,
      }
    }

    return { content, styles, base }
  }

  const create: Callback<any> = (store: Store<any>): Promise<void> => {
    return new Promise((resolve) => {
      resolve(
        pdfMake
          .createPdf({
            pageSize: generate().base(store).pageSize,
            pageOrientation: generate().base(store).pageOrientation,
            pageMargins: {
              left: generate().base(store).pageMargins[0],
              top: generate().base(store).pageMargins[1],
              right: generate().base(store).pageMargins[2],
              bottom: generate().base(store).pageMargins[3],
            },
            info: {
              title: store.state.project.name,
              author: 'TODO',
              subject: store.state.project.version,
              keywords: '',
            },
            content: generate().content(store),
            styles: {
              'heading-three': generate().styles(store).headingThree(),
              'heading-two': generate().styles(store).headingTwo(),
              'heading-one': generate().styles(store).headingOne(),
              paragraph: generate().styles(store).paragraph(),
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
      if (useEnv().isEmptyProject(store.state.project.name)) return

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
