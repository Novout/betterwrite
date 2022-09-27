import { useHead } from '@vueuse/head'
import { VueI18nSEO } from 'better-write-languages'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEnv } from '../env'

export const useHeadInitializer = () => {
  const { t } = useI18n()
  const env = useEnv()

  const init = () => {
    useHead({
      title: computed(() => t('seo.landing.title')),
      meta: [
        {
          name: 'description',
          content: computed(() => t('seo.landing.description')),
        },
        ...VueI18nSEO,
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@betterwriteio' },
        {
          name: 'twitter:title',
          content: computed(() => t('seo.landing.title')),
        },
        {
          name: 'twitter:description',
          content: computed(() => t('seo.landing.description')),
        },
        { name: 'twitter:image', content: 'https://i.imgur.com/yvzMkqO.png' },
        {
          name: 'twitter:image:alt',
          content: computed(() => t('seo.landing.alt')),
        },
        {
          property: 'og:title',
          content: computed(() => t('seo.landing.title')),
        },
        {
          property: 'og:description',
          content: computed(() => t('seo.landing.description')),
        },
        { property: 'og:url', content: env.getProdUrl() },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://i.imgur.com/yvzMkqO.png' },
        {
          property: 'og:image:alt',
          content: computed(() => t('seo.landing.alt')),
        },
        { property: 'og:image:width', content: '500' },
        { property: 'og:image:height', content: '500' },
      ],
    })
  }

  return { init }
}
