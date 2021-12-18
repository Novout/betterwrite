<template>
  <main class="min-h-screen w-full landing overflow-x-hidden">
    <LandingFirst />
  </main>
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'
  import { useI18n } from 'vue-i18n'
  import { computed, onMounted } from 'vue'

  const { t } = useI18n()

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
</script>
