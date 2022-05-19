import { usePDF } from 'vue3-pdfmake'
import { On } from 'better-write-plugin-core'
import {
  ContextState,
  Entity,
  PDFDocOptions,
  PluginTypes,
} from 'better-write-types'
import { nextTick, computed } from 'vue-demi'
import { useNProgress } from '@vueuse/integrations'
import { useToast } from 'vue-toastification'
import { getPDFUtils } from 'better-write-plugin-theme'
import { useOnline } from '@vueuse/core'
import { getStandardVFS } from './vfs'
import { Maybe } from 'better-write-types'

export const PluginPDFSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  let __FIRST__HEADING__ONE__ = true
  let __LIST__: any = {
    arr: [],
    exists: false,
  }

  const { isLoading } = useNProgress()
  const toast = useToast()
  const online = useOnline()
  const pdfmake = usePDF().default

  const isTheme = computed(() => stores.PDF.styles.switcher.theme)

  const utils = () => {
    const isOnline = () => {
      return online.value && stores.PDF.normalize.length !== 0
    }

    const correctFontInject = (font: string) => {
      return isOnline() ? font : 'Roboto'
    }

    return { isOnline, correctFontInject }
  }

  const transform = () => {
    const pageOrientation = (b: string) => {
      let value: Maybe<string> = null
      let __STOP__: boolean = false

      hooks.i18n.availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = hooks.i18n.getLocaleMessage(locale)

        switch (b) {
          case editor.pdf.configuration.orientation.portrait:
            __STOP__ = true
            value = 'portrait'
            break
          case editor.pdf.configuration.orientation.landscape:
            __STOP__ = true
            value = 'landscape'
            break
          default:
            __STOP__ = false
        }
      })

      return value
    }

    const footerStyle = (b: string) => {
      let value: Maybe<string> = null
      let __STOP__: boolean = false

      hooks.i18n.availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = hooks.i18n.getLocaleMessage(locale)

        switch (b) {
          case editor.pdf.configuration.footer.style.simple:
            __STOP__ = true
            value = 'simple'
            break
          case editor.pdf.configuration.footer.style.counter:
            __STOP__ = true
            value = 'counter'
            break
          default:
            __STOP__ = false
        }
      })

      return value
    }

    const summaryStyle = (b: string) => {
      let value: Maybe<string> = null
      let __STOP__: boolean = false

      hooks.i18n.availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = hooks.i18n.getLocaleMessage(locale)

        switch (b) {
          case editor.pdf.configuration.summary.style.default:
            __STOP__ = true
            value = 'default'
            break
          default:
            __STOP__ = false
        }
      })

      return value
    }

    const alignment = (b: string): string => {
      let value: Maybe<string> = null
      let __STOP__: boolean = false

      hooks.i18n.availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = hooks.i18n.getLocaleMessage(locale)

        switch (b) {
          case editor.pdf.configuration.alignment.default:
            __STOP__ = true
            value = 'default'
            break
          case editor.pdf.configuration.alignment.left:
            __STOP__ = true
            value = 'left'
            break
          case editor.pdf.configuration.alignment.center:
            __STOP__ = true
            value = 'center'
            break
          case editor.pdf.configuration.alignment.right:
            __STOP__ = true
            value = 'right'
            break
          default:
            __STOP__ = false
        }
      })

      return value || b
    }

    const entityAlignment = (b: string): string => {
      let value: Maybe<string> = null
      let __STOP__: boolean = false

      hooks.i18n.availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = hooks.i18n.getLocaleMessage(locale)

        switch (b) {
          case editor.pdf.configuration.alignment.justify:
            __STOP__ = true
            value = 'justify'
            break
          case editor.pdf.configuration.alignment.left:
            __STOP__ = true
            value = 'left'
            break
          case editor.pdf.configuration.alignment.center:
            __STOP__ = true
            value = 'center'
            break
          case editor.pdf.configuration.alignment.right:
            __STOP__ = true
            value = 'right'
            break
          default:
            __STOP__ = false
        }
      })

      return value || b
    }

    return {
      pageOrientation,
      footerStyle,
      summaryStyle,
      alignment,
      entityAlignment,
    }
  }

  const getIndent = (entity?: Entity) => {
    if (!entity) return ''

    let indent = ''

    const quantity =
      entity.external?.paragraph?.active &&
      entity.external?.paragraph?.generator.indent
        ? entity.external?.paragraph?.generator.indent
        : stores.PDF.styles.paragraph.indent

    for (let i = 0; i < quantity; i++) {
      indent += ' '
    }

    return indent
  }

  const generate = () => {
    const { theme } = getPDFUtils()

    const headingOne = (entity: Entity) => {
      __FIRST__HEADING__ONE__ = false

      return {
        text: hooks.raw.v2().purge().pdf(entity.raw),
        margin: [
          generate().base().pageMargins[0],
          stores.PDF.styles.headingOne.margin.top,
          generate().base().pageMargins[2],
          stores.PDF.styles.headingOne.margin.bottom,
        ],
        pageBreak:
          stores.PDF.styles.headingOne.breakPage &&
          !hooks.project.isBlankProject() &&
          !__FIRST__HEADING__ONE__
            ? 'before'
            : undefined,
        style: 'heading-one',
        tocItem:
          stores.PDF.styles.switcher.summary &&
          transform().summaryStyle(stores.PDF.styles.base.summary.type) ===
            'default',
      }
    }

    const headingTwo = (entity: Entity) => {
      return {
        text: hooks.raw.v2().purge().pdf(entity.raw),
        margin: [
          generate().base().pageMargins[0],
          stores.PDF.styles.headingTwo.margin.top,
          generate().base().pageMargins[2],
          stores.PDF.styles.headingTwo.margin.bottom,
        ],
        style: 'heading-two',
        tocItem:
          stores.PDF.styles.switcher.summary &&
          hooks.project.isBlankProject() &&
          transform().summaryStyle(stores.PDF.styles.base.summary.type) ===
            'default',
      }
    }

    const headingThree = (entity: Entity) => {
      return {
        text: hooks.raw.v2().purge().pdf(entity.raw),
        margin: [
          generate().base().pageMargins[0],
          stores.PDF.styles.headingThree.margin.top,
          generate().base().pageMargins[2],
          stores.PDF.styles.headingThree.margin.bottom,
        ],
        style: 'heading-three',
      }
    }

    const paragraph = (entity: Entity) => {
      const obj = entity.external?.paragraph?.active
        ? {
            font: utils().correctFontInject(
              entity.external?.paragraph?.generator.font
            ),
            fontSize: entity.external?.paragraph?.generator.fontSize,
            lineHeight: entity.external?.paragraph?.generator.lineHeight,
            alignment: transform().entityAlignment(
              entity.external?.paragraph?.generator.alignment as any
            ),
            characterSpacing:
              entity.external?.paragraph?.generator.characterSpacing,
            color: entity.external?.paragraph?.generator.color,
            background: entity.external?.paragraph?.generator.background,
            italics: entity.external?.paragraph?.generator.italics,
            bold: entity.external?.paragraph?.generator.bold,
          }
        : {}

      let indent = ''

      const quantity =
        entity.external?.paragraph?.active &&
        entity.external?.paragraph?.generator.indent
          ? entity.external?.paragraph?.generator.indent
          : stores.PDF.styles.paragraph.indent

      for (let i = 0; i < quantity; i++) {
        if (entity.type === 'paragraph') {
          indent += '\t'
        }
      }

      if (entity.type === 'checkbox') indent += '\t'

      const getParagraphs = () => {
        return hooks.raw
          .v2()
          .block()
          .text()
          .parse(entity.raw)
          .map((row: string) => {
            return {
              text: hooks.raw
                .v2()
                .purge()
                .pdf(indent + (row ? row : ' ') + '\n'),
            }
          })
      }

      return {
        text: getParagraphs(),
        style: entity.external?.paragraph?.active ? 'none' : 'paragraph',
        preserveLeadingSpaces: true,
        margin: [
          generate().base().pageMargins[0],
          entity.external?.paragraph?.active
            ? entity.external.paragraph.generator.margin.top
            : stores.PDF.styles.paragraph.margin.top,
          generate().base().pageMargins[2],
          entity.external?.paragraph?.active
            ? entity.external.paragraph.generator.margin.bottom
            : stores.PDF.styles.paragraph.margin.bottom,
        ],
        ...obj,
      }
    }

    const list = async (entity: Entity) => {
      const p = await paragraph(entity)

      const indent = getIndent(entity)

      __LIST__.arr.push({
        text: p.text,
        style: entity.external?.paragraph?.active ? 'none' : 'text',
        font: p.font,
        fontSize: p.fontSize,
        characterSpacing: p.characterSpacing,
        margin: [
          generate().base().pageMargins[0] + indent.length * 10,
          0,
          0,
          0,
        ],
      })

      __LIST__.exists = true
    }

    const checkbox = async (entity: Entity) => {
      const p = await paragraph(entity)

      const indent = getIndent(entity)

      return {
        table: {
          widths: [1, 'auto'],
          body: [
            [
              {
                border: [false, false, false, false],
                margin: [
                  generate().base().pageMargins[0] + -4 + indent.length * 10,
                  0,
                  generate().base().pageMargins[2],
                  0,
                ],
                image: entity.external?.checkbox?.select
                  ? 'checked'
                  : 'unchecked',
                width: 15,
              },
              {
                border: [false, false, false, false],
                text: p.text,
                font: p.font,
                fontSize: p.fontSize,
                characterSpacing: p.characterSpacing,
                style: entity.external?.paragraph?.active ? 'none' : 'text',
                margin: [p.margin[0] + 7 + indent.length * 10, 0, 0, 0],
              },
            ],
          ],
        },
      }
    }

    const pageBreak = () => {
      return {
        text: '',
        style: 'page-break',
        pageBreak: 'after',
      }
    }

    const lineBreak = (fixed: boolean = true) => {
      if (
        stores.PDF.styles.lineBreak.image.data &&
        stores.PDF.styles.lineBreak.image.active &&
        fixed
      ) {
        if (stores.PDF.styles.lineBreak.image.data.startsWith('<svg')) {
          return {
            svg: stores.PDF.styles.lineBreak.image.data,
            width: stores.PDF.styles.lineBreak.image.width,
            height: stores.PDF.styles.lineBreak.image.height,
            alignment: 'center',
            margin: [
              0,
              stores.PDF.styles.lineBreak.spacing,
              0,
              stores.PDF.styles.lineBreak.spacing,
            ],
          }
        }

        return {
          image: stores.PDF.styles.lineBreak.image.data,
          width: stores.PDF.styles.lineBreak.image.width,
          height: stores.PDF.styles.lineBreak.image.height,
          alignment: 'center',
          margin: [
            0,
            stores.PDF.styles.lineBreak.spacing,
            0,
            stores.PDF.styles.lineBreak.spacing,
          ],
        }
      }

      return {
        text: '',
        margin: [0, fixed ? stores.PDF.styles.lineBreak.spacing : 8],
        style: 'line-break',
      }
    }

    const image = async (entity: Entity) => {
      const convert = (raw: string): Promise<string> => {
        return new Promise((res) => {
          if (!raw.startsWith('<svg') && !raw.endsWith('svg>')) {
            res(raw)

            return
          }

          const blob = new Blob([raw], { type: 'image/svg+xml;charset=utf-8' })

          const URL = window.URL || window.webkitURL || window

          const blobURL = URL.createObjectURL(blob)

          const image = new Image()
          image.setAttribute('crossOrigin', 'anonymous')
          image.onload = () => {
            const canvas = document.createElement('canvas')

            canvas.width = entity.external?.image?.size.width as number
            canvas.height = entity.external?.image?.size.height as number

            const context = canvas.getContext('2d') as CanvasRenderingContext2D

            context.drawImage(
              image,
              0,
              0,
              entity.external?.image?.size.width as number,
              entity.external?.image?.size.height as number
            )

            const url = canvas.toDataURL('image/png')

            res(url)
          }
          image.onerror = () => {
            res('error')
          }

          // TODO: other blob performatic method
          image.src = blobURL
        })
      }

      const raw = await convert(entity.raw)

      if (entity.external?.image?.alignment === 'full') {
        return {
          image: raw,
          width:
            hooks.defines.pdf().base().pageSizeFixes()[
              stores.PDF.styles.base.pageSize
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
      } else if (entity.external?.image?.alignment === 'auto') {
        return {
          image: raw,
          margin: [
            generate().base().pageMargins[0],
            10,
            generate().base().pageMargins[2],
            10,
          ],
        }
      } else {
        return {
          image: raw,
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
      if (!stores.PDF.styles.base.background.data) {
        let _title = {
          text: stores.PROJECT.nameRaw,
          fontSize: 42,
          font: utils().correctFontInject(stores.PDF.styles.headingOne.font),
          color: isTheme.value
            ? theme.paragraph
            : stores.PDF.styles.paragraph.color,
          alignment: 'center',
          margin: [0, 50],
        }

        let _subject = {
          text: stores.PROJECT.subject,
          fontSize: 11,
          font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
          margin: [
            generate().base().pageMargins[0],
            50,
            generate().base().pageMargins[2],
            0,
          ],
          color: isTheme.value
            ? theme.paragraph
            : stores.PDF.styles.paragraph.color,
          alignment: 'center',
        }

        let _creator = {
          text: stores.PROJECT.creator,
          fontSize: 11,
          font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
          margin: [
            generate().base().pageMargins[0],
            250,
            generate().base().pageMargins[2],
            0,
          ],
          color: isTheme.value
            ? theme.paragraph
            : stores.PDF.styles.paragraph.color,
          alignment: 'left',
          pageBreak: 'after',
        }

        arr.push(_title)
        arr.push(_subject)
        arr.push(_creator)

        return
      }

      let _raw = {
        image: stores.PDF.styles.base.background.data,
        pageBreak: 'after',
        width: hooks.defines.pdf().base().pageSizeFixes()[
          stores.PDF.styles.base.pageSize
        ][0],
        height: hooks.defines.pdf().base().pageSizeFixes()[
          stores.PDF.styles.base.pageSize
        ][1],
      }

      arr.push(_raw)
    }

    const note = (arr: Array<any>) => {
      if (!stores.PDF.styles.base.note.bw) return

      if (stores.PDF.styles.base.note.text) {
        let _text = {
          text: stores.PDF.styles.base.note.text,
          fontSize: 14,
          font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
          color: isTheme.value
            ? theme.paragraph
            : stores.PDF.styles.paragraph.color,
          alignment: 'center',
          margin: [
            generate().base().pageMargins[0],
            50,
            generate().base().pageMargins[2],
            50,
          ],
        }

        arr.push(_text)
      }

      let _bwd = {
        text: hooks.i18n.t('editor.pdf.note.bw'),
        font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
        fontSize: 13,
        color: isTheme.value
          ? theme.paragraph
          : stores.PDF.styles.paragraph.color,
        alignment: 'center',
        margin: [
          generate().base().pageMargins[0],
          stores.PDF.styles.base.note.text
            ? 0
            : (hooks.defines.pdf().base().pageSizeFixes()[
                stores.PDF.styles.base.pageSize
              ][1] -
                130) /
              2,
          generate().base().pageMargins[2],
          0,
        ],
      }

      let _bw = {
        margin: [0, 2],
        alignment: 'center',
        image: 'betterwriteio',
        pageBreak: 'after',
        height: 55,
        width: 140,
      }

      arr.push(_bwd)
      arr.push(_bw)
    }

    const summary = (arr: Array<any>) => {
      if (stores.PDF.styles.switcher.summary) {
        let _raw = {
          toc: {
            title: {
              text: stores.PROJECT.nameRaw,
              font: utils().correctFontInject(
                stores.PDF.styles.base.summary.fontFamily
              ),
              fontSize: stores.PDF.styles.base.summary.fontSize,
            },
          },
          pageBreak: 'after',
          alignment: 'center',
          font: utils().correctFontInject(
            stores.PDF.styles.base.summary.fontFamily
          ),
          style: 'summary-default',
        }

        arr.push(_raw)
      }
    }

    const content = async (options: PDFDocOptions): Promise<Array<any>> => {
      return new Promise(async (res) => {
        const pages: Array<ContextState> = []
        const arr: Array<any> = []

        options.chapters.forEach((chapter: any) => {
          if (chapter.select) pages.push(chapter.page)
        })

        if (hooks.project.isCreativeProject()) {
          if (stores.PDF.styles.switcher.cover) frontCover(arr)
          note(arr)
          summary(arr)
        }

        const onGenerateList = (entity?: Entity) => {
          if (__LIST__.exists && entity?.type !== 'list') {
            arr.push({
              ol: __LIST__.arr,
              ...(isTheme.value ? { color: theme.paragraph } : {}),
              style: 'text',
            })

            __LIST__.exists = false
            __LIST__.arr = []
          }
        }

        for (const page of pages) {
          for (const entity of page.entities) {
            let _raw: any = {}

            if (
              (entity.raw === hooks.env.emptyLine() ||
                entity.raw === '' ||
                entity.raw === ' ') &&
              entity.type === 'paragraph'
            ) {
              _raw = lineBreak(false)

              if (_raw) arr.push(_raw)
            } else {
              onGenerateList(entity)

              switch (entity.type) {
                case 'paragraph':
                  _raw = await paragraph(entity)
                  break
                case 'heading-one':
                  _raw = await headingOne(entity)
                  break
                case 'heading-two':
                  _raw = await headingTwo(entity)
                  break
                case 'heading-three':
                  _raw = await headingThree(entity)
                  break
                case 'list':
                  _raw = await list(entity)
                  break
                case 'checkbox':
                  _raw = await checkbox(entity)
                  break
                case 'line-break':
                  _raw = await lineBreak(true)
                  break
                case 'page-break':
                  _raw = await pageBreak()
                  break
                case 'image':
                case 'drau':
                  _raw = await image(entity)
                  break
              }

              if (_raw && _raw !== 'error') arr.push(_raw)
            }
          }
        }

        onGenerateList()

        res(arr)
      })
    }

    const base = (): Record<string, any> => {
      return {
        pageSize: stores.PDF.styles.base.pageSize,
        pageOrientation: transform().pageOrientation(
          stores.PDF.styles.base.pageOrientation
        ),
        pageMargins: [
          stores.PDF.styles.base.pageMargins.left,
          stores.PDF.styles.base.pageMargins.top,
          stores.PDF.styles.base.pageMargins.right,
          stores.PDF.styles.base.pageMargins.bottom,
        ],
      }
    }

    const styles = () => {
      const paragraph = () => {
        return {
          font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
          fontSize: stores.PDF.styles.paragraph.fontSize,
          lineHeight: stores.PDF.styles.paragraph.lineHeight,
          alignment: transform().entityAlignment(
            stores.PDF.styles.paragraph.alignment
          ),
          characterSpacing: stores.PDF.styles.paragraph.characterSpacing,
          color: isTheme.value
            ? theme.paragraph
            : stores.PDF.styles.paragraph.color,
          decorationColor: stores.PDF.styles.paragraph.decorationColor,
        }
      }

      const text = () => {
        return {
          font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
          fontSize: stores.PDF.styles.paragraph.fontSize,
          color: isTheme.value
            ? theme.paragraph
            : stores.PDF.styles.paragraph.color,
        }
      }

      const headingOne = () => {
        return {
          font: utils().correctFontInject(stores.PDF.styles.headingOne.font),
          fontSize: stores.PDF.styles.headingOne.fontSize,
          lineHeight: stores.PDF.styles.headingOne.lineHeight,
          bold: stores.PDF.styles.headingOne.bold,
          italics: stores.PDF.styles.headingOne.italics,
          alignment: transform().entityAlignment(
            stores.PDF.styles.headingOne.alignment
          ),
          characterSpacing: stores.PDF.styles.headingOne.characterSpacing,
          color: isTheme.value
            ? theme['heading-one']
            : stores.PDF.styles.headingOne.color,
          decorationColor: stores.PDF.styles.headingOne.decorationColor,
        }
      }

      const headingTwo = () => {
        return {
          font: utils().correctFontInject(stores.PDF.styles.headingTwo.font),
          fontSize: stores.PDF.styles.headingTwo.fontSize,
          lineHeight: stores.PDF.styles.headingTwo.lineHeight,
          bold: stores.PDF.styles.headingTwo.bold,
          italics: stores.PDF.styles.headingTwo.italics,
          alignment: transform().entityAlignment(
            stores.PDF.styles.headingTwo.alignment
          ),
          characterSpacing: stores.PDF.styles.headingTwo.characterSpacing,
          color: isTheme.value
            ? theme['heading-two']
            : stores.PDF.styles.headingTwo.color,
          decorationColor: stores.PDF.styles.headingTwo.decorationColor,
        }
      }

      const headingThree = () => {
        return {
          font: utils().correctFontInject(stores.PDF.styles.headingThree.font),
          fontSize: stores.PDF.styles.headingThree.fontSize,
          lineHeight: stores.PDF.styles.headingThree.lineHeight,
          bold: stores.PDF.styles.headingThree.bold,
          italics: stores.PDF.styles.headingThree.italics,
          alignment: transform().entityAlignment(
            stores.PDF.styles.headingThree.alignment
          ),
          characterSpacing: stores.PDF.styles.headingThree.characterSpacing,
          color: isTheme.value
            ? theme['heading-three']
            : stores.PDF.styles.headingThree.color,
          decorationColor: stores.PDF.styles.headingThree.decorationColor,
        }
      }

      const summaryDefault = () => {
        return {
          font: utils().correctFontInject(
            stores.PDF.styles.base.summary.fontFamily
          ),
          fontSize: utils().correctFontInject(
            stores.PDF.styles.base.summary.fontSize
          ),
          margin: [
            generate().base().pageMargins[0],
            30,
            generate().base().pageMargins[2],
            30,
          ],
          color: isTheme.value
            ? theme.paragraph
            : stores.PDF.styles.paragraph.color,
        }
      }

      const background = () => {
        return {
          type: 'rect',
          x: 0,
          y: 0,
          w: hooks.defines.pdf().base().pageSizeFixes()[
            stores.PDF.styles.base.pageSize
          ][0],
          h: hooks.defines.pdf().base().pageSizeFixes()[
            stores.PDF.styles.base.pageSize
          ][1],
          color: isTheme.value
            ? theme.page
            : stores.PDF.styles.base.background.color,
        }
      }

      return {
        text,
        paragraph,
        headingOne,
        headingTwo,
        headingThree,
        summaryDefault,
        background,
      }
    }

    return { content, styles, base }
  }

  const doc = async (options: PDFDocOptions) => {
    const encrypt = () => {
      return stores.PDF.styles.switcher.encryption
        ? {
            userPassword: stores.PDF.encryption.userPassword,
            ownerPassword: stores.PDF.encryption.ownerPassword,
            permissions: {
              printing: stores.PDF.permissions.printing,
              modifying: stores.PDF.permissions.modifying,
              copying: stores.PDF.permissions.copying,
              annotating: stores.PDF.permissions.annotating,
              fillingForms: stores.PDF.permissions.fillingForms,
              contentAccessibility: stores.PDF.permissions.contentAccessibility,
              documentAssembly: stores.PDF.permissions.documentAssembly,
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
          title: stores.PROJECT.name,
          author: stores.PROJECT.creator,
          subject: stores.PROJECT.subject,
          producer: 'betterwrite.io',
          keywords: stores.PROJECT.keywords,
        },
      }
    }

    const images = () => {
      return {
        betterwriteio:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAEsCAYAAAA7Ldc6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAChOSURBVHja7N15kF1XfSfwb7davcgJoLCYhMWhMWFCAslErkoCIZCkjRctXsDUVE0mZBnkpJgK2AQk45WZmhq5KsnUxHYqVmwLb1MBmQJLtmRwJ5BAQjJBUwMTquxgZMk2BNsEZWKtXtTzR98nve5+Lende9/S3Z9PVZctqbvfe/fcc+/53t859w587RsPfT7Jm5M8l8VhWZIjSTYm+VTzP7z6VT+cWz7xP7Phso/l9B89I6edtiJHjx5t/PNPJ/likqkkz4R+NJLk/ke/8ZXftCkAABamoSQ/meSVi/CzfTLJQPHfJMl3vvPdvP83/n327z+Y/3Ldf8vpr3l1cwj5P0k+kOSuJC+xa/StN9gEAAAL12CS7y3iz/dnSd7d+MPzL7yQp7/3/Vy18YO54qqP5MnHn8iBAwczODjY+Ja7k7zLbtHX9tkEAAALO4AsdvckOS9JBgcHc/Dgwezd+0Suu+rD+djVH82Tj80JIQ8mOduuAQAAAkhZO1JUNgYHB3Pg4MHs2ft4rr3y8nzsmpaVkMmohAAAgABSwecyoxJyKHv2PpFrr/xwrrzmo61CiEoIAAAIIJXMqIQcLCoh13zs8lxx9UdaTcdSCQEAAAGkkpaVkOuu/HCuvHbDfJWQCbsKAAAIIGXtSHLO8RDSqIRcNt/C9D+P6VgAACCAVPBA5lRCphemz1MJmYxKCAAACCAV7Ejytpkh5Ilc+7HLc+XVjYXpB1RCAABAAKnNl2eGkIN5dO9juebKy3PlNRvy5OPfVgkBAAABpPYQ8tbjIeRQizUhKiEAACCA1OevM2c61vSakKuuVQkBAAABpH4tKyFXf+zypocVzqmECCEAACCAlNaiEvJYrvlYoxLyHSEEAAAEkFq1roRccXmuvOYjefLxb2f/3OeECCEAACCAlPbXSc6aGUKOV0KeEkIAAEAAqdmXk/zkzBDyeK654rJcec1H8tRjT2S/6VgAACCA1GQkyd8leXNzCHl07+O55orLc9V1jUrIgSwTQgAAQACpwYokf5/kLc0hZM9jj+fqKy47Nh3rmbmVkF+x6QAAQAApYyTJ32ZWJWR6YfpluerajXnq8e9k//4ZIeQvhBAAABBAyhrLdCVkZgjZ83iuvuJD05WQJ749e02IEAIAAAJIaXMrIYcalZAP5errikqIEAIAAAJITRprQt50LIQU07Gu2nhZrrr2o8cWpgshAAAggNRhJMnfJHndjBCy57FcfcVlKiEAACCA1O7Fma6E/OixENKYjrXxQ00PKxRCAABAAKnHS4sQMqMS8qg1IQAAIIB0yMuSfHV2CGlUQq6+bt5KyC/bdAAACCCU8UOZpxJy1camSsj+GU9M/0JUQgAAEEAo6aWZtxJy2XQl5Ik5T0xXCQEAQAChtHkqIY+phAAAgADSES9N8ndJXt4cQuZUQvarhAAAIIBQj5dnejrWK5pDyIxKyLenKyGDKiEAAAgg1OC1mZ6ONbcScsVluea6jXnqiW/PDiF/keSXbDoAAAQQyoaQuZWQRx/LlRs+mGs+fkWeemL6OSFNa0K+GNOxAAAQQKgQQmZWQg4dyp49j+eqDR/KNR/fmKcen7Mm5AtJ3mnTAQAggFA2hMyshBw6lN17ikrIdUUlZObdsf4yKiEAAAggVAghf98cQg4VlZArNxaVkCdUQgAAEECoP4S8uBFCDh46lEf3PJYrG9Ox5t4dSyUEAAABhEoh5CtJVjRCyHQl5LFcteGyXNt0d6xlKiEAAAgg1ODHM10J+YFGCDm+JuRDufbjV+Spb39n9nQslRAAAAQQSntTpp+YPqMSMiOEqIQAACCAUHMImVEJORZCPvrBGZWQWXfH8rBCAAAEEEqHkJNWQmZNx/piknfYdAAACCCUDSEtKyEf++gHc9W1G/PU09/LkSNHMjAw0PiZv4pKCAAAAggVQsjfJhlrDiF79jyW/3LVh/Pb7/+1fPub/5ipqanmEPLFqIQAACCAUNJPJPlyo10ad8fa88R3ct2Vv5fzLrowex5+ZHYIUQkBAEAAobSfSfI3zSHk+9/fl6NHj+bO227IuWvPzZ6HvqkSAgCAAEJtfrY5hAwNDeWfvvtknn32udy15cacs+48lRAAAAQQuhBCnnsud2+5MeeuOzd7HlYJAQBAAKGTIeSfikrIbTfmnLXnqoQAACCA0OEQUkzHuvsTN02vCWldCflFmw4AAAGE+kLIkWJNyNrzWoWQL0UlBAAAAYQKIeRLjT/MqIRsuSnnrjtPJQQAAAGEWr01yefnhpBnc9dt84aQLyV5p00HAIAAQhlnJ3mwZQjZclPOW3d+qxDyl1EJAQBAAKGkibSqhBx5NnfedmPOXasSAgCAAEK9VEIAABBA6KqJ+UOISggAAAIIXQohR448m7s+cVPOu0AlBAAAAYSuhJAjueu2G3Nu6+lYX0ryDpsOAAABhLIh5NPNIeS7330qR448m7u33JjzLzg/ex6aE0L+KiohAAAIIJR0cZJ7mkNIoxJyx2035twLzlMJAQBAAKFW754bQp7Ks0eezd1bbpquhDysEgIAgABCR0PI9ML0OxtrQh5SCQEAQACh3hDy6VYh5O4tN+a8C60JAQBAAKFe86wJeTZ33XbjfLfoVQkBAEAAobR5KiFHcteWG3P+havnq4S83aYDAEAAoYyLk9w5M4Q8lcOHj+TOW2+YbzrWl2M6FgAAAggl/WqS25pDyHeffDqHjxzJXbfdlPMvWj3fdCyVEAAABBBK+Y2ZIWRZvvvdp3L4yOHpSkjrNSEqIQAACCDUFUKGihByJHfdVqwJUQkBAEAAofMh5NnceeuN0w8rtCYEAAABhM6GkCenp2PddpNKCAAAAgjdCCHFmpDbbsz5F0zfovfo0TmVEM8JAQBAAKF0CPmTOSHk8OHcueXGnH/R6ux9uOVzQs636QAAEEAo49Ik/31GCHmyCCG33pjzL1ozvSZkZiVkZ5I1Nh0AAAIIZXxoTgg5Nh3rhqy+eE2rNSH3J1lt0wEAIIBQUwh5OocPHc4dt94w/bDCh76ZqamjzSFkR1RCAAAQQKgnhCxrmo51Q1ZftCZ7Hn6kVSXEmhAAAAQQ6gghjYXpR6YrIReubvWcEGtCAAAQQKgxhDQtTD/BmhCVEAAABBBKh5A/aBVC7rj1hqy+cN67Y1mYDgCAAEIplye5bk4IKRamr754Tfb845xKyI6ohAAAIIBQ0rUtQ8jhw7nzlhuyuvXdsVRCAAAQQKgzhDydQ8WakDUXt7w7lkoIAAACCHWFkGXTIaQxHat4YvrRKWtCAAAQQOhwCLmzWBOy92FrQgAAEEDoVgiZvxIihAAACCBQOoR8fGYIeepYCFnTuhIihAAACCBQ2jVJPnw8hAzNWBOyplEJOSqEAAAggFCP309y2fEQcrwSckdTJeTo3Fv0CiEAAAIIlPKHM0PI0IwQsvriNdn70CM5elQIAQAQQKBjIeTpWZWQRzJlOhYAgAACnQkh09OxDhchZO2712bPw99sVQk5z6YDABBAoGwIufx4CJmuhBw8dDi33/JHWfPutdn7j4/MXpj+gBACACCAQFl/kFmVkCeffCoHDx3OHbfckLUXr51emD6zEiKEAAAIIFDaHyb5wPEQMlSEkEMzKiFTKiEAAAII1OTGJL8xO4QcKiohay6eXhMyNbcScq5NBwAggEAZtyX5zeYQMn2L3kO5o6iE7Hl4zi16PxeVEAAAAQRKurV1CCnWhLx7bfY+/MjshxWqhAAALEJDNgFdDCEDxX+P3R3rlae/LLffckPel2T7p7fnjDeemcHBwUxNTSXHKyE7bT6YqymwA+2ZKL5WFV8rk0wm2V38d6tNZF/o5L5QjHOW7vnra9946OtJ3mz/o0t+K9PTspIkzz//Ql55+ssztmIs7/ut3832T2+bHUKS5JxMV0SS5NOPfuMr77EZQQCBEsaT3FwMOE9kV5JLi/9iX6h9X1jqAcQULLrt1iKEJGk8rPDpHDx4KLff8j+y9j3rsnfvE7N/pnlNyBtsQgBKWJXkq6cw4Gx874PFf7Ev2BcEEBaBW5K8rzmEPPnkUzl0+HDu+NM/ylmrfiqPPvTNDA3NmCH4QJLfS7Lf5gOgTSuLQeTKEj8zbvPZF+wLAgiLwyeSvOd4CBnKk08+nedfeD5/+se/nzN+7Mw88q1HZ4eQP4iF6QC0b32bA87mgecGm8++YF+olzUg9Np7kny68Yfnn38+bzhzPI/u2Zt17/n17N37eM48czzPP//8sR949Btf6a9ONDBQaiLn1NTUgDn8AF3x/ZKDzoYfSrLPZrQv1LUvWAMCvXVPZlVCvvnI7rzuR8/Itntuz2vPeE0eeWROJQQATtWqigPOxu/AvmBfEEBYRLa2DiGvzfZ7bs8ZZ7w6jzyyWwgBoIyVNgH2BQEE2goh2+65PWec8RohBABAAIHuhZDXv/51eeTr/2ArUdWDSaZKfE0ssvcAS0Udz2/Yp3/bF0rsCwggLOgQcsZrc+etN+RX1rgJFgBtDxgnK/z87nggoX3BviCAsCRCyDkzQsi3dudVP/LK3L3lJlsHgHZdX+FnN9p89gX7ggDC0vBAknc1h5B/+X//mn/+5+/bMgC0a7LkwHNzpi+KYV+wLwggLBGfS3J28188/8ILtgoAZWxMe1ewr09yqc1mX7AvCCAsPZ9PUyUEACq4PslZOfGV7K2Zvvhluo19wb7QIe5pykLwuSKEPGhTAFDRriTvLf5/9p2nJm0e+4J9QQCBhs9nemH6520KAGpikIl9oQdMwWIh+Vya7o4FAIAAAp12kU0AALBwmYLFQvPEEvu8K5OsKr5a2ZXpByPt7sP3vqrp/WcBvn+0afPn3Wo/1U76t2N2XQYGBk70zxNFW4zP8+/7ijYoPW1sampKAIE2LIWq3cok65NccpITQbPdxYl3cw9PDOPFe57I3MV8p/L+J4uT2+aa3s9E6r1xwan8ro2ZeX/5fngPi6lNZ5w/y573T/Lv64vPesk8A69NSTaUeN1LS26HT7V4L6fqvSn33IIHS7T3fJ+vV+3UjX1G/+5c/+60Tu2XVcJfoy1Wtfmzu4q22JoF9JR2AQT6L3hsKP6/3RPJhuJrsjhJdetANFG87kSF3zFefPYUA7zNPQ5TS91SbNNG3xs/hZN92e1RdmBSZVCztUuvOdln7YT+vVDO+esr7s+NWRIbiu3faIt9/fzhrQGB/rAqyVeLA/nKir9rosbfdbLXeTDlrpae7KC8Icm3uvAZ0KaNvnfzKQ4CtlZ4nTKDvPGK7VnmNdttn25MyWm3ndC/+1nz9qpzfx4vfue3Uq5SK4DAErK+OLHWfVLdUJxoVnXgPW/qwElsvs/w1S68DkuzTS8p2UfKXO2f6NLPVA09/Vj9KNtOOGb3m1VdCmori9f4ar/2GwEEeh8+bu7wwa7OE/fK4oDWzSsr48Vn2GB36diJaim26fpMr68oMwiYrNAfOx0GqoaY8S5uj063E47Z/aQRzrpZwWtUDtcLIECSZGBgYFWHw0fzCaiOENI4kPXqasqmLm2vpWSptuklFV93IQWQbrzmZJ+2k/7tmN0vbi62Ry9fv6/aQgCB3vlUF1+rEUJWVvj5T6X3c6/X9/ggvpgs1TYdr+FEvCvlFniOt9k+vaiArOrStuhGO+nfjtn9Ej76oQKxvp/6lAACvdPtE8PKCqHnwfTPws8N6cNy8gK0VNu0ruk8Za76tzO4r2sO/USbx4h294mtfd5O+rdjts8+M4T0xdQ4AQSWlokSB59N6b9FbHXfOWSpWcptWtfn7vRC9PGa+32nts2uPm8n/dsxu5fn2019un/0/CYBAggsPe08Z6RMYOmGlTE9o5shVJvWE0DaGVjXOUBYVfP31bEd0L8Xs37/vDcPDAz0tMIogMDS03j40amGlTo0ntTa+KpjzniZp/eiTetS9tkX421si34PIFt1J/3bMXvedujnis94ejw1zJPQoX9NdnBAsiEnf1Jq1ZPF7iTXF4OUffMMdtZXPAhuSnLWPP+2L62vzq5Kubnlp7LYdl8fvofF1Kb9ZmuJAd+pDErqHqR1agrWrixt+vfi7t9VBvcbatzHdjVd7BivsH/NaYuBgYGtU1NTPXl6vQAC/Rc6Nmf+K4uXFAf/qgOUlcXv2nySkFLW9Uk2nsLJ9tLis5ZdcLqq2BaT8/z+s1v8fdmHcW1M+9NN+uE9LKY27TdlBuATxbasMwicSn9fdZL3W2YB+lKffqV/L+7+3Yt2aO5b159gO9U1Flh/Cu3eEaZgQX/Yl+S9xcnsRNMathbfc2mql8RPdBVrvMKBbWObB7TJ4jOV/TyX2H1OiTbtzAWDMgOwOr6nTPCp8zX3RQVE/3bMbhXkq3y+fcX5/eyTHF8aY4Gq4WF9r9aCqIBAf4SPs9s8mW8uvr/Ksz0aZdx9NZ4gGldt2rWrCGAPljyZXWo36thJf6m0aWNNx+QJ/n2+QXg7g/dGpWF3hbBQdoBaZwDp1fqPMu2kf+vf3WyHKgP6dscC1xfHobIL3k9lNoQAAotUuwecOk4AzQOdrTWezKqcVCZLDOYaB9DFXtLv5QBlsbfp5qZAX8bWlHva+O6TXBio28lCTbvTr7pd/ajaTvq3Y3Y3VLl4sLHk/r252KabKrznrgcQU7Cgt8oecJpPANdX+PlVbf79yQYkVa8+bq35c6BNT/TZzioGYLsq/p52jdc0gNnd5muO17i9uzV4rKud9G/H7H4OILsrnsuvr9CWPbkzmQACvbOvpqsOdQeQsgejOqZk7Krxc6BNT3SyPzv1DGjL3KJ0omQ4qdr3J2ra3nUMXLvdTvq3Y3Y3QmDZ6uX1Nbx+2fHEyoGBga63hylY0DtbU8+91RtBpsytEVdVHADN/rmqd/8o+9or7U4d2a6LtU0vranvNYeQSyr2uzKDyc2ZnnaxsuLrTpT4vN1Qdzvp347ZnQ4gVcYDdYwpNlVox64GfQEEeqfOk3jZA8fKGk8MvXyokQcSduZkvxjbdFcHBtC72gwg8y1EP9k0qVbHj3bCT11TLrsxUOlEO+nfjtn92A6n8vyXU9G4QUOZUNj1hyaaggW9U+dJvMp0iJU1HURZfCfGxWhrn/zOVRWDwGSJ48h8U0T68fkfnrKufy+VdqhzOuOCuQucAAI9UvPTR6sMCFZVGASxMGjTzgT/5pN+u/15vGI77SrZ9ydqCD77Fmg76d/0YzvUua+XHQt0vSIlgACwlHRq8FxHEJgo8XrtTt+oq/KyUNsJ6AMCCABLSaeurLc7MJ896F/ZRhCYrPDaExVCTzcDiAoICCBAnzMHGHprskSfXXmCQNLOa7W7DiQlX3efYADGAgIILGADAwN13nWiyhzg2YOZ3Qtwc5qucWLatDvvd1eFfltm/UfZ8DNRcsDirlT6t2N2/e1Q5xqesr+r633bbXihd1bVeOKo8wBW9j1t7uGJUADRpv1gss2+uKrpxF9m/cd8gaSd160SfNC/HbOrt0OdFyPHF8rGEkCgdyZS360mywaQOk8+W+MK6WKjTdsPIBtK9tuJNl5jvr8/1d8xkeNPXp5oc39A/6beUNW4PXbVUNbOc4Q6ORY4JaZgQe9cknrma46nvYegneygU/Yqp1tB9i9t2r0AUmb71nEXqjIL0dt53TK3Gkb/Xkqq9I9Lanj9S3r03gUQWGBWpp4n0W6o8LOTNQyi6jyA0h8DY21aXjtVgvHiONBOFWJXTYPQifTn7XfRv5daO9TRFlXGE/umpqa6Pr3SFCzorQ3FQats55+oGGJ2n2Aw0+7VsVXFgGp3hc/SiwP/UqFNu7edL2lzG3e7AtJ43ZVtfi70b8fsk3+uiZLbcn2m1+WUsT7lp1/1pC0EEOitlUkeTHJ2yi0k/VQNB8tWtqZcef7m4rOUOfg+WOHEe1YX2qofFvdVeQ/atHsDkHb78URNv7udwU+7AcT6D/27l/27uZ9M5PgDOKtcwOunAJIkm4rP0u7nWV/87IIKg6ZgQf+EkHYOWuuLn6myhmRr5l/0VnawMZH2p4StLE6CVT5HO8pe7atzukIv3sNibtN+sqvN9m1nLdhkxX+f3a4TbXwmd5rTv3vRv1cV57qvFoPsTU3veVPx999KtWpMnaocu8qMBTZUbIt9vTreCiDQXyHk5pz4KtZE0/dVXcA+eZITaNmrIo2TRDufu+qVv24MDiYyXXGqY+FmL97DYm7TftPOdq7zNrjtXDn1/I/+CyD690zri4BxsgH5ePGe1vdJ22+u8PPNY4HxUxgLbKr4frdOTU315OKCAAL9pXHA/VbTwWVT8f/fT/tXR0501eNkB8kqB9ENxWdYP89AZ7zpe6oM6Mvcx77KwfaSon2m5vna0OfvYbG2ab/p1JSQyT59XfTvuvv3RNq/sn9zn4SQOi6grC+29VeLz7Wh+PpU0/igjrHA9b3aSNaAQH9q3M+7U2XlUznoNO4RP1HhM9xcfDXfwrPdued1Hzz7Yb5wr97DYm3TfjPZo9/ZeBr7qgXweRYz/bt6/y47rWhTTjy9uFv9f2vqmba7Kp27XfL1U1NTPbvYowICS8+pVD/qHgw2wtREzSeyMgfPfpjP3sv3sBjbtN/s7sAgdLLm7xM+9O9+7d+XpPwUr7pub1/VxvT3uqnd6fHFHgEElp52DoyT6c8r0lUPnv2wxqBX72Gxtmm/qXvgvqvm7xNA9O9+7d9Vr/ivWmCftxcu7dXaDwEElqbJtD9PeGP67xkA7021q0ub++Az9PI9LMY27TcqIEub/l2+f1cNECv75DNf3yfnmjnhox/6tQACvbOvB6/33pI/e3YfDQ4vreHkuiu9r4L0+j0stjbtN3W27WSb/XxXjccMDyDUv/XvxfPZN/dLKBJAoLcHpm6GjyonpKo/X+c2q+vg2Q9zdHv5HhZjm/abyR79nrpe18MH9e9e9O/di2w/KPOg4U6Fj0v7ZaMIINAjU1NTW4sTVLdORHVUDV7fowPpvg4MVHf3wQm61+9hsbXpYg0gu0rsV714XfTvOvr3rj7pd3Vui7N6fKy7tJ/ChwACvXd9h0PIrtR79aURZrq5uK7xGTZ38Hf3MoT0+j0stjZdjAFkcoG8Lvp3Hf27yrOA9qV/jyuNELCvy21xVj9uEwEE+iOEdGIB7vXpTOl3XxGaOl1WbrzOWR1+ncZVwl5ON+n1e1hsbdpPg8+q/bpMCNid6lWQOn4H+ndZGyv8XD/fzGJzlwJB3x9rBRDoD1uLE1QdB6XJ4kTT6QPxZHFwq/uOGo0D5+vTvat2jQX6vbwq3w/vYTG1ab+Y7NHPV31d6z/07172761pf8rQxiyMquru4rM1zvn7av7dC+JYO/C1bzz09SRvdmxggbj2LW9643/uq040MDBV5uempqYGBgYGWv3TeKYfpNTOw5j2FQfszT282rGqeM8Taf82ivuKE2LjCbK9voK1svgcjYdxrTzFz7SxxoN+P7yHfm7TqbJdtsv70vqUf6pzigHrZA9e9701hZB+aqd+ei/696m/x0058dPdG4PurQt4X2i0Q5kHP+6e1RanOgYRQGAhB5CK4eVk3zI+64DUOAg3pnY0bpPZbyXWxsm0+aQ20XTi2tV04Nwdi10XAm0K+nev+veqWUFtd9PAe7Eda1YV5/7xpnHA+Kzt3xgHlJ4qKYDAEg4gAABLjTUgAACAAAIAAAggAAAAAggAACCAAAAACCAAAIAAAgAACCAAAAACCAAAsMACyIDNAAAAdCuA/IjNAAAAdCuAbLEZAACAbgWQ30vyxzYFAADQjQCSJB9IcpPNAQAAdCOAJMl/SvInNgkAANCxADIwMJCpqanGn38nyV02CwAA0JEA8upX/XBWrFiR559/ofF3/0EIAQAAOmHZgeeW5Zd/6e05bcVYnnnmQAYHB5PkM0nOTPIWm4g+88XTX/6yv7QZAAAWaAD5X1/533n0O0/mkovWZnhk+ewQ8gYhBAEEAIC6DJ7x4z+Rz3zyM3nf+383p61YkdNPf1nzdKxfTXK3zQQAANQSQAYHB3PGj52Zbfdsy/ve/8HpEPKKOSHEmhAAAKB6AJmamsrg4GDOeOOZ2XbPvfm1//i7WbFiLK94xUstTAcAAOoNIElyLIT82JnZfs+9+a3fvjwrxsay8iUvytGjR4UQAACgFste8vJX/7sk/5Akg4ODefFLfyh/+4W/ytFlQ3nvRWvyL//6TJ577vkMDAwk7o5F71mEDgCwwAPI/y1CxWcaIWTsxS/K5x/8YpaPDGft+WfnmWcO5LnnnmsOIa9P8lM2HwIIAADtBpD3JXlHkpEkf54kI8PLs2zZsty3bUfGTjsta86fyDPP7J9dCRFCEEAAAGg7gPx6klcmeXuS4SR/MTU1lbGxsSwbXp7tn72/CCEqIQggAABUDyAfSHJ68ee3p6iEHAshy5dn+70qIQggAADUE0B+pymAtA4hRSVk9LQVKiEIIAAA1BpA5gkhw7nv3h0ZXTFvCBkXQhBAAAAoE0BahJCRDA0Pn6gS8lkhBAEEAICyAWSeEDKS7TMqITPWhAghCCAAAJQOII0QMtocQpYNL899KiEIIAAAdCCAJMkvZL41IaetyJrzzs4z+4UQBBAAAOoJIIlKCAIIAABdDCDJdCWkKYSMFQvTd2RkxYqsVQlBAAEAoMYA0iKEHK+EjJw2lrWtKyGvS/LTNjcCCACAANJuAGkRQqYrIfc1VUL2q4QggAAAUFMAaRFCRqYXpheVkHnWhLwpyU/Y7AggAAACSBlzQsjQ8Ejuu3dHRla0nI51T5J/m+Tf2PQIIAAAAkgtIeRYJWRsLGtXzwkhf5bp9SBCCAIIAIAAUjqEjCWZnFEJ2TZvJeSTUQlBAAEAEEDqDSHTlZDhohKyXyUEAQQAQACpKYDME0KKNSFjY1mzWiUEAQQAQACpL4DME0KGc9+992d4bDRrz3/X7Fv0qoQggAAACCB1h5CR3HfvzoysmL5F76wQohKCAAIAIIDUHUIalRB3x0IAAQAQQDoTQlo/J6R1CFEJQQABABBAKoeQFWlxd6zlY6NZ13pNyE8l+XHNgwACACCAlPG2zJ6ONTKS++/dmeHGc0KsCUEAAQAQQGrUuhJyb1EJWf2uVs8JUQlBAAEAEEBKm1sJGS4qIa0fVqgSggACACCAVDJ/JWS0eE7IAZUQBBAAAAGkPvNUQnZkeEURQuZWQn46KiEIIAAAAkhJLSoh07fonacS8skkb4lKiAAigAAACCAlvW1OCCnujrV8bDRr5y5M/1RUQgQQAQQAQACpGEJOS/Lg1NRUxkZHMjQynPs/uyPLR0emQ4hKCAIIAIAAUnMIOV4JGRnJ8tHp6VjDjUrI/jmVEAvTBRAAAASQSiHkWCVkdPT4mpChkZHp54TsVwlBAAEAEEDqDSEt1oTsyHBjYbpKiAAigAAACCA1h5CZa0KGR3LfZ3dkaHQk69a0vEWvSogAAgCAAFIphMyshIzOqoQcmFMJ+Zkkb9SkAggAAAJI2RDyA5ldCbm3qIS0fmL6LyQZ16wCCAAAAkgZb03zdKymNSHzhJA7k/xiktdpWgEEAAABpIyZlZCRYjrWZ3dk2chw1q05Z/bC9DuiEiKAAAAggFQwsxIyOv2ckPu37Zx+WKFKiAACAIAAUrMZlZDR0ePTsZaNDGft6nNmhxCVEAEEAAABpJK5lZCR6UrIsEqIAAIAgADSATMrISNFJWSbNSECCAAAAkhnvLU5hIyNjWT5yGju37YjQyMjWbd6zhPT70zydiFEAAEAQACpEkJ+MMnn56wJGR7OutXnZP+Bg7MrIW9L8nrNLoAAACCAlA0hM27Ru3x09GTPCVEJEUAAABBAKoWQmZWQ0UYlZLlKiAACAIAA0pEQ0qISsvP4mhCVEAEEAAABpOYQcrwSMtJ4WOGOLBtZPt9zQlRCBBAAAASQSiHkWCVkZEYlpLEwfU4lxC16BRAAAASQSiGkRSVkZwaPrQmZE0LeGpUQAQQAAAGkjhDSqITsmL8ScldUQgQQAAAEkIoh5EWZpxJyQeuF6SohAggAAAJIaT+fOdOxpishy1rfHUslRAABAEAAqWROJWRodDQ77t2RweHhXDD3OSF3xt2xBBAAAASQCmZUQsZmVEKG53tOiEqIAAIAgABSWos1IaO5f9uODC4fyro1LSsh1oQIIAAACCCl/XyrELJj244sK6ZjHThwMM9aEyKAAAAggHQ2hOzMwPyVkJ9PcqbdRQABAEAAKRtC5j4npKkSMiuE3JVkIslr7TICCAAAAkgZLdeE7Ni2M4PLh3LB3ErI7UnOSfJqu40AAgCAAFLGvGtCWtyidyrJliTnCiECCAAAAkiVEPLiJJ+bOR2rZSVkKsltUQkRQAAAEEDqCiEzKiHLl+eCNTPujtUIISohAggAAAJIPSHkWCVk+84MLF+WdWvOnb0mRCVEAAEAQADpQAjZtjODy5dnnUqIAAIAgADSyRAy4+5YQ0NZt+ZdKiECCAAAAkjnQsjIqa0JEUIEEAAABJB6QsjoyEiWj41mx72NJ6a/qzmEpAgh70ryGptOAAEAQAApG0KOPSdkTiVkbVEJedZ0LAEEAAABpL4Q8pK0uDtWli2bXph+cE4IUQkRQAAAEEBK+7lWIWTntp0ZGBrKBWvObRVCVEIEEAAABJB6QsjosRDyQDKkEiKAAAAggHQ4hIwUC9NVQgQQAAAEkK6EEJUQAQQAAAGkqyFkbiXkHJUQAQQAAAGkGyHkgWRoqFUl5NYihKiECCAAAAKITVFnCNmZLBvKhaZjCSAAAAgg3QkhTZWQmU9Mv1UIEUAAAAQQqoaQ0SR/PrcSsiwXrJ1zd6wtQogAAgAggFDFLyQZSPLF2ZWQgdZ3x1IJEUAAAAQQKnln6xAyvSbkgrnTsVRCBBAAAAGEmkPI6Gh2bn9gOoSsdXcsAQQAQAARQDodQprXhMydjrUlybuTvMKmE0AAAAQQKoeQ0dkhZPWMEDKV5PYkFwghAggAgABClRAymNmVkHt3ZmrZYC6ceXes55J8Isk67SGAAAAIIJT1jsyejrViLA9sfyBTc6djPV+EEJUQAQQAQAChtHdmRiVkOMvHxrJz285MDQ7mgrXntQohKiECCACAAEJpsyohwxkeG83O7Z9Llg22qoRYEyKAAAAIIFTyziTLknyhMR1ruFiY3qISYk2IAAIAIIBQ2Tsya2H68NhYdm7fmQwum/2cENOxBBAAAAGEWkJIUyVk+Fgl5OjgnLtjNULIWu0kgAAACCBUCSEzKyErxvLA9p2Zal0JuT0qIQIIAIAAQsUQMrcSsn1npgYGc+Ha83Lg4KE8++yzpmMJIAAAAgi1hZCWa0KOWhMigAAACCB0KITMqoSMWRMigAAACCB0NITMeFjh3DUhc6ZjXbAE204AAQAQQKgxhAylRSXkhcGBVpWQLVl607EEEAAAAYQa/WJmT8daMZYHtj9QPKzw3KVeCRFAAAAEEGrWuhKyfWeODgws9TUhAggAgABCB8ythIyN5YFtDxxbmH5waVZCBBAAAAGEDplbCTm2MH0wq8/9lTyz/0BeeOGFpVQJEUAAABawwSRn2gx97aokn03ysqNHj+a001bk9Ne8Ov/12k35wxs25xUvf2kGBgYa33soyc8m+foi3h4r7RIAAAvXUJIPJ3llkqM2R9+20auSvDjJ9xohZOylK3PLlruz5ryJvOgHfzD7DxxofP/hJD+X5P2zfs+Lkiw/STsfzfS0r5cU4fRk37u8eF8n80KSsSSnneJnHk2yosXrDyb5ml0CAGDh+v8DAI+nJNT5X7WpAAAAAElFTkSuQmCC',
        checked:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF+2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMTItMzBUMDE6Mzc6MjArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjI4KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjI4KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRvdCBHYWluIDIwJSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNzVjYjZmMy1jNGIxLTRiZjctYWMyOS03YzUxMWY5MWJjYzQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5ZTM1YTc3ZC0zNDM0LTI5NGQtYmEwOC1iY2I5MjYyMjBiOGIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowYzc2MDY3Ny0xNDcwLTRlZDUtOGU4ZS1kNTdjODJlZDk1Y2UiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBjNzYwNjc3LTE0NzAtNGVkNS04ZThlLWQ1N2M4MmVkOTVjZSIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozNzoyMCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA3NWNiNmYzLWM0YjEtNGJmNy1hYzI5LTdjNTExZjkxYmNjNCIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozODoyOCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jHsR7AAAAUNJREFUOMvN1T9Lw0AYx/EviLVFxFH8M3USgyAFoUsQ0UV8F6Ui4qCTbuJg34HgptBdUATrUoxiqYMgiOBoIcW9BVED+jgkntGm9i6CmN+Sg/vAcc89dwBd5Clzj6uZGg7LJAC62UFipEgKcmroaeZj/gpcIAhl5rE1M0cJQbiCOsIrs5h8WZ4R6j72yBrhcRo+dhE8bCOcoYng/hFOMxAXb/DAHTNxcCGo7JE5LqhjsW2KP6nDcGecCv1vRdC2eJQDLllooach2hbvIghvLJJgM0QHdeq8F0x/5ETRM4b0DonF7be+Pf+y4A4bZnETok4E/XG3xxR3WhasUWeLCg2OGYnXGP1MkPwnLRmJf3UN+RfgtBGe5MnHVQShxBQZzdgcIgjXsKSu/KZmXgKxBkmKsZ6bffoAelilQs3goauyTi+8A8mhgeQlxdNWAAAAAElFTkSuQmCC',
        unchecked:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF+2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMTItMzBUMDE6Mzc6MjArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRvdCBHYWluIDIwJSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjMGUyMmJhZC1lY2VkLTQzZWUtYjIzZC1jNDZjOTNiM2UzNWMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5M2FhOTEzYy1hZDVmLWZmNGEtOWE5Ny1kMmUwZjdmYzFlYmUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozYmY2ODFlMy1hMTRhLTQyODMtOGIxNi0zNjQ4M2E2YmZlNjYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjNiZjY4MWUzLWExNGEtNDI4My04YjE2LTM2NDgzYTZiZmU2NiIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozNzoyMCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMwZTIyYmFkLWVjZWQtNDNlZS1iMjNkLWM0NmM5M2IzZTM1YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozODo1NyswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6AB6cQAAAPxJREFUOMvF1b1Kw1AYBuAnFf8QL8WlIHQJIriIdyEu4qCTXop7dwenTgUHpYvgJVhob8AuakE+h9hapJqcFDXvFDgPIXlzvgNLjnQ9GlRM340TK7DsUtRI2zqH09txxUzWn3IrhK4DecXs6wjhnqHwZk/K1fIiDAs81krCW54KPBDG8iTcNBIGf4ND1MWTdmrgqIOL5TM0S8SRhmMu1dAo+2DZ57t9eWajtKrvN1GVnrMK9HewhbBy+nPPJbTsJwmymOn8P7fkfLzQGCoG4G4S3vZc4J4QOnY0KyZ3LYQHjqcjf1Qxrx/inDXtWsfNlU1YdeZOP+Gg67mwwTvIDqR1iAowgQAAAABJRU5ErkJggg==',
      }
    }

    const content = async () => {
      const data = await generate().content(options)

      return {
        content: data,
        styles: {
          'heading-three': generate().styles().headingThree(),
          'heading-two': generate().styles().headingTwo(),
          'heading-one': generate().styles().headingOne(),
          'summary-default': generate().styles().summaryDefault(),
          paragraph: generate().styles().paragraph(),
          text: generate().styles().text(),
        },
        images: images(),
      }
    }

    const footer = () => {
      const text = (
        currentPage: number,
        pageCount: number,
        pageSize: number
      ) => {
        return currentPage >= stores.PDF.styles.base.footer.start
          ? transform().footerStyle(stores.PDF.styles.base.footer.textType) ===
            'simple'
            ? currentPage.toString()
            : `${currentPage.toString()}/${pageCount}`
          : ''
      }

      const alignment = (
        currentPage: number,
        pageCount: number,
        pageSize: number
      ): any => {
        if (
          transform().alignment(stores.PDF.styles.base.footer.alignment) ===
          'default'
        ) {
          return currentPage % 2 ? 'left' : 'right'
        }

        if (
          transform().alignment(stores.PDF.styles.base.footer.alignment) ===
          'center'
        ) {
          return 'center'
        }

        if (
          transform().alignment(stores.PDF.styles.base.footer.alignment) ===
          'left'
        ) {
          return 'left'
        }

        if (
          transform().alignment(stores.PDF.styles.base.footer.alignment) ===
          'right'
        ) {
          return 'right'
        }
      }

      return { document, alignment, text }
    }

    const header = () => {
      stores.PDF.styles.base.header.content
      const text = (
        currentPage: number,
        pageCount: number,
        pageSize: number
      ) => {
        return currentPage >= stores.PDF.styles.base.header.start
          ? stores.PDF.styles.base.header.content
          : ''
      }

      const alignment = (
        currentPage: number,
        pageCount: number,
        pageSize: number
      ): any => {
        if (
          transform().alignment(stores.PDF.styles.base.header.alignment) ===
          'default'
        ) {
          return currentPage % 2 ? 'left' : 'right'
        }

        if (
          transform().alignment(stores.PDF.styles.base.header.alignment) ===
          'center'
        ) {
          return 'center'
        }

        if (
          transform().alignment(stores.PDF.styles.base.header.alignment) ===
          'left'
        ) {
          return 'left'
        }

        if (
          transform().alignment(stores.PDF.styles.base.header.alignment) ===
          'right'
        ) {
          return 'right'
        }
      }

      return { alignment, text }
    }

    const addons = () => {
      const { theme } = getPDFUtils()

      return {
        background: function (currentPage: number) {
          return currentPage >= 3 &&
            stores.PDF.styles.base.background.main &&
            stores.PDF.styles.switcher.main
            ? [
                {
                  image: stores.PDF.styles.base.background.main,
                  width: hooks.defines.pdf().base().pageSizeFixes()[
                    stores.PDF.styles.base.pageSize
                  ][0],
                  height: hooks.defines.pdf().base().pageSizeFixes()[
                    stores.PDF.styles.base.pageSize
                  ][1],
                },
              ]
            : currentPage <= 1 &&
              stores.PDF.styles.switcher.cover &&
              stores.PDF.styles.base.background.data
            ? undefined
            : !isTheme.value &&
              stores.PDF.styles.base.background.color === '#FFFFFF'
            ? undefined
            : [
                {
                  canvas: [generate().styles().background()],
                },
              ]
        },
        footer: stores.PDF.styles.switcher.footer
          ? function (
              currentPage: number,
              pageCount: number,
              pageSize: number
            ) {
              return [
                {
                  text: footer().text(currentPage, pageCount, pageSize),
                  margin: [15, 0],
                  fontSize: stores.PDF.styles.base.footer.textSize,
                  font: utils().correctFontInject(
                    stores.PDF.styles.base.footer.fontFamily
                  ),
                  alignment: footer().alignment(
                    currentPage,
                    pageCount,
                    pageSize
                  ),
                  color: isTheme.value
                    ? theme.paragraph
                    : stores.PDF.styles.paragraph.color,
                },
              ]
            }
          : undefined,
        header: stores.PDF.styles.switcher.header
          ? function (currentPage: number, pageCount: number, pageSize: any) {
              return [
                {
                  text: header().text(currentPage, pageCount, pageSize),
                  fontSize: stores.PDF.styles.base.header.textSize,
                  font: utils().correctFontInject(
                    stores.PDF.styles.base.header.fontFamily
                  ),
                  decoration: 'underline',
                  alignment: header().alignment(
                    currentPage,
                    pageCount,
                    pageSize
                  ),
                  color: isTheme.value
                    ? theme.paragraph
                    : stores.PDF.styles.paragraph.color,
                },
              ]
            }
          : undefined,
        pageBreakBefore: function (currentNode: any) {
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

    const getContent = await content()

    return {
      ...encrypt(),
      ...page(),
      ...info(),
      ...getContent,
      ...addons(),
    }
  }

  const setVfsFonts = () => {
    const _fonts: Array<string> = []
    const set: Record<string, any> = {}

    _fonts.push(stores.PDF.styles.paragraph.font)
    _fonts.push(stores.PDF.styles.headingOne.font)
    _fonts.push(stores.PDF.styles.headingTwo.font)
    _fonts.push(stores.PDF.styles.headingThree.font)
    _fonts.push(stores.PDF.styles.base.header.fontFamily)
    _fonts.push(stores.PDF.styles.base.footer.fontFamily)
    _fonts.push(stores.PDF.styles.base.summary.fontFamily)
    stores.PROJECT.pages.forEach((page: ContextState) => {
      page.entities.forEach((entity: Entity) => {
        if (
          entity.external?.paragraph?.generator.font &&
          entity.external.paragraph.active
        ) {
          _fonts.push(entity.external?.paragraph?.generator.font)
        }
      })
    })

    const unique = _fonts.filter((v, i, a) => a.indexOf(v) === i)

    if (!utils().isOnline()) {
      // now online, reload google fonts
      if (online.value && stores.PDF.normalize.length === 0) {
        toast(hooks.i18n.t('editor.pdf.inserts.nowOnline'))

        return
      }

      // roboto raw .ttf
      pdfmake.addVirtualFileSystem(getStandardVFS().vfs)
    } else {
      unique.forEach((s: string) => {
        set[s] = stores.PDF.normalize[s]
      })

      if (stores.PDF.normalize['Roboto'])
        set['Roboto'] = stores.PDF.normalize['Roboto']

      pdfmake.addFonts(set)
    }
  }

  const create = async (options: PDFDocOptions) => {
    setVfsFonts()

    const data = await doc(options)

    const pdf = pdfmake.createPdf(data)

    await nextTick

    pdf
      .download(hooks.project.utils().exportFullName('pdf'))
      .then(() => {
        toast.success(hooks.i18n.t('toast.pdf.create'))

        hooks.emitter.emit('pdf-preview-exists')
      })
      .catch(() => {
        toast(hooks.i18n.t('toast.pdf.error'))
      })
      .finally(() => {
        stores.ABSOLUTE.load = false
        isLoading.value = false
      })
  }

  const preview = async (input: HTMLElement, options: PDFDocOptions) => {
    setVfsFonts()

    const data = await doc(options)

    const generator = pdfmake.createPdf(data)

    generator
      .getDataUrl()
      .then(
        async (data: any) => {
          const iframe = document.createElement('iframe')

          hooks.emitter.emit('pdf-preview-exists')

          await nextTick

          iframe.src = data
          iframe.style.width = '400px'
          iframe.style.height = '500px'
          iframe.style.overflow = 'hidden'

          let child = input?.lastElementChild
          while (child) {
            input?.removeChild(child)
            child = input?.lastElementChild
          }

          input?.appendChild(iframe)
        },
        (err: any) => {
          if (hooks.env.isDev()) console.log(err)

          toast(hooks.i18n.t('toast.pdf.error'))
        }
      )
      .catch((err: any) => {
        if (hooks.env.isDev()) console.log(err)

        toast(hooks.i18n.t('toast.pdf.error'))
      })
      .finally(() => {
        stores.ABSOLUTE.load = false
        isLoading.value = false
      })
  }

  On.externals().PluginPDFGenerate(emitter, [
    async (options: PDFDocOptions) => {
      if (hooks.env.isEmptyProject(stores.PROJECT.name)) return

      toast.info(hooks.i18n.t('toast.generics.load'))

      stores.ABSOLUTE.load = true
      isLoading.value = true

      await nextTick

      hooks.storage.normalize().then(() => {
        create(options)
      })
    },
    () => {},
  ])

  On.externals().PluginPDFPreview(emitter, [
    async (options: PDFDocOptions) => {
      if (hooks.env.isEmptyProject(stores.PROJECT.name)) return

      stores.ABSOLUTE.load = true
      isLoading.value = true

      await nextTick
      await nextTick

      hooks.storage.normalize().then(() => {
        preview(document.querySelector('#pdf-preview-div') as any, options)
      })
    },
    () => {},
  ])
}
