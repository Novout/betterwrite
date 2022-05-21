import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { computed, onMounted, nextTick, ref } from 'vue'
import { useEnv } from '@/use/env'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { useRoute, useRouter } from 'vue-router'
import { s } from '@/use/storage/supabase'

export const useLanding = () => {
  const { t } = useI18n()
  const env = useEnv()
  const router = useRouter()
  const route = useRoute()
  const { isLoading } = useNProgress()

  const isNecessaryLogin = ref<boolean>(!!route.query.login)

  if (s?.auth?.user()) {
    isNecessaryLogin.value = false

    if (!!route.query.login) router.push('/')
  }

  onMounted(() => {
    document.body.removeAttribute('class')

    document.body.style.overflowX = 'hidden'
  })

  useHead({
    title: computed(() => t('seo.landing.title')),
    meta: [
      {
        name: `description`,
        content: computed(() => t('seo.landing.description')),
      },
    ],
  })

  const version = computed(() => `v${env.packageVersion()}`)

  const onClick = async () => {
    if (!s.auth.user()) {
      isNecessaryLogin.value = true

      return
    }

    isLoading.value = true

    await nextTick

    router.push('/').finally(() => {
      // for common reactivity in other routes
      document.body.style.overflowX = 'auto'

      isLoading.value = false
    })
  }

  return { onClick, version, isNecessaryLogin }
}
