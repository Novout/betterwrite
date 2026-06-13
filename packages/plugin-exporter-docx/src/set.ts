import * as docx from 'docx'
import { saveAs } from 'file-saver'
import {
  Entity,
  PluginTypes,
  ProjectStateTemplatesGenerator,
  DOCXDocOptions,
} from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { getRows, parse } from 'better-write-contenteditable-ast'
import { ContextState } from 'better-write-types'

type DocxPurge = Array<docx.ExternalHyperlink | docx.TextRun>

const bionicRuns = (
  word: string,
  base: Record<string, any>,
): docx.TextRun[] => {
  const len = Math.ceil(word.length * 0.45)
  return [
    new docx.TextRun({ ...base, text: word.slice(0, len), bold: true }),
    new docx.TextRun({ ...base, text: word.slice(len) }),
  ]
}

export const PluginDocxSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  const { isLoading } = hooks.vueuse.integration.progress

  const purge = (
    raw: string,
    custom: Record<string, any>,
    bionicReading = false,
  ): DocxPurge => {
    const arr: DocxPurge = []

    const ast = parse(hooks.substitution.purge(raw))

    ast.forEach((node) => {
      const base = {
        italics: node.italic,
        bold: node.bold,
        underline: custom.isUnderline(node.underline),
        ...custom.textRun,
      }

      if (bionicReading) {
        const words = node.text.split(/(\s+)/)
        words.forEach((chunk) => {
          if (/^\s+$/.test(chunk) || chunk === '') {
            arr.push(new docx.TextRun({ ...base, text: chunk }))
          } else {
            bionicRuns(chunk, base).forEach((r) => arr.push(r))
          }
        })
      } else {
        arr.push(new docx.TextRun({ ...base, text: node.text }))
      }
    })

    return arr
  }

  const utils = () => {
    const getEntityGenerator = (
      entity: Entity,
    ): ProjectStateTemplatesGenerator | undefined => {
      const [generator] = stores.PROJECT.templates.generators.filter(
        (g) => g.className === entity.external?.paragraph?.class,
      )

      return generator
    }

    return { getEntityGenerator }
  }

  const addons = () => {
    const bw = (
      arr: Array<docx.Paragraph | docx.Table | docx.TableOfContents>,
    ) => {
      arr.push(create().entities().pageBreak())
      arr.push(
        create()
          .entities()
          .headingThree('Documento produzido por betterwrite.io'),
      )
    }

    return { bw }
  }

  const create = (bionicReading = false) => {
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

    const customStyles = (entity: Entity) => {
      const generator = utils().getEntityGenerator(entity)

      const textRun =
        entity.external?.paragraph?.active && generator
          ? {
              size: generator.fontSize * 1.5,
              color: generator.color.substring(1),
            }
          : {
              size: stores.DOCX.styles.paragraph.size * 1.5,
              color: stores.DOCX.styles.paragraph.color.substring(1),
            }

      const paragraph =
        entity.external?.paragraph?.active && generator
          ? {
              spacing: {
                after: generator.margin.bottom * 15,
                before: generator.margin.bottom * 15,
              },
              alignment: hooks.transformer
                .docx()
                .entityAlignment(generator.alignment, 'setter'),
              indent: {
                firstLine: generator.indent * 125,
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
                  'setter',
                ),
              indent: {
                firstLine: stores.DOCX.styles.paragraph.indent * 125,
              },
            }

      const isList =
        entity.type === 'list'
          ? {
              bullet: {
                level: 0,
              },
            }
          : {}

      const isUnderline = (underline: boolean) => {
        return underline
          ? {
              type: docx.UnderlineType.DOUBLE,
              color:
                entity.external?.paragraph?.active && generator
                  ? generator.color.substring(1)
                  : stores.DOCX.styles.paragraph.color.substring(1),
            }
          : undefined
      }

      return { textRun, paragraph, isList, isUnderline }
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

        return getRows(entity.raw).map((row) => {
          return new docx.Paragraph({
            children: purge(row, custom, bionicReading),
            ...custom.paragraph,
            ...custom.isList,
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
      arr: Array<docx.Paragraph | docx.Table | docx.TableOfContents>,
    ) => {
      stores.PROJECT.chapters.forEach(({ entities: list }: ContextState) => {
        list.forEach((entity: Entity) => {
          switch (entity.type) {
            case 'paragraph':
            case 'list':
            case 'checkbox':
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

  const doc = (options: DOCXDocOptions): docx.File => {
    const c = create(options.bionicReading)

    return new docx.Document({
      creator: stores.PROJECT.creator,
      title: stores.PROJECT.nameRaw,
      description: stores.PROJECT.subject,
      subject: stores.PROJECT.subject,
      keywords: stores.PROJECT.keywords,
      styles: c.styles(),
      sections: [
        {
          properties: c.properties(),
          children: c.flow(),
          footers: c.footer(),
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
    (options: DOCXDocOptions) => {
      download(doc(options ?? { bionicReading: false }))
    },
    () => {},
  ])
}
