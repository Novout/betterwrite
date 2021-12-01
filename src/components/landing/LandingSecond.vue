<template>
  <section
    class="flex flex-col justify-center items-center min-h-screen w-full bg-wb-landing-second"
  >
    <h2 class="font-bold text-xl md:text-3xl py-5">
      {{ t('landing.second.title') }}
    </h2>
    <p class="font-tiny text-base md:text-xl py-5 text-center">
      {{ t('landing.second.description') }}
    </p>
    <div
      class="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-around w-full p-5"
    >
      <div class="flex flex-col items-center w-80 shadow-wp-shadow">
        <p class="font-tiny text-lg md:text-2xl">
          {{ t('landing.second.raw') }}
        </p>
        <LandingSecondRaw v-model="data" />
      </div>
      <div class="flex flex-col items-center w-80 shadow-wp-shadow">
        <p class="font-tiny text-lg md:text-2xl">
          {{ t('landing.second.convert') }}
        </p>
        <LandingSecondConvert :data="data" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'

  const { t } = useI18n()

  const data = ref(t('landing.second.data'))
</script>
