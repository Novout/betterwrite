import { useEnv } from './env'
import {
  ContextState,
  Entity,
  EntityType,
  HistoryStateBarItem,
  ProjectStateSchemaFile,
  ProjectStateTemplatesGenerator,
} from 'better-write-types'
import { usePDFStore } from '@/store/pdf'
import i18n from '@/lang'
import { useEditorStore } from '@/store/editor'
import { useFormat } from './format'

export const useFactory = () => {
  const EDITOR = useEditorStore()
  const PDF = usePDFStore()

  const format = useFormat()
  const env = useEnv()
  // @ts-ignore
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
      const date = format.actually('iso')

      const track = EDITOR.configuration.trackEntities
        ? { createdAt: date, updatedAt: date }
        : {}

      return {
        ...track,
        visual: {
          error: false,
          info: false,
          warning: false,
          custom: undefined,
        },
      }
    }

    const setText = () => {
      return {
        paragraph: {
          active: false,
          class: null,
        },
      }
    }

    const create = (type: EntityType, raw?: string): Entity => {
      if (type === 'line-break') {
        return {
          type,
          raw: raw || '',
          ...defaults(),
        }
      }

      if (type === 'page-break') {
        return {
          type,
          raw: raw || '',
          ...defaults(),
        }
      }

      if (type === 'checkbox') {
        return {
          type,
          raw: raw || '',
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
          ...defaults(),
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
          ...defaults(),
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
        ...defaults(),
      }
    }

    return { create, generator, setText }
  }

  const schemas = () => {
    const schema = () => {}

    const file = () => {}

    const folder = () => {}

    return { schema, file, folder }
  }

  const history = () => {
    const bar = () => {
      const chapter = (context: ContextState): HistoryStateBarItem => {
        return {
          id: context.id,
          name: context.entities[0] ? context.entities[0].raw : context.title,
          type: 'chapter',
          scrollHeight: 0,
          createdAt: format.actually('iso'),
          customIcon: undefined,
        }
      }

      const schema = (file: ProjectStateSchemaFile): HistoryStateBarItem => {
        return {
          id: file.id,
          name: file.fileName,
          type: 'annotations',
          scrollHeight: 0,
          createdAt: format.actually('iso'),
          customIcon: file.customIcon,
        }
      }

      return { chapter, schema }
    }

    return { bar }
  }

  return { entity, schemas, history }
}
