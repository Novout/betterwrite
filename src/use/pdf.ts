import { Callback } from '@/types/utils'
import { useToast } from 'vue-toastification'
import * as pdfMake from 'pdfmake/build/pdfmake'
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
import { useStorage } from './storage/storage'
import { useNProgress } from '@vueuse/integrations'

export const usePDF = () => {
  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const PDF = usePDFStore()

  const toast = useToast()
  const emitter = useEmitter()
  const env = useEnv()
  const project = useProject()
  const storage = useStorage()
  const { isLoading } = useNProgress()
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
        tocItem:
          PDF.styles.switcher.summary &&
          PDF.styles.base.summary.type === 'default',
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
        tocItem:
          PDF.styles.switcher.summary &&
          project.isBlankProject() &&
          PDF.styles.base.summary.type === 'default',
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

    const paragraph = (raw: string) => {
      let indent = ''

      for (let i = 0; i < PDF.styles.paragraph.indent; i++) {
        indent += '\t'
      }

      return {
        text: useRaw()
          .v2()
          .purge()
          .pdf(indent + raw),
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

    const image = (entity: Entity) => {
      if (entity.external?.image?.alignment === 'full') {
        if (entity.external.image.name.includes('svg')) {
          return {
            svg: entity.raw,
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

        return {
          image: entity.raw,
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
      } else {
        if (entity.external?.image?.name.includes('svg')) {
          return {
            svg: entity.raw,
            width: entity.external?.image?.size.width,
            height: entity.external?.image?.size.height,
            alignment: entity.external?.image?.alignment,
            margin: [
              entity.external?.image?.alignment === 'center'
                ? 0
                : generate().base().pageMargins[0] / 2,
              10,
              entity.external?.image?.alignment === 'right' ||
              entity.external?.image?.alignment === 'center'
                ? 0
                : generate().base().pageMargins[2] / 2,
              10,
            ],
          }
        }

        return {
          image: entity.raw,
          width: entity.external?.image?.size.width,
          height: entity.external?.image?.size.height,
          alignment: entity.external?.image?.alignment,
          margin: [
            entity.external?.image?.alignment === 'center'
              ? 0
              : generate().base().pageMargins[0],
            10,
            entity.external?.image?.alignment === 'right' ||
            entity.external?.image?.alignment === 'center'
              ? 0
              : generate().base().pageMargins[2],
            10,
          ],
        }
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

    const summary = (arr: Array<any>) => {
      if (PDF.styles.switcher.summary) {
        let _raw = {
          toc: {
            title: {
              text: PROJECT.nameRaw,
              font: PDF.styles.base.summary.fontFamily,
              fontSize: PDF.styles.base.summary.fontSize,
            },
          },
          pageBreak: 'before',
          alignment: 'center',
          font: PDF.styles.base.summary.fontFamily,
          style: 'summary-default',
        }

        arr.push(_raw)
      }
    }

    const content = (): Array<any> => {
      const pages: Array<ContextState> = PROJECT.pages
      const arr: Array<any> = []

      if (project.isCreativeProject()) {
        frontCover(arr)
        summary(arr)
      }

      pages.forEach((page: ContextState) => {
        page.entities.forEach((entity: Entity) => {
          let _raw = {}

          if (entity.raw === env.emptyLine()) {
            _raw = lineBreak(5)
            arr.push(_raw)
            return
          }

          if ((entity as any).type === 'paragraph') {
            _raw = paragraph(entity.raw)
          } else if (entity.type === 'heading-one') {
            _raw = headingOne(entity.raw)
          } else if (entity.type === 'heading-two') {
            _raw = headingTwo(entity.raw)
          } else if (entity.type === 'heading-three') {
            _raw = headingThree((entity as any).raw)
          } else if (entity.type === 'page-break') {
            _raw = pageBreak()
          } else if (entity.type === 'line-break') {
            _raw = lineBreak()
          } else if (entity.type === 'image') {
            _raw = image(entity)
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

      const summaryDefault = () => {
        return {
          margin: [
            generate().base().pageMargins[0],
            30,
            generate().base().pageMargins[2],
            30,
          ],
        }
      }

      return {
        paragraph,
        headingOne,
        headingTwo,
        headingThree,
        summaryDefault,
      }
    }

    return { content, styles, base }
  }

  const doc = (options: Record<any, any>) => {
    const encrypt = () => {
      return PDF.styles.switcher.encryption
        ? {
            userPassword: PROJECT.pdf.encryption.userPassword,
            ownerPassword: PROJECT.pdf.encryption.ownerPassword,
            permissions: {
              printing: PROJECT.pdf.permissions.printing,
              modifying: PROJECT.pdf.permissions.modifying,
              copying: PROJECT.pdf.permissions.copying,
              annotating: PROJECT.pdf.permissions.annotating,
              fillingForms: PROJECT.pdf.permissions.fillingForms,
              contentAccessibility:
                PROJECT.pdf.permissions.contentAccessibility,
              documentAssembly: PROJECT.pdf.permissions.documentAssembly,
            },
          }
        : {}
    }

    const page = () => {
      return {
        pageSize: generate().base().pageSize,
        pageOrientation: generate().base().pageOrientation,
        pageMargins: {
          left: 0,
          top: generate().base().pageMargins[1],
          right: 0,
          bottom: generate().base().pageMargins[3],
        },
      }
    }

    const info = () => {
      return {
        info: {
          title: PROJECT.name,
          author: PROJECT.creator,
          subject: PROJECT.subject,
          producer: PROJECT.producer,
          keywords: PROJECT.keywords,
        },
      }
    }

    const content = () => {
      return {
        content: generate().content(),
        styles: {
          'heading-three': generate().styles().headingThree(),
          'heading-two': generate().styles().headingTwo(),
          'heading-one': generate().styles().headingOne(),
          'summary-default': generate().styles().summaryDefault(),
          paragraph: generate().styles().paragraph(),
        },
      }
    }

    const footer = () => {
      const text = (
        currentPage: number,
        pageCount: number,
        pageSize: number
      ) => {
        return currentPage >= PDF.styles.base.footer.start
          ? PDF.styles.base.footer.textType === 'simple'
            ? currentPage.toString()
            : `${currentPage.toString()}/${pageCount}`
          : ''
      }

      const alignment = (
        currentPage: number,
        pageCount: number,
        pageSize: number
      ) => {
        if (PDF.styles.base.footer.alignment === 'default') {
          return currentPage % 2 ? 'left' : 'right'
        }

        if (PDF.styles.base.footer.alignment === 'center') {
          return 'center'
        }

        if (PDF.styles.base.footer.alignment === 'left') {
          return 'left'
        }

        if (PDF.styles.base.footer.alignment === 'right') {
          return 'right'
        }
      }

      return { document, alignment, text }
    }

    const header = () => {
      PDF.styles.base.header.content
      const text = (
        currentPage: number,
        pageCount: number,
        pageSize: number
      ) => {
        return currentPage >= PDF.styles.base.header.start
          ? PDF.styles.base.header.content
          : ''
      }

      const alignment = (
        currentPage: number,
        pageCount: number,
        pageSize: number
      ) => {
        if (PDF.styles.base.header.alignment === 'default') {
          return currentPage % 2 ? 'left' : 'right'
        }

        if (PDF.styles.base.header.alignment === 'center') {
          return 'center'
        }

        if (PDF.styles.base.header.alignment === 'left') {
          return 'left'
        }

        if (PDF.styles.base.header.alignment === 'right') {
          return 'right'
        }
      }

      return { alignment, text }
    }

    const addons = () => {
      return {
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
        footer: PDF.styles.switcher.footer
          ? function (
              currentPage: number,
              pageCount: number,
              pageSize: number
            ) {
              return [
                {
                  text: footer().text(currentPage, pageCount, pageSize),
                  margin: [15, 0],
                  fontSize: PDF.styles.base.footer.textSize,
                  font: PDF.styles.base.footer.fontFamily,
                  alignment: footer().alignment(
                    currentPage,
                    pageCount,
                    pageSize
                  ),
                },
              ]
            }
          : undefined,
        header: PDF.styles.switcher.header
          ? function (currentPage: number, pageCount: number, pageSize: any) {
              return [
                {
                  text: header().text(currentPage, pageCount, pageSize),
                  fontSize: PDF.styles.base.header.textSize,
                  font: PDF.styles.base.header.fontFamily,
                  decoration: 'underline',
                  alignment: header().alignment(
                    currentPage,
                    pageCount,
                    pageSize
                  ),
                },
              ]
            }
          : undefined,
        pageBreakBefore: function (
          currentNode: any,
          followingNodesOnPage: any,
          nodesOnNextPage: any,
          previousNodesOnPage: any
        ) {
          if (
            currentNode.id === 'signature' &&
            (currentNode.pageNumbers.length != 1 ||
              currentNode.pageNumbers[0] != currentNode.pages)
          ) {
            return true
          } else if (
            currentNode.id === 'closingParagraph' &&
            currentNode.pageNumbers.length != 1
          ) {
            return true
          }
          return false
        },
      }
    }

    return {
      ...encrypt(),
      ...page(),
      ...info(),
      ...content(),
      ...addons(),
    }
  }

  const setVfsFonts = () => {
    const fonts: Array<string> = []
    const set: Record<string, any> = {}

    fonts.push(PDF.styles.paragraph.font)
    fonts.push(PDF.styles.headingOne.font)
    fonts.push(PDF.styles.headingTwo.font)
    fonts.push(PDF.styles.headingThree.font)
    fonts.push(PDF.styles.base.header.fontFamily)
    fonts.push(PDF.styles.base.footer.fontFamily)
    fonts.push(PDF.styles.base.summary.fontFamily)

    const unique = fonts.filter((v, i, a) => a.indexOf(v) === i)

    unique.forEach((s: string) => {
      set[s] = PDF.normalize[s]
    })

    if (PDF.normalize['Roboto']) set['Roboto'] = PDF.normalize['Roboto']
    ;(pdfMake as any).fonts = set
  }

  const create = () => {
    setVfsFonts()

    const pdf = pdfMake.createPdf(doc({ final: true }))

    new Promise((res) => {
      pdf.download(`${PROJECT.nameRaw}.pdf`, () => {
        res(toast.success(t('toast.pdf.create')))
      })
    }).finally(() => {
      ABSOLUTE.load = false
      isLoading.value = false
    })
  }

  const preview = (input: HTMLElement) => {
    setVfsFonts()

    new Promise((res) => {
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

        res(input.appendChild(iframe))
      })
    }).finally(() => {
      ABSOLUTE.load = false
      isLoading.value = false
    })
  }

  const external = () => {
    const onGeneratePDF = async () => {
      if (useEnv().isEmptyProject(PROJECT.name)) return

      toast.info(t('toast.generics.load'))

      ABSOLUTE.load = true
      isLoading.value = true

      storage.normalize().then(() => {
        create()
      })
    }

    const onPreviewPDF = async (input: HTMLElement) => {
      if (useEnv().isEmptyProject(PROJECT.name)) return

      ABSOLUTE.load = true
      isLoading.value = true

      storage.normalize().then(() => {
        preview(input)
      })
    }

    const onConfigurationPDF = () => {
      ABSOLUTE.pdf.configuration = true
    }

    return { onGeneratePDF, onPreviewPDF, onConfigurationPDF }
  }

  return { init, create, external, preview }
}
