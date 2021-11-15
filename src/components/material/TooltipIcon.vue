<template>
  <HeroIcon
    v-tooltip.top-start="{
      content: props.tooltip,
      theme: 'better-write',
    }"
    class="wb-icon"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      :width="props.size"
      :height="props.size"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        d="M2.2 16.06L3.88 12L2.2 7.94l4.06-1.68L7.94 2.2L12 3.88l4.06-1.68l1.68 4.06l4.06 1.68L20.12 12l1.68 4.06l-4.06 1.68l-1.68 4.06L12 20.12L7.94 21.8l-1.68-4.06l-4.06-1.68M13 17v-2h-2v2h2m0-4V7h-2v6h2z"
        fill="currentColor"
      ></path>
    </svg>
  </HeroIcon>
</template>

<script setup lang="ts">
  const props = defineProps({
    tooltip: {
      required: true,
      type: String,
    },
    size: {
      required: false,
      type: Number,
      default: 18,
    },
  })
</script>
