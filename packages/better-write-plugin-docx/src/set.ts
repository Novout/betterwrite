import * as docx from 'docx'
import { saveAs } from 'file-saver'
import { Entity, Maybe, PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { useNProgress } from '@vueuse/integrations'
import { ContextState } from 'better-write-types'

type DocxPurge = Array<docx.ExternalHyperlink | docx.TextRun>

export const PluginDocxSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const { isLoading } = useNProgress()

  const transform = () => {
    const entityAlignment = (b: string): docx.AlignmentType => {
      let value: Maybe<docx.AlignmentType> = null
      let __STOP__: boolean = false

      hooks.i18n.availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = hooks.i18n.getLocaleMessage(locale)

        switch (b) {
          case editor.pdf.configuration.alignment.justify:
            __STOP__ = true
            value = docx.AlignmentType.JUSTIFIED
            break
          case editor.pdf.configuration.alignment.left:
            __STOP__ = true
            value = docx.AlignmentType.LEFT
            break
          case editor.pdf.configuration.alignment.center:
            __STOP__ = true
            value = docx.AlignmentType.CENTER
            break
          case editor.pdf.configuration.alignment.right:
            __STOP__ = true
            value = docx.AlignmentType.RIGHT
            break
          default:
            __STOP__ = false
        }
      })

      return value || docx.AlignmentType.JUSTIFIED
    }

    return { entityAlignment }
  }

  const purge = (raw: string, custom: Record<string, any>): DocxPurge => {
    const final: DocxPurge = []
    let set: false | 'bold' | 'italic' = false

    const rest = hooks.substitution
      .purge(raw)
      .split(hooks.utils.regex().htmlTags())

    rest.forEach((content: string) => {
      // italic
      if (set === 'italic') {
        final.push(
          new docx.TextRun({
            text: content,
            italics: true,
          })
        )
        set = false
        return
      }

      if (content === hooks.raw.v2().html().italic().open()) {
        set = 'italic'
        return
      }

      if (set === 'bold') {
        final.push(
          new docx.TextRun({
            text: content,
            bold: true,
          })
        )
        set = false
        return
      }

      // bold
      if (content === hooks.raw.v2().html().bold().open()) {
        set = 'bold'
        return
      }

      if (
        content === hooks.raw.v2().html().italic().close() ||
        content === hooks.raw.v2().html().bold().close()
      )
        return

      /*
      // http
      if (content.match(hooks.utils.regex().links())) {
        const fin = raw.split(hooks.utils.regex().links())

        fin.forEach((str: string) => {
          if (str.match(hooks.utils.regex().links())) {
            final.push(new docx.ExternalHyperlink({
              children: [
                new docx.TextRun({
                  text: str.replace('http://', '').replace('https://', '')
                }),
              ],
              link: str,
            }))
          } else {
            final.push(new docx.TextRun({
              text: str
            }))
          }
        })

        return
      }
      */

      final.push(
        new docx.TextRun({
          text: content,
          ...custom,
        })
      )
    })

    return final
  }

  const addons = () => {
    const bw = (
      arr: Array<docx.Paragraph | docx.Table | docx.TableOfContents>
    ) => {
      arr.push(create().entities().pageBreak())
      arr.push(
        create()
          .entities()
          .headingThree('Documento produzido por betterwrite.io')
      )
    }

    return { bw }
  }

  const create = () => {
    const properties = (): docx.ISectionPropertiesOptions => {
      return {
        page: {
          pageNumbers: {
            start: 1,
            formatType: docx.NumberFormat.DECIMAL,
          },
        },
        type: docx.SectionType.NEXT_PAGE,
      }
    }

    const footer = () => {
      return {
        default: new docx.Footer({
          children: [
            new docx.Paragraph({
              alignment: docx.AlignmentType.CENTER,
              children: [
                new docx.TextRun({
                  children: [docx.PageNumber.CURRENT],
                }),
              ],
            }),
          ],
        }),
      }
    }

    const styles = () => {
      return {
        default: {
          heading1: {
            run: {
              size: 36,
              bold: true,
              italics: false,
              color: '000000',
            },
            paragraph: {
              spacing: {
                after: 1200,
              },
            },
          },
          heading2: {
            run: {
              size: 28,
              bold: true,
            },
            paragraph: {
              spacing: {
                before: 100,
                after: 500,
              },
            },
          },
          heading3: {
            run: {
              size: 24,
              bold: true,
            },
            paragraph: {
              spacing: {
                before: 80,
                after: 400,
              },
            },
          },
        },
      }
    }

    const customStyles = ({ external }: Entity) => {
      const textRun = external?.paragraph?.active
        ? {
            italics: external?.paragraph?.generator.italics,
            bold: external?.paragraph?.generator.bold,
          }
        : {}

      const paragraph = external?.paragraph?.active
        ? {
            spacing: {
              after: external?.paragraph?.generator.margin.bottom * 15,
              before: external?.paragraph?.generator.margin.bottom * 15,
            },
            alignment: transform().entityAlignment(
              external?.paragraph?.generator.alignment as any
            ),
            indent: {
              firstLine: 375,
            },
          }
        : {
            indent: {
              firstLine: 375,
            },
          }

      return { textRun, paragraph }
    }

    const entities = () => {
      const headingOne = (raw: string) => {
        return new docx.Paragraph({
          text: raw,
          heading: docx.HeadingLevel.HEADING_1,
          alignment: docx.AlignmentType.CENTER,
          pageBreakBefore: true,
        })
      }

      const headingTwo = (raw: string) => {
        return new docx.Paragraph({
          text: raw,
          heading: docx.HeadingLevel.HEADING_2,
          alignment: docx.AlignmentType.CENTER,
        })
      }

      const headingThree = (raw: string) => {
        return new docx.Paragraph({
          text: raw,
          heading: docx.HeadingLevel.HEADING_3,
          alignment: docx.AlignmentType.CENTER,
        })
      }

      const paragraph = (entity: Entity): docx.Paragraph[] => {
        if (
          hooks.env.emptyLine() === entity.raw ||
          entity.raw === '' ||
          entity.raw === ' '
        )
          return [lineBreak()]

        const custom = customStyles(entity)

        return hooks.raw
          .v2()
          .block()
          .text()
          .parse(entity.raw)
          .map((paragraph: string) => {
            return new docx.Paragraph({
              children: purge(paragraph, custom.textRun),
              alignment: docx.AlignmentType.JUSTIFIED,
              ...custom.paragraph,
            })
          })
      }

      const pageBreak = () => {
        return new docx.Paragraph({
          text: '\t', // force detect valid paragraph
          pageBreakBefore: true,
        })
      }

      const lineBreak = () => {
        return new docx.Paragraph({
          text: '',
          spacing: {
            before: 80,
            after: 80,
          },
        })
      }

      return {
        paragraph,
        headingOne,
        headingTwo,
        headingThree,
        pageBreak,
        lineBreak,
      }
    }

    const content = (
      arr: Array<docx.Paragraph | docx.Table | docx.TableOfContents>
    ) => {
      stores.PROJECT.pages.forEach((page: ContextState) => {
        page.entities.forEach((entity: Entity) => {
          switch (entity.type) {
            case 'paragraph':
              entities()
                .paragraph(entity)
                ?.forEach((paragraph: docx.Paragraph) => arr.push(paragraph))
              break
            case 'heading-one':
              arr.push(entities().headingOne(entity.raw))
              break
            case 'heading-two':
              arr.push(entities().headingTwo(entity.raw))
              break
            case 'heading-three':
              arr.push(entities().headingThree(entity.raw))
              break
            case 'page-break':
              arr.push(entities().pageBreak())
              break
            case 'line-break':
              arr.push(entities().lineBreak())
              break
          }
        })
      })
    }

    const flow = () => {
      const arr: Array<docx.Paragraph | docx.Table | docx.TableOfContents> = []

      stores.DOCX.flow.forEach((f) => {
        switch (f.type) {
          case 'content':
            content(arr)
            break
          case 'annotation':
            entities()
              .paragraph(hooks.factory.entity().create('paragraph', f.raw))
              ?.forEach((paragraph: docx.Paragraph) => arr.push(paragraph))
            break
          case 'break-page':
            arr.push(entities().pageBreak())
            break
          case 'bw':
            addons().bw(arr)
            break
        }
      })

      return arr
    }

    return { properties, footer, styles, entities, content, flow }
  }

  const doc = (): docx.File => {
    return new docx.Document({
      creator: stores.PROJECT.creator,
      title: stores.PROJECT.nameRaw,
      description: stores.PROJECT.subject,
      subject: stores.PROJECT.subject,
      keywords: stores.PROJECT.keywords,
      styles: create().styles(),
      sections: [
        {
          properties: create().properties(),
          children: create().flow(),
          footers: create().footer(),
        },
      ],
    })
  }

  const download = (doc: docx.File) => {
    isLoading.value = true

    hooks.toast.info(hooks.i18n.t('toast.generics.load'))

    docx.Packer.toBlob(doc)
      .then((blob) => {
        saveAs(blob, hooks.project.utils().exportFullName('docx'))

        hooks.toast.success(hooks.i18n.t('toast.project.docx.generate'))
      })
      .finally(() => {
        isLoading.value = false
      })
      .catch(() => {
        hooks.toast.error(hooks.i18n.t('toast.generics.error'))
      })
  }

  On.externals().PluginDocxGenerate(emitter, [
    () => {
      download(doc())
    },
    () => {},
  ])
}
