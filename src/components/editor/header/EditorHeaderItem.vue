<template>
  <div
    class="
      flex
      px-2
      justify-between
      items-center
      w-full
      bg-theme-background-opacity-1
      hover:bg-theme-background-2
      cursor-pointer
    "
    @click.prevent.stop="emit('action')"
  >
    <p class="text-sm">{{ props.text }}</p>
    <p
      class="
        font-tiny
        rounded-full
        px-1
        text-3xs text-theme-text-1
        bg-theme-background-1
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
