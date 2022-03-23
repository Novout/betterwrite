import { createI18n } from 'vue-i18n'
import { ptBR, enUS, VueI18nLocales } from 'better-write-localisation'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  locales: VueI18nLocales,
  messages: {
    br: ptBR.default,
    en: enUS.default,
  },
})
