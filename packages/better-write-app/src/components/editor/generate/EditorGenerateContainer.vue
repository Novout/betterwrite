<template>
  <section
    ref="container"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="0"
    class="flex flex-col items-start w-full md:h-auto overflow-x-hidden bg-theme-editor-pdf-preview-background shadow-xl z-30"
  >
    <div class="flex w-full justify-start items-center">
      <div class="flex justify-between items-center w-full p-3">
        <slot name="icon" />
        <h2
          class="flex-1 pl-5 text-lg md:text-xl wb-text font-bold font-raleway"
        >
          {{ title }}
        </h2>
        <div class="ml-5 md:ml-10 flex items-center">
          <HeroIcon
            v-if="props.reverse"
            class="wb-icon"
            @click.prevent.stop="props.reverse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="w-7 h-7"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M15.65 4.35A8 8 0 1 0 17.4 13h-2.22a6 6 0 1 1-1-7.22L11 9h7V2z"
              ></path>
            </svg>
          </HeroIcon>
          <HeroIcon class="wb-icon" @click.prevent.stop="props.close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
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
      </div>
    </div>
    <div class="flex flex-col items-start min-h-96 w-full px-5 overflow-y-auto">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core'
  import { ref } from 'vue'

  const props = defineProps<{
    title: string
    close: () => void
    reverse: () => void
  }>()

  const container = ref(null)

  onClickOutside(container, () => {
    props.close()
  })
</script>
