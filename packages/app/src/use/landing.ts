import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { computed, onMounted, nextTick, ref } from 'vue'
import { useEnv } from '@/use/env'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { usePlugin } from 'better-write-plugin-core'

export const useLanding = () => {
  const AUTH = useAuthStore()

  const { t } = useI18n()
  const env = useEnv()
  const router = useRouter()
  const route = useRoute()
  const plugin = usePlugin()

  const isNecessaryLogin = ref<boolean>(!!route.query.login)

  if (AUTH.account.user) {
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
    if (!AUTH.account.user) {
      isNecessaryLogin.value = true

      return
    }

    plugin.emit('plugin-progress-start')

    await nextTick

    router.push('/').finally(() => {
      // for common reactivity in other routes
      document.body.style.overflowX = 'auto'

      plugin.emit('plugin-progress-end')
    })
  }

  return { onClick, version, isNecessaryLogin }
}
