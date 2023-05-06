<template>
  <div
    class="flex justify-center items-center h-screen w-full z-umax"
    :style="{ backgroundColor: '#1e293b' }"
  >
    <img
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-xs w-32 md:w-60 opacity-30"
      alt="Better Write Logo"
      src="/logo_default.svg"
    />
    <p
      class="md:text-2xl text-lg font-raleway animate-pulse absolute top-1/10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center"
    >
      {{ t('landing.loading') }}
    </p>
    <Spinner :width="100" :height="100" />
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
