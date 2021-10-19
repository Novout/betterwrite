import { useEnv } from './env'
import { ContextStatePageContent, EntityType } from '@/types/context'
import { useFormat } from './format'
export const useFactory = () => {
  const env = useEnv()
  const format = useFormat()

  const entity = () => {
    const create = (type: EntityType): ContextStatePageContent => {
      if (type === 'line-break') {
        return {
          type,
          raw: env.lineBreak(),
          createdAt: format.actually(),
          updatedAt: format.actually(),
          external: {},
        }
      }

      if (type === 'page-break') {
        return {
          type,
          raw: env.pageBreak(),
          createdAt: format.actually(),
          updatedAt: format.actually(),
          external: {},
        }
      }

      return {
        type,
        raw: env.emptyLine(),
        createdAt: format.actually(),
        updatedAt: format.actually(),
        external: {},
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

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          if (!(reader.result as string).includes('data:image/')) {
            error && error('bad file')
            return
          }

          const content = {
            type: 'image',
            raw: reader.result,
            createdAt: format.actually(),
            updatedAt: format.actually(),
          } as ContextStatePageContent

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
