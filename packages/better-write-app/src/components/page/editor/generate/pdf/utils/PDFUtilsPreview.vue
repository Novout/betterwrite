<template>
  <div
    class="flex h-60 max-h-60 items-center justify-center w-full overflow-hidden p-1 md:p-5 bg-theme-background-opacity-1"
  >
    <p
      :style="{
        fontFamily: generator.font,
        fontSize: `${generator.fontSize}px`,
        letterSpacing: `${generator.characterSpacing}px`,
        color: generator.color,
        backgroundColor: generator.background,
        padding: '2rem',
      }"
    >
      Lorem
    </p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    generator: any
  }>()
</script>
