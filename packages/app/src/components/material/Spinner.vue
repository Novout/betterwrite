<template>
  <div class="flex items-center justify-center w-full">
    <HeroIcon class="wb-spinner animate-spin">
      <svg
        :width="width"
        :height="height"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <g fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
            clip-rule="evenodd"
            opacity=".2"
          ></path>
          <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z"></path>
        </g>
      </svg>
    </HeroIcon>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    width: number
    height: number
  }>()
</script>
