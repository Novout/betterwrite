<template>
  <main class="min-h-screen w-full overflow-x-hidden">
    <LandingFirst />
  </main>
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'
  import { useI18n } from 'vue-i18n'
  import { computed, onMounted } from 'vue'
  import { useLanding } from '@/use/landing'

  const { t } = useI18n()
  const landing = useLanding()

  onMounted(() => {
    document.body.removeAttribute('class')
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

  landing.init()
</script>
