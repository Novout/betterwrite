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
            ...custom,
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
            ...custom,
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
              size: stores.DOCX.styles.headingOne.size * 1.5,
              bold: stores.DOCX.styles.headingOne.bold,
              italics: stores.DOCX.styles.headingOne.italics,
              color: stores.DOCX.styles.headingOne.color.substring(1),
            },
            paragraph: {
              spacing: {
                before: stores.DOCX.styles.headingOne.margin.top * 15,
                after: stores.DOCX.styles.headingOne.margin.bottom * 15,
              },
            },
          },
          heading2: {
            run: {
              size: stores.DOCX.styles.headingTwo.size * 1.5,
              bold: stores.DOCX.styles.headingTwo.bold,
              italics: stores.DOCX.styles.headingTwo.italics,
              color: stores.DOCX.styles.headingTwo.color.substring(1),
            },
            paragraph: {
              spacing: {
                before: stores.DOCX.styles.headingTwo.margin.top * 15,
                after: stores.DOCX.styles.headingTwo.margin.bottom * 15,
              },
            },
          },
          heading3: {
            run: {
              size: stores.DOCX.styles.headingThree.size * 1.5,
              bold: stores.DOCX.styles.headingThree.bold,
              italics: stores.DOCX.styles.headingThree.italics,
              color: stores.DOCX.styles.headingThree.color.substring(1),
            },
            paragraph: {
              spacing: {
                before: stores.DOCX.styles.headingThree.margin.top * 15,
                after: stores.DOCX.styles.headingThree.margin.bottom * 15,
              },
            },
          },
        },
      }
    }

    const customStyles = ({ external }: Entity) => {
      const textRun = external?.paragraph?.active
        ? {
            size: external?.paragraph?.generator.fontSize * 1.5,
            italics: external?.paragraph?.generator.italics,
            bold: external?.paragraph?.generator.bold,
            color: external?.paragraph?.generator.color.substring(1),
          }
        : {
            size: stores.DOCX.styles.paragraph.size * 1.5,
            bold: stores.DOCX.styles.paragraph.bold,
            italics: stores.DOCX.styles.paragraph.italics,
            color: stores.DOCX.styles.paragraph.color.substring(1),
          }

      const paragraph = external?.paragraph?.active
        ? {
            spacing: {
              after: external?.paragraph?.generator.margin.bottom * 15,
              before: external?.paragraph?.generator.margin.bottom * 15,
            },
            alignment: hooks.transformer
              .docx()
              .entityAlignment(
                external?.paragraph?.generator.alignment as any,
                'setter'
              ),
            indent: {
              firstLine: external?.paragraph?.generator.indent * 125,
            },
          }
        : {
            spacing: {
              before: stores.DOCX.styles.paragraph.margin.top * 15,
              after: stores.DOCX.styles.paragraph.margin.bottom * 15,
            },
            alignment: hooks.transformer
              .docx()
              .entityAlignment(
                stores.DOCX.styles.paragraph.alignment,
                'setter'
              ),
            indent: {
              firstLine: stores.DOCX.styles.paragraph.indent * 125,
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

    hooks.storage.normalize().then(() => {
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
    })
  }

  On.externals().PluginDocxGenerate(emitter, [
    () => {
      download(doc())
    },
    () => {},
  ])
}
