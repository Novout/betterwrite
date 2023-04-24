<template>
  <div
    class="flex px-4 py-0.5 justify-between transition-colors duration-125 items-center w-full cursor-pointer text-theme-editor-header-list-text hover:text-theme-editor-header-list-text-hover active:text-theme-editor-header-list-text-active hover:bg-theme-editor-header-list-background-hover active:bg-theme-editor-header-list-background-active"
    @click.prevent.stop="emit('action')"
  >
    <div class="flex items-center w-full">
      <div>
        <slot name="icon" />
      </div>
      <p class="text-sm">{{ props.text }}</p>
    </div>
    <slot name="shortcut" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      required: true,
      type: String,
    },
    divider: {
      required: false,
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['action'])
</script>
