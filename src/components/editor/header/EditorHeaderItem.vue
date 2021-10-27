<template>
  <div
    class="
      flex
      px-2
      justify-between
      items-center
      w-full
      bg-white-opacity
      dark:bg-black-opacity
      hover:bg-gray-500 hover:text-white
      dark:hover:bg-gray-900
      cursor-pointer
    "
    @click.prevent.stop="emit('action')"
  >
    <p class="text-xs">{{ props.text }}</p>
    <p
      class="
        font-tiny
        rounded-full
        px-1
        text-3xs text-white
        bg-gray-500
        dark:bg-gray-900
      "
    >
      {{ props.shortcut }}
    </p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      required: true,
      type: String,
    },
    shortcut: {
      required: false,
      type: String,
      default: '',
    },
    divider: {
      required: false,
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['action'])
</script>
