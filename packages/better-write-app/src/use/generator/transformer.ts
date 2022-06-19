import { DOCXStateFlowItemType, Maybe } from 'better-write-types'
import { useI18n } from 'vue-i18n'

export const useTransformer = () => {
  const { availableLocales, getLocaleMessage, t } = useI18n()

  const docx = () => {
    const flowItem = (target: string, focus: 'setter' | 'getter'): string => {
      let value: Maybe<DOCXStateFlowItemType> = null
      let __STOP__: boolean = false

      if (focus === 'getter') {
        switch (target) {
          case 'annotation':
            return t('generator.flow.item.annotation')
          case 'break-page':
            return t('generator.flow.item.break-page')
          case 'bw':
            return t('generator.flow.item.bw')
          case 'content':
            return t('generator.flow.item.content')
        }
      }

      availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { generator } = getLocaleMessage(locale) as any

        switch (target) {
          case generator.flow.item.annotation:
            __STOP__ = true
            value = 'annotation'
            break
          case generator.flow.item['break-page']:
            __STOP__ = true
            value = 'break-page'
            break
          case generator.flow.item.bw:
            __STOP__ = true
            value = 'bw'
            break
          case generator.flow.item.content:
            __STOP__ = true
            value = 'content'
            break
          default:
            __STOP__ = false
        }
      })

      return value || 'annotation'
    }

    return { flowItem }
  }

  return { docx }
}
