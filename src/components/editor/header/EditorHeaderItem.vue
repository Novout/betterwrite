<template>
  <div
    class="flex px-2 justify-between items-center w-full cursor-pointer text-theme-editor-header-list-text hover:text-theme-editor-header-list-text-hover active:text-theme-editor-header-list-text-active bg-theme-editor-header-list-background hover:bg-theme-editor-header-list-background-hover active:bg-theme-editor-header-list-background-active"
    @click.prevent.stop="emit('action')"
  >
    <p class="text-sm">{{ props.text }}</p>
    <p
      class="font-tiny rounded-full px-1 text-3xs bg-theme-editor-header-list-shortcuts-background hover:bg-theme-editor-header-list-shortcuts-background-hover active:bg-theme-editor-header-list-shortcuts-background-active"
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
