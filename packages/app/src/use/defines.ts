import {
  ProjectStateTemplatesSubstitutionsText,
  ProjectStateTemplatesSubstitutionsItalic,
  ProjectStateTemplatesSubstitutionsBold,
  ProjectStateSchema,
} from 'better-write-types'
import i18n from '@/lang'
import { useUtils } from './utils'

export const useDefines = () => {
  const { t } = i18n.global
  const utils = useUtils()

  const docx = () => {
    const flowItemTypes = (): string[] => {
      return [
        t('generator.flow.item.annotation'),
        t('generator.flow.item.break-page'),
      ]
    }

    const entityAlignment = () => {
      return [
        t('generator.block.alignment.both'),
        t('generator.block.alignment.left'),
        t('generator.block.alignment.center'),
        t('generator.block.alignment.right'),
      ]
    }

    return { flowItemTypes, entityAlignment }
  }

  const pdf = () => {
    const fontFamily = (): Array<string> => {
      return ['Roboto', 'EB Garamond']
    }

    const alignment = (): Array<string> => {
      return [
        t('editor.pdf.configuration.alignment.justify'),
        t('editor.pdf.configuration.alignment.left'),
        t('editor.pdf.configuration.alignment.center'),
        t('editor.pdf.configuration.alignment.right'),
      ]
    }

    const decoration = (): Array<string> => {
      return ['none', 'underline', 'lineThrough', 'overline']
    }

    const decorationStyle = (): Array<string> => {
      return ['none', 'dashed', 'dotted', 'double', 'wavy']
    }

    const base = () => {
      const pageSize = (): Array<string> => {
        return [
          'A5',
          '4A0',
          '2A0',
          'A0',
          'A1',
          'A2',
          'A3',
          'A4',
          'A6',
          'A7',
          'A8',
          'A9',
          'A10',
          'B0',
          'B1',
          'B2',
          'B3',
          'B4',
          'B5',
          'B6',
          'B7',
          'B8',
          'B9',
          'B10',
          'C0',
          'C1',
          'C2',
          'C3',
          'C4',
          'C5',
          'C6',
          'C7',
          'C8',
          'C9',
          'C10',
          'RA0',
          'RA1',
          'RA2',
          'RA3',
          'RA4',
          'SRA0',
          'SRA1',
          'SRA2',
          'SRA3',
          'SRA4',
          'EXECUTIVE',
          'FOLIO',
          'LEGAL',
          'LETTER',
          'TABLOID',
        ]
      }

      const pageSizeFixes = () => {
        return {
          '4A0': [4767.87, 6740.79],
          '2A0': [3370.39, 4767.87],
          A0: [2383.94, 3370.39],
          A1: [1683.78, 2383.94],
          A2: [1190.55, 1683.78],
          A3: [841.89, 1190.55],
          A4: [595.28, 841.89],
          A5: [419.53, 595.28],
          A6: [297.64, 419.53],
          A7: [209.76, 297.64],
          A8: [147.4, 209.76],
          A9: [104.88, 147.4],
          A10: [73.7, 104.88],
          B0: [2834.65, 4008.19],
          B1: [2004.09, 2834.65],
          B2: [1417.32, 2004.09],
          B3: [1000.63, 1417.32],
          B4: [708.66, 1000.63],
          B5: [498.9, 708.66],
          B6: [354.33, 498.9],
          B7: [249.45, 354.33],
          B8: [175.75, 249.45],
          B9: [124.72, 175.75],
          B10: [87.87, 124.72],
          C0: [2599.37, 3676.54],
          C1: [1836.85, 2599.37],
          C2: [1298.27, 1836.85],
          C3: [918.43, 1298.27],
          C4: [649.13, 918.43],
          C5: [459.21, 649.13],
          C6: [323.15, 459.21],
          C7: [229.61, 323.15],
          C8: [161.57, 229.61],
          C9: [113.39, 161.57],
          C10: [79.37, 113.39],
          RA0: [2437.8, 3458.27],
          RA1: [1729.13, 2437.8],
          RA2: [1218.9, 1729.13],
          RA3: [864.57, 1218.9],
          RA4: [609.45, 864.57],
          SRA0: [2551.18, 3628.35],
          SRA1: [1814.17, 2551.18],
          SRA2: [1275.59, 1814.17],
          SRA3: [907.09, 1275.59],
          SRA4: [637.8, 907.09],
          EXECUTIVE: [521.86, 756.0],
          FOLIO: [612.0, 936.0],
          LEGAL: [612.0, 1008.0],
          LETTER: [612.0, 792.0],
          TABLOID: [792.0, 1224.0],
        }
      }

      const pageOrientation = (): Array<string> => {
        return [
          t('editor.pdf.configuration.orientation.portrait'),
          t('editor.pdf.configuration.orientation.landscape'),
        ]
      }

      const pageMargins = (): Array<number> => {
        return [40, 20, 40, 20]
      }

      const footerStyle = () => {
        return [
          t('editor.pdf.configuration.footer.style.simple'),
          t('editor.pdf.configuration.footer.style.counter'),
        ]
      }

      const summaryStyle = () => {
        return [t('editor.pdf.configuration.summary.style.default')]
      }

      const alignment = () => {
        return [
          t('editor.pdf.configuration.alignment.default'),
          t('editor.pdf.configuration.alignment.left'),
          t('editor.pdf.configuration.alignment.center'),
          t('editor.pdf.configuration.alignment.right'),
        ]
      }

      const header = () => {
        const content = () => {
          return ''
        }

        return { content }
      }

      return {
        pageSize,
        pageMargins,
        pageOrientation,
        pageSizeFixes,
        footerStyle,
        summaryStyle,
        alignment,
        header,
      }
    }

    return {
      fontFamily,
      alignment,
      decoration,
      decorationStyle,
      base,
    }
  }

  const characters = () => {
    const nameCase = () => {
      return [
        t('editor.characters.item.nameCaseStrict'),
        t('editor.characters.item.nameCaseDefault'),
        t('editor.characters.item.nameCaseAll'),
      ]
    }

    const names = () => {
      return [
        'Alice',
        'Bob',
        'Frodo',
        'Verko',
        'Tarrio',
        'Sato',
        'Ferrino',
        'Amelho',
        'Androllio',
        'Tyrion',
        'Haino',
      ]
    }

    return { nameCase, names }
  }

  const generator = () => {
    const substitutions = () => {
      const text = (): ProjectStateTemplatesSubstitutionsText[] => {
        return [
          {
            active: true,
            old: '[[c]]',
            new: '©',
          },
          {
            active: true,
            old: '[[r]]',
            new: '®',
          },
          {
            active: true,
            old: '[[tm]]',
            new: '™',
          },
          {
            active: true,
            old: '[[c/o]]',
            new: '℅',
          },
          {
            active: false,
            old: '- ',
            new: '— ',
          },
          {
            active: true,
            old: '&nbsp;',
            new: ' ',
          },
          {
            active: true,
            old: '&#160',
            new: ' ',
          },
        ]
      }

      const italic = (): ProjectStateTemplatesSubstitutionsItalic[] => {
        return []
      }

      const bold = (): ProjectStateTemplatesSubstitutionsBold[] => {
        return []
      }

      return { text, italic, bold }
    }

    return { substitutions }
  }

  const presence = () => {
    const roomType = () => {
      return [
        t('editor.presence.type.visit'),
        t('editor.presence.type.collaborator'),
      ]
    }

    return { roomType }
  }

  const configuration = () => {
    const clientStorage = () => {
      return [
        t('editor.preferences.configuration.clientStorage.indexeddb'),
        t('editor.preferences.configuration.clientStorage.local'),
      ]
    }

    return { clientStorage }
  }

  const schemas = () => {
    const templatesType = () => {
      return [
        t('editor.schemas.create.templates.simple.title'),
        t('editor.schemas.create.templates.enthusiast.title'),
      ]
    }

    const template = (
      target: 'simple' | 'enthusiast',
    ): ProjectStateSchema[] => {
      switch (target) {
        case 'simple':
          return [
            {
              id: utils.id().nano({ prefix: 'schema' }),
              type: 'default',
              name: t('editor.schemas.defines.annotations'),
              prefix: '*',
              customIcon: '📂',
              folders: [],
            },
          ]
        case 'enthusiast': {
          const charactersSchemaId = utils.id().nano({ prefix: 'schema' })
          const charactersFolderId = utils.id().nano({ prefix: 'folder' })
          const charactersFileId = utils.id().nano({ prefix: 'file' })
          const genNameArr = characters().names()
          const genName =
            genNameArr[Math.floor(Math.random() * genNameArr.length)]

          return [
            {
              id: utils.id().nano({ prefix: 'schema' }),
              type: 'default',
              name: t('editor.schemas.defines.lore'),
              prefix: '&',
              customIcon: '📖',
              folders: [],
            },
            {
              id: charactersSchemaId,
              type: 'characters',
              name: t('editor.schemas.defines.characters'),
              prefix: '@',
              customIcon: '🐉',
              folders: [
                {
                  id: charactersFolderId,
                  parentId: charactersSchemaId,
                  folderName: t('editor.schemas.items.folder'),
                  files: [
                    {
                      id: charactersFileId,
                      parentId: charactersSchemaId,
                      fileName: genName,
                      milkdownData: {},
                      extra: {
                        id: utils.id().nano({ prefix: 'character' }),
                        name: genName,
                        nameCase: 'default',
                        color: utils.text().randomColor(),
                        colorAlpha: 0.2,
                        important: false,
                        configuration: false,
                        disabled: false,
                      },
                      customIcon: undefined,
                    },
                  ],
                  customIcon: undefined,
                },
              ],
            },
            {
              id: utils.id().nano({ prefix: 'schema' }),
              type: 'default',
              name: t('editor.schemas.defines.timeline'),
              prefix: '/',
              customIcon: '⛰️',
              folders: [],
            },
            {
              id: utils.id().nano({ prefix: 'schema' }),
              type: 'default',
              name: t('editor.schemas.defines.annotations'),
              prefix: '*',
              customIcon: '📂',
              folders: [],
            },
          ]
        }
      }
    }

    return { templatesType, template }
  }

  return {
    docx,
    pdf,
    generator,
    characters,
    presence,
    configuration,
    schemas,
  }
}
