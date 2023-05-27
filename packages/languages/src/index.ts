import { LanguageRaw, LanguageI18N } from 'better-write-types'
export * as enUS from './en-US'
export * as ptBR from './pt-BR'

export const VueI18nLocales = [
  {
    name: 'Português',
    code: 'br',
    iso: 'pt-BR',
  },
  {
    name: 'English',
    code: 'en',
    iso: 'en-US',
  },
]

export const VueI18nAllISO = ['en-US', 'pt-BR']

export const VueI18nSEO = [
  {
    property: 'og:locale',
    content: 'en_US',
    key: 'en',
  },
  {
    property: 'og:locale:alternate',
    content: 'pt_BR',
    key: 'br',
  },
]

export const LanguagesRaw: LanguageRaw[] = ['Português do Brasil', 'English']

export const localeToRaw = (lang: LanguageRaw) => {
  return (
    {
      'Português do Brasil': 'br',
      English: 'en',
    }[lang] || 'en'
  )
}

export const onSwitchLanguage = (lang: LanguageRaw): Promise<LanguageI18N> => {
  return new Promise((res) => {
    const set =
      {
        'Português do Brasil': 'br',
        English: 'en',
      }[lang] || 'en'

    localStorage.setItem('lang', set)

    const iso =
      {
        en: 'en-US',
        br: 'pt-BR',
      }[set] || 'en-US'

    ;(document.querySelector('html') as HTMLElement).lang = iso

    res(set as LanguageI18N)
  })
}
