<template>
  <div
    class="wb-aside-button cursor-pointer flex items-center"
    :class="[props.enable ? 'justify-between' : 'justify-start']"
  >
    <section class="flex items-center justify-start">
      <slot v-if="icon"></slot>
      <p>{{ props.text }}</p>
    </section>
    <p class="mr-2 text-2xs lg:text-2xs xl:text-xs">{{ props.shortcuts }}</p>
    <section
      v-if="props.beta"
      class="
        bg-gray-300
        text-3xs
        mr-2
        dark:bg-gray-800
        wb-text
        px-3
        rounded-2xl
      "
    >
      BETA
    </section>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    shortcuts: {
      required: false,
      type: String,
    },
    enable: {
      required: false,
      type: Boolean,
      default: true,
    },
    text: {
      required: false,
      type: String,
      default: 'FOO',
    },
    icon: {
      required: false,
      type: Boolean,
      default: false,
    },
    beta: {
      required: false,
      type: Boolean,
      default: false,
    },
  })
</script>
