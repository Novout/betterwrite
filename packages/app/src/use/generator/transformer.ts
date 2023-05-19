import {
  DOCXAlignmentType,
  DOCXStateFlowItemType,
  LiveshareType,
  Maybe,
  ProjectStateSchemaType,
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

  const characters = () => {
    const nameCase = (target: string, focus: 'setter' | 'getter'): string => {
      let value: Maybe<'strict' | 'default' | 'all'> = null
      let __STOP__: boolean = false

      if (focus === 'getter') {
        switch (target) {
          case 'strict':
            return t('editor.characters.item.nameCaseStrict')
          case 'default':
            return t('editor.characters.item.nameCaseDefault')
          case 'all':
            return t('editor.characters.item.nameCaseAll')
        }
      }

      availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = getLocaleMessage(locale) as any

        switch (target) {
          case editor.characters.item.nameCaseStrict:
            __STOP__ = true
            value = 'strict'
            break
          case editor.characters.item.nameCaseDefault:
            __STOP__ = true
            value = 'default'
            break
          case editor.characters.item.nameCaseAll:
            __STOP__ = true
            value = 'all'
            break
          default:
            __STOP__ = false
        }
      })

      return value || 'strict'
    }

    return { nameCase }
  }

  const presence = () => {
    const type = (target: string, focus: 'setter' | 'getter'): string => {
      let value: Maybe<LiveshareType> = null
      let __STOP__: boolean = false

      if (focus === 'getter') {
        switch (target) {
          case 'owner':
            return t('editor.presence.type.owner')
          case 'visit':
            return t('editor.presence.type.visit')
          case 'collaborator':
            return t('editor.presence.type.collaborator')
        }
      }

      availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = getLocaleMessage(locale) as any

        switch (target) {
          case editor.presence.type.owner:
            __STOP__ = true
            value = 'owner'
            break
          case editor.presence.type.visit:
            __STOP__ = true
            value = 'visit'
            break
          case editor.presence.type.collaborator:
            __STOP__ = true
            value = 'collaborator'
            break
          default:
            __STOP__ = false
        }
      })

      return value || 'visit'
    }

    return { type }
  }

  const schemas = () => {
    const type = (target: string, focus: 'setter' | 'getter'): string => {
      let value: Maybe<ProjectStateSchemaType> = null
      let __STOP__: boolean = false

      if (focus === 'getter') {
        switch (target) {
          case 'characters':
            return t('editor.schemas.types.characters.target')
          case 'default':
            return t('editor.schemas.types.default.target')
        }
      }

      availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = getLocaleMessage(locale) as any

        switch (target) {
          case editor.schemas.types.characters.target:
            __STOP__ = true
            value = 'characters'
            break
          case editor.schemas.types.default.target:
            __STOP__ = true
            value = 'default'
            break
          default:
            __STOP__ = false
        }
      })

      return value || 'default'
    }

    const template = (target: string, focus: 'setter' | 'getter'): string => {
      let value: Maybe<'simple' | 'enthusiast'> = null
      let __STOP__: boolean = false

      if (focus === 'getter') {
        switch (target) {
          case 'simple':
            return t('editor.schemas.create.templates.simple.title')
          case 'enthusiast':
            return t('editor.schemas.create.templates.enthusiast.title')
        }
      }

      availableLocales.forEach((locale: string) => {
        if (__STOP__) return

        const { editor } = getLocaleMessage(locale) as any

        switch (target) {
          case editor.schemas.create.templates.simple.title:
            __STOP__ = true
            value = 'simple'
            break
          case editor.schemas.create.templates.enthusiast.title:
            __STOP__ = true
            value = 'enthusiast'
            break
          default:
            __STOP__ = false
        }
      })

      return value || 'simple'
    }

    return { type, template }
  }

  return { docx, characters, presence, schemas }
}
