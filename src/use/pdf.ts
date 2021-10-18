import { Callback } from '@/types/utils'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import * as pdfMake from 'pdfmake/build/pdfmake'
import { GenerateParagraphOptions } from '@/types/pdf'
import { ContextState, ContextStatePageContent } from '@/types/context'
import { useRaw } from './raw'
import { useEnv } from './env'
import { useFonts } from './google/fonts'
import { useDefines } from './defines'
import useEmitter from './emitter'
import { useI18n } from 'vue-i18n'
import { nextTick } from 'vue'
import { useProject } from './project'

export const usePDF = () => {
  const store = useStore()
  const toast = useToast()
  const emitter = useEmitter()
  const env = useEnv()
  const project = useProject()
  const { t } = useI18n()

  const init: Callback<any> = async () => {
    const { normalize, names } = await useFonts().get()

    store.commit('pdf/loadFonts', { names, normalize })
  }

  const generate: Callback<any> = () => {
    const headingOne = (raw: string) => {
      return {
        text: raw,
        margin: [
          generate().base().pageMargins[0],
          45,
          generate().base().pageMargins[2],
          45,
        ],
        pageBreak:
          store.state.pdf.styles.headingOne.breakPage &&
          !project.isBlankProject()
            ? 'before'
            : undefined,
        style: 'heading-one',
      }
    }

    const headingTwo = (raw: string) => {
      return {
        text: raw,
        margin: [
          generate().base().pageMargins[0],
          25,
          generate().base().pageMargins[2],
          25,
        ],
        style: 'heading-two',
      }
    }

    const headingThree = (raw: string) => {
      return {
        text: raw,
        margin: [
          generate().base().pageMargins[0],
          15,
          generate().base().pageMargins[2],
          15,
        ],
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
        margin: [
          generate().base().pageMargins[0],
          0,
          generate().base().pageMargins[2],
          0,
        ],
      }
    }

    const pageBreak = () => {
      return {
        text: '',
        style: 'page-break',
        pageBreak: 'after',
      }
    }

    const lineBreak = (value = 10) => {
      return {
        text: '',
        margin: [0, value],
        style: 'line-break',
      }
    }

    const image = (raw: string) => {
      return {
        image: raw,
        width:
          useDefines().pdf().base().pageSizeFixes()[
            store.state.pdf.styles.base.pageSize
          ][0] -
          generate().base().pageMargins[0] -
          generate().base().pageMargins[2],
        margin: [
          generate().base().pageMargins[0],
          10,
          generate().base().pageMargins[2],
          10,
        ],
      }
    }

    const frontCover = (arr: Array<any>) => {
      if (store.state.pdf.styles.switcher.cover) {
        if (!store.state.pdf.styles.base.background.data) return

        let _raw = {
          image: store.state.pdf.styles.base.background.data,
          pageBreak: 'after',
          width: useDefines().pdf().base().pageSizeFixes()[
            store.state.pdf.styles.base.pageSize
          ][0],
          height: useDefines().pdf().base().pageSizeFixes()[
            store.state.pdf.styles.base.pageSize
          ][1],
        }

        arr.push(_raw)
      } else {
        let _title = {
          text: store.state.project.nameRaw,
          fontSize: 42,
          font: store.state.pdf.styles.headingOne.font,
          alignment: 'center',
          margin: [0, 50],
        }

        let _subject = {
          text: store.state.project.subject,
          fontSize: 11,
          font: store.state.pdf.styles.paragraph.font,
          margin: [
            generate().base().pageMargins[0],
            50,
            generate().base().pageMargins[2],
            0,
          ],
          alignment: 'center',
        }

        let _creator = {
          text: store.state.project.creator,
          fontSize: 11,
          font: store.state.pdf.styles.paragraph.font,
          margin: [
            generate().base().pageMargins[0],
            250,
            generate().base().pageMargins[2],
            0,
          ],
          alignment: 'left',
          pageBreak: 'after',
        }

        /*
        let _version = {
          text: store.state.project.creator,
          fontSize: 11,
          font: store.state.pdf.styles.paragraph.font,
          margin: [10, 10],
          alignment: 'left',
        }
        */

        arr.push(_title)
        arr.push(_subject)
        arr.push(_creator)
      }
    }

    const content = (): Array<any> => {
      const pages: Array<ContextState> = store.state.project.pages
      const arr: Array<any> = []

      if (!project.isBlankProject()) frontCover(arr)

      pages.forEach((page: ContextState) => {
        page.entity.forEach((entity: ContextStatePageContent) => {
          let _raw = {}

          if (entity.raw === env.emptyLine()) {
            _raw = lineBreak(5)
            arr.push(_raw)
            return
          }

          if ((entity as any).type === 'paragraph') {
            _raw = paragraph((entity as any).raw, {
              stack: false,
              indent: store.state.pdf.styles.paragraph.indent,
            })
          } else if ((entity as any).type === 'heading-one') {
            _raw = headingOne((entity as any).raw)
          } else if ((entity as any).type === 'heading-two') {
            _raw = headingTwo((entity as any).raw)
          } else if ((entity as any).type === 'heading-three') {
            _raw = headingThree((entity as any).raw)
          } else if ((entity as any).type === 'page-break') {
            _raw = pageBreak()
          } else if ((entity as any).type === 'line-break') {
            _raw = lineBreak()
          } else if ((entity as any).type === 'image') {
            _raw = image((entity as any).raw)
          }

          arr.push(_raw)
        })
      })

      return arr
    }

    const base = (): Record<string, any> => {
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

    const styles = (): Record<string, any> => {
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

  const doc = (options: Record<any, any>) => {
    return {
      pageSize: generate().base().pageSize,
      pageOrientation: generate().base().pageOrientation,
      pageMargins: {
        left: 0,
        top: 0,
        right: 0,
        bottom: generate().base().pageMargins[3],
      },
      info: {
        title: store.state.project.name,
        author: 'TODO',
        subject: store.state.project.subject,
        keywords: '',
      },
      content: generate().content(),
      styles: {
        'heading-three': generate().styles().headingThree(),
        'heading-two': generate().styles().headingTwo(),
        'heading-one': generate().styles().headingOne(),
        paragraph: generate().styles().paragraph(),
      },
      background: options.final
        ? function (currentPage: number) {
            return currentPage >= 3 &&
              store.state.pdf.styles.base.background.main &&
              store.state.pdf.styles.switcher.main
              ? [
                  {
                    image: store.state.pdf.styles.base.background.main,
                    width: useDefines().pdf().base().pageSizeFixes()[
                      store.state.pdf.styles.base.pageSize
                    ][0],
                    height: useDefines().pdf().base().pageSizeFixes()[
                      store.state.pdf.styles.base.pageSize
                    ][1],
                  },
                ]
              : undefined
          }
        : undefined,
      footer: function (
        currentPage: number,
        pageCount: number,
        pageSize: number
      ) {
        return [
          {
            text: currentPage > 2 ? currentPage.toString() : '',
            margin: [15, 0],
            fontSize: 9,
            alignment: currentPage % 2 ? 'left' : 'right',
          },
        ]
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
    }
  }

  const setVfsFonts = () => {
    const fonts: Array<string> = []
    const set: Record<string, any> = {}

    fonts.push(store.state.pdf.styles.paragraph.font)
    fonts.push(store.state.pdf.styles.headingOne.font)
    fonts.push(store.state.pdf.styles.headingTwo.font)
    fonts.push(store.state.pdf.styles.headingThree.font)

    const unique = fonts.filter((v, i, a) => a.indexOf(v) === i)

    unique.forEach((s: string) => {
      set[s] = store.state.pdf.normalize[s]
    })

    if (store.state.pdf.normalize['Roboto'])
      set['Roboto'] = store.state.pdf.normalize['Roboto']

      // @ts-ignore
    ;(<any>pdfMake).fonts = set
  }

  const create = (): void => {
    setVfsFonts()

    const pdf = pdfMake.createPdf(doc({ final: true }))

    pdf.download(`${store.state.project.nameRaw}.pdf`, () => {
      toast.success(t('toast.pdf.create'))

      store.commit('absolute/load', false)
    })
  }

  const preview = (input: HTMLElement): void => {
    setVfsFonts()

    const generator = pdfMake.createPdf(doc({ final: false }))

    generator.getDataUrl(async (dataUrl: any) => {
      const iframe = document.createElement('iframe')

      emitter.emit('pdf-preview-exists')

      await nextTick

      iframe.src = dataUrl
      iframe.style.width = '400px'
      iframe.style.height = '500px'
      iframe.style.overflow = 'hidden'

      let child = input.lastElementChild
      while (child) {
        input.removeChild(child)
        child = input.lastElementChild
      }

      input.appendChild(iframe)

      store.commit('absolute/load', false)
    })
  }

  const external = () => {
    const onGeneratePDF = async () => {
      if (useEnv().isEmptyProject(store.state.project.name)) return

      toast.info(t('toast.generics.load'))

      store.commit('absolute/load', true)

      create()
    }

    const onPreviewPDF = async (input: HTMLElement) => {
      if (useEnv().isEmptyProject(store.state.project.name)) return

      store.commit('absolute/load', true)

      preview(input)
    }

    return { onGeneratePDF, onPreviewPDF }
  }

  return { init, create, external, preview }
}
