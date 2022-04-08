<template>
  <div class="flex items-center wb-text flex-col w-full">
    <h1 class="md:text-3xl lg:text-4xl sm:text-2xl text-xl mt-5 font-bold">
      {{ t('plans.title') }}
    </h1>
    <v-typical
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
      class="tracking-wide text-center text-base md:text-lg mt-10 w-1/2 blink"
      :steps="[t('plans.description'), 10000, t('plans.description')]"
      :loop="Infinity"
      :wrapper="'p'"
    ></v-typical>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'
  import VTypical from 'vue-typical'

  const { t } = useI18n()
</script>
