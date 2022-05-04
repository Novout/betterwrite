import * as docx from 'docx'
import { saveAs } from 'file-saver'
import { Entity, PluginTypes } from 'better-write-types'
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

  const purge = (raw: string): DocxPurge => {
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
        })
      )
    })

    return final
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
                after: 300,
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
                after: 350,
              },
            },
          },
        },
      }
    }

    const entities = () => {
      const headingOne = (raw: string) => {
        return new docx.Paragraph({
          text: hooks.substitution.purge(raw),
          heading: docx.HeadingLevel.HEADING_1,
          alignment: docx.AlignmentType.CENTER,
          pageBreakBefore: true,
        })
      }

      const headingTwo = (raw: string) => {
        return new docx.Paragraph({
          text: hooks.substitution.purge(raw),
          heading: docx.HeadingLevel.HEADING_2,
          alignment: docx.AlignmentType.CENTER,
        })
      }

      const headingThree = (raw: string) => {
        return new docx.Paragraph({
          text: hooks.substitution.purge(raw),
          heading: docx.HeadingLevel.HEADING_3,
          alignment: docx.AlignmentType.CENTER,
        })
      }

      const paragraph = (raw: string): docx.Paragraph[] => {
        if (hooks.env.emptyLine() === raw || raw === ' ') return [lineBreak()]

        return hooks.raw
          .v2()
          .block()
          .text()
          .parse(raw)
          .map((paragraph: string) => {
            return new docx.Paragraph({
              children: purge(paragraph),
              alignment: docx.AlignmentType.JUSTIFIED,
              indent: {
                firstLine: 350,
              },
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

    const content = () => {
      const arr: Array<docx.Paragraph | docx.Table | docx.TableOfContents> = []

      stores.PROJECT.pages.forEach((page: ContextState) => {
        page.entities.forEach((entity: Entity) => {
          switch (entity.type) {
            case 'paragraph':
              entities()
                .paragraph(entity.raw)
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

      return arr
    }

    return { properties, footer, styles, entities, content }
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
          children: create().content(),
          footers: create().footer(),
        },
      ],
    })
  }

  const download = (doc: docx.File) => {
    isLoading.value = true

    docx.Packer.toBlob(doc)
      .then((blob) => {
        saveAs(blob, hooks.project.utils().exportFullName('docx'))
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  On.externals().PluginDocxGenerate(emitter, [
    () => {
      download(doc())
    },
    () => {},
  ])
}
