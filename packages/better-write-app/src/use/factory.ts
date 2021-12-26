import { useEnv } from './env'
import { Entity, EntityType } from 'better-write-types'
import { useFormat } from './format'
import { useUtils } from './utils'

export const useFactory = () => {
  const env = useEnv()
  const format = useFormat()
  const utils = useUtils()

  const entity = () => {
    const create = (type: EntityType, raw?: string): Entity => {
      if (type === 'line-break') {
        return {
          type,
          raw: raw || env.lineBreak(),
          createdAt: format.actually(),
          updatedAt: format.actually(),
          visual: {
            error: false,
            info: false,
            warning: false,
          },
          external: {},
        }
      }

      if (type === 'page-break') {
        return {
          type,
          raw: raw || env.pageBreak(),
          createdAt: format.actually(),
          updatedAt: format.actually(),
          visual: {
            error: false,
            info: false,
            warning: false,
          },
          external: {},
        }
      }

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
          comment: {
            raw: '',
            updatedAt: format.actually(),
            createdAt: format.actually(),
          },
        },
      }
    }

    return { create }
  }

  const simulate = () => {
    const file = (load: (...c: any) => void, error?: (...c: any) => void) => {
      const _ = document.createElement('input')
      _.type = 'file'
      _.addEventListener('change', function () {
        const file = (this.files as any)[0]

        if (!file) return

        const reader = new FileReader()

        if (file.name.includes('svg')) {
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
