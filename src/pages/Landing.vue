<template>
  <img
    src="@/assets/logo.png"
    class="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-25 w-40 md:w-52 lg:w-60 xl:w-72"
  />
  <main class="min-h-screen w-full landing">
    <LandingFirst />
    <LandingSecond />
    <LandingThird />
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
