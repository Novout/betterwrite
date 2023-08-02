import { usePDF } from 'vue3-pdfmake'
import { On } from 'better-write-plugin-core'
import {
  ColorSchema,
  ColorSchemaReturn,
  ContextState,
  Entity,
  PDFDocOptions,
  PluginTypes,
  ProjectStateTemplatesGenerator,
} from 'better-write-types'
import { nextTick, computed } from 'vue-demi'
import { getPDFUtils } from 'better-write-plugin-theme'
import { getStandardVFS } from './vfs'
import { ImageToForcePNG } from 'better-write-image-converter'
import { Maybe } from 'better-write-types'
import { getRows, parse } from 'better-write-contenteditable-ast'
import { HEXToCMYK } from 'better-write-color-converter'
import { get } from 'better-write-google-fonts-api'

export const PluginPDFSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  let __FIRST__HEADING__ONE__ = true
  let __LIST__: any = {
    arr: [],
    exists: false,
  }

  const initGoogleFonts = async () => {
    // don't force google fonts request
    if (stores.PDF.normalize.length !== 0) return

    const { normalize, names } = await get({
      key: hooks.env.googleFontsKey(),
      maxFonts: hooks.env.googleMaxFonts(),
      requiredFonts: ['EB Garamond', 'Cormorant Garamond'],
      globalStyle: true,
    })

    stores.PDF.loadFonts({ names, normalize })
  }

  const online = hooks.vueuse.core.useOnline()
  const pdfmake = usePDF()

  const isTheme = computed(() => stores.PDF.styles.switcher.theme)

  const utils = () => {
    const isOnline = () => {
      return online.value && stores.PDF.normalize.length !== 0
    }

    const getColor = (
      color: string,
      setter: ColorSchema,
    ): ColorSchemaReturn => {
      return setter === 'CMYK' ? HEXToCMYK(color, 'pdfmake') : color
    }

    const correctFontInject = (font: string) => {
      return isOnline() ? font : 'Roboto'
    }

    const getEntityGenerator = (
      entity: Entity,
    ): ProjectStateTemplatesGenerator | undefined => {
      const [generator] = stores.PROJECT.templates.generators.filter(
        (g) => g.className === entity.external?.paragraph?.class,
      )

      return generator
    }

    return { isOnline, getColor, correctFontInject, getEntityGenerator }
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

    const generator = utils().getEntityGenerator(entity)

    let indent = ''

    const quantity =
      entity.external?.paragraph?.active && generator?.indent
        ? generator.indent
        : stores.PDF.styles.paragraph.indent

    for (let i = 0; i < quantity; i++) {
      indent += ' '
    }

    return indent
  }

  const generate = (options: PDFDocOptions) => {
    const { theme } = getPDFUtils()

    const headingOne = (entity: Entity) => {
      __FIRST__HEADING__ONE__ = false

      return {
        text: entity.raw,
        margin: [
          base().pageMargins[0],
          stores.PDF.styles.headingOne.margin.top,
          base().pageMargins[2],
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
        text: entity.raw,
        margin: [
          base().pageMargins[0],
          stores.PDF.styles.headingTwo.margin.top,
          base().pageMargins[2],
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
        text: entity.raw,
        margin: [
          base().pageMargins[0],
          stores.PDF.styles.headingThree.margin.top,
          base().pageMargins[2],
          stores.PDF.styles.headingThree.margin.bottom,
        ],
        style: 'heading-three',
      }
    }

    const paragraph = (entity: Entity) => {
      const generator = utils().getEntityGenerator(entity)

      const obj =
        entity.external?.paragraph?.active && generator
          ? {
              font: utils().correctFontInject(generator.font),
              fontSize: generator.fontSize,
              lineHeight: generator.lineHeight,
              alignment: transform().entityAlignment(generator.alignment),
              characterSpacing: generator.characterSpacing,
              color: utils().getColor(generator.color, options.color),
              background: utils().getColor(generator.background, options.color),
              italics: generator.italics,
              bold: generator.bold,
            }
          : {}

      let indent = ''

      const quantity =
        entity.external?.paragraph?.active && generator?.indent
          ? generator.indent
          : stores.PDF.styles.paragraph.indent

      for (let i = 0; i < quantity; i++) {
        if (entity.type === 'paragraph') {
          indent += '\t'
        }
      }

      if (entity.type === 'checkbox') indent += '\t'

      const getParagraphs = () => {
        const rows = getRows(entity.raw)

        return rows.map((row: string) => {
          return {
            text: getParagraph(indent + (row ? row : ' ') + '\n'),
          }
        })
      }

      const getParagraph = (text: string) => {
        const arr: Array<any> = []

        const ast = parse(text)

        ast.forEach(({ text, italic, bold, underline }) => {
          const und = underline ? { decoration: 'underline' } : {}

          arr.push({
            text,
            italics: italic,
            bold,
            ...und,
          })
        })

        return arr
      }

      return {
        text: getParagraphs(),
        style: entity.external?.paragraph?.active ? 'none' : 'paragraph',
        preserveLeadingSpaces: true,
        margin: [
          base().pageMargins[0],
          entity.external?.paragraph?.active && generator
            ? generator.margin.top
            : stores.PDF.styles.paragraph.margin.top,
          base().pageMargins[2],
          entity.external?.paragraph?.active && generator
            ? generator.margin.bottom
            : stores.PDF.styles.paragraph.margin.bottom,
        ],
        ...obj,
      }
    }

    const list = async (entity: Entity) => {
      const generator = utils().getEntityGenerator(entity)
      const p = await paragraph(entity)

      const indent = getIndent(entity)

      __LIST__.arr.push({
        text: p.text,
        style: entity.external?.paragraph?.active ? 'none' : 'text',
        font: p.font,
        fontSize: p.fontSize,
        characterSpacing: p.characterSpacing,
        margin: [
          base().pageMargins[0] + indent.length * 10,
          entity.external?.paragraph?.active && generator
            ? generator.margin.top
            : stores.PDF.styles.paragraph.margin.top,
          base().pageMargins[2],
          entity.external?.paragraph?.active && generator
            ? generator.margin.bottom
            : stores.PDF.styles.paragraph.margin.bottom,
        ],
      })

      __LIST__.exists = true
    }

    const checkbox = async (entity: Entity) => {
      const generator = utils().getEntityGenerator(entity)
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
                  base().pageMargins[0] + -4 + indent.length * 10,
                  entity.external?.paragraph?.active && generator
                    ? generator.margin.top
                    : stores.PDF.styles.paragraph.margin.top,
                  ,
                  base().pageMargins[2],
                  entity.external?.paragraph?.active && generator
                    ? generator.margin.bottom
                    : stores.PDF.styles.paragraph.margin.bottom,
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
                margin: [
                  p.margin[0] + 7 + indent.length * 10,
                  0,
                  base().pageMargins[2],
                  0,
                ],
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
      const isSvg = entity.raw.startsWith('<svg') && entity.raw.endsWith('svg>')

      const raw = !isSvg
        ? entity.raw
        : await ImageToForcePNG({
            raw: entity.raw,
            width: 2000,
            height: 2000,
          })

      if (entity.external?.image?.alignment === 'full') {
        return {
          image: raw,
          width:
            hooks.defines.pdf().base().pageSizeFixes()[
              stores.PDF.styles.base.pageSize
            ][0] -
            base().pageMargins[0] -
            base().pageMargins[2],
          margin: [base().pageMargins[0], 10, base().pageMargins[2], 10],
        }
      } else if (entity.external?.image?.alignment === 'auto') {
        return {
          image: raw,
          margin: [base().pageMargins[0], 10, base().pageMargins[2], 10],
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
              : base().pageMargins[0],
            10,
            entity.external?.image?.alignment === 'right' ||
            entity.external?.image?.alignment === 'center'
              ? 0
              : base().pageMargins[2],
            10,
          ],
        }
      }
    }

    const frontCover = (arr: Array<any>) => {
      if (!stores.PDF.styles.base.background.data) {
        const defColor = utils().getColor(
          stores.PDF.styles.paragraph.color,
          options.color,
        )

        let _title = {
          text: stores.PROJECT.nameRaw,
          fontSize: 42,
          font: utils().correctFontInject(stores.PDF.styles.headingOne.font),
          color: isTheme.value ? theme.paragraph : defColor,
          alignment: 'center',
          margin: [0, 50],
        }

        let _subject = {
          text: stores.PROJECT.subject,
          fontSize: 11,
          font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
          margin: [base().pageMargins[0], 50, base().pageMargins[2], 0],
          color: isTheme.value ? theme.paragraph : defColor,
          alignment: 'center',
        }

        let _creator = {
          text: stores.PROJECT.creator,
          fontSize: 11,
          font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
          margin: [base().pageMargins[0], 250, base().pageMargins[2], 0],
          color: isTheme.value ? theme.paragraph : defColor,
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

    const frontCoverNotExists = (arr: Array<any>) => {
      let _break = {
        text: ' ',
        pageBreak: 'before',
      }
      let _break2 = {
        text: ' ',
        pageBreak: 'before',
      }

      arr.push(_break)
      arr.push(_break2)
    }

    const note = (arr: Array<any>) => {
      const defColor = utils().getColor(
        isTheme.value ? theme.paragraph : stores.PDF.styles.paragraph.color,
        options.color,
      )

      if (stores.PDF.styles.base.note.text) {
        let _text = {
          text: stores.PDF.styles.base.note.text,
          fontSize: 14,
          font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
          color: defColor,
          alignment: 'center',
          margin: [base().pageMargins[0], 50, base().pageMargins[2], 50],
        }

        arr.push(_text)
      }
    }

    const summary = (arr: Array<any>) => {
      if (stores.PDF.styles.switcher.summary) {
        let _break = {
          text: ' ',
          pageBreak: 'before',
        }
        let _break2 = {
          text: ' ',
          pageBreak: 'after',
        }

        let _raw = {
          toc: {
            title: {
              text: stores.PROJECT.nameRaw,
              font: utils().correctFontInject(
                stores.PDF.styles.base.summary.fontFamily,
              ),
              fontSize: 28,
            },
          },
          pageBreak: 'after',
          alignment: 'center',
          font: utils().correctFontInject(
            stores.PDF.styles.base.summary.fontFamily,
          ),
          style: 'summary-default',
        }

        arr.push(_break)
        arr.push(_break2)
        arr.push(_raw)
      }
    }

    const content = async (): Promise<Array<any>> => {
      return new Promise(async (res) => {
        const pages: Array<ContextState> = []
        const arr: Array<any> = []

        if (!options?.chapters) {
          res([])

          return
        }

        options.chapters.forEach((chapter: any) => {
          if (chapter.select) pages.push(chapter.page)
        })

        if (hooks.project.isCreativeProject()) {
          stores.PDF.styles.switcher.cover
            ? frontCover(arr)
            : frontCoverNotExists(arr)
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
          stores.PDF.styles.base.pageOrientation,
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
        const defColor = utils().getColor(
          isTheme.value ? theme.paragraph : stores.PDF.styles.paragraph.color,
          options.color,
        )
        const defDecorationColor = utils().getColor(
          stores.PDF.styles.paragraph.decorationColor,
          options.color,
        )

        return {
          font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
          fontSize: stores.PDF.styles.paragraph.fontSize,
          lineHeight: stores.PDF.styles.paragraph.lineHeight,
          alignment: transform().entityAlignment(
            stores.PDF.styles.paragraph.alignment,
          ),
          characterSpacing: stores.PDF.styles.paragraph.characterSpacing,
          color: defColor,
          decorationColor: defDecorationColor,
        }
      }

      const text = () => {
        return {
          font: utils().correctFontInject(stores.PDF.styles.paragraph.font),
          fontSize: stores.PDF.styles.paragraph.fontSize,
          color: isTheme.value
            ? theme.paragraph
            : utils().getColor(
                stores.PDF.styles.paragraph.color,
                options.color,
              ),
        }
      }

      const headingOne = () => {
        const defColor = utils().getColor(
          isTheme.value
            ? theme['heading-one']
            : stores.PDF.styles.headingOne.color,
          options.color,
        )
        const defDecorationColor = utils().getColor(
          stores.PDF.styles.headingOne.decorationColor,
          options.color,
        )

        return {
          font: utils().correctFontInject(stores.PDF.styles.headingOne.font),
          fontSize: stores.PDF.styles.headingOne.fontSize,
          lineHeight: stores.PDF.styles.headingOne.lineHeight,
          bold: stores.PDF.styles.headingOne.bold,
          italics: stores.PDF.styles.headingOne.italics,
          alignment: transform().entityAlignment(
            stores.PDF.styles.headingOne.alignment,
          ),
          characterSpacing: stores.PDF.styles.headingOne.characterSpacing,
          color: defColor,
          decorationColor: defDecorationColor,
        }
      }

      const headingTwo = () => {
        const defColor = utils().getColor(
          isTheme.value
            ? theme['heading-two']
            : stores.PDF.styles.headingTwo.color,
          options.color,
        )
        const defDecorationColor = utils().getColor(
          stores.PDF.styles.headingTwo.decorationColor,
          options.color,
        )

        return {
          font: utils().correctFontInject(stores.PDF.styles.headingTwo.font),
          fontSize: stores.PDF.styles.headingTwo.fontSize,
          lineHeight: stores.PDF.styles.headingTwo.lineHeight,
          bold: stores.PDF.styles.headingTwo.bold,
          italics: stores.PDF.styles.headingTwo.italics,
          alignment: transform().entityAlignment(
            stores.PDF.styles.headingTwo.alignment,
          ),
          characterSpacing: stores.PDF.styles.headingTwo.characterSpacing,
          color: defColor,
          decorationColor: defDecorationColor,
        }
      }

      const headingThree = () => {
        const defColor = utils().getColor(
          isTheme.value
            ? theme['heading-three']
            : stores.PDF.styles.headingThree.color,
          options.color,
        )
        const defDecorationColor = utils().getColor(
          stores.PDF.styles.headingThree.decorationColor,
          options.color,
        )

        return {
          font: utils().correctFontInject(stores.PDF.styles.headingThree.font),
          fontSize: stores.PDF.styles.headingThree.fontSize,
          lineHeight: stores.PDF.styles.headingThree.lineHeight,
          bold: stores.PDF.styles.headingThree.bold,
          italics: stores.PDF.styles.headingThree.italics,
          alignment: transform().entityAlignment(
            stores.PDF.styles.headingThree.alignment,
          ),
          characterSpacing: stores.PDF.styles.headingThree.characterSpacing,
          color: defColor,
          decorationColor: defDecorationColor,
        }
      }

      const summaryDefault = () => {
        const defColor = utils().getColor(
          isTheme.value ? theme.paragraph : stores.PDF.styles.paragraph.color,
          options.color,
        )

        return {
          font: utils().correctFontInject(
            stores.PDF.styles.base.summary.fontFamily,
          ),
          fontSize: stores.PDF.styles.base.summary.fontSize,
          margin: [base().pageMargins[0], 30, base().pageMargins[2], 30],
          color: defColor,
        }
      }

      const background = () => {
        const defColor = utils().getColor(
          isTheme.value ? theme.page : stores.PDF.styles.base.background.color,
          options.color,
        )

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
          color: defColor,
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
      const gen = generate(options)

      return {
        pageSize: gen.base().pageSize,
        pageOrientation: gen.base().pageOrientation,
        pageMargins: {
          left: 0,
          top: gen.base().pageMargins[1],
          right: 0,
          bottom: gen.base().pageMargins[3],
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
        checked:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF+2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMTItMzBUMDE6Mzc6MjArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjI4KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjI4KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRvdCBHYWluIDIwJSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNzVjYjZmMy1jNGIxLTRiZjctYWMyOS03YzUxMWY5MWJjYzQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5ZTM1YTc3ZC0zNDM0LTI5NGQtYmEwOC1iY2I5MjYyMjBiOGIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowYzc2MDY3Ny0xNDcwLTRlZDUtOGU4ZS1kNTdjODJlZDk1Y2UiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBjNzYwNjc3LTE0NzAtNGVkNS04ZThlLWQ1N2M4MmVkOTVjZSIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozNzoyMCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA3NWNiNmYzLWM0YjEtNGJmNy1hYzI5LTdjNTExZjkxYmNjNCIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozODoyOCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jHsR7AAAAUNJREFUOMvN1T9Lw0AYx/EviLVFxFH8M3USgyAFoUsQ0UV8F6Ui4qCTbuJg34HgptBdUATrUoxiqYMgiOBoIcW9BVED+jgkntGm9i6CmN+Sg/vAcc89dwBd5Clzj6uZGg7LJAC62UFipEgKcmroaeZj/gpcIAhl5rE1M0cJQbiCOsIrs5h8WZ4R6j72yBrhcRo+dhE8bCOcoYng/hFOMxAXb/DAHTNxcCGo7JE5LqhjsW2KP6nDcGecCv1vRdC2eJQDLllooach2hbvIghvLJJgM0QHdeq8F0x/5ETRM4b0DonF7be+Pf+y4A4bZnETok4E/XG3xxR3WhasUWeLCg2OGYnXGP1MkPwnLRmJf3UN+RfgtBGe5MnHVQShxBQZzdgcIgjXsKSu/KZmXgKxBkmKsZ6bffoAelilQs3goauyTi+8A8mhgeQlxdNWAAAAAElFTkSuQmCC',
        unchecked:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAF+2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMTItMzBUMDE6Mzc6MjArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTEyLTMwVDAxOjM4OjU3KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRvdCBHYWluIDIwJSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjMGUyMmJhZC1lY2VkLTQzZWUtYjIzZC1jNDZjOTNiM2UzNWMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5M2FhOTEzYy1hZDVmLWZmNGEtOWE5Ny1kMmUwZjdmYzFlYmUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozYmY2ODFlMy1hMTRhLTQyODMtOGIxNi0zNjQ4M2E2YmZlNjYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjNiZjY4MWUzLWExNGEtNDI4My04YjE2LTM2NDgzYTZiZmU2NiIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozNzoyMCswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMwZTIyYmFkLWVjZWQtNDNlZS1iMjNkLWM0NmM5M2IzZTM1YyIgc3RFdnQ6d2hlbj0iMjAxOS0xMi0zMFQwMTozODo1NyswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6AB6cQAAAPxJREFUOMvF1b1Kw1AYBuAnFf8QL8WlIHQJIriIdyEu4qCTXop7dwenTgUHpYvgJVhob8AuakE+h9hapJqcFDXvFDgPIXlzvgNLjnQ9GlRM340TK7DsUtRI2zqH09txxUzWn3IrhK4DecXs6wjhnqHwZk/K1fIiDAs81krCW54KPBDG8iTcNBIGf4ND1MWTdmrgqIOL5TM0S8SRhmMu1dAo+2DZ57t9eWajtKrvN1GVnrMK9HewhbBy+nPPJbTsJwmymOn8P7fkfLzQGCoG4G4S3vZc4J4QOnY0KyZ3LYQHjqcjf1Qxrx/inDXtWsfNlU1YdeZOP+Gg67mwwTvIDqR1iAowgQAAAABJRU5ErkJggg==',
      }
    }

    const content = async () => {
      const gen = generate(options)

      const data = await gen.content()

      return {
        content: data,
        styles: {
          'heading-three': gen.styles().headingThree(),
          'heading-two': gen.styles().headingTwo(),
          'heading-one': gen.styles().headingOne(),
          'summary-default': gen.styles().summaryDefault(),
          paragraph: gen.styles().paragraph(),
          text: gen.styles().text(),
        },
        images: images(),
      }
    }

    const footer = () => {
      const text = (
        currentPage: number,
        pageCount: number,
        pageSize: number,
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
        pageSize: number,
      ): any => {
        if (
          transform().alignment(stores.PDF.styles.base.footer.alignment) ===
          'default'
        ) {
          return currentPage % 2 ? 'right' : 'left'
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
        pageSize: number,
      ) => {
        return currentPage >= stores.PDF.styles.base.header.start
          ? stores.PDF.styles.base.header.content
          : ''
      }

      const alignment = (
        currentPage: number,
        pageCount: number,
        pageSize: number,
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
          const defColor = utils().getColor(
            stores.PDF.styles.base.background.color,
            options.color,
          )

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
            : !isTheme.value && defColor === '#FFFFFF'
            ? undefined
            : [
                {
                  canvas: [generate(options).styles().background()],
                },
              ]
        },
        footer: stores.PDF.styles.switcher.footer
          ? function (
              currentPage: number,
              pageCount: number,
              pageSize: number,
            ) {
              const defColor = utils().getColor(
                isTheme.value
                  ? theme.paragraph
                  : stores.PDF.styles.paragraph.color,
                options.color,
              )

              return [
                {
                  text: footer().text(currentPage, pageCount, pageSize),
                  margin: [15, 0],
                  fontSize: stores.PDF.styles.base.footer.textSize,
                  font: utils().correctFontInject(
                    stores.PDF.styles.base.footer.fontFamily,
                  ),
                  alignment: footer().alignment(
                    currentPage,
                    pageCount,
                    pageSize,
                  ),
                  color: defColor,
                },
              ]
            }
          : undefined,
        header: stores.PDF.styles.switcher.header
          ? function (currentPage: number, pageCount: number, pageSize: any) {
              const defColor = utils().getColor(
                isTheme.value
                  ? theme.paragraph
                  : stores.PDF.styles.paragraph.color,
                options.color,
              )

              return [
                {
                  text: header().text(currentPage, pageCount, pageSize),
                  fontSize: stores.PDF.styles.base.header.textSize,
                  font: utils().correctFontInject(
                    stores.PDF.styles.base.header.fontFamily,
                  ),
                  decoration: 'underline',
                  alignment: header().alignment(
                    currentPage,
                    pageCount,
                    pageSize,
                  ),
                  color: defColor,
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
    stores.PROJECT.chapters.forEach((page: ContextState) => {
      page.entities.forEach((entity: Entity) => {
        const generator = utils().getEntityGenerator(entity)

        if (generator?.font && entity.external?.paragraph?.active) {
          _fonts.push(generator.font)
        }
      })
    })

    const unique = _fonts.filter((v, i, a) => a.indexOf(v) === i)

    if (!utils().isOnline()) {
      // now online, reload google fonts
      if (online.value && stores.PDF.normalize.length === 0) {
        hooks.toast.info(hooks.i18n.t('editor.pdf.inserts.nowOnline'))

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
        hooks.toast.success(hooks.i18n.t('toast.pdf.create'))

        hooks.emitter.emit('pdf-preview-exists')
      })
      .catch(() => {
        hooks.toast.error(hooks.i18n.t('toast.pdf.error'))
      })
      .finally(() => {
        stores.ABSOLUTE.load = false

        emitter.emit('plugin-progress-end')
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

          hooks.toast.success(hooks.i18n.t('toast.pdf.preview'))
        },
        (err: any) => {
          if (hooks.env.isDev()) console.log(err)

          hooks.toast.error(hooks.i18n.t('toast.pdf.error'))
        },
      )
      .catch((err: any) => {
        if (hooks.env.isDev()) console.log(err)

        hooks.toast.error(hooks.i18n.t('toast.pdf.error'))
      })
      .finally(() => {
        stores.ABSOLUTE.load = false

        emitter.emit('plugin-progress-end')
      })
  }

  On.externals().PluginPDFGenerate(emitter, [
    async (options: PDFDocOptions) => {
      if (hooks.env.isEmptyProject(stores.PROJECT.name)) return

      hooks.toast.info(hooks.i18n.t('toast.generics.load'))

      emitter.emit('plugin-progress-start')

      stores.ABSOLUTE.load = true

      await initGoogleFonts()

      await nextTick

      hooks.storage.normalize().then(async () => {
        await create(options)
      })
    },
    () => {},
  ])

  On.externals().PluginPDFPreview(emitter, [
    async (options: PDFDocOptions) => {
      if (hooks.env.isEmptyProject(stores.PROJECT.name)) return

      hooks.toast.info(hooks.i18n.t('toast.generics.load'))

      emitter.emit('plugin-progress-start')

      stores.ABSOLUTE.load = true

      await initGoogleFonts()

      await nextTick
      await nextTick

      hooks.storage.normalize().then(async () => {
        await preview(
          document.querySelector('#pdf-preview-div') as any,
          options,
        )
      })
    },
    () => {},
  ])

  On.externals().PluginPDFInit(emitter, [
    async () => {
      await initGoogleFonts()
    },
    () => {},
  ])
}
