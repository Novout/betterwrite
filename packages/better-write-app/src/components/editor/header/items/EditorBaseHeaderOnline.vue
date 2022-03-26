<template>
  <div class="flex items-center">
    <HeroIcon
      class="h-6 w-6 transition-colors"
      :style="{ color: online ? '#52DB4C' : '#DB352C' }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3l3-3a4.237 4.237 0 0 0-6 0zm-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"
        ></path>
      </svg>
    </HeroIcon>
  </div>
</template>

<script lang="ts" setup>
  import { useOnline } from '@vueuse/core'

  const online = useOnline()
</script>
