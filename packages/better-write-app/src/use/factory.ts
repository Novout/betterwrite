import { useEnv } from './env'
import { Entity, EntityType } from 'better-write-types'
import { useFormat } from './format'
import { useUtils } from './utils'
import { usePDFStore } from '@/store/pdf'

export const useFactory = () => {
  const PDF = usePDFStore()

  const env = useEnv()
  const format = useFormat()
  const utils = useUtils()

  const entity = () => {
    const generator = () => {
      return {
        font: PDF.styles.paragraph.font,
        fontSize: PDF.styles.paragraph.fontSize,
        lineHeight: PDF.styles.paragraph.lineHeight,
        alignment: PDF.styles.paragraph.alignment,
        indent: PDF.styles.paragraph.indent,
        characterSpacing: PDF.styles.paragraph.characterSpacing,
        color: PDF.styles.paragraph.color,
        background: PDF.styles.paragraph.background,
        italics: false,
        bold: false,
        margin: {
          top: PDF.styles.paragraph.margin.top,
          bottom: PDF.styles.paragraph.margin.bottom,
        },
      }
    }

    const defaults = () => {
      return {
        visual: {
          error: false,
          info: false,
          warning: false,
        },
      }
    }

    const setText = () => {
      return {
        paragraph: {
          active: false,
          generator: generator(),
        },
      }
    }

    const create = (type: EntityType, raw?: string): Entity => {
      if (type === 'line-break') {
        return {
          type,
          raw: raw || env.lineBreak(),
          createdAt: format.actually(),
          updatedAt: format.actually(),
          ...defaults(),
        }
      }

      if (type === 'page-break') {
        return {
          type,
          raw: raw || env.pageBreak(),
          createdAt: format.actually(),
          updatedAt: format.actually(),
          ...defaults(),
        }
      }

      if (type === 'checkbox') {
        return {
          type,
          raw: raw || env.emptyLine(),
          createdAt: format.actually(),
          updatedAt: format.actually(),
          ...defaults(),
          external: {
            ...setText(),
            checkbox: {
              select: false,
            },
          },
        }
      }

      if (type === 'list') {
        return {
          type,
          raw: raw || env.emptyLine(),
          createdAt: format.actually(),
          updatedAt: format.actually(),
          ...defaults(),
          external: {
            ...setText(),
            list: {
              type: 'number' as 'number' | 'rounded',
            },
          },
        }
      }

      if (type === 'paragraph') {
        return {
          type,
          raw: raw || env.emptyLine(),
          createdAt: format.actually(),
          updatedAt: format.actually(),
          ...defaults(),
          external: {
            ...setText(),
          },
        }
      }

      if (type === 'drau') {
        return {
          type,
          raw: raw || env.emptyLine(),
          createdAt: format.actually(),
          updatedAt: format.actually(),
          visual: {
            error: false,
            info: false,
            warning: false,
          },
          external: {
            image: {
              name: 'draw.svg',
              size: {
                width: 100,
                height: 100,
              },
              alignment: 'auto',
            },
          },
        }
      }

      return {
        type,
        raw: raw || env.emptyLine(),
        createdAt: format.actually(),
        updatedAt: format.actually(),
        ...defaults(),
      }
    }

    return { create, generator, setText }
  }

  const simulate = () => {
    const file = (load: (...c: any) => void, error?: (...c: any) => void) => {
      const _ = document.createElement('input')
      _.type = 'file'
      _.addEventListener('change', function () {
        const file = (this.files as any)[0]

        if (!file) return

        const reader = new FileReader()

        if (file.name.endsWith('svg')) {
          reader.readAsText(file)
        } else {
          reader.readAsDataURL(file)
        }

        reader.onload = function () {
          if (utils.support().images(reader)) {
            error && error('bad file')
            return
          }

          const content = {
            type: 'image',
            raw: reader.result,
            createdAt: format.actually(),
            updatedAt: format.actually(),
            external: {
              image: {
                name: file.name,
                size: {
                  width: 100,
                  height: 100,
                },
                alignment: 'full',
              },
            },
          } as Entity

          load && load(content)
        }
        reader.onerror = function (err) {
          error && error(err)
        }
      })
      _.click()
    }

    return { file }
  }

  return { entity, simulate }
}
