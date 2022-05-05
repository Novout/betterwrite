<template>
  <header
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="100"
    class="flex items-center justify-between w-full bg-theme-editor-dashboard-background-main p-5"
  >
    <h1
      class="text-lg pointer-events-none font-poppins font-raleway wb-text border-b border-theme-background-4"
    >
      {{ t('dashboard.title') }}
    </h1>
    <IconBack
      v-if="local.getProject()"
      class="wb-icon w-8 h-8"
      @click.prevent.stop="onCloseDashboard"
    />
  </header>
</template>

<script setup lang="ts">
  import { useLocalStorage } from '@/use/storage/local'
  import { useNProgress } from '@vueuse/integrations/useNProgress'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const { t } = useI18n()
  const { isLoading } = useNProgress()
  const router = useRouter()

  const local = useLocalStorage()

  const onCloseDashboard = () => {
    isLoading.value = true

    router.push('/editor').finally(() => {
      isLoading.value = false
    })
  }
</script>
