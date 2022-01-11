import * as docx from 'docx'
import { saveAs } from 'file-saver'
import { Entity, PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { useNProgress } from '@vueuse/integrations'

export const PluginDocxSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const { isLoading } = useNProgress()

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

      const paragraph = (raw: string) => {
        if (hooks.env.emptyLine() === raw) return lineBreak()

        return new docx.Paragraph({
          text: '                  ' + raw,
          alignment: docx.AlignmentType.JUSTIFIED,
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

      stores.PROJECT.pages.forEach((page) => {
        page.entities.forEach((entity: Entity) => {
          switch (entity.type) {
            case 'paragraph':
              arr.push(entities().paragraph(entity.raw))
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
