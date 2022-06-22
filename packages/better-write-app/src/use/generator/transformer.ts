import {
  DOCXAlignmentType,
  DOCXStateFlowItemType,
  Maybe,
} from 'better-write-types'
import { useI18n } from 'vue-i18n'

export const useTransformer = () => {
  const { availableLocales, getLocaleMessage, t } = useI18n()

  const docx = () => {
    const entityAlignment = (b: string, focus: 'setter' | 'getter'): string => {
      let value: Maybe<DOCXAlignmentType> = null
      let __STOP__: boolean = false

      if (focus === 'getter') {
        switch (b) {
          case 'both':
            return t('generator.block.alignment.both')
          case 'left':
            return t('generator.block.alignment.left')
          case 'right':
            return t('generator.block.alignment.right')
          case 'center':
            return t('generator.block.alignment.center')
        }
      }

      availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = getLocaleMessage(locale) as any

        switch (b) {
          case editor.pdf.configuration.alignment.justify:
            __STOP__ = true
            value = DOCXAlignmentType.JUSTIFIED
            break
          case editor.pdf.configuration.alignment.left:
            __STOP__ = true
            value = DOCXAlignmentType.LEFT
            break
          case editor.pdf.configuration.alignment.center:
            __STOP__ = true
            value = DOCXAlignmentType.CENTER
            break
          case editor.pdf.configuration.alignment.right:
            __STOP__ = true
            value = DOCXAlignmentType.RIGHT
            break
          default:
            __STOP__ = false
        }
      })

      return value || DOCXAlignmentType.JUSTIFIED
    }

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

    return { entityAlignment, flowItem }
  }

  return { docx }
}
