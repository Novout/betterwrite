import { LanguageRaw, LanguageI18N } from 'better-write-types'

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
