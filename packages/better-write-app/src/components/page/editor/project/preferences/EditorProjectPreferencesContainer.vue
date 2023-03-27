<template>
  <div class="flex-1 w-full wb-scroll h-200 overflow-x-scroll overflow-y-auto">
    <EditorProjectPreferencesContainerProject v-if="section === 0" />
    <EditorProjectPreferencesContainerConfiguration v-if="section === 1" />
    <EditorProjectPreferencesContainerStyles v-if="section === 2" />
    <EditorProjectPreferencesContainerKeyboard v-if="section === 3" />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    section: number
  }>()
</script>
