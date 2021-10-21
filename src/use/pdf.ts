import { Callback } from '@/types/utils'
import { useToast } from 'vue-toastification'
import * as pdfMake from 'pdfmake/build/pdfmake'
import { GenerateParagraphOptions } from '@/types/pdf'
import { ContextState, Entity } from '@/types/context'
import { useRaw } from './raw'
import { useEnv } from './env'
import { useFonts } from './google/fonts'
import { useDefines } from './defines'
import useEmitter from './emitter'
import { useI18n } from 'vue-i18n'
import { nextTick } from 'vue'
import { useProject } from './project'
import { useProjectStore } from '@/store/project'
import { usePDFStore } from '@/store/pdf'
import { useAbsoluteStore } from '@/store/absolute'

export const usePDF = () => {
  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const PDF = usePDFStore()

  const toast = useToast()
  const emitter = useEmitter()
  const env = useEnv()
  const project = useProject()
  const { t } = useI18n()

  const init: Callback<any> = async () => {
    const { normalize, names } = await useFonts().get()

    PDF.loadFonts({ names, normalize })
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
          PDF.styles.headingOne.breakPage && !project.isBlankProject()
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
            PDF.styles.base.pageSize
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
      if (PDF.styles.switcher.cover) {
        if (!PDF.styles.base.background.data) return

        let _raw = {
          image: PDF.styles.base.background.data,
          pageBreak: 'after',
          width: useDefines().pdf().base().pageSizeFixes()[
            PDF.styles.base.pageSize
          ][0],
          height: useDefines().pdf().base().pageSizeFixes()[
            PDF.styles.base.pageSize
          ][1],
        }

        arr.push(_raw)
      } else {
        let _title = {
          text: PROJECT.nameRaw,
          fontSize: 42,
          font: PDF.styles.headingOne.font,
          alignment: 'center',
          margin: [0, 50],
        }

        let _subject = {
          text: PROJECT.subject,
          fontSize: 11,
          font: PDF.styles.paragraph.font,
          margin: [
            generate().base().pageMargins[0],
            50,
            generate().base().pageMargins[2],
            0,
          ],
          alignment: 'center',
        }

        let _creator = {
          text: PROJECT.creator,
          fontSize: 11,
          font: PDF.styles.paragraph.font,
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
          text: PROJECT.creator,
          fontSize: 11,
          font: PDF.styles.paragraph.font,
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
      const pages: Array<ContextState> = PROJECT.pages
      const arr: Array<any> = []

      if (!project.isBlankProject()) frontCover(arr)

      pages.forEach((page: ContextState) => {
        page.entities.forEach((entity: Entity) => {
          let _raw = {}

          if (entity.raw === env.emptyLine()) {
            _raw = lineBreak(5)
            arr.push(_raw)
            return
          }

          if ((entity as any).type === 'paragraph') {
            _raw = paragraph((entity as any).raw, {
              stack: false,
              indent: PDF.styles.paragraph.indent,
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
        pageSize: PDF.styles.base.pageSize,
        pageOrientation: PDF.styles.base.pageOrientation,
        pageMargins: [
          PDF.styles.base.pageMargins.left,
          PDF.styles.base.pageMargins.top,
          PDF.styles.base.pageMargins.right,
          PDF.styles.base.pageMargins.bottom,
        ],
      }
    }

    const styles = (): Record<string, any> => {
      const paragraph = () => {
        let decorationStyle
        let decoration

        if (PDF.styles.paragraph.decorationStyle === 'none') {
          decorationStyle = undefined
        } else {
          decorationStyle = PDF.styles.paragraph.decorationStyle
        }

        if (PDF.styles.paragraph.decoration === 'none') {
          decoration = undefined
        } else {
          decoration = PDF.styles.paragraph.decoration
        }

        return {
          font: PDF.styles.paragraph.font,
          fontSize: PDF.styles.paragraph.fontSize,
          lineHeight: PDF.styles.paragraph.lineHeight,
          alignment: PDF.styles.paragraph.alignment,
          characterSpacing: PDF.styles.paragraph.characterSpacing,
          color: PDF.styles.paragraph.color,
          decoration: decoration,
          decorationStyle: decorationStyle,
          decorationColor: PDF.styles.paragraph.decorationColor,
        }
      }

      const headingOne = () => {
        let decorationStyle
        let decoration

        if (PDF.styles.paragraph.decorationStyle === 'none') {
          decorationStyle = undefined
        } else {
          decorationStyle = PDF.styles.paragraph.decorationStyle
        }

        if (PDF.styles.paragraph.decoration === 'none') {
          decoration = undefined
        } else {
          decoration = PDF.styles.paragraph.decoration
        }

        return {
          font: PDF.styles.headingOne.font,
          fontSize: PDF.styles.headingOne.fontSize,
          lineHeight: PDF.styles.headingOne.lineHeight,
          bold: PDF.styles.headingOne.bold,
          italics: PDF.styles.headingOne.italics,
          alignment: PDF.styles.headingOne.alignment,
          characterSpacing: PDF.styles.headingOne.characterSpacing,
          color: PDF.styles.headingOne.color,
          decoration: decoration,
          decorationStyle: decorationStyle,
          decorationColor: PDF.styles.headingOne.decorationColor,
        }
      }

      const headingTwo = () => {
        let decorationStyle
        let decoration

        if (PDF.styles.paragraph.decorationStyle === 'none') {
          decorationStyle = undefined
        } else {
          decorationStyle = PDF.styles.paragraph.decorationStyle
        }

        if (PDF.styles.paragraph.decoration === 'none') {
          decoration = undefined
        } else {
          decoration = PDF.styles.paragraph.decoration
        }

        return {
          font: PDF.styles.headingTwo.font,
          fontSize: PDF.styles.headingTwo.fontSize,
          lineHeight: PDF.styles.headingTwo.lineHeight,
          bold: PDF.styles.headingTwo.bold,
          italics: PDF.styles.headingTwo.italics,
          alignment: PDF.styles.headingTwo.alignment,
          characterSpacing: PDF.styles.headingTwo.characterSpacing,
          color: PDF.styles.headingTwo.color,
          decoration: decoration,
          decorationStyle: decorationStyle,
          decorationColor: PDF.styles.headingTwo.decorationColor,
        }
      }

      const headingThree = () => {
        let decorationStyle
        let decoration

        if (PDF.styles.paragraph.decorationStyle === 'none') {
          decorationStyle = undefined
        } else {
          decorationStyle = PDF.styles.paragraph.decorationStyle
        }

        if (PDF.styles.paragraph.decoration === 'none') {
          decoration = undefined
        } else {
          decoration = PDF.styles.paragraph.decoration
        }

        return {
          font: PDF.styles.headingThree.font,
          fontSize: PDF.styles.headingThree.fontSize,
          lineHeight: PDF.styles.headingThree.lineHeight,
          bold: PDF.styles.headingThree.bold,
          italics: PDF.styles.headingThree.italics,
          alignment: PDF.styles.headingThree.alignment,
          characterSpacing: PDF.styles.headingThree.characterSpacing,
          color: PDF.styles.headingThree.color,
          decoration: decoration,
          decorationStyle: decorationStyle,
          decorationColor: PDF.styles.headingThree.decorationColor,
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
        title: PROJECT.name,
        author: 'TODO',
        subject: PROJECT.subject,
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
              PDF.styles.base.background.main &&
              PDF.styles.switcher.main
              ? [
                  {
                    image: PDF.styles.base.background.main,
                    width: useDefines().pdf().base().pageSizeFixes()[
                      PDF.styles.base.pageSize
                    ][0],
                    height: useDefines().pdf().base().pageSizeFixes()[
                      PDF.styles.base.pageSize
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

    fonts.push(PDF.styles.paragraph.font)
    fonts.push(PDF.styles.headingOne.font)
    fonts.push(PDF.styles.headingTwo.font)
    fonts.push(PDF.styles.headingThree.font)

    const unique = fonts.filter((v, i, a) => a.indexOf(v) === i)

    unique.forEach((s: string) => {
      set[s] = PDF.normalize[s]
    })

    if (PDF.normalize['Roboto'])
      set['Roboto'] = PDF.normalize['Roboto']

      // @ts-ignore
    ;(<any>pdfMake).fonts = set
  }

  const create = (): void => {
    setVfsFonts()

    const pdf = pdfMake.createPdf(doc({ final: true }))

    pdf.download(`${PROJECT.nameRaw}.pdf`, () => {
      toast.success(t('toast.pdf.create'))

      ABSOLUTE.load = false
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

      ABSOLUTE.load = false
    })
  }

  const external = () => {
    const onGeneratePDF = async () => {
      if (useEnv().isEmptyProject(PROJECT.name)) return

      toast.info(t('toast.generics.load'))

      ABSOLUTE.load = true

      create()
    }

    const onPreviewPDF = async (input: HTMLElement) => {
      if (useEnv().isEmptyProject(PROJECT.name)) return

      ABSOLUTE.load = true

      preview(input)
    }

    return { onGeneratePDF, onPreviewPDF }
  }

  return { init, create, external, preview }
}
