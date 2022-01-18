<template>
  <header
    class="flex items-center justify-between w-full bg-theme-background-2 p-5"
  >
    <h1 class="text-xl font-poppins font-bold wb-text">
      {{ t('dashboard.title') }}
    </h1>
    <HeroIcon class="wb-icon" @click.prevent.stop="router.push('/')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="h-7 w-7"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
          fill="currentColor"
        ></path>
      </svg>
    </HeroIcon>
  </header>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const { t } = useI18n()
  const router = useRouter()
</script>
