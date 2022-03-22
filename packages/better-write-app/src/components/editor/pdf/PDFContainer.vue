<template>
  <section
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="0"
    class="flex flex-col items-center w-full h-screen md:h-auto overflow-x-hidden bg-theme-editor-pdf-preview-background shadow-xl z-30"
  >
    <div class="flex w-full justify-start items-center">
      <h2 class="flex-1 pl-5 text-lg md:text-xl wb-text font-bold font-raleway">
        {{ title }}
      </h2>
      <HeroIcon class="wb-icon w-7" @click.prevent.stop="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </HeroIcon>
    </div>
    <div
      class="flex flex-col items-center min-h-96 w-full px-5 overflow-y-auto"
    >
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    close: () => void
  }>()
</script>
