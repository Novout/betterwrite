import { useEnv } from './env'
import {
  Entity,
  EntityType,
  ProjectStateTemplatesGenerator,
} from 'better-write-types'
import { useFormat } from './format'
import { useUtils } from './utils'
import { usePDFStore } from '@/store/pdf'
import i18n from '@/lang'

export const useFactory = () => {
  const PDF = usePDFStore()

  const env = useEnv()
  const format = useFormat()
  const utils = useUtils()
  const { t } = i18n.global

  const entity = () => {
    const generator = (title?: string): ProjectStateTemplatesGenerator => {
      return {
        className: title || t('editor.entity.generator.template'),
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
          class: null,
          generator: generator(),
        },
      }
    }

    const create = (type: EntityType, raw?: string): Entity => {
      if (type === 'line-break') {
        return {
          type,
          raw: raw || '',
          createdAt: format.actually(),
          updatedAt: format.actually(),
          ...defaults(),
        }
      }

      if (type === 'page-break') {
        return {
          type,
          raw: raw || '',
          createdAt: format.actually(),
          updatedAt: format.actually(),
          ...defaults(),
        }
      }

      if (type === 'checkbox') {
        return {
          type,
          raw: raw || '',
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
          raw: raw || '',
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
          raw: raw || '',
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
              alignment: 'full',
            },
          },
        }
      }

      if (type === 'image') {
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
              name: '__DEFAULT__.png',
              size: {
                width: 100,
                height: 100,
              },
              alignment: 'full',
            },
          },
        }
      }

      return {
        type,
        raw: raw || '',
        createdAt: format.actually(),
        updatedAt: format.actually(),
        ...defaults(),
      }
    }

    return { create, generator, setText }
  }

  const simulate = () => {
    const file = (
      load: (entity: Entity) => void,
      error?: (...c: any) => void
    ) => {
      const _ = document.createElement('input')
      _.type = 'file'
      _.accept = '.png, .svg, .jpg, .jpeg'
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

          const content = entity().create('image', reader.result as string)

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
