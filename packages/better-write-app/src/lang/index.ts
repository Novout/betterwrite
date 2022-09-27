import { createI18n } from 'vue-i18n'
import { ptBR, enUS, VueI18nLocales } from 'better-write-languages'

export default createI18n({
  legacy: false,
  locale: 'br',
  fallbackLocale: 'br',
  locales: VueI18nLocales,
  messages: {
    br: ptBR.default,
    en: enUS.default,
  },
})
