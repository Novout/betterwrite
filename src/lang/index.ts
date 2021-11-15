import { createI18n } from 'vue-i18n'
import br from './br'
import en from './en'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  locales: [
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
  ],
  messages: {
    br,
    en,
  },
})
