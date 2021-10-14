import { useEnv } from './env'
import { ContextStatePageContent } from '@/types/context'
import { useFormat } from './format'
export const useFactory = () => {
  const env = useEnv()
  const format = useFormat()

  const entity = () => {
    const create = () => {}

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
