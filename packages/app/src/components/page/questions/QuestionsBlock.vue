<template>
  <div class="flex flex-col gap-3 w-full wb-text my-20">
    <div
      class="flex w-full items-center justify-between cursor-pointer"
      @click.prevent.stop="toggle()"
    >
      <h2 class="font-bold text-xl font-poppins"><slot name="title" /></h2>
      <IconArrowRight
        v-if="!hiddenToggle"
        class="transform h-9 w-9 wb-icon"
        :class="[value ? 'rotate-90' : '']"
      />
    </div>
    <p class="text-lg mt-5"><slot name="description" /></p>
    <div v-if="value" class="w-full break-words">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useToggle } from '@vueuse/core'

  defineProps<{
    hiddenToggle?: boolean
  }>()

  const [value, toggle] = useToggle()
</script>
