<template>
  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="300"
    class="flex justify-around items-center flex-wrap w-auto"
  >
    <img :src="img" class="bg-cover w-28 md:w-40 h-60 md:h-72 mr-0 md:mr-20" />
    <div class="flex justify-between wb-text flex-col flex-wrap w-auto md:w-80">
      <h2 class="font-bold text-xl mt-10 md:mt-0">{{ title }}</h2>
      <p class="font-thin mt-2 text-lg">{{ description }}</p>
      <button
        class="px-3 py-1 bg-theme-background-3 hover:(bg-theme-background-4) mt-10"
        @click.prevent.stop="dashboard.project().new(type)"
      >
        {{ t('dashboard.newCreate') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDashboard } from '@/use/dashboard'
  import { useI18n } from 'vue-i18n'

  defineProps<{
    img: string
    title: string
    description: string
    type: string
  }>()

  const { t } = useI18n()
  const dashboard = useDashboard()
</script>
