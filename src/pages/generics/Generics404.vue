<template>
  <main
    class="wb-base wb-text flex items-center justify-center flex-col md:flex-row"
  >
    <router-link to="/" class="text-3xl">404 :(</router-link>
  </main>
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'
  import { useI18n } from 'vue-i18n'
  import { computed } from 'vue'

  const { t } = useI18n()

  useHead({
    title: computed(() => t('seo.404.title')),
    meta: [
      {
        name: `description`,
        content: computed(() => t('seo.404.description')),
      },
    ],
  })
</script>
