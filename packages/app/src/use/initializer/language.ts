import { useNavigatorLanguage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useUtils } from '../utils'

export const useLanguageInitializer = () => {
  const utils = useUtils()
  const nav = useNavigatorLanguage()

  const init = () => {
    const { locale } = useI18n()

    let iso = 'pt-BR'

    switch (nav.language.value) {
      case 'pt-BR':
      case 'en-US':
        iso = nav.language.value
        break
      default:
        iso = 'pt-BR'
        break
    }

    const lang = localStorage.getItem('lang') || utils.language().isoToCode(iso)

    if (!lang) return

    locale.value = lang
    ;(document.querySelector('html') as HTMLElement).lang = utils
      .language()
      .codeToIso(lang)
  }

  return { init }
}
